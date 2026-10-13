import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" faz o build funcionar em qualquer endereço (GitHub Pages numa subpasta, Vercel, Netlify...)
export default defineConfig({
  base: "./iara-games",
  plugins: [react()],
  server: {
    // o CSS e as imagens da plataforma ficam na pasta de cima (assets/)
    fs: { allow: [".."] },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    css: false,
  },
});
