const CHAVE_STORAGE = "iaraCarrinhoItens";
const CHAVE_CUPOM = "iaraCupom";

// Páginas dentro de "pages/" usam data-raiz="../" para resolver caminhos relativos
function obterCaminhoImagem(caminhoOriginal) {
  const prefixoRaiz = document.body.dataset.raiz || "";
  if (caminhoOriginal.startsWith("http") || caminhoOriginal.startsWith("../")) {
    return caminhoOriginal;
  }
  return prefixoRaiz + caminhoOriginal;
}

function obterCarrinho() {
  const textoSalvo = localStorage.getItem(CHAVE_STORAGE);
  if (!textoSalvo) {
    return [];
  }
  return JSON.parse(textoSalvo);
}

function salvarCarrinho(listaDeItens) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(listaDeItens));
}

function adicionarAoCarrinho(novoJogo) {
  const lista = obterCarrinho();
  let itemExistente = null;

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === novoJogo.id) {
      itemExistente = lista[i];
      break;
    }
  }

  if (itemExistente !== null) {
    itemExistente.quantidade = itemExistente.quantidade + 1;
  } else {
    lista.push({
      id: novoJogo.id,
      nome: novoJogo.nome,
      preco: Number(novoJogo.preco),
      imagem: novoJogo.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho(lista);
  atualizarTodaInterface();
  abrirPainelCarrinho();
}

function removerDoCarrinho(idDoJogo) {
  const lista = obterCarrinho();
  const listaAtualizada = lista.filter(function(item) {
    return item.id !== idDoJogo;
  });

  salvarCarrinho(listaAtualizada);
  atualizarTodaInterface();
}

function mudarQuantidade(idDoJogo, valorMudanca) {
  const lista = obterCarrinho();

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === idDoJogo) {
      lista[i].quantidade = lista[i].quantidade + valorMudanca;

      if (lista[i].quantidade <= 0) {
        removerDoCarrinho(idDoJogo);
        return;
      }
      break;
    }
  }

  salvarCarrinho(lista);
  atualizarTodaInterface();
}

function calcularSubtotal(lista) {
  let subtotal = 0;
  for (let i = 0; i < lista.length; i++) {
    subtotal = subtotal + (lista[i].preco * lista[i].quantidade);
  }
  return subtotal;
}

