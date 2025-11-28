# Steps to prepare
## Download Tailwind

1. npm install -D tailwindcss@3 postcss autoprefixer

2. npx tailwindcss init

3. Make tailwind.config.js this
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add to index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Run the program
1. npm run dev