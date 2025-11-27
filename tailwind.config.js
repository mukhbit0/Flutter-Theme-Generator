/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Brand Colors
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Material 3 inspired semantic colors
        surface: {
          dim: 'var(--surface-dim, #e6e0e9)',
          bright: 'var(--surface-bright, #fffbfe)',
          container: {
            lowest: 'var(--surface-container-lowest, #ffffff)',
            low: 'var(--surface-container-low, #f7f2fa)',
            DEFAULT: 'var(--surface-container, #f3edf7)',
            high: 'var(--surface-container-high, #ece6f0)',
            highest: 'var(--surface-container-highest, #e6e0e9)',
          },
        },
      },
      // Custom Font Families
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      // Typography Scale (Material 3 inspired)
      fontSize: {
        'display-lg': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px' }],
        'display-md': ['45px', { lineHeight: '52px', letterSpacing: '0' }],
        'display-sm': ['36px', { lineHeight: '44px', letterSpacing: '0' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '0' }],
        'headline-md': ['28px', { lineHeight: '36px', letterSpacing: '0' }],
        'headline-sm': ['24px', { lineHeight: '32px', letterSpacing: '0' }],
        'title-lg': ['22px', { lineHeight: '28px', letterSpacing: '0' }],
        'title-md': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
        'title-sm': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        'body-md': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        'body-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
        'label-lg': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
        'label-sm': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
      },
      // Custom Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      // Border Radius (Material 3)
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '28px',
        '3xl': '32px',
        'full': '9999px',
      },
      // Box Shadows (Material 3 Elevation)
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
        'elevation-2': '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
        'elevation-3': '0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)',
        'elevation-4': '0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
        'elevation-5': '0 4px 4px rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15)',
        'inner-sm': 'inset 0 1px 2px rgba(0,0,0,0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-primary': '0 0 20px var(--primary, rgba(59, 130, 246, 0.5))',
      },
      // Custom Animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
      },
      // Aspect Ratios
      aspectRatio: {
        'mobile': '9 / 19.5',
        'tablet': '3 / 4',
        'card': '3 / 4',
        'banner': '21 / 9',
      },
      // Z-Index Scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Transition Durations
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      // Transition Timing Functions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [
    // Custom plugin for hide scrollbar
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0,0,0,0.3)',
          },
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.bg-shimmer': {
          'background': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          'background-size': '200% 100%',
        },
      })
    },
  ],
}
