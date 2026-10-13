import { describe, expect, it } from "vitest";
import { TAXA_SERVICO, calcularResumo, carrinhoReducer, estadoVazio, lerEstadoSalvo, validarCupom } from "./carrinho";

const dandara = { id: "dandara", nome: "Dandara", preco: 46.99, imagem: "assets/images/image-dandara.jpg" };
const fobia = { id: "fobia", nome: "Fobia", preco: "89", imagem: "assets/images/image-fobia.jpg" };
const aplicar = (estado, ...acoes) => acoes.reduce(carrinhoReducer, estado);

describe("carrinhoReducer", () => {
  it("adiciona um jogo novo com quantidade 1 e o preço como número", () => {
    const estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: fobia });
    expect(estado.itens).toEqual([{ id: "fobia", nome: "Fobia", preco: 89, imagem: fobia.imagem, quantidade: 1 }]);
  });

  it("adicionar o mesmo jogo de novo soma na quantidade, sem repetir a linha", () => {
    const estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara }, { tipo: "adicionar", jogo: fobia }, { tipo: "adicionar", jogo: dandara });
    expect(estado.itens).toHaveLength(2);
    expect(estado.itens.find((item) => item.id === "dandara").quantidade).toBe(2);
  });

  it("não altera o estado anterior (reducer puro)", () => {
    const antes = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara });
    const copia = JSON.stringify(antes);
    carrinhoReducer(antes, { tipo: "adicionar", jogo: dandara });
    carrinhoReducer(antes, { tipo: "quantidade", id: "dandara", mudanca: 5 });
    expect(JSON.stringify(antes)).toBe(copia);
  });

  it("muda a quantidade e remove o item quando chega a zero", () => {
    let estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara });
    estado = aplicar(estado, { tipo: "quantidade", id: "dandara", mudanca: 2 });
    expect(estado.itens[0].quantidade).toBe(3);
    estado = aplicar(estado, { tipo: "quantidade", id: "dandara", mudanca: -3 });
    expect(estado.itens).toEqual([]);
  });

  it("mudar a quantidade de um id que não está no carrinho não faz nada", () => {
    const estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara });
    expect(aplicar(estado, { tipo: "quantidade", id: "outro", mudanca: 1 }).itens).toEqual(estado.itens);
  });

  it("remove só o item pedido", () => {
    const estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara }, { tipo: "adicionar", jogo: fobia }, { tipo: "remover", id: "dandara" });
    expect(estado.itens.map((item) => item.id)).toEqual(["fobia"]);
  });

  it("guarda o cupom, limpar zera tudo (cupom também) e substituir troca o estado inteiro", () => {
    let estado = aplicar(estadoVazio, { tipo: "adicionar", jogo: dandara }, { tipo: "cupom", cupom: "FIAP10" });
    expect(estado.cupom).toBe("FIAP10");
    expect(aplicar(estado, { tipo: "limpar" })).toEqual(estadoVazio);
    expect(aplicar(estado, { tipo: "substituir", estado: { itens: [], cupom: null } })).toEqual(estadoVazio);
  });

  it("ação desconhecida devolve o mesmo estado", () => {
    expect(carrinhoReducer(estadoVazio, { tipo: "xyz" })).toBe(estadoVazio);
  });
});

describe("calcularResumo", () => {
  it("carrinho vazio: zero itens, só a taxa de serviço", () => {
    expect(calcularResumo([], null)).toEqual({ totalItens: 0, subtotal: 0, taxa: TAXA_SERVICO, percentual: 0, desconto: 0, total: TAXA_SERVICO });
  });

  it("soma quantidade e valor de cada item", () => {
    const itens = [
      { ...dandara, quantidade: 2 },
      { id: "fobia", nome: "Fobia", preco: 89, imagem: "", quantidade: 1 },
    ];
    const resumo = calcularResumo(itens, null);
    expect(resumo.totalItens).toBe(3);
    expect(resumo.subtotal).toBe(182.98);
    expect(resumo.total).toBe(187.97);
  });

  it("FIAP10 dá 10% sobre o subtotal (não sobre a taxa), arredondado em centavos", () => {
    const resumo = calcularResumo([{ ...dandara, quantidade: 1 }], "FIAP10");
    expect(resumo.percentual).toBe(0.1);
    expect(resumo.desconto).toBe(4.7);
    expect(resumo.total).toBe(47.28);
  });

  it("cupom desconhecido (ou nome de propriedade do JavaScript) não dá desconto", () => {
    for (const cupom of ["NAOEXISTE", "constructor", "__proto__", "toString", undefined]) {
      expect(calcularResumo([{ ...dandara, quantidade: 1 }], cupom).desconto).toBe(0);
    }
  });
});

describe("validarCupom", () => {
  it("campo vazio ou só espaços", () => {
    expect(validarCupom("").status).toBe("vazio");
    expect(validarCupom("   ").status).toBe("vazio");
    expect(validarCupom(undefined).status).toBe("vazio");
  });

  it("aceita o código sem importar maiúscula ou espaços nas pontas", () => {
    expect(validarCupom(" fiap10 ")).toMatchObject({ status: "ok", codigo: "FIAP10" });
    expect(validarCupom("FIAP10").mensagem).toContain("10%");
  });

  it("código errado é inválido, inclusive os que parecem propriedades do JavaScript", () => {
    for (const codigo of ["xpto", "FIAP11", "constructor", "__proto__", "hasOwnProperty"]) {
      expect(validarCupom(codigo).status).toBe("invalido");
    }
  });
});

describe("lerEstadoSalvo", () => {
  it("sem nada salvo é carrinho vazio", () => {
    expect(lerEstadoSalvo()).toEqual(estadoVazio);
  });

  it("lê o formato da loja estática", () => {
    localStorage.setItem("iaraCarrinhoItens", JSON.stringify([{ id: "dandara", nome: "Dandara", preco: 46.99, imagem: "x.jpg", quantidade: 2 }]));
    localStorage.setItem("iaraCupom", "FIAP10");
    const estado = lerEstadoSalvo();
    expect(estado.itens).toHaveLength(1);
    expect(estado.cupom).toBe("FIAP10");
  });

  it("dado estragado vira carrinho vazio, item inválido é descartado e cupom desconhecido some", () => {
    localStorage.setItem("iaraCarrinhoItens", "{não é json");
    expect(lerEstadoSalvo().itens).toEqual([]);

    localStorage.setItem(
      "iaraCarrinhoItens",
      JSON.stringify([
        { id: "ok", nome: "Ok", preco: 10, quantidade: 1 },
        { id: "sem-quantidade", nome: "X", preco: 10 },
        { id: "quantidade-negativa", nome: "X", preco: 10, quantidade: -1 },
        { id: "quantidade-quebrada", nome: "X", preco: 10, quantidade: 1.5 },
        { id: "preco-ruim", nome: "X", preco: "abc", quantidade: 1 },
        null,
      ]),
    );
    localStorage.setItem("iaraCupom", "HACKER99");
    const estado = lerEstadoSalvo();
    expect(estado.itens.map((item) => item.id)).toEqual(["ok"]);
    expect(estado.cupom).toBeNull();
  });
});
