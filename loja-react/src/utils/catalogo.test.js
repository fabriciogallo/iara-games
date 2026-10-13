import { describe, expect, it } from "vitest";
import { JOGOS_PADRAO } from "../data/jogos";
import { escolherRecomendados, filtrarJogos, obterTodosJogos, ordenarJogos, paginar, paginasVisiveis } from "./catalogo";

const nomes = (jogos) => jogos.map((jogo) => jogo.nome);

describe("obterTodosJogos", () => {
  it("sem nada salvo devolve só o catálogo da plataforma", () => {
    expect(obterTodosJogos()).toHaveLength(JOGOS_PADRAO.length);
  });

  it("jogos cadastrados pelo formulário entram na frente, o mais novo primeiro", () => {
    const primeiro = { id: "meu-1", nome: "Meu Jogo", preco: 10, categoria: "Ação", imagem: "x.jpg" };
    const segundo = { id: "meu-2", nome: "Outro Jogo", preco: 0, categoria: "Gratuito", imagem: "y.jpg" };
    localStorage.setItem("iaraJogosCustomizados", JSON.stringify([primeiro, segundo]));

    const todos = obterTodosJogos();
    expect(todos).toHaveLength(JOGOS_PADRAO.length + 2);
    expect(nomes(todos).slice(0, 2)).toEqual(["Outro Jogo", "Meu Jogo"]);
  });

  it("ignora dado estragado no navegador em vez de quebrar a loja", () => {
    localStorage.setItem("iaraJogosCustomizados", "isso não é json");
    expect(obterTodosJogos()).toHaveLength(JOGOS_PADRAO.length);

    localStorage.setItem("iaraJogosCustomizados", JSON.stringify({ nao: "é lista" }));
    expect(obterTodosJogos()).toHaveLength(JOGOS_PADRAO.length);

    localStorage.setItem("iaraJogosCustomizados", JSON.stringify([null, { id: 1 }, { id: "sem-nome", preco: 5 }, { id: "ok", nome: "Ok", preco: "abc" }]));
    expect(obterTodosJogos()).toHaveLength(JOGOS_PADRAO.length);
  });
});

describe("filtrarJogos", () => {
  it("'Todos' não tira nenhum jogo", () => {
    expect(filtrarJogos(JOGOS_PADRAO, { categoria: "Todos" })).toHaveLength(JOGOS_PADRAO.length);
  });

  it("filtra por categoria", () => {
    expect(nomes(filtrarJogos(JOGOS_PADRAO, { categoria: "Terror" }))).toEqual(["Enigma do Medo", "Fobia", "Hell Clock", "Asleep: Ato 2"]);
    expect(filtrarJogos(JOGOS_PADRAO, { categoria: "Gratuito" }).every((jogo) => jogo.preco === 0)).toBe(true);
  });

  it("a busca ignora maiúsculas e acentos", () => {
    expect(nomes(filtrarJogos(JOGOS_PADRAO, { busca: "AVIAO" }))).toEqual(["Aviãozinho do Tráfico"]);
    expect(nomes(filtrarJogos(JOGOS_PADRAO, { busca: "  investigacao  " }))).toEqual(["A Investigação Póstuma"]);
    expect(filtrarJogos(JOGOS_PADRAO, { busca: "zzzz" })).toEqual([]);
  });

  it("categoria e busca valem juntas", () => {
    expect(nomes(filtrarJogos(JOGOS_PADRAO, { categoria: "Terror", busca: "hell" }))).toEqual(["Hell Clock"]);
    expect(filtrarJogos(JOGOS_PADRAO, { categoria: "Corrida", busca: "dandara" })).toEqual([]);
  });

  it("'Favoritos' mostra só os ids marcados", () => {
    const favoritos = new Set(["dandara", "fobia"]);
    expect(nomes(filtrarJogos(JOGOS_PADRAO, { categoria: "Favoritos", favoritos }))).toEqual(["Fobia", "Dandara"]);
    expect(filtrarJogos(JOGOS_PADRAO, { categoria: "Favoritos" })).toEqual([]);
  });
});

