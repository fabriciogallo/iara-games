import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderizarApp } from "../test/renderizar";

const nomesNaTela = () => screen.getAllByRole("heading", { level: 3 }).map((titulo) => titulo.textContent);
const botaoAdicionar = (nome) => screen.getByRole("button", { name: new RegExp(`Adicionar ${nome} ao carrinho`) });

describe("Loja", () => {
  it("abre com os 8 primeiros jogos, o subtítulo geral e 3 páginas", () => {
    renderizarApp("/");
    expect(nomesNaTela()).toHaveLength(8);
    expect(nomesNaTela()[0]).toBe("Enigma do Medo");
    expect(screen.getByText("Mostrando todos os jogos disponíveis na Iara Games")).toBeInTheDocument();
    const paginacao = screen.getByRole("navigation", { name: "Paginação de jogos" });
    expect(within(paginacao).getByRole("button", { name: "Página 3" })).toBeInTheDocument();
    expect(within(paginacao).getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  it("filtra por categoria e atualiza o subtítulo", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    await usuario.click(screen.getByRole("button", { name: "Terror" }));

    expect(nomesNaTela()).toEqual(["Enigma do Medo", "Fobia", "Hell Clock", "Asleep: Ato 2"]);
    expect(screen.getByText("Mostrando 4 de 23 jogos disponíveis")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Terror" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("navigation", { name: "Paginação de jogos" })).not.toBeInTheDocument();
  });

  it("a categoria pode vir pela URL (link compartilhado)", () => {
    renderizarApp("/?categoria=Corrida");
    expect(nomesNaTela()).toEqual(["Horizon Chase Turbo"]);
  });

  it("busca por nome sem se importar com acento, e mostra o estado vazio com como sair dele", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    const campo = screen.getByRole("searchbox", { name: "Buscar jogo por nome" });

    await usuario.type(campo, "aviao");
    expect(nomesNaTela()).toEqual(["Aviãozinho do Tráfico"]);

    await usuario.clear(campo);
    await usuario.type(campo, "zzzz");
    expect(screen.getByRole("heading", { name: "Nenhum jogo encontrado" })).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(nomesNaTela()).toHaveLength(8);
    expect(campo).toHaveValue("");
  });

  it("ordena por menor preço (os gratuitos vêm primeiro)", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    await usuario.selectOptions(screen.getByRole("combobox", { name: "Ordenar jogos" }), "menor-preco");
    const primeiro = screen.getAllByRole("article")[0];
    expect(within(primeiro).getByText("Gratuito")).toBeInTheDocument();
    expect(within(primeiro).getByRole("button", { name: /Jogar/ })).toBeInTheDocument();
  });

  it("navega entre as páginas pela paginação", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    const primeiraPagina = nomesNaTela();

    await usuario.click(screen.getByRole("button", { name: "Página 2" }));
    expect(nomesNaTela()).toHaveLength(8);
    expect(nomesNaTela()).not.toEqual(primeiraPagina);
    expect(screen.getByRole("button", { name: "Página 2" })).toHaveAttribute("aria-current", "page");

    await usuario.click(screen.getByRole("button", { name: "Próxima página" }));
    expect(nomesNaTela()).toHaveLength(7);
    expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
  });

  it("mudar de filtro volta pra primeira página", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/?pagina=3");
    expect(nomesNaTela()).toHaveLength(7);
    await usuario.click(screen.getByRole("button", { name: "Ação" }));
    expect(screen.getByRole("button", { name: "Ação" })).toHaveAttribute("aria-pressed", "true");
    expect(nomesNaTela().length).toBeGreaterThan(0);
  });

  it("favorita um jogo: contador, filtro de favoritos, aviso e persistência", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    expect(screen.getByRole("button", { name: /Favoritos \(0\)/ })).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Adicionar Bloodless aos favoritos" }));
    expect(screen.getByRole("button", { name: "Tirar Bloodless dos favoritos" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Bloodless entrou nos favoritos.");
    expect(JSON.parse(localStorage.getItem("iaraFavoritos"))).toEqual(["bloodless"]);

    await usuario.click(screen.getByRole("button", { name: /Favoritos \(1\)/ }));
    expect(nomesNaTela()).toEqual(["Bloodless"]);

    await usuario.click(screen.getByRole("button", { name: "Tirar Bloodless dos favoritos" }));
    expect(screen.getByRole("heading", { name: "Você ainda não favoritou nenhum jogo" })).toBeInTheDocument();
  });

  it("os favoritos salvos reaparecem na próxima visita", () => {
    localStorage.setItem("iaraFavoritos", JSON.stringify(["fobia", "dandara"]));
    renderizarApp("/?categoria=Favoritos");
    expect(nomesNaTela()).toEqual(["Fobia", "Dandara"]);
  });

  it("adicionar ao carrinho abre o carrinho lateral, soma no contador e salva no navegador", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    const gaveta = screen.getByRole("dialog", { hidden: true });
    expect(gaveta).not.toHaveClass("show");

    await usuario.click(botaoAdicionar("Fobia"));
    expect(gaveta).toHaveClass("show");
    expect(within(gaveta).getByText("Fobia")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir carrinho de compras, 1 item" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("iaraCarrinhoItens"))).toEqual([expect.objectContaining({ id: "fobia", quantidade: 1 })]);

    await usuario.click(within(gaveta).getByRole("button", { name: "Aumentar a quantidade de Fobia" }));
    expect(screen.getByRole("button", { name: "Abrir carrinho de compras, 2 itens" })).toBeInTheDocument();
  });

  it("o carrinho lateral fecha com Esc, com o X e clicando fora", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    const gaveta = screen.getByRole("dialog", { hidden: true });

    await usuario.click(botaoAdicionar("Fobia"));
    await usuario.keyboard("{Escape}");
    expect(gaveta).not.toHaveClass("show");

    await usuario.click(botaoAdicionar("Fobia"));
    await usuario.click(within(gaveta).getByRole("button", { name: "Fechar carrinho" }));
    expect(gaveta).not.toHaveClass("show");

    await usuario.click(botaoAdicionar("Fobia"));
    await usuario.click(document.querySelector(".offcanvas-backdrop"));
    expect(gaveta).not.toHaveClass("show");
    expect(document.body.style.overflow).toBe("");
  });

  it("clicar no card abre o jogo; os botões dentro dele têm a própria ação e não abrem", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");

    await usuario.click(botaoAdicionar("Fobia"));
    expect(screen.queryByRole("heading", { level: 1, name: "Fobia" })).not.toBeInTheDocument();

    await usuario.click(screen.getByAltText("Capa do jogo Bloodless"));
    expect(await screen.findByRole("heading", { level: 1, name: "Bloodless" })).toBeInTheDocument();
  });

  it("o link 'Ver detalhes' também abre o jogo", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/");
    await usuario.click(screen.getAllByRole("link", { name: /Ver detalhes/ })[1]);
    expect(await screen.findByRole("heading", { level: 1, name: "Bloodless" })).toBeInTheDocument();
  });
});
