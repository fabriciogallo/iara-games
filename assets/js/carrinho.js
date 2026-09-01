/*
  CARRINHO.JS
  -----------
  Este arquivo é incluído em TODAS as páginas do site (Home, Todos os
  Jogos, páginas de cada jogo, Suporte). Ele cuida de tudo relacionado
  ao carrinho de compras:

  1) Guardar os itens do carrinho no localStorage do navegador
     (assim o carrinho continua existindo quando o usuário muda de página)
  2) Desenhar (renderizar) os itens dentro do painel do carrinho
  3) Reagir a cliques: adicionar item, remover item, mudar quantidade

  Como o mesmo arquivo roda em páginas que estão em pastas diferentes
  (ex: /index.html e /pages/pages-game/page-interna-dandara.html), ele
  não depende de nenhum caminho de pasta — só de localStorage, que é
  do navegador, não do arquivo.
*/

const CHAVE_CARRINHO = "iaraCarrinhoItens";

function obterCarrinho() {
  const dadosSalvos = localStorage.getItem(CHAVE_CARRINHO);
  if (!dadosSalvos) {
    return [];
  }
  return JSON.parse(dadosSalvos);
}

function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

function adicionarAoCarrinho(jogo) {
  const itens = obterCarrinho();
  const itemExistente = itens.find((item) => item.id === jogo.id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    itens.push({ ...jogo, quantidade: 1 });
  }

  salvarCarrinho(itens);
  atualizarInterfaceCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(id) {
  const itens = obterCarrinho().filter((item) => item.id !== id);
  salvarCarrinho(itens);
  atualizarInterfaceCarrinho();
}

function alterarQuantidade(id, delta) {
  const itens = obterCarrinho();
  const item = itens.find((item) => item.id === id);
  if (!item) return;

  item.quantidade += delta;

  if (item.quantidade <= 0) {
    salvarCarrinho(itens.filter((i) => i.id !== id));
  } else {
    salvarCarrinho(itens);
  }

  atualizarInterfaceCarrinho();
}

function calcularSubtotal(itens) {
  return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarInterfaceCarrinho() {
  const itens = obterCarrinho();
  atualizarContador(itens);
  atualizarListaDeItens(itens);
  atualizarTotal(itens);
}

function atualizarContador(itens) {
  const contador = document.getElementById("carrinho-contador");
  if (!contador) return;

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  contador.textContent = totalItens;
  contador.style.display = totalItens > 0 ? "inline-flex" : "none";
}

function atualizarListaDeItens(itens) {
  const lista = document.getElementById("carrinho-lista");
  const vazio = document.getElementById("carrinho-vazio");
  if (!lista) return;

  if (itens.length === 0) {
    lista.innerHTML = "";
    if (vazio) vazio.style.display = "block";
    return;
  }

  if (vazio) vazio.style.display = "none";

  lista.innerHTML = itens
    .map(
      (item) => `
      <div class="carrinho-item" data-id="${item.id}">
        <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img" />
        <div class="carrinho-item-info">
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">${formatarPreco(item.preco)}</p>
          <div class="carrinho-item-qtd">
            <button type="button" class="btn-qtd" data-acao="diminuir" data-id="${item.id}">-</button>
            <span>${item.quantidade}</span>
            <button type="button" class="btn-qtd" data-acao="aumentar" data-id="${item.id}">+</button>
          </div>
        </div>
        <button type="button" class="carrinho-item-remover" data-acao="remover" data-id="${item.id}" aria-label="Remover ${item.nome}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `
    )
    .join("");
}

function atualizarTotal(itens) {
  const elementoSubtotal = document.getElementById("carrinho-subtotal");
  if (!elementoSubtotal) return;

  const subtotal = calcularSubtotal(itens);
  elementoSubtotal.textContent = formatarPreco(subtotal);
}

function abrirCarrinho() {
  const painel = document.getElementById("offcanvasCarrinho");
  if (!painel) return;

  const instancia = bootstrap.Offcanvas.getOrCreateInstance(painel);
  instancia.show();
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarInterfaceCarrinho();

  document.querySelectorAll(".btn-buy[data-nome]").forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho({
        id: botao.dataset.id,
        nome: botao.dataset.nome,
        preco: parseFloat(botao.dataset.preco),
        imagem: botao.dataset.imagem,
      });
    });
  });

  document.querySelectorAll(".btn-add-carrinho[data-nome]").forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho({
        id: botao.dataset.id,
        nome: botao.dataset.nome,
        preco: parseFloat(botao.dataset.preco),
        imagem: botao.dataset.imagem,
      });
    });
  });

  const lista = document.getElementById("carrinho-lista");
  if (lista) {
    lista.addEventListener("click", (evento) => {
      const botao = evento.target.closest("button[data-acao]");
      if (!botao) return;

      const id = botao.dataset.id;
      const acao = botao.dataset.acao;

      if (acao === "aumentar") alterarQuantidade(id, 1);
      if (acao === "diminuir") alterarQuantidade(id, -1);
      if (acao === "remover") removerDoCarrinho(id);
    });
  }

  // Se a página tiver a lista da página completa do carrinho, inicializa
  // essa parte também (ver seção 4 mais abaixo).
  if (document.getElementById("carrinho-pagina-lista")) {
    inicializarPaginaCarrinho();
  }
});

/* ============================================================
   4) PÁGINA COMPLETA DO CARRINHO (pages/carrinho.html)
   ------------------------------------------------------------
   Tudo abaixo só roda na página dedicada do carrinho, que mostra
   os itens em formato grande, um resumo de valores, o campo de
   cupom de desconto e o total final — parecido com o carrinho de
   uma loja de verdade (estilo Steam/Epic Games).
   ============================================================ */

// Taxa fixa de serviço somada ao subtotal (valor de exemplo).
const TAXA_SERVICO = 4.99;

// Chave usada para guardar o cupom aplicado no localStorage.
const CHAVE_CUPOM = "iaraCupomAplicado";

// Cupons de desconto válidos: código -> percentual (0.1 = 10%)
const CUPONS_VALIDOS = {
  IARA10: 0.1,
  BEMVINDO20: 0.2,
  GAMER15: 0.15,
};

// Lê o cupom salvo (ou null se nenhum foi aplicado ainda).
function obterCupomAplicado() {
  const dados = localStorage.getItem(CHAVE_CUPOM);
  return dados ? JSON.parse(dados) : null;
}

// Salva o cupom aplicado (código + percentual de desconto).
function salvarCupomAplicado(codigo, percentual) {
  localStorage.setItem(
    CHAVE_CUPOM,
    JSON.stringify({ codigo, percentual })
  );
}

// Remove qualquer cupom aplicado (usado quando o carrinho muda).
function limparCupomAplicado() {
  localStorage.removeItem(CHAVE_CUPOM);
}

