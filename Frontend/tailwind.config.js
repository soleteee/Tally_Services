/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0056b3",
                secondary: "#00a8e8",
                accent: "#f0ad4e",
                text: "#333333",
                bg: "#f9f9f9",
            },
            fontFamily: {
                sans: ['"Espuma Pro"', 'sans-serif'],
                secondary: ['Roboto', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'], // Keeping Poppins available just in case
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translate(-50%, 10px)' },
                    'to': { opacity: '1', transform: 'translate(-50%, 0)' },
                },
                gradientBG: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                fadeUp: {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                slideLeft: {
                    'from': { opacity: '0', transform: 'translateX(-30px)' },
                    'to': { opacity: '1', transform: 'translateX(0)' },
                },
                slideRight: {
                    'from': { opacity: '0', transform: 'translateX(30px)' },
                    'to': { opacity: '1', transform: 'translateX(0)' },
                },
                zoomIn: {
                    'from': { opacity: '0', transform: 'scale(0.9)' },
                    'to': { opacity: '1', transform: 'scale(1)' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.2s ease-in-out',
                gradientBG: 'gradientBG 15s ease infinite',
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'slide-left': 'slideLeft 0.8s ease-out forwards',
                'slide-right': 'slideRight 0.8s ease-out forwards',
                'zoom-in': 'zoomIn 0.8s ease-out forwards',
            }
        },
    },
    plugins: [],
}
