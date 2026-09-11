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
        border: "var(--border)",
        deep: "var(--deep)",
        body: "var(--body-c)",
        subtle: "var(--subtle)",
        primary: {
          DEFAULT: "var(--primary)",
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
        neutral: {
          bg: "var(--neutral-bg)",
          tx: "var(--neutral-tx)",
        },
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
      },
      fontFamily: {
        sans: ['Epilogue', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
