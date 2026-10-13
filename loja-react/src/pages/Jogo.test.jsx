import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderizarApp } from "../test/renderizar";

describe("Página do jogo", () => {
  it("jogo com página completa: capa, descrição, galeria, avaliações, estúdio e especificações", () => {
    renderizarApp("/jogo/dandara");

    expect(screen.getByRole("heading", { level: 1, name: "Dandara" })).toBeInTheDocument();
    expect(screen.getByText("Trials of Fear Edition")).toBeInTheDocument();
    expect(screen.getByText("77.26%")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ENTRE NOS REINOS SECRETOS" })).toBeInTheDocument();
    expect(screen.getAllByAltText(/Cena \d de Dandara/)).toHaveLength(5);
    expect(screen.getAllByRole("article").filter((el) => el.classList.contains("review-card"))).toHaveLength(3);
    expect(screen.getByText("Raw Fury Games", { selector: ".dev-name" })).toBeInTheDocument();
    expect(screen.getByText("Nvidia GeForce GT 220, Radeon HD 8400")).toBeInTheDocument();
    expect(screen.getByText("Classificação etária:")).toBeInTheDocument();
    expect(document.title).toBe("Dandara — Iara Games");
  });

  it("mostra quem recomenda e quem não recomenda", () => {
    renderizarApp("/jogo/dandara");
    expect(screen.getAllByText("Recomenda")).toHaveLength(2);
    expect(screen.getAllByText("Não recomenda")).toHaveLength(1);
  });

  it("a navbar vai por cima da capa só nesta página (classe do body some ao sair)", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/jogo/dandara");
    expect(document.body).toHaveClass("pagina-interna");

    await usuario.click(screen.getAllByRole("link", { name: "Loja" })[0]);
    expect(await screen.findByRole("heading", { level: 1, name: "Loja" })).toBeInTheDocument();
    expect(document.body).not.toHaveClass("pagina-interna");
  });

  it("Comprar jogo põe no carrinho e abre o carrinho lateral", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/jogo/dandara");
    await usuario.click(screen.getByRole("button", { name: "Comprar jogo" }));
    await usuario.click(screen.getByRole("button", { name: "Comprar jogo" }));

    const gaveta = screen.getByRole("dialog");
    expect(gaveta).toHaveClass("show");
    expect(within(gaveta).getByText("2", { selector: "span" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("iaraCarrinhoItens"))).toEqual([expect.objectContaining({ id: "dandara", preco: 46.99, quantidade: 2 })]);
  });

  it("favoritar pela página do jogo", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/jogo/dandara");
    const botao = screen.getByRole("button", { name: "Adicionar aos favoritos" });
    expect(botao).toHaveAttribute("aria-pressed", "false");

    await usuario.click(botao);
    expect(screen.getByRole("button", { name: "Nos favoritos" })).toHaveAttribute("aria-pressed", "true");
    expect(JSON.parse(localStorage.getItem("iaraFavoritos"))).toEqual(["dandara"]);
  });

  it("jogo sem análises não inventa nota nem avaliações", () => {
    renderizarApp("/jogo/sky-dust");
    expect(screen.getByRole("heading", { level: 1, name: "Sky Dust" })).toBeInTheDocument();
    expect(screen.getByText("Ainda não há análises deste jogo.")).toBeInTheDocument();
    expect(screen.queryByText("Nota Global")).not.toBeInTheDocument();
    expect(screen.queryByText(/Nota:/)).not.toBeInTheDocument();
    expect(screen.queryByText("Classificação etária:")).not.toBeInTheDocument();
  });

  it("jogo do catálogo sem página própria cai no 'em desenvolvimento', mas dá pra comprar", async () => {
    const usuario = userEvent.setup();
    renderizarApp("/jogo/bloodless");
    expect(screen.getByRole("heading", { level: 1, name: "Bloodless" })).toBeInTheDocument();
    expect(screen.getByText(/Estamos preparando a página de detalhes/)).toBeInTheDocument();
    expect(document.body).not.toHaveClass("pagina-interna");

    await usuario.click(screen.getByRole("button", { name: "Adicionar ao carrinho" }));
    expect(JSON.parse(localStorage.getItem("iaraCarrinhoItens"))[0].id).toBe("bloodless");
  });

  it("jogo gratuito oferece 'Jogar agora'", () => {
    renderizarApp("/jogo/onikura");
    expect(screen.getByRole("button", { name: "Jogar agora" })).toBeInTheDocument();
    expect(screen.getByText("Gratuito", { selector: ".lead" })).toBeInTheDocument();
  });

  it("jogo cadastrado pelo formulário também abre", () => {
    localStorage.setItem("iaraJogosCustomizados", JSON.stringify([{ id: "meu-jogo-1", nome: "Meu Jogo", preco: 12, categoria: "Aventura", imagem: "https://exemplo.com/capa.jpg", estudio: "Eu" }]));
    renderizarApp("/jogo/meu-jogo-1");
    expect(screen.getByRole("heading", { level: 1, name: "Meu Jogo" })).toBeInTheDocument();
  });

  it("id que não existe mostra a página de erro com volta pra loja", () => {
    renderizarApp("/jogo/nao-existe");
    expect(screen.getByRole("heading", { name: "Ops!" })).toBeInTheDocument();
    expect(screen.getByText("Não encontramos esse jogo no catálogo.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voltar para a loja" })).toHaveAttribute("href", "/");
  });

  it("rota desconhecida também cai na página de erro", () => {
    renderizarApp("/qualquer/coisa");
    expect(screen.getByRole("heading", { name: "Ops!" })).toBeInTheDocument();
  });
});
