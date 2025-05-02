/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--tw-prose-underline)',
              fontWeight: '500',
              '&:hover': {
                textDecorationColor: 'var(--tw-prose-underline-hover)',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '700',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3',
            },
            img: {
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'var(--tw-prose-code-bg)',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
            },
            pre: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              border: 'var(--tw-prose-pre-border)',
              borderRadius: '0.375rem',
              padding: '1em',
              overflow: 'auto',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              paddingLeft: '1em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 