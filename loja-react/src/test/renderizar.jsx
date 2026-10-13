import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Rotas } from "../App";

// Renderiza o app inteiro (navbar, páginas, carrinho lateral) numa rota, com um roteador de memória
export function renderizarApp(rota = "/") {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <Rotas />
    </MemoryRouter>,
  );
}

// Guarda um carrinho no navegador de mentira antes de renderizar (o app lê isso ao abrir)
export function guardarCarrinho(itens, cupom = null) {
  localStorage.setItem("iaraCarrinhoItens", JSON.stringify(itens));
  if (cupom) localStorage.setItem("iaraCupom", cupom);
}

export const DANDARA = { id: "dandara", nome: "Dandara", preco: 46.99, imagem: "assets/images/image-dandara.jpg", quantidade: 1 };
export const ASLEEP = { id: "asleep", nome: "Asleep: Ato 2", preco: 19.99, imagem: "assets/images/image-asleep.png", quantidade: 2 };
