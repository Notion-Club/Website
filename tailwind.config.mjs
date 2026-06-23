/** @type {import('tailwindcss').Config} */
// Les tokens canoniques vivent dans src/styles/tokens.css (variables CSS).
// On les expose ici à Tailwind via var() pour pouvoir écrire bg-accent, text-muted, etc.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'page-bg': 'var(--page-bg)',
        card: 'var(--card)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-soft': 'var(--border)',
      },
      borderRadius: {
        pill: '9999px',
        card: '24px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        hand: ['Kalam', 'cursive'],
      },
      transitionTimingFunction: {
        // Courbes signature (cf. design system).
        signature: 'cubic-bezier(0.22, 1, 0.36, 1)',
        overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
