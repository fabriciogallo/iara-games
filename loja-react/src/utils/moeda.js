export function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Na vitrine, jogo de R$ 0 aparece como "Gratuito"
export function formatarPreco(preco) {
  return Number(preco) === 0 ? "Gratuito" : formatarMoeda(preco);
}

// Dinheiro em centavos inteiros, pra 10% de R$ 46,99 não virar 4,699000000000001
export function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}
