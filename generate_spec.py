#!/usr/bin/env python3
"""Generate a single Broad Spec Kit HTML document from markdown sources."""

from __future__ import annotations

from pathlib import Path
import re
import sys

import markdown

FOLDER_ORDER = [
    "00-product",
    "01-ui-ux",
    "02-design",
    "03-execution-planning",
]

SECTION_LABELS = {
    "00-product": "Product",
    "01-ui-ux": "UI/UX",
    "02-design": "Design",
    "03-execution-planning": "Execution Planning",
}

SECTION_COLORS = {
    "00-product": "#f59e0b",
    "01-ui-ux": "#06b6d4",
    "02-design": "#8b5cf6",
    "03-execution-planning": "#10b981",
}


def is_hidden(path: Path) -> bool:
    return any(part.startswith(".") for part in path.parts)


def to_anchor(value: str) -> str:
    anchor = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return anchor or "section"


def pretty_file_name(file_path: Path) -> str:
    return file_path.stem.replace("-", " ").replace("_", " ").title()


def infer_root(repo_root: Path) -> Path:
    docs_dir = repo_root / "docs"
    if docs_dir.exists() and all((docs_dir / name).exists() for name in FOLDER_ORDER):
        return docs_dir
    if all((repo_root / name).exists() for name in FOLDER_ORDER):
        return repo_root
    return docs_dir if docs_dir.exists() else repo_root


def build_summary(root: Path) -> str:
    folder_phrases = [SECTION_LABELS[name] for name in FOLDER_ORDER if (root / name).exists()]
    file_count = 0
    first_files: list[str] = []

    for folder in FOLDER_ORDER:
        folder_path = root / folder
        if not folder_path.exists() or not folder_path.is_dir() or is_hidden(folder_path.relative_to(root)):
            continue
        md_files = sorted(
            f
            for f in folder_path.iterdir()
            if f.is_file() and f.suffix.lower() == ".md" and not is_hidden(f.relative_to(root))
        )
        file_count += len(md_files)
        first_files.extend(pretty_file_name(f) for f in md_files[:2])

    first_files_str = ", ".join(first_files[:4]) if first_files else "key specification documents"
    sections_str = ", ".join(folder_phrases[:-1]) + (" and " + folder_phrases[-1] if len(folder_phrases) > 1 else folder_phrases[0] if folder_phrases else "core")

    return (
        f"This Broad Spec Kit compiles the complete markdown corpus across {sections_str}. "
        f"It includes {file_count} source file{'s' if file_count != 1 else ''}, each rendered in full so nothing is omitted. "
        f"The navigation is organized by folder and document to make end-to-end review straightforward. "
        f"Representative documents include {first_files_str}."
    )


