/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "linear-gradient(90.41deg, rgba(255, 255, 255, 0.05) -0.38%, rgba(255, 255, 255, 0) 99.66%)",
        "gradient-card":
          "linear-gradient(116.85deg, rgba(252, 70, 107, 0.2) 0%, rgba(63, 94, 251, 0.2) 100%)",
        "gradient-button":
          "linear-gradient(116.85deg, #FC466B 0%, #3F5EFB 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      },
      backgroundSize: {
        "customBackgroundSize%": "200% 100%",
      },
      animation: {
        shimmer: "shimmer 1.8s infinite",
      },
      backgroundColor: {
        backgroundColor: "#080326",
        colorBg: "rgba(255, 255, 255, 0.02)",
        modal: "#191a1a",
        backgroundColorBlack: "#080331",
        backgroundpink: "rgb(89 23 167/1)",
        header: "rgb(20 20 20/1)",
        backgroundColorGlass: "rgba(255, 255, 255, 0.1)",
        backgroundColorhsla: "hsla(230, 100%, 67%, 1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
        notosans: ["Noto Sans", "sans-serif"],
        underdog: ["Underdog", "cursive"],
      },
      boxShadow: {
        "custom-shadow": "0 4px 8px rgba(0, 0, 0, 0.1)",
        custom: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
      },
      colors: {
        blue: "#1fb6ff",
        yellow: "#ffc82c",
        "orange-500": "#f97316",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        greenColor: "#017a39",
        brown: "rgb(133 133 133 / 1)",
        "gray-dark": "#273444",
        gray: "#8492a6",
        footer: "#2B161B",
        "gray-light": "#d3dce6",
        "milk-color": "rgba(255, 255, 255, 0.8)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
      },
      borderColor: {
        color: "rgba(255, 255, 255, 0.02)",
      },
      screens: {
        xs: "200px",
        sm: "375px",
        md: "425px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1440px",
      },
      transitionProperty: {
        "bg-color": "background-color",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      transitionDuration: {
        300: "300ms",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
