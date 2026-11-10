import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// base: de onde o site é servido.
// - Sem VITE_BASE (Vercel, Netlify, npm run dev): "/", a raiz do endereço.
// - No GitHub Pages, o workflow define VITE_BASE=/iara-games/loja/ (a loja fica dentro de /loja/).
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        loja: fileURLToPath(new URL("./index.html", import.meta.url)),
        "consulta-cep": fileURLToPath(new URL("./src/consulta-cep.jsx", import.meta.url)),
      },
      output: {
        entryFileNames: ({ name }) => name === "consulta-cep" ? "consulta-cep.js" : "assets/[name]-[hash].js",
      },
    },
  },
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
