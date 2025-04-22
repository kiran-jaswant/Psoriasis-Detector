/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      extend: {
        animation: {
          fadeInUp: 'fadeInUp 1s ease-out',
          slideInUp: 'slideInUp 0.8s ease-out',
          slideInLeft: 'slideInLeft 0.8s ease-out',
          slideInRight: 'slideInRight 0.8s ease-out',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideInUp: {
            '0%': { transform: 'translateY(40px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideInLeft: {
            '0%': { transform: 'translateX(-40px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideInRight: {
            '0%': { transform: 'translateX(40px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
        },
      }

    },
  },
  plugins: [],
}

