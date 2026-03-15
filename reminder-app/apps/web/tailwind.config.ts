import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      colors: {
        brand: {
          canvas: '#f8fafc',
          text: '#0f172a',
          sky: {
            500: '#0ea5e9',
            600: '#0284c7'
          },
          teal: {
            500: '#14b8a6'
          },
          border: {
            soft: '#dbeafe',
            alt: '#bae6fd'
          }
        }
      },
      maxWidth: {
        shell: '1200px'
      },
      borderRadius: {
        panel: '20px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(2, 6, 23, 0.05), 0 6px 16px rgba(14, 165, 233, 0.08)',
        'card-hover': '0 4px 8px rgba(2, 6, 23, 0.06), 0 12px 22px rgba(14, 165, 233, 0.14)'
      },
      transitionDuration: {
        base: '180ms'
      }
    }
  },
  plugins: []
} satisfies Config;
