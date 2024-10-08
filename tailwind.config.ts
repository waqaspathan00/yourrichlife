import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                rotate: {
                    '0%': {transform: 'rotate(0deg)'},
                    '100%': {transform: 'rotate(90deg)'},
                },
            }
        },
        animation: {
            rotate: 'rotate 0.3s ease-in-out',
        }
    },
    plugins: [],
};
export default config;
