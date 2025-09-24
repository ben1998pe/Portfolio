/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#5534FE',
        'brand-ink': '#333765',
        'brand-soft': '#F5F4FE',
        'brand-accent': '#00E0B8',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(85, 52, 254, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 224, 184, 0.3)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'scale-in': 'scaleIn 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

