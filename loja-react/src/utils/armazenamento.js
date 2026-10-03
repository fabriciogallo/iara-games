// localStorage sem quebrar a página quando ele está bloqueado ou com dado estragado.
// As chaves são as mesmas da loja estática, então carrinho, cupom e jogos adicionados valem nas duas.
export const CHAVES = {
  carrinho: "iaraCarrinhoItens",
  cupom: "iaraCupom",
  jogosCustomizados: "iaraJogosCustomizados",
  favoritos: "iaraFavoritos",
};

export function lerJson(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : padrao;
  } catch {
    return padrao;
  }
}

export function gravarJson(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // bloqueado ou sem espaço: a loja continua funcionando, só não lembra na próxima visita
  }
}

export function lerTexto(chave) {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

export function gravarTexto(chave, valor) {
  try {
    if (valor === null || valor === undefined) localStorage.removeItem(chave);
    else localStorage.setItem(chave, valor);
  } catch {
    // idem gravarJson
  }
}
