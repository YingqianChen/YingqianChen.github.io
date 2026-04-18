/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,tsx,js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: '#fafaf7',
        'paper-dark': '#0e0e0e',
        ink: '#1a1a1a',
        'ink-dark': '#e8e6df',
        'ink-muted': '#6b6b66',
        'ink-muted-dark': '#8a8880',
        rule: '#d8d6cc',
        'rule-dark': '#2a2926',
        accent: '#b45309',
        'accent-dark': '#d69248',
      },
      maxWidth: {
        prose: '680px',
        meta: '200px',
      },
      fontSize: {
        meta: ['0.75rem', { lineHeight: '1.1rem', letterSpacing: '0.04em' }],
      },
    },
  },
  plugins: [],
};
