// Home, Desenvolvedor e Suporte continuam sendo as páginas estáticas da plataforma.
// Publicada junto da loja, elas ficam na pasta de cima ("../"). Em outro endereço, defina VITE_URL_PLATAFORMA (ex.: https://site.com/).
export function urlPlataforma(caminho = "") {
  const base = import.meta.env.VITE_URL_PLATAFORMA ?? "../";
  return base + caminho;
}
