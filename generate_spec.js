#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const FOLDERS_IN_ORDER = [
  '00-product',
  '01-ui-ux',
  '02-design',
  '03-execution-planning',
];

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function convertInline(markdownText) {
  let text = escapeHtml(markdownText);

  const codeSpanTokens = [];
  text = text.replace(/`([^`]+)`/g, (_, code) => {
    const token = `__CODE_SPAN_${codeSpanTokens.length}__`;
    codeSpanTokens.push(`<code>${code}</code>`);
    return token;
  });

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  codeSpanTokens.forEach((tokenHtml, index) => {
    text = text.replace(`__CODE_SPAN_${index}__`, tokenHtml);
  });

  return text;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];

  let inCodeBlock = false;
  let codeLines = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  let inBlockquote = false;
  let blockquoteLines = [];
  let inParagraph = false;
  let paragraphLines = [];

  function closeParagraph() {
    if (inParagraph) {
      html.push(`<p>${paragraphLines.join('<br>')}</p>`);
      inParagraph = false;
      paragraphLines = [];
    }
  }

  function closeUnorderedList() {
    if (inUnorderedList) {
      html.push('</ul>');
      inUnorderedList = false;
    }
  }

  function closeOrderedList() {
    if (inOrderedList) {
      html.push('</ol>');
      inOrderedList = false;
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      html.push(`<blockquote>${blockquoteLines.join('<br>')}</blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }
  }

  function closeStructuredBlocks() {
    closeParagraph();
    closeUnorderedList();
    closeOrderedList();
    closeBlockquote();
  }

  for (const line of lines) {
    if (inCodeBlock) {
      if (/^```/.test(line)) {
        html.push('<pre><code>' + codeLines.map(escapeHtml).join('\n') + '</code></pre>');
        inCodeBlock = false;
        codeLines = [];
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (/^```/.test(line)) {
      closeStructuredBlocks();
      inCodeBlock = true;
      codeLines = [];
      continue;
    }

    if (/^\s*$/.test(line)) {
      closeStructuredBlocks();
      continue;
    }

    if (/^---\s*$/.test(line)) {
      closeStructuredBlocks();
      html.push('<hr>');
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      closeStructuredBlocks();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${convertInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    const unorderedMatch = line.match(/^\s*-\s+(.*)$/);
    if (unorderedMatch) {
      closeParagraph();
      closeOrderedList();
      closeBlockquote();
      if (!inUnorderedList) {
        html.push('<ul>');
        inUnorderedList = true;
      }
      html.push(`<li>${convertInline(unorderedMatch[1])}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    if (orderedMatch) {
      closeParagraph();
      closeUnorderedList();
      closeBlockquote();
      if (!inOrderedList) {
        html.push('<ol>');
        inOrderedList = true;
      }
      html.push(`<li>${convertInline(orderedMatch[1])}</li>`);
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      closeParagraph();
      closeUnorderedList();
      closeOrderedList();
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteLines = [];
      }
      blockquoteLines.push(convertInline(blockquoteMatch[1]));
      continue;
    }

    closeUnorderedList();
    closeOrderedList();
    closeBlockquote();
    if (!inParagraph) {
      inParagraph = true;
      paragraphLines = [];
    }
    paragraphLines.push(convertInline(line));
  }

  if (inCodeBlock) {
    html.push('<pre><code>' + codeLines.map(escapeHtml).join('\n') + '</code></pre>');
  }
  closeStructuredBlocks();

  return html.join('\n');
}

function listMarkdownFilesRecursively(directoryPath) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        results.push(entryPath);
      }
    }
  }

  walk(directoryPath);
  results.sort((a, b) => a.localeCompare(b));
  return results;
}

function resolveSpecRoot(repoRoot) {
  const rootHasAll = FOLDERS_IN_ORDER.every((folder) => fs.existsSync(path.join(repoRoot, folder)));
  if (rootHasAll) {
    return repoRoot;
  }

  const docsRoot = path.join(repoRoot, 'docs');
  const docsHasAll = FOLDERS_IN_ORDER.every((folder) => fs.existsSync(path.join(docsRoot, folder)));
  if (docsHasAll) {
    return docsRoot;
  }

  throw new Error(
    `Could not locate required folders (${FOLDERS_IN_ORDER.join(', ')}) in repo root or docs/ directory.`
  );
}

function buildHtmlDocument(bodyContent) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spec Kit</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f8fa;
      --card: #ffffff;
      --text: #1f2328;
      --muted: #59636e;
      --border: #d0d7de;
      --link: #0969da;
      --code-bg: #f3f4f6;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--text);
      background: var(--bg);
      line-height: 1.6;
    }

    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem 1rem 3rem;
    }

    .section,
    .file {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 10px;
    }

    .section {
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .file {
      padding: 1rem 1.25rem;
      margin: 1rem 0;
    }

    h1, h2, h3, h4 {
      line-height: 1.25;
      margin-top: 0;
    }

    h1 { margin-bottom: 0.5rem; }
    h2 { margin-bottom: 0.75rem; }
    h3, h4 { margin-bottom: 0.5rem; }

    p { margin: 0 0 0.9rem; }

    ul, ol {
      margin: 0 0 0.9rem 1.25rem;
      padding: 0;
    }

    blockquote {
      margin: 0 0 0.9rem;
      padding: 0.5rem 0.75rem;
      border-left: 4px solid var(--border);
      background: #fafbfc;
      color: var(--muted);
    }

    code {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.9em;
      padding: 0.08rem 0.3rem;
    }

    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow-x: auto;
      margin: 0 0 0.9rem;
      padding: 0.75rem;
    }

    pre code {
      border: none;
      background: transparent;
      padding: 0;
      font-size: 0.9rem;
      line-height: 1.45;
      white-space: pre;
    }

    hr {
      border: 0;
      border-top: 1px solid var(--border);
      margin: 1rem 0;
    }

    a {
      color: var(--link);
      text-decoration: none;
    }

    a:hover { text-decoration: underline; }

    .file-path {
      color: var(--muted);
      font-size: 0.92rem;
      margin-bottom: 0.75rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>Spec Kit</h1>
${bodyContent}
  </main>
</body>
</html>
`;
}

function generateSpecHtml() {
  const repoRoot = process.cwd();
  const specRoot = resolveSpecRoot(repoRoot);
  const sections = [];

  for (const folderName of FOLDERS_IN_ORDER) {
    const folderPath = path.join(specRoot, folderName);
    const files = listMarkdownFilesRecursively(folderPath);
    const folderParts = [];

    folderParts.push(`<section class="section">`);
    folderParts.push(`<h2>${folderName}</h2>`);

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativeFromSpecRoot = path.relative(specRoot, filePath).replace(/\\/g, '/');
      const htmlContent = markdownToHtml(content);

      folderParts.push('<article class="file">');
      folderParts.push(`<h3>${path.basename(filePath)}</h3>`);
      folderParts.push(`<div class="file-path">${escapeHtml(relativeFromSpecRoot)}</div>`);
      folderParts.push(htmlContent);
      folderParts.push('</article>');
    }

    folderParts.push('</section>');
    sections.push(folderParts.join('\n'));
  }

  const documentHtml = buildHtmlDocument(sections.join('\n'));
  const outputPath = path.join(repoRoot, 'spec-kit.html');
  fs.writeFileSync(outputPath, documentHtml, 'utf8');

  console.log(`Generated ${outputPath}`);
}

generateSpecHtml();