// Monta o HTML de um item do carrinho no formato grande da página.
function criarLinhaItemPagina(item) {
  const totalItem = item.preco * item.quantidade;
  return `
    <div class="carrinho-pg-item" data-id="${item.id}">
      <img src="${item.imagem}" alt="${item.nome}" class="carrinho-pg-item-img" />
      <div class="carrinho-pg-item-info">
        <div class="carrinho-pg-item-topo">
          <div>
            <p class="carrinho-pg-item-nome">${item.nome}</p>
            <p class="carrinho-pg-item-plataforma">PC-Digital</p>
          </div>
          <div class="carrinho-pg-item-preco-col">
            <p class="carrinho-pg-item-preco">${formatarPreco(totalItem)}</p>
            <p class="carrinho-pg-item-qtd-label">${item.quantidade} ${
    item.quantidade === 1 ? "Item" : "Itens"
  }</p>
          </div>
        </div>
        <div class="carrinho-pg-item-rodape">
          <div class="carrinho-pg-item-qtd">
            <button type="button" class="btn-qtd" data-acao="diminuir" data-id="${item.id}">-</button>
            <span>${item.quantidade}</span>
            <button type="button" class="btn-qtd" data-acao="aumentar" data-id="${item.id}">+</button>
          </div>
          <button type="button" class="carrinho-pg-remover" data-acao="remover" data-id="${item.id}">
            Remover <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Recalcula e redesenha tudo na página do carrinho: lista de itens,
// resumo (subtotal + taxas), desconto do cupom e total final.
function renderizarPaginaCarrinho() {
  const itens = obterCarrinho();
  const lista = document.getElementById("carrinho-pagina-lista");
  const vazio = document.getElementById("carrinho-pagina-vazio");
  const resumoBox = document.getElementById("carrinho-pagina-resumo-box");

  if (itens.length === 0) {
    lista.innerHTML = "";
    if (vazio) vazio.style.display = "block";
    if (resumoBox) resumoBox.style.display = "none";
    return;
  }

  if (vazio) vazio.style.display = "none";
  if (resumoBox) resumoBox.style.display = "flex";

  lista.innerHTML = itens.map(criarLinhaItemPagina).join("");

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const subtotal = calcularSubtotal(itens);
  const cupom = obterCupomAplicado();
  const percentualDesconto = cupom ? cupom.percentual : 0;
  const valorDesconto = subtotal * percentualDesconto;
  const total = subtotal + TAXA_SERVICO - valorDesconto;

  document.getElementById("resumo-qtd-itens").textContent = totalItens;
  document.getElementById("resumo-subtotal").textContent = formatarPreco(subtotal);
  document.getElementById("resumo-taxas").textContent = formatarPreco(TAXA_SERVICO);
  document.getElementById("resumo-desconto").textContent = formatarPreco(valorDesconto);
  document.getElementById("resumo-total").textContent = formatarPreco(total);

  const cupomInput = document.getElementById("cupom-input");
  const cupomMsg = document.getElementById("cupom-msg");
  if (cupom && cupomInput && !cupomInput.value) {
    cupomInput.value = cupom.codigo;
  }
  if (cupom && cupomMsg) {
    cupomMsg.textContent = `Cupom "${cupom.codigo}" aplicado: -${Math.round(
      cupom.percentual * 100
    )}%`;
    cupomMsg.classList.add("cupom-msg-sucesso");
  }
}

// Valida o código digitado e aplica (ou não) o desconto.
function tentarAplicarCupom() {
  const input = document.getElementById("cupom-input");
  const msg = document.getElementById("cupom-msg");
  if (!input) return;

  const codigo = input.value.trim().toUpperCase();
  msg.classList.remove("cupom-msg-sucesso", "cupom-msg-erro");

  if (!codigo) {
    msg.textContent = "Digite um código de cupom.";
    msg.classList.add("cupom-msg-erro");
    return;
  }

  const percentual = CUPONS_VALIDOS[codigo];
  if (!percentual) {
    msg.textContent = "Cupom inválido ou expirado.";
    msg.classList.add("cupom-msg-erro");
    limparCupomAplicado();
    renderizarPaginaCarrinho();
    return;
  }

  salvarCupomAplicado(codigo, percentual);
  renderizarPaginaCarrinho();
}

// Liga todos os eventos da página completa do carrinho.
function inicializarPaginaCarrinho() {
  renderizarPaginaCarrinho();

  const lista = document.getElementById("carrinho-pagina-lista");
  lista.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;

    if (acao === "aumentar") alterarQuantidade(id, 1);
    if (acao === "diminuir") alterarQuantidade(id, -1);
    if (acao === "remover") removerDoCarrinho(id);

    // Qualquer mudança na página completa também atualiza a lista
    // e os totais (incluindo o desconto do cupom já aplicado).
    renderizarPaginaCarrinho();
  });

  const botaoCupom = document.getElementById("cupom-aplicar");
  if (botaoCupom) {
    botaoCupom.addEventListener("click", tentarAplicarCupom);
  }

  const botaoContinuar = document.getElementById("carrinho-continuar");
  if (botaoContinuar) {
    botaoContinuar.addEventListener("click", () => {
      const itens = obterCarrinho();
      if (itens.length === 0) return;
      alert(
        "Esta é uma versão de demonstração do projeto de faculdade — a finalização de compra ainda não está implementada."
      );
    });
  }
}
