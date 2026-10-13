/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg:            'var(--bg)',
          card:          'var(--card)',
          cardElevated:  'var(--card-elevated)',
          border:        'var(--border)',
          borderLight:   'var(--border-light)',
          primary:       'var(--primary)',
          primaryHover:  'var(--primary-hover)',
          brightGreen:   'var(--bright-green)',
          gold:          'var(--gold)',
          goldMuted:     'var(--gold-muted)',
          danger:        'var(--danger)',
          success:       'var(--success)',
          textPrimary:   'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
          textMuted:     'var(--text-muted)',
        },
        // Light mode palette (class="light" on <html>)
        light: {
          bg:            '#F7F7F5',
          card:          '#FFFFFF',
          cardElevated:  '#F0F0EE',
          border:        '#E0E0DD',
          borderLight:   '#D0D0CC',
          primary:       '#0F6E56',
          primaryHover:  '#0b5643',
          brightGreen:   '#16A66F',
          gold:          '#C8A24A',
          danger:        '#EF4444',
          textPrimary:   '#1A1A1B',
          textSecondary: '#3A3A3C',
          textMuted:     '#6E6E69',
        },
      },
      fontFamily: {
        sans:     ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        arabic:   ['"Noto Naskh Arabic"', 'Amiri', 'serif'],
        gujarati: ['"Noto Sans Gujarati"', 'sans-serif'],
        hindi:    ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in':     'fadeIn 0.2s ease-out',
        'slide-up':    'slideUp 0.25s ease-out',
        'slide-right': 'slideRight 0.25s ease-out',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideRight:{ '0%': { transform: 'translateX(-12px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        pulseDot:  { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
};
