const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["DejaVuSans", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                github: "#1B1F23",
                spotify: "#1ED760",
                google: "#fff",
                discordPurple: {
                    light: "#7289da",
                    normal: "#5865F2",
                    dark: "#4752C4",
                },
                discordGrey: {
                    950: "hsl(210, 8%, 5%)",
                    900: "hsl(210, 8%, 10%)",
                    850: "hsl(210, 8%, 15%)",
                    800: "hsl(210, 8%, 20%)",
                    750: "hsl(210, 8%, 25%)",
                    700: "hsl(210, 8%, 30%)",
                    650: "hsl(210, 8%, 35%)",
                    600: "hsl(210, 8%, 40%)",
                    550: "hsl(210, 8%, 45%)",
                    500: "hsl(210, 8%, 50%)",
                    450: "hsl(210, 8%, 55%)",
                    400: "hsl(210, 8%, 60%)",
                    350: "hsl(210, 8%, 65%)",
                    300: "hsl(210, 8%, 70%)",
                    250: "hsl(210, 8%, 75%)",
                    200: "hsl(210, 8%, 80%)",
                    150: "hsl(210, 8%, 85%)",
                    100: "hsl(210, 8%, 90%)",
                    50: "hsl(210, 8%, 95%)",
                },
            },
        },
    },
    plugins: [],
};
