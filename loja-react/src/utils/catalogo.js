import { CHAVES, lerJson } from "./armazenamento";
import { JOGOS_PADRAO } from "../data/jogos";

export const JOGOS_POR_PAGINA = 8;

export const CATEGORIAS = [
  { valor: "Todos", rotulo: "Todos" },
  { valor: "Ação", rotulo: "Ação" },
  { valor: "Aventura", rotulo: "Aventura" },
  { valor: "Terror", rotulo: "Terror" },
  { valor: "RPG", rotulo: "RPG" },
  { valor: "Corrida", rotulo: "Corrida" },
  { valor: "Gratuito", rotulo: "Gratuitos" },
];

export const ORDENACOES = [
  { valor: "relevancia", rotulo: "Relevância" },
  { valor: "menor-preco", rotulo: "Menor preço" },
  { valor: "maior-preco", rotulo: "Maior preço" },
  { valor: "melhor-avaliado", rotulo: "Melhor avaliado" },
];

// "aviao" tem que achar "Aviãozinho": compara sem acento e sem maiúscula
function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

function jogoValido(jogo) {
  return jogo && typeof jogo.id === "string" && typeof jogo.nome === "string" && Number.isFinite(Number(jogo.preco));
}

// Jogos cadastrados pelo formulário "Desenvolvedor" (loja estática) ficam no navegador e entram na frente do catálogo
export function obterTodosJogos() {
  const salvos = lerJson(CHAVES.jogosCustomizados, []);
  const customizados = Array.isArray(salvos) ? salvos.filter(jogoValido) : [];
  return [...customizados.reverse(), ...JOGOS_PADRAO];
}

// categoria "Favoritos" não existe no catálogo: filtra pelos ids que a pessoa marcou (favoritos é um Set)
export function filtrarJogos(jogos, { categoria = "Todos", busca = "", favoritos = new Set() } = {}) {
  const termo = normalizar(busca);
  return jogos.filter((jogo) => {
    if (categoria === "Favoritos") {
      if (!favoritos.has(jogo.id)) return false;
    } else if (categoria !== "Todos" && normalizar(jogo.categoria) !== normalizar(categoria)) {
      return false;
    }
    return termo === "" || normalizar(jogo.nome).includes(termo);
  });
}

export function ordenarJogos(jogos, ordenacao) {
  const numero = (valor) => Number(valor) || 0;
  const copia = [...jogos];
  // o sort do JavaScript é estável: empate mantém a ordem original (a "relevância")
  if (ordenacao === "menor-preco") copia.sort((a, b) => numero(a.preco) - numero(b.preco));
  else if (ordenacao === "maior-preco") copia.sort((a, b) => numero(b.preco) - numero(a.preco));
  else if (ordenacao === "melhor-avaliado") copia.sort((a, b) => numero(b.avaliacao) - numero(a.avaliacao));
  return copia;
}

// Pedir a página 99 de 3 devolve a 3; pedir a "abc" devolve a 1
export function paginar(lista, pagina, porPagina = JOGOS_POR_PAGINA) {
  const totalPaginas = Math.max(1, Math.ceil(lista.length / porPagina));
  const atual = Math.min(Math.max(1, Math.trunc(Number(pagina)) || 1), totalPaginas);
  const inicio = (atual - 1) * porPagina;
  return { itens: lista.slice(inicio, inicio + porPagina), pagina: atual, totalPaginas };
}

// Mostra 1, 2, a vizinhança da página atual e as duas últimas; o que ficou no meio vira "..."
export function paginasVisiveis(atual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const candidatas = [1, 2, atual - 1, atual, atual + 1, total - 1, total].filter((p) => p >= 1 && p <= total);
  const unicas = [...new Set(candidatas)].sort((a, b) => a - b);

  const resultado = [];
  unicas.forEach((pagina, i) => {
    if (i > 0 && pagina - unicas[i - 1] > 1) resultado.push("...");
    resultado.push(pagina);
  });
  return resultado;
}

// Sugestões da página do carrinho: jogos que ainda não estão nele, sorteados
export function escolherRecomendados(jogos, idsNoCarrinho, quantidade = 3, aleatorio = Math.random) {
  const candidatos = jogos.filter((jogo) => !idsNoCarrinho.includes(jogo.id));
  for (let i = candidatos.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [candidatos[i], candidatos[j]] = [candidatos[j], candidatos[i]];
  }
  return candidatos.slice(0, quantidade);
}
