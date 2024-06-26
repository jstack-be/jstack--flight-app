import type {Config} from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        fontFamily: {
            'sans': ['"Helvetica"', 'ui-sans-serif', 'system-ui'],
            'Jua': ['var(--font-jua)'],
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: {
                    DEFAULT: "#3BF7FE",
                    gradient: "#07ADCB",
                    dark: "#003336",
                    message: "#08AECC",
                },
                foreground: "#0F989D",
                button: "#BDFBFF",
                primary: {
                    DEFAULT: "#ffffff",
                    foreground: "#004B97",
                },
                secondary: {
                    text: "#E65100",
                    background: {
                        DEFAULT: "#FE983B",
                        gradient: "#EE8526",
                        hover: "#FFD8B1"
                    },
                },
                flightcard: {
                    grey: "#B1B1B1",
                    blue: "#08AECC",
                    darkgrey: "#494949",

                },
                textarea: {
                    placeholder: "#AFAFAF",
                    user: "#08AECC",
                    usertext: "#FFFFFF",
                    system: "#F8F8FB",
                    systemtext: "#494949",
                    input: "#8E8E8E",
                    sendButtonText: "#1D2D3C",
                    price:"#5A6CF3"

                },


                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['hover', 'focus'],
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config