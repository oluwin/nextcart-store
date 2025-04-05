/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary theme colors
                'theme-dark': '#1a1a2e',
                'theme-medium': '#16213e',
                'theme-light': '#0f3460',
                'theme-accent': '#e94560',
                'gray-300': '#d1d5db', // For text
                'gray-400': '#9ca3af', // For secondary text

                // Gradients
                'gradient-start': '#4f0092',
                'gradient-mid': '#9cffa1',
                'gradient-end': '#30cdff',
            },
            backgroundColor: {
                'header': 'var(--header-bg)',
                'footer': 'var(--footer-bg)',
                'sidebar': 'var(--sidebar-bg)',
            },
            textColor: {
                'header': 'var(--header-text)',
                'footer': 'var(--footer-text)',
                'sidebar': 'var(--sidebar-text)',
            },
        },
    },
    plugins: [],
}