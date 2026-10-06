import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        'muted-fill': "var(--muted-fill)",
        border: "var(--border)",
        'border-strong': "var(--border-strong)",
        deep: "var(--deep)",
        'deep-fill': "var(--deep-fill)",
        'rail-bg': "var(--rail-bg)",
        ink: "var(--ink)",
        body: "var(--body-c)",
        'body-c': "var(--body-c)",
        subtle: "var(--subtle)",
        faint: "var(--faint)",
        primary: {
          DEFAULT: "var(--primary)",
          solid: "var(--primary-solid)",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "var(--success)",
          bg: "var(--success-bg)",
          tx: "var(--success-tx)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          bg: "var(--warning-bg)",
          tx: "var(--warning-tx)",
        },
        error: {
          DEFAULT: "var(--error)",
          bg: "var(--error-bg)",
          tx: "var(--error-tx)",
        },
        info: {
          DEFAULT: "var(--info)",
          bg: "var(--info-bg)",
          tx: "var(--info-tx)",
        },
        ai: {
          DEFAULT: "var(--ai)",
          bg: "var(--ai-bg)",
          tx: "var(--ai-tx)",
        },
        neutral: {
          bg: "var(--neutral-bg)",
          tx: "var(--neutral-tx)",
        },
        // Data visualization series
        s1: "var(--s1)",
        s2: "var(--s2)",
        s3: "var(--s3)",
        s4: "var(--s4)",
        s5: "var(--s5)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        full: "var(--r-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        card: "var(--shadow-sm)",
        subtle: "var(--shadow-sm)",
        hover: "var(--shadow-md)",
        elevated: "var(--shadow-lg)",
      },
      fontFamily: {
        sans: ['Epilogue', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Urbanist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
}