function calcularTotalItens(lista) {
  let totalDeItens = 0;
  for (let i = 0; i < lista.length; i++) {
    totalDeItens = totalDeItens + lista[i].quantidade;
  }
  return totalDeItens;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function atualizarBadgeContador(lista) {
  const elementoContador = document.getElementById("carrinho-contador");
  if (!elementoContador) return;

  const total = calcularTotalItens(lista);
  elementoContador.textContent = total;

  if (total > 0) {
    elementoContador.style.display = "inline-flex";
  } else {
    elementoContador.style.display = "none";
  }
}

function atualizarOffcanvas(lista) {
  const containerLista = document.getElementById("carrinho-lista");
  const mensagemVazio = document.getElementById("carrinho-vazio");
  const elementoSubtotal = document.getElementById("carrinho-subtotal");

  if (!containerLista) return;

  if (lista.length === 0) {
    containerLista.innerHTML = "";
    if (mensagemVazio) mensagemVazio.style.display = "block";
    if (elementoSubtotal) elementoSubtotal.textContent = formatarMoeda(0);
    return;
  }

  if (mensagemVazio) mensagemVazio.style.display = "none";

  let htmlItens = "";

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    const totalDoItem = item.preco * item.quantidade;
    const caminhoImg = obterCaminhoImagem(item.imagem);

    htmlItens += `
      <div class="carrinho-item" data-id="${item.id}">
        <img src="${caminhoImg}" alt="${item.nome}" class="carrinho-item-img" />
        <div>
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">${formatarMoeda(totalDoItem)}</p>
          <div class="carrinho-item-qtd">
            <button type="button" class="btn-qtd" onclick="mudarQuantidade('${item.id}', -1)">-</button>
            <span>${item.quantidade}</span>
            <button type="button" class="btn-qtd" onclick="mudarQuantidade('${item.id}', 1)">+</button>
          </div>
        </div>
        <button type="button" class="carrinho-item-remover" onclick="removerDoCarrinho('${item.id}')" title="Remover item">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  }

  containerLista.innerHTML = htmlItens;

  if (elementoSubtotal) {
    elementoSubtotal.textContent = formatarMoeda(calcularSubtotal(lista));
  }
}

function renderizarRecomendacoesCarrinho(lista) {
  const container = document.getElementById("carrinho-recomendados-grid");
  if (!container) return;
  if (typeof obterTodosJogos !== "function") return;

  const titulo = document.getElementById("carrinho-recomendados-titulo");
  if (titulo) {
    titulo.textContent =
      lista.length === 0
        ? "Jogos para você explorar"
        : "Recomendado com base na sua compra";
  }

  const idsNoCarrinho = lista.map(function (item) {
    return item.id;
  });

  const candidatos = obterTodosJogos().filter(function (jogo) {
    return idsNoCarrinho.indexOf(jogo.id) === -1;
  });

  const embaralhados = candidatos.slice().sort(function () {
    return Math.random() - 0.5;
  });

  const recomendados = embaralhados.slice(0, 3);

  container.innerHTML = recomendados.map(montarCardJogoHtml).join("");

  if (typeof configurarBotoesCompra === "function") {
    configurarBotoesCompra();
  }
}

function atualizarPaginaCarrinhoCompleta(lista) {
  const containerPaginaLista = document.getElementById("carrinho-pagina-lista");
  const containerPaginaVazio = document.getElementById("carrinho-pagina-vazio");
  const containerResumo = document.getElementById("carrinho-pagina-resumo-box");

  if (!containerPaginaLista) return;

  renderizarRecomendacoesCarrinho(lista);

  if (lista.length === 0) {
    containerPaginaLista.innerHTML = "";
    containerPaginaLista.style.display = "none";
    if (containerPaginaVazio) containerPaginaVazio.style.display = "flex";
    if (containerResumo) containerResumo.style.display = "none";
    return;
  }

  containerPaginaLista.style.display = "";
  if (containerPaginaVazio) containerPaginaVazio.style.display = "none";
  if (containerResumo) containerResumo.style.display = "flex";

  let html = "";
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    const totalItem = item.preco * item.quantidade;
    const caminhoImg = obterCaminhoImagem(item.imagem);
    const textoQtd = item.quantidade === 1 ? "item" : "itens";

    html += `
      <div class="carrinho-pg-item" data-id="${item.id}">
        <img src="${caminhoImg}" alt="${item.nome}" class="carrinho-pg-item-img" />
        <div class="carrinho-pg-item-info">
          <div class="carrinho-pg-item-topo">
            <div>
              <h3 class="carrinho-pg-item-nome">${item.nome}</h3>
              <p class="carrinho-pg-item-plataforma">Edição Digital PC</p>
            </div>
            <div class="carrinho-pg-item-preco-col">
              <p class="carrinho-pg-item-preco">${formatarMoeda(totalItem)}</p>
              <p class="carrinho-pg-item-qtd-label">${item.quantidade} ${textoQtd}</p>
            </div>
          </div>
          <div class="carrinho-pg-item-rodape">
            <div class="carrinho-pg-item-qtd">
              <button type="button" class="btn-qtd" onclick="mudarQuantidade('${item.id}', -1)">-</button>
              <span>${item.quantidade}</span>
              <button type="button" class="btn-qtd" onclick="mudarQuantidade('${item.id}', 1)">+</button>
            </div>
            <button type="button" class="carrinho-pg-remover" onclick="removerDoCarrinho('${item.id}')">
              Remover <i class="bi bi-trash ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  containerPaginaLista.innerHTML = html;

  const subtotal = calcularSubtotal(lista);
  const totalItens = calcularTotalItens(lista);
  const taxaServico = 4.99;

  const cupomSalvo = localStorage.getItem(CHAVE_CUPOM);
  let percentualDesconto = 0;

  if (cupomSalvo === "FIAP10") {
    percentualDesconto = 0.10;
  }

  const valorDesconto = subtotal * percentualDesconto;
  const valorFinal = (subtotal + taxaServico) - valorDesconto;

  const elQtd = document.getElementById("resumo-qtd-itens");
  const elSub = document.getElementById("resumo-subtotal");
  const elTaxa = document.getElementById("resumo-taxas");
  const elDesc = document.getElementById("resumo-desconto");
  const elTotal = document.getElementById("resumo-total");
  const elMsgCupom = document.getElementById("cupom-msg");
  const elInputCupom = document.getElementById("cupom-input");

  if (elQtd) elQtd.textContent = totalItens;
  if (elSub) elSub.textContent = formatarMoeda(subtotal);
  if (elTaxa) elTaxa.textContent = formatarMoeda(taxaServico);
  if (elDesc) elDesc.textContent = formatarMoeda(valorDesconto);
  if (elTotal) elTotal.textContent = formatarMoeda(valorFinal);

  if (cupomSalvo && elMsgCupom) {
    if (elInputCupom && !elInputCupom.value) {
      elInputCupom.value = cupomSalvo;
    }
    elMsgCupom.className = "cupom-msg-sucesso small mt-2 fw-semibold";
    elMsgCupom.textContent = "Cupom " + cupomSalvo + " ativo (-10% de desconto)!";
  }
}

function atualizarTodaInterface() {
  const lista = obterCarrinho();
  atualizarBadgeContador(lista);
  atualizarOffcanvas(lista);
  atualizarPaginaCarrinhoCompleta(lista);
}

function aplicarCupomDesconto() {
  const inputCupom = document.getElementById("cupom-input");
  const msgCupom = document.getElementById("cupom-msg");

  if (!inputCupom || !msgCupom) return;

  const codigo = inputCupom.value.trim().toUpperCase();

  if (codigo === "") {
    msgCupom.className = "cupom-msg-erro small mt-2";
    msgCupom.textContent = "Por favor, digite um código de cupom.";
    return;
  }

  if (codigo === "FIAP10") {
    localStorage.setItem(CHAVE_CUPOM, "FIAP10");
    msgCupom.className = "cupom-msg-sucesso small mt-2 fw-bold";
    msgCupom.textContent = "Cupom FIAP10 aplicado com sucesso! Desconto de 10%.";
    atualizarTodaInterface();
  } else {
    localStorage.removeItem(CHAVE_CUPOM);
    msgCupom.className = "cupom-msg-erro small mt-2";
    msgCupom.textContent = "Cupom inválido. Tente 'FIAP10' para 10% de desconto.";
    atualizarTodaInterface();
  }
}

function abrirPainelCarrinho() {
  const painel = document.getElementById("offcanvasCarrinho");
  if (!painel) return;

  if (window.bootstrap && window.bootstrap.Offcanvas) {
    const offcanvasInstancia = bootstrap.Offcanvas.getOrCreateInstance(painel);
    offcanvasInstancia.show();
  }
}

function configurarBotoesCompra() {
  const botoes = document.querySelectorAll(".btn-add-carrinho:not([data-carrinho-vinculado])");

  botoes.forEach(function(botao) {
    botao.setAttribute("data-carrinho-vinculado", "1");

    botao.addEventListener("click", function(evento) {
      evento.preventDefault();

      const id = botao.getAttribute("data-id");
      const nome = botao.getAttribute("data-nome");
      const preco = botao.getAttribute("data-preco");
      const imagem = botao.getAttribute("data-imagem");

      adicionarAoCarrinho({ id: id, nome: nome, preco: preco, imagem: imagem });
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  atualizarTodaInterface();
  configurarBotoesCompra();

  const botaoAplicarCupom = document.getElementById("cupom-aplicar");
  if (botaoAplicarCupom) {
    botaoAplicarCupom.addEventListener("click", aplicarCupomDesconto);
  }

  const botaoContinuar = document.getElementById("carrinho-continuar");
  if (botaoContinuar) {
    botaoContinuar.addEventListener("click", function() {
      const itens = obterCarrinho();
      if (itens.length === 0) {
        alert("Seu carrinho está vazio! Adicione algum jogo antes de prosseguir.");
        return;
      }
      alert("Parabéns! Pedido de demonstração finalizado com sucesso no projeto Iara Games.");
    });
  }
});
