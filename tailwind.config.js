/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#00b5ff",
                    "secondary": "#00a364",
                    "accent": "#00a3ff",
                    "neutral": "#1e3026",
                    "base-100": "#fffbf4",
                    "info": "#00bbff",
                    "success": "#00af65",
                    "warning": "#f66300",
                    "error": "#f80045",
                },
            },
        ],
    },
    safelist: [
        "alert-error"
    ]
}
