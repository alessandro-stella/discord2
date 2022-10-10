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
                discordPurple: "#7289da",
                discordGrey: {
                    900: "#0c0d0e",
                    800: "#23272a",
                    700: "#3a4145",
                    600: "#515a61",
                    500: "#68747d",
                    400: "#828e97",
                    300: "#9ea7ae",
                    200: "#bac0c5",
                    100: "#d5d9dc",
                },
            },
        },
    },
    plugins: [],
};
