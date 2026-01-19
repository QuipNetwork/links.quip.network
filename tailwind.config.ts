import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space theme - unique color palette
        background: "#050510",
        "background-alt": "#0a0a1a",
        surface: "rgba(15, 15, 35, 0.7)",
        "surface-elevated": "rgba(25, 25, 50, 0.85)",
        "surface-hover": "rgba(35, 35, 70, 0.95)",
        border: "rgba(100, 120, 180, 0.15)",
        "border-hover": "rgba(120, 200, 255, 0.35)",
        "border-glow": "rgba(100, 200, 255, 0.5)",
        // Quantum-inspired accent colors
        primary: "#64c8ff", // Electric blue
        "primary-dim": "rgba(100, 200, 255, 0.15)",
        secondary: "#a78bfa", // Soft violet
        "secondary-dim": "rgba(167, 139, 250, 0.15)",
        tertiary: "#34d399", // Quantum green
        "tertiary-dim": "rgba(52, 211, 153, 0.15)",
        "accent-warm": "#fbbf24", // Energy gold
        "accent-coral": "#fb7185", // Entanglement coral
        // Text hierarchy
        "text-primary": "#f0f4ff",
        "text-secondary": "rgba(180, 190, 220, 1)",
        "text-muted": "rgba(140, 155, 190, 0.85)",
        "text-dim": "rgba(100, 115, 150, 0.7)",
        success: "#34d399",
        error: "#fb7185",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'page-title': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'section-header': ['11px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.15em' }],
        'link-title': ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        'link-description': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'admin-title': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      boxShadow: {
        'quantum': '0 0 30px rgba(100, 200, 255, 0.12), 0 0 60px rgba(167, 139, 250, 0.08)',
        'quantum-hover': '0 0 40px rgba(100, 200, 255, 0.2), 0 0 80px rgba(167, 139, 250, 0.12)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(100, 200, 255, 0.1)',
        'orbital': '0 0 20px rgba(100, 200, 255, 0.3)',
        'particle': '0 0 8px currentColor',
      },
      maxWidth: {
        'link-page': '460px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-quantum': 'linear-gradient(135deg, #64c8ff 0%, #a78bfa 50%, #34d399 100%)',
        'gradient-orbital': 'conic-gradient(from 0deg, #64c8ff, #a78bfa, #34d399, #64c8ff)',
        'gradient-card': 'linear-gradient(145deg, rgba(25, 25, 50, 0.9) 0%, rgba(15, 15, 35, 0.95) 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(100, 200, 255, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(167, 139, 250, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(52, 211, 153, 0.05) 0px, transparent 50%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite reverse',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'particle-drift': 'particle-drift 15s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'particle-drift': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
