// As imagens da plataforma ficam em assets/images (pasta de cima). O Vite empacota todas e a gente acha pelo nome do arquivo.
// (as capas grandes "-hero", os fundos "bg-" e os ícones soltos ficam de fora: a loja não usa e só deixariam o site mais pesado)
const imagens = import.meta.glob(
  [
    "../../../assets/images/*.{jpg,jpeg,png,webp,svg}",
    "!../../../assets/images/*-hero*",
    "!../../../assets/images/bg-*",
    "!../../../assets/images/icon-*",
    "!../../../assets/images/image-data-center.png",
  ],
  { eager: true, query: "?url", import: "default" },
);

const urlPorNome = Object.fromEntries(
  Object.entries(imagens).map(([caminho, url]) => [caminho.split("/").pop(), url]),
);

// Aceita "assets/images/image-dandara.jpg" (como o catálogo e o carrinho guardam) ou um endereço completo (jogo adicionado pelo formulário)
export function urlDaImagem(caminho) {
  if (!caminho) return "";
  if (/^(https?:)?\/\//.test(caminho) || caminho.startsWith("data:")) return caminho;
  return urlPorNome[caminho.split("/").pop()] ?? caminho;
}
