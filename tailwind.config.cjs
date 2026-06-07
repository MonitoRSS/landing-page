const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      colors: {
        // Accent (brand) — single cobalt accent, by role (see CustomStyles.astro / ADR-007).
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        link: 'var(--aw-color-link)',
        brand: 'var(--aw-color-primary)',
        // Text ladder.
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        subtle: 'var(--aw-color-text-subtle)',
        // Surface ladder — bg-page / bg-panel / bg-emphasized.
        page: 'var(--aw-color-bg-page)',
        panel: 'var(--aw-color-bg-panel)',
        emphasized: 'var(--aw-color-bg-emphasized)',
        // Edges — quiet divider vs control outline.
        'border-default': 'var(--aw-color-border)',
        'border-control': 'var(--aw-color-border-control)',
        // Status — distinct from the accent.
        error: 'var(--aw-color-error)',
        success: 'var(--aw-color-success)',
        warning: 'var(--aw-color-warning)',
        // Safety net (ADR-007 mechanism): remap Tailwind's `slate` scale onto the cobalt
        // zinc ladder so any slate-* ref not yet migrated to a role still lands on-palette.
        slate: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa', // fg.muted
          500: '#7a7a83', // controlBorder
          600: '#52525b',
          700: '#3a3a40', // border
          800: '#212124', // bg.panel
          900: '#18181b', // bg.page
          950: '#121214',
        },
      },
      fontFamily: {
        sans: ['var(--aw-font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('preline/plugin')],
  darkMode: 'class',
};
