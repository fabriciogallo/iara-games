import { act, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ASLEEP, DANDARA, guardarCarrinho, renderizarApp } from "../test/renderizar";

const normal = (texto) => texto.replace(/\s/g, " ");
// o carrinho lateral também está no HTML (fechado): as consultas olham só a página, que é o <main>
const pagina = () => within(screen.getByRole("main"));
const linhaDoResumo = (rotulo) => normal(pagina().getByText(rotulo).parentElement.textContent);

describe("Carrinho", () => {
  it("vazio: mostra a mensagem, o caminho de volta pra loja e 3 sugestões", () => {
    renderizarApp("/carrinho");
    expect(screen.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explorar jogos/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("heading", { name: "Jogos para você explorar" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.queryByRole("heading", { name: "Resumo" })).not.toBeInTheDocument();
  });

  it("com itens: lista, subtotal, taxa e total", () => {
    guardarCarrinho([DANDARA, ASLEEP]);
    renderizarApp("/carrinho");

    expect(screen.getByRole("heading", { name: "Dandara" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Asleep: Ato 2" })).toBeInTheDocument();
    expect(linhaDoResumo("Subtotal (3 itens)")).toBe("Subtotal (3 itens)R$ 86,97");
    expect(linhaDoResumo("Taxas")).toBe("TaxasR$ 4,99");
    expect(linhaDoResumo("Desconto")).toBe("DescontoR$ 0,00");
    expect(normal(screen.getAllByText("Total")[1].parentElement.textContent)).toBe("TotalR$ 91,96");
    expect(screen.getByRole("heading", { name: "Recomendado com base na sua compra" })).toBeInTheDocument();
  });

  it("as sugestões nunca repetem o que já está no carrinho", () => {
    guardarCarrinho([DANDARA]);
    renderizarApp("/carrinho");
    const sugestoes = within(screen.getByRole("heading", { name: "Recomendado com base na sua compra" }).parentElement).getAllByRole("heading", { level: 3 });
    expect(sugestoes).toHaveLength(3);
    expect(sugestoes.map((titulo) => titulo.textContent)).not.toContain("Dandara");
  });

  it("muda a quantidade, e chegando a zero o item sai", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA]);
    renderizarApp("/carrinho");

    await usuario.click(pagina().getByRole("button", { name: "Aumentar a quantidade de Dandara" }));
    expect(screen.getByText("2 itens")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("iaraCarrinhoItens"))[0].quantidade).toBe(2);

    await usuario.click(pagina().getByRole("button", { name: "Diminuir a quantidade de Dandara" }));
    await usuario.click(pagina().getByRole("button", { name: "Diminuir a quantidade de Dandara" }));
    expect(screen.getByRole("heading", { name: "Seu carrinho está vazio" })).toBeInTheDocument();
  });

   it("remove um item pelo botão Remover", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA, ASLEEP]);
    renderizarApp("/carrinho");

    await usuario.click(pagina().getByRole("button", { name: "Remover Asleep: Ato 2 do carrinho" }));
    // olha o botão do carrinho, e não o título: o Asleep pode reaparecer como sugestão sorteada
    expect(pagina().queryByRole("button", { name: "Remover Asleep: Ato 2 do carrinho" })).not.toBeInTheDocument();
    expect(linhaDoResumo("Subtotal (1 itens)")).toBe("Subtotal (1 itens)R$ 46,99");
  });

  it("cupom FIAP10 dá 10% de desconto (aceitando minúscula e espaços) e fica salvo", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA]);
    renderizarApp("/carrinho");

    await usuario.type(screen.getByRole("textbox", { name: "Código do cupom" }), "  fiap10 ");
    await usuario.click(screen.getByRole("button", { name: "Aplicar" }));

    expect(pagina().getByRole("status")).toHaveTextContent("Cupom FIAP10 aplicado com sucesso! Desconto de 10%.");
    expect(linhaDoResumo("Desconto")).toBe("DescontoR$ 4,70");
    expect(normal(screen.getAllByText("Total")[1].parentElement.textContent)).toBe("TotalR$ 47,28");
    expect(localStorage.getItem("iaraCupom")).toBe("FIAP10");
  });

  it("Enter no campo também aplica o cupom", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA]);
    renderizarApp("/carrinho");
    await usuario.type(screen.getByRole("textbox", { name: "Código do cupom" }), "FIAP10{Enter}");
    expect(localStorage.getItem("iaraCupom")).toBe("FIAP10");
  });

  it("cupom inválido mostra o erro e tira o desconto que estava ativo; campo vazio só avisa", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA], "FIAP10");
    renderizarApp("/carrinho");
    expect(pagina().getByRole("status")).toHaveTextContent("Cupom FIAP10 ativo (-10% de desconto)!");

    const campo = screen.getByRole("textbox", { name: "Código do cupom" });
    await usuario.clear(campo);
    await usuario.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(pagina().getByRole("status")).toHaveTextContent("Por favor, digite um código de cupom.");
    expect(localStorage.getItem("iaraCupom")).toBe("FIAP10");

    await usuario.type(campo, "xpto");
    await usuario.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(pagina().getByRole("status")).toHaveTextContent("Cupom inválido.");
    expect(linhaDoResumo("Desconto")).toBe("DescontoR$ 0,00");
    expect(localStorage.getItem("iaraCupom")).toBeNull();
  });

  it("Continuar finaliza o pedido de demonstração e esvazia o carrinho", async () => {
    const usuario = userEvent.setup();
    guardarCarrinho([DANDARA, ASLEEP], "FIAP10");
    renderizarApp("/carrinho");

    await usuario.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByRole("heading", { name: "Pedido de demonstração finalizado!" })).toBeInTheDocument();
    expect(screen.getByText(/3 itens/)).toBeInTheDocument();
    expect(normal(pagina().getByRole("status").textContent)).toContain("R$ 83,26");
    expect(JSON.parse(localStorage.getItem("iaraCarrinhoItens"))).toEqual([]);
    expect(localStorage.getItem("iaraCupom")).toBeNull();
    expect(screen.getByRole("link", { name: /Continuar explorando/ })).toHaveAttribute("href", "/");
  });

  it("lê o carrinho que a loja estática salvou e acompanha mudanças feitas em outra aba", async () => {
    guardarCarrinho([DANDARA]);
    renderizarApp("/carrinho");
    expect(pagina().getByRole("button", { name: "Remover Dandara do carrinho" })).toBeInTheDocument();

    await act(async () => {
      guardarCarrinho([ASLEEP]);
      window.dispatchEvent(new StorageEvent("storage", { key: "iaraCarrinhoItens" }));
    });

    // o botão de remover só existe para itens do carrinho, então não se confunde com as sugestões
    expect(await pagina().findByRole("button", { name: "Remover Asleep: Ato 2 do carrinho" })).toBeInTheDocument();
    expect(pagina().queryByRole("button", { name: "Remover Dandara do carrinho" })).not.toBeInTheDocument();
  });
});
