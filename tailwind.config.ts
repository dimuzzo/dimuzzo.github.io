
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        eva: {
          primary: '#ff2222',
          secondary: '#7209b7',
          accent: '#3a0ca3',
          dark: '#0a0a0a',
          darker: '#070707',
          light: '#f8f9fa'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        cyber: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px 2px rgba(255, 34, 34, 0.2), 0 0 20px 4px rgba(255, 34, 34, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 15px 3px rgba(255, 34, 34, 0.4), 0 0 30px 6px rgba(255, 34, 34, 0.2)'
          }
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 1px)' },
          '40%': { transform: 'translate(3px, -1px)' },
          '60%': { transform: 'translate(-3px, -1px)' },
          '80%': { transform: 'translate(3px, 1px)' }
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.33' }
        },
        'flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
        'glitch': 'glitch 0.5s infinite',
        'flicker': 'flicker 2s infinite',
        'flow': 'flow 15s ease infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(255, 34, 34, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 34, 34, 0.1) 1px, transparent 1px)',
        'eva-gradient': 'linear-gradient(to right, #ff2222, #7209b7, #3a0ca3)',
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
