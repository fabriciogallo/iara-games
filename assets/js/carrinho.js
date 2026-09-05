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
      <div class="carrinho-item d-flex align-items-center gap-3 p-2 mb-2 rounded bg-dark border border-secondary" data-id="${item.id}">
        <img src="${caminhoImg}" alt="${item.nome}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
        <div class="flex-grow-1">
          <p class="m-0 fw-semibold text-white small">${item.nome}</p>
          <p class="m-0 text-warning small fw-bold">${formatarMoeda(totalDoItem)}</p>
          <div class="d-flex align-items-center gap-2 mt-1">
            <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 text-white" onclick="mudarQuantidade('${item.id}', -1)">-</button>
            <span class="small text-white fw-bold">${item.quantidade}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 text-white" onclick="mudarQuantidade('${item.id}', 1)">+</button>
          </div>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removerDoCarrinho('${item.id}')" title="Remover item">
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

function atualizarPaginaCarrinhoCompleta(lista) {
  const containerPaginaLista = document.getElementById("carrinho-pagina-lista");
  const containerPaginaVazio = document.getElementById("carrinho-pagina-vazio");
  const containerResumo = document.getElementById("carrinho-pagina-resumo-box");

  if (!containerPaginaLista) return;

  if (lista.length === 0) {
    containerPaginaLista.innerHTML = "";
    if (containerPaginaVazio) containerPaginaVazio.style.display = "block";
    if (containerResumo) containerResumo.style.display = "none";
    return;
  }

  if (containerPaginaVazio) containerPaginaVazio.style.display = "none";
  if (containerResumo) containerResumo.style.display = "flex";

  let html = "";
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    const totalItem = item.preco * item.quantidade;
    const caminhoImg = obterCaminhoImagem(item.imagem);

    html += `
      <div class="carrinho-pg-item p-3 mb-3 rounded bg-dark border border-secondary d-flex flex-column flex-sm-row align-items-sm-center gap-3">
        <img src="${caminhoImg}" alt="${item.nome}" class="rounded" style="width: 100px; height: 75px; object-fit: cover;" />
        <div class="flex-grow-1">
          <h5 class="text-white mb-1">${item.nome}</h5>
          <p class="text-secondary small mb-2">Edição Digital PC</p>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary text-white" onclick="mudarQuantidade('${item.id}', -1)">-</button>
            <span class="text-white px-2 fw-bold">${item.quantidade}</span>
            <button type="button" class="btn btn-sm btn-outline-secondary text-white" onclick="mudarQuantidade('${item.id}', 1)">+</button>
            <button type="button" class="btn btn-sm btn-link text-danger ms-3 text-decoration-none" onclick="removerDoCarrinho('${item.id}')">
              <i class="bi bi-trash me-1"></i>Remover
            </button>
          </div>
        </div>
        <div class="text-sm-end">
          <span class="h5 text-warning fw-bold d-block mb-0">${formatarMoeda(totalItem)}</span>
          <small class="text-secondary">(${item.quantidade} un)</small>
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
    elMsgCupom.className = "text-success small mt-2 fw-semibold";
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
    msgCupom.className = "text-danger small mt-2";
    msgCupom.textContent = "Por favor, digite um código de cupom.";
    return;
  }

  if (codigo === "FIAP10") {
    localStorage.setItem(CHAVE_CUPOM, "FIAP10");
    msgCupom.className = "text-success small mt-2 fw-bold";
    msgCupom.textContent = "Cupom FIAP10 aplicado com sucesso! Desconto de 10%.";
    atualizarTodaInterface();
  } else {
    localStorage.removeItem(CHAVE_CUPOM);
    msgCupom.className = "text-danger small mt-2";
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
  const botoes = document.querySelectorAll(".btn-add-carrinho");

  botoes.forEach(function(botao) {
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
