/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: {
        green: {
          DEFAULT: '#B7E108',
          light: '#C7F506'
        }
      },
      shades: {
        white: '#FFF',
        light: '#F1F1F1',
        darker: '#AFADAD',
        dark: '#1A1A1A',
        black: '#000'
      }
    },

    extend: {
      animation: {
        'scroll': 'scroll 60s linear infinite;',
        'scroll-reverse': 'scroll-reverse 60s linear infinite;',
      },
      keyframes: {
        scroll: {
          "0%": { transform: 'translateX(0)' },
          "100%": { transform: 'translateX(-50%)' }
        },
        'scroll-reverse': {
          "0%": { transform: 'translateX(-50%)' },
          "100%": { transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
};
