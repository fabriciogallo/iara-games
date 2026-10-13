import { CHAVES, lerJson, lerTexto } from "./armazenamento";
import { arredondar } from "./moeda";

export const TAXA_SERVICO = 4.99;

// código do cupom → desconto sobre o subtotal
export const CUPONS = { FIAP10: 0.1 };

export const estadoVazio = { itens: [], cupom: null };

function itemValido(item) {
  return (
    item &&
    typeof item.id === "string" &&
    typeof item.nome === "string" &&
    Number.isFinite(Number(item.preco)) &&
    Number.isInteger(item.quantidade) &&
    item.quantidade > 0
  );
}

// Lê o que ficou salvo (pela loja estática ou por uma visita anterior); dado estragado vira carrinho vazio
export function lerEstadoSalvo() {
  const itens = lerJson(CHAVES.carrinho, []);
  const cupom = lerTexto(CHAVES.cupom);
  return {
    itens: Array.isArray(itens) ? itens.filter(itemValido) : [],
    cupom: cupom && Object.hasOwn(CUPONS, cupom) ? cupom : null,
  };
}

export function carrinhoReducer(estado, acao) {
  switch (acao.tipo) {
    case "adicionar": {
      const { jogo } = acao;
      const jaTem = estado.itens.some((item) => item.id === jogo.id);
      const itens = jaTem
        ? estado.itens.map((item) => (item.id === jogo.id ? { ...item, quantidade: item.quantidade + 1 } : item))
        : [...estado.itens, { id: jogo.id, nome: jogo.nome, preco: Number(jogo.preco), imagem: jogo.imagem, quantidade: 1 }];
      return { ...estado, itens };
    }
    case "remover":
      return { ...estado, itens: estado.itens.filter((item) => item.id !== acao.id) };
    case "quantidade": {
      // chegou a zero: o item sai do carrinho
      const itens = estado.itens
        .map((item) => (item.id === acao.id ? { ...item, quantidade: item.quantidade + acao.mudanca } : item))
        .filter((item) => item.quantidade > 0);
      return { ...estado, itens };
    }
    case "cupom":
      return { ...estado, cupom: acao.cupom };
    case "limpar":
      return estadoVazio;
    case "substituir":
      return acao.estado;
    default:
      return estado;
  }
}

export function calcularResumo(itens, cupom) {
  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const subtotal = arredondar(itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0));
  const percentual = Object.hasOwn(CUPONS, cupom) ? CUPONS[cupom] : 0;
  const desconto = arredondar(subtotal * percentual);
  const total = arredondar(subtotal + TAXA_SERVICO - desconto);
  return { totalItens, subtotal, taxa: TAXA_SERVICO, percentual, desconto, total };
}

// Resultado da digitação do cupom: "vazio" e "invalido" não mudam nada além da mensagem
export function validarCupom(texto) {
  const codigo = String(texto ?? "").trim().toUpperCase();
  if (codigo === "") return { status: "vazio", mensagem: "Por favor, digite um código de cupom." };
  if (Object.hasOwn(CUPONS, codigo)) {
    return { status: "ok", codigo, mensagem: `Cupom ${codigo} aplicado com sucesso! Desconto de ${CUPONS[codigo] * 100}%.` };
  }
  return { status: "invalido", mensagem: "Cupom inválido. Tente 'FIAP10' para 10% de desconto." };
}
