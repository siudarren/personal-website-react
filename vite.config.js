import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    assetsInclude: [
        "src/articles/**/*.html", // Matches all HTML files in subdirectories of src/articles
        "src/articles/*.html", // Matches HTML files directly in src/articles
    ],
});