def render_html(root: Path) -> str:
    nav_items: list[str] = []
    section_blocks: list[str] = []

    md_converter = markdown.Markdown(
        extensions=["fenced_code", "tables", "toc", "codehilite", "nl2br", "sane_lists"]
    )

    for folder in FOLDER_ORDER:
        folder_path = root / folder
        if not folder_path.exists() or not folder_path.is_dir() or is_hidden(folder_path.relative_to(root)):
            continue

        section_title = SECTION_LABELS[folder]
        section_anchor = to_anchor(f"section-{folder}")
        section_color = SECTION_COLORS[folder]
        nav_items.append(f'<a href="#{section_anchor}">{section_title}</a>')

        file_blocks: list[str] = []
        md_files = sorted(
            file_path
            for file_path in folder_path.iterdir()
            if file_path.is_file() and file_path.suffix.lower() == ".md" and not is_hidden(file_path.relative_to(root))
        )

        for file_path in md_files:
            subsection_title = pretty_file_name(file_path)
            subsection_anchor = to_anchor(f"{folder}-{file_path.stem}")
            nav_items.append(f'<a class="sub" href="#{subsection_anchor}">↳ {subsection_title}</a>')

            raw_markdown = file_path.read_text(encoding="utf-8")
            md_converter.reset()
            rendered_content = md_converter.convert(raw_markdown)

            file_blocks.append(
                f"""
                <article id="{subsection_anchor}" class="subsection">
                  <h3>{subsection_title}</h3>
                  <div class="markdown-body">
                    {rendered_content}
                  </div>
                  <hr>
                </article>
                """
            )

        section_blocks.append(
            f"""
            <section id="{section_anchor}" class="section" style="--section-accent: {section_color};">
              <h2>{section_title}</h2>
              {''.join(file_blocks)}
            </section>
            """
        )

    summary = build_summary(root)

    return f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>Broad Spec Kit</title>
  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\" rel=\"stylesheet\">
  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css\">
  <style>
    :root {{
      color-scheme: light;
      --bg: #f8fafc;
      --text: #0f172a;
      --muted: #475569;
      --nav-bg: #111827;
      --nav-text: #e5e7eb;
      --card: #ffffff;
      --border: #e2e8f0;
    }}

    html {{ scroll-behavior: smooth; }}

    body {{
      margin: 0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }}

    .top-nav {{
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--nav-bg);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 0.5rem 0.75rem;
      max-height: 45vh;
      overflow: auto;
    }}

    .top-nav .links {{
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem 0.65rem;
      align-items: center;
    }}

    .top-nav a {{
      color: var(--nav-text);
      text-decoration: none;
      font-size: 0.84rem;
      padding: 0.2rem 0.45rem;
      border-radius: 0.25rem;
      background: rgba(255,255,255,0.06);
      white-space: nowrap;
    }}

    .top-nav a.sub {{
      opacity: 0.85;
      font-size: 0.78rem;
      background: rgba(255,255,255,0.03);
    }}

    .download-print-btn {{
      margin-left: auto;
      border: 0;
      cursor: pointer;
      font-size: 0.8rem;
      border-radius: 0.3rem;
      padding: 0.35rem 0.6rem;
      background: #22c55e;
      color: #052e16;
      font-weight: 600;
    }}

    main {{
      max-width: 860px;
      margin: 0 auto;
      padding: 1.5rem 1rem 6rem;
    }}

    h1 {{ margin-top: 0.6rem; margin-bottom: 0.5rem; }}

    .summary {{
      color: var(--muted);
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.9rem 1rem;
      border-radius: 0.6rem;
      margin-bottom: 1.4rem;
    }}

    .section {{
      background: var(--card);
      border: 1px solid var(--border);
      border-left: 6px solid var(--section-accent);
      border-radius: 0.55rem;
      padding: 1rem 1rem 0.65rem;
      margin: 1rem 0 1.4rem;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
    }}

    h2 {{ margin-top: 0.2rem; margin-bottom: 0.75rem; }}

    h3 {{
      color: #334155;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }}

    hr {{ border: 0; border-top: 1px solid #e2e8f0; margin: 1.2rem 0 0.7rem; }}

    pre {{ overflow-x: auto; border-radius: 0.45rem; }}

    .floating-btn {{
      position: fixed;
      bottom: 1rem;
      z-index: 1200;
      border: none;
      border-radius: 999px;
      font-size: 0.82rem;
      cursor: pointer;
      font-weight: 600;
      padding: 0.6rem 0.9rem;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
    }}

    .back-to-top {{
      right: 1rem;
      background: #1f2937;
      color: #f9fafb;
    }}

    .download-html {{
      left: 1rem;
      background: #2563eb;
      color: #eff6ff;
    }}

    @media (max-width: 640px) {{
      .top-nav {{ padding: 0.45rem; }}
      .top-nav .links {{ gap: 0.3rem; }}
      .top-nav a {{ font-size: 0.75rem; }}
      .download-print-btn {{ margin-left: 0; }}
      .floating-btn {{ padding: 0.55rem 0.8rem; font-size: 0.75rem; }}
    }}

    @media print {{
      .top-nav,
      .floating-btn {{
        display: none !important;
      }}
      main {{
        max-width: 100%;
        padding: 0;
      }}
      .section {{
        break-inside: avoid;
        box-shadow: none;
      }}
    }}
  </style>
</head>
<body>
  <nav class=\"top-nav\">
    <div class=\"links\">
      <a href=\"#top\">Top</a>
      {''.join(nav_items)}
      <button class=\"download-print-btn\" onclick=\"window.print()\">Download this page</button>
    </div>
  </nav>

  <main id=\"top\">
    <h1>Broad Spec Kit</h1>
    <p class=\"summary\">{summary}</p>
    {''.join(section_blocks)}
  </main>

  <button class=\"floating-btn back-to-top\" onclick=\"window.scrollTo({{ top: 0, behavior: 'smooth' }})\">Back to Top</button>
  <button class=\"floating-btn download-html\" onclick=\"downloadHtml()\">⬇ Download HTML</button>

  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js\"></script>
  <script>
    hljs.highlightAll();

    function downloadHtml() {{
      const html = document.documentElement.outerHTML;
      const blob = new Blob([html], {{ type: 'text/html;charset=utf-8' }});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'spec-kit.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }}
  </script>
</body>
</html>
"""


def main() -> int:
    repo_root = Path(__file__).resolve().parent
    source_root = infer_root(repo_root)

    html = render_html(source_root)
    output_path = repo_root / "spec-kit.html"
    output_path.write_text(html, encoding="utf-8")

    print(f"Generated {output_path} from markdown under {source_root}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