describe("ordenarJogos", () => {
  it("relevância mantém a ordem do catálogo", () => {
    expect(nomes(ordenarJogos(JOGOS_PADRAO, "relevancia"))).toEqual(nomes(JOGOS_PADRAO));
  });

  it("menor e maior preço", () => {
    const baratos = ordenarJogos(JOGOS_PADRAO, "menor-preco");
    expect(baratos[0].preco).toBe(0);
    expect(baratos.at(-1).nome).toBe("Fobia");
    expect(ordenarJogos(JOGOS_PADRAO, "maior-preco")[0].nome).toBe("Fobia");
  });

  it("melhor avaliado", () => {
    expect(ordenarJogos(JOGOS_PADRAO, "melhor-avaliado")[0].nome).toBe("Mullet MadJack");
  });

  it("não mexe na lista original", () => {
    const antes = nomes(JOGOS_PADRAO);
    ordenarJogos(JOGOS_PADRAO, "maior-preco");
    expect(nomes(JOGOS_PADRAO)).toEqual(antes);
  });

  it("empate mantém a ordem original (sort estável)", () => {
    const empatados = [
      { nome: "A", preco: 10 },
      { nome: "B", preco: 10 },
      { nome: "C", preco: 5 },
    ];
    expect(nomes(ordenarJogos(empatados, "menor-preco"))).toEqual(["C", "A", "B"]);
  });
});

describe("paginar", () => {
  it("divide em páginas de 8", () => {
    const primeira = paginar(JOGOS_PADRAO, 1);
    expect(primeira.itens).toHaveLength(8);
    expect(primeira.totalPaginas).toBe(3);
    expect(paginar(JOGOS_PADRAO, 3).itens).toHaveLength(JOGOS_PADRAO.length - 16);
  });

  it("página fora do limite ou inválida cai numa página que existe", () => {
    expect(paginar(JOGOS_PADRAO, 99).pagina).toBe(3);
    expect(paginar(JOGOS_PADRAO, 0).pagina).toBe(1);
    expect(paginar(JOGOS_PADRAO, -4).pagina).toBe(1);
    expect(paginar(JOGOS_PADRAO, "abc").pagina).toBe(1);
    expect(paginar(JOGOS_PADRAO, null).pagina).toBe(1);
    expect(paginar(JOGOS_PADRAO, "2").pagina).toBe(2);
    expect(paginar(JOGOS_PADRAO, 1.9).pagina).toBe(1);
  });

  it("lista vazia tem uma página vazia", () => {
    expect(paginar([], 1)).toEqual({ itens: [], pagina: 1, totalPaginas: 1 });
  });
});

describe("paginasVisiveis", () => {
  it("poucas páginas aparecem todas", () => {
    expect(paginasVisiveis(1, 1)).toEqual([1]);
    expect(paginasVisiveis(2, 3)).toEqual([1, 2, 3]);
    expect(paginasVisiveis(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("muitas páginas viram reticências no meio", () => {
    expect(paginasVisiveis(1, 10)).toEqual([1, 2, "...", 9, 10]);
    expect(paginasVisiveis(2, 10)).toEqual([1, 2, 3, "...", 9, 10]);
    expect(paginasVisiveis(3, 10)).toEqual([1, 2, 3, 4, "...", 9, 10]);
    expect(paginasVisiveis(5, 10)).toEqual([1, 2, "...", 4, 5, 6, "...", 9, 10]);
    expect(paginasVisiveis(9, 10)).toEqual([1, 2, "...", 8, 9, 10]);
    expect(paginasVisiveis(10, 10)).toEqual([1, 2, "...", 9, 10]);
  });
});

describe("escolherRecomendados", () => {
  it("nunca sugere o que já está no carrinho e respeita a quantidade", () => {
    const ids = ["dandara", "fobia", "bloodless"];
    const sugeridos = escolherRecomendados(JOGOS_PADRAO, ids, 3);
    expect(sugeridos).toHaveLength(3);
    expect(sugeridos.some((jogo) => ids.includes(jogo.id))).toBe(false);
  });

  it("é repetível quando o sorteio é fixo, e não mexe na lista original", () => {
    const antes = nomes(JOGOS_PADRAO);
    const a = escolherRecomendados(JOGOS_PADRAO, [], 3, () => 0.5);
    const b = escolherRecomendados(JOGOS_PADRAO, [], 3, () => 0.5);
    expect(nomes(a)).toEqual(nomes(b));
    expect(nomes(JOGOS_PADRAO)).toEqual(antes);
  });

  it("com poucos jogos sobrando devolve só o que tem", () => {
    const poucos = JOGOS_PADRAO.slice(0, 2);
    expect(escolherRecomendados(poucos, [poucos[0].id], 3)).toHaveLength(1);
  });
});
