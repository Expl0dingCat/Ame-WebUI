/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,svelte}"],
    theme: {
        extend: {
            colors: {
                "ame": "#0c023e",
                "rain": "#242768",
                "glass": "#110a47"
            }    
        },
        fontFamily: {
            sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Helvetica", "sans-serif"],
            mono: ["-apple-system", "'Fira Code'", "'Roboto Mono'", "Consolas", "monospace"]
        }
    },
    plugins: [],
}

