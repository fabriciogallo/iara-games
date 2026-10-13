import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: de onde o site é servido.
// - Sem VITE_BASE (Vercel, Netlify, npm run dev): "/", a raiz do endereço.
// - No GitHub Pages, o workflow define VITE_BASE=/iara-games/loja/ (a loja fica dentro de /loja/).
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
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
