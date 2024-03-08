/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,svelte}"],
    theme: {
        extend: {
            colors: {
                "ame": "#0c023e"
            }    
        },
        fontFamily: {
            sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Helvetica", "sans-serif"]
        }
    },
    plugins: [],
}

