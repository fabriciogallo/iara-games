// ==========================================================================
// CARRINHO.JS - IARA GAMES
// ==========================================================================
// Este arquivo gerencia todas as funções do carrinho de compras da loja:
// 1. Guardar e ler produtos no localStorage (memória do navegador).
// 2. Adicionar itens, remover itens e alterar quantidades.
// 3. Calcular valores subtotais e totais.
// 4. Atualizar o contador de itens no ícone da barra de navegação.
// 5. Aplicar cupom de desconto promocional (FIAP10).
// O código foi escrito de forma simples e didática para quem está aprendendo JS.
// ==========================================================================

// Nome da chave usada para salvar os itens no localStorage do navegador
const CHAVE_STORAGE = "iaraCarrinhoItens";

// Nome da chave usada para salvar o cupom aplicado no localStorage
const CHAVE_CUPOM = "iaraCupom";

// Função para descobrir o caminho correto das imagens dependendo da página
// Páginas dentro da pasta "pages/" usam "../", enquanto a raiz usa ""
function obterCaminhoImagem(caminhoOriginal) {
  // Lê o atributo data-raiz colocado na tag <body> de cada página HTML
  const prefixoRaiz = document.body.dataset.raiz || "";
  // Se o caminho já tiver "http" ou "../", mantemos como está
  if (caminhoOriginal.startsWith("http") || caminhoOriginal.startsWith("../")) {
    return caminhoOriginal;
  }
  // Junta o prefixo da pasta atual com o caminho da imagem
  return prefixoRaiz + caminhoOriginal;
}

// --------------------------------------------------------------------------
// 1. FUNÇÕES DE ACESSO AO LOCALSTORAGE
// --------------------------------------------------------------------------

// Lê a lista de itens salva no localStorage do navegador
function obterCarrinho() {
  // Busca o texto salvo na chave do carrinho
  const textoSalvo = localStorage.getItem(CHAVE_STORAGE);
  // Se ainda não existir nada salvo, retornamos um Array vazio
  if (!textoSalvo) {
    return [];
  }
  // Converte o texto no formato JSON de volta para um Array de objetos
  return JSON.parse(textoSalvo);
}

// Salva a lista de itens atualizada dentro do localStorage
function salvarCarrinho(listaDeItens) {
  // Converte o Array de objetos em texto no formato JSON
  const textoJson = JSON.stringify(listaDeItens);
  // Grava o texto no localStorage
  localStorage.setItem(CHAVE_STORAGE, textoJson);
}

// --------------------------------------------------------------------------
// 2. FUNÇÕES PARA MANIPULAR ITENS DO CARRINHO
// --------------------------------------------------------------------------

// Adiciona um jogo ao carrinho de compras
function adicionarAoCarrinho(novoJogo) {
  // Pega a lista atual de itens do carrinho
  const lista = obterCarrinho();
  
  // Variável para guardar o item caso ele já exista na lista
  let itemExistente = null;

  // Percorre a lista para verificar se o jogo já foi adicionado antes
  for (let i = 0; i < lista.length; i++) {
    // Se o id for igual, encontramos o item
    if (lista[i].id === novoJogo.id) {
      itemExistente = lista[i];
      break; // Encerra o loop pois já achamos o item
    }
  }

  // Se o item já existia no carrinho, aumentamos a quantidade em 1
  if (itemExistente !== null) {
    itemExistente.quantidade = itemExistente.quantidade + 1;
  } else {
    // Se não existia, criamos um novo item com quantidade inicial 1
    const itemParaAdicionar = {
      id: novoJogo.id,
      nome: novoJogo.nome,
      preco: Number(novoJogo.preco),
      imagem: novoJogo.imagem,
      quantidade: 1
    };
    // Adiciona o novo item no final do Array usando o método .push()
    lista.push(itemParaAdicionar);
  }

  // Salva a nova lista no localStorage
  salvarCarrinho(lista);

  // Atualiza os componentes visuais na tela (contador, lista, totais)
  atualizarTodaInterface();

  // Abre automaticamente a gaveta do carrinho (Offcanvas) para mostrar o item
  abrirPainelCarrinho();
}

// Remove um jogo específico do carrinho pelo seu identificador (id)
function removerDoCarrinho(idDoJogo) {
  // Pega a lista atual de itens do carrinho
  const lista = obterCarrinho();

  // Usa o método .filter() para manter apenas os itens com id DIFERENTE do selecionado
  const listaAtualizada = lista.filter(function(item) {
    return item.id !== idDoJogo;
  });

  // Salva a nova lista (sem o item removido) no localStorage
  salvarCarrinho(listaAtualizada);

  // Atualiza toda a interface visual
  atualizarTodaInterface();
}

// Aumenta ou diminui a quantidade de um item (+1 ou -1)
function mudarQuantidade(idDoJogo, valorMudanca) {
  // Pega a lista atual de itens
  const lista = obterCarrinho();

  // Percorre a lista procurando o item pelo id
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === idDoJogo) {
      // Altera a quantidade somando o valor recebido (+1 ou -1)
      lista[i].quantidade = lista[i].quantidade + valorMudanca;

      // Se a quantidade ficou zero ou negativa, removemos o item
      if (lista[i].quantidade <= 0) {
        removerDoCarrinho(idDoJogo);
        return; // Sai da função imediatamente
      }
      break; // Sai do loop após alterar
    }
  }

  // Salva a lista alterada no localStorage
  salvarCarrinho(lista);

  // Atualiza toda a interface visual
  atualizarTodaInterface();
}

// --------------------------------------------------------------------------
// 3. CÁLCULOS FINANCEIROS E FORMATAÇÃO
// --------------------------------------------------------------------------

// Calcula a soma total de todos os produtos do carrinho
function calcularSubtotal(lista) {
  let subtotal = 0;
  // Loop simples para somar o preço vezes a quantidade de cada jogo
  for (let i = 0; i < lista.length; i++) {
    subtotal = subtotal + (lista[i].preco * lista[i].quantidade);
  }
  return subtotal;
}

// Calcula o total de unidades de itens somando as quantidades
function calcularTotalItens(lista) {
  let totalDeItens = 0;
  for (let i = 0; i < lista.length; i++) {
    totalDeItens = totalDeItens + lista[i].quantidade;
  }
  return totalDeItens;
}

// Formata um número comum para o padrão de moeda brasileira (R$ 00,00)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// --------------------------------------------------------------------------
// 4. ATUALIZAÇÃO DA INTERFACE (DOM)
// --------------------------------------------------------------------------

// Atualiza o número de itens exibido na bolinha (badge) do ícone do carrinho
function atualizarBadgeContador(lista) {
  // Busca o elemento do contador pelo ID
  const elementoContador = document.getElementById("carrinho-contador");
  // Se o elemento não existir nesta página, não fazemos nada
  if (!elementoContador) return;

  // Calcula a quantidade total de itens no carrinho
  const total = calcularTotalItens(lista);

  // Escreve o número dentro do elemento HTML
  elementoContador.textContent = total;

  // Se houver mais de zero itens, mostra o badge; senão, esconde
  if (total > 0) {
    elementoContador.style.display = "inline-flex";
  } else {
    elementoContador.style.display = "none";
  }
}

// Atualiza a lista de itens dentro do painel lateral (Offcanvas)
function atualizarOffcanvas(lista) {
  const containerLista = document.getElementById("carrinho-lista");
  const mensagemVazio = document.getElementById("carrinho-vazio");
  const elementoSubtotal = document.getElementById("carrinho-subtotal");

  // Se não existir o painel offcanvas nesta página, encerramos a função
  if (!containerLista) return;

  // Se o carrinho estiver vazio
  if (lista.length === 0) {
    containerLista.innerHTML = "";
    if (mensagemVazio) mensagemVazio.style.display = "block";
    if (elementoSubtotal) elementoSubtotal.textContent = formatarMoeda(0);
    return;
  }

  // Se tiver itens, esconde a mensagem de carrinho vazio
  if (mensagemVazio) mensagemVazio.style.display = "none";

  // Cria o conteúdo HTML com todos os itens da lista
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

  // Insere os itens gerados no container
  containerLista.innerHTML = htmlItens;

  // Atualiza o subtotal exibido no rodapé do offcanvas
  if (elementoSubtotal) {
    elementoSubtotal.textContent = formatarMoeda(calcularSubtotal(lista));
  }
}

// Atualiza a tela completa do carrinho (se estiver na página pages/carrinho.html)
function atualizarPaginaCarrinhoCompleta(lista) {
  const containerPaginaLista = document.getElementById("carrinho-pagina-lista");
  const containerPaginaVazio = document.getElementById("carrinho-pagina-vazio");
  const containerResumo = document.getElementById("carrinho-pagina-resumo-box");

  // Se não estivermos na página completa do carrinho, encerra a função
  if (!containerPaginaLista) return;

  // Se o carrinho estiver vazio
  if (lista.length === 0) {
    containerPaginaLista.innerHTML = "";
    if (containerPaginaVazio) containerPaginaVazio.style.display = "block";
    if (containerResumo) containerResumo.style.display = "none";
    return;
  }

  // Se tiver itens, exibe o resumo e esconde o aviso de vazio
  if (containerPaginaVazio) containerPaginaVazio.style.display = "none";
  if (containerResumo) containerResumo.style.display = "flex";

  // Gera o HTML de cada item na página completa
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

  // Calcula valores do resumo
  const subtotal = calcularSubtotal(lista);
  const totalItens = calcularTotalItens(lista);
  const taxaServico = 4.99; // Taxa de serviço fixa de exemplo

  // Verifica se existe cupom salvo
  const cupomSalvo = localStorage.getItem(CHAVE_CUPOM);
  let percentualDesconto = 0;

  // Validação simples do cupom com IF/ELSE
  if (cupomSalvo === "FIAP10") {
    percentualDesconto = 0.10; // 10% de desconto
  }

  const valorDesconto = subtotal * percentualDesconto;
  const valorFinal = (subtotal + taxaServico) - valorDesconto;

  // Atualiza os valores na tela
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

  // Mostra mensagem se o cupom estiver ativo
  if (cupomSalvo && elMsgCupom) {
    if (elInputCupom && !elInputCupom.value) {
      elInputCupom.value = cupomSalvo;
    }
    elMsgCupom.className = "text-success small mt-2 fw-semibold";
    elMsgCupom.textContent = "Cupom " + cupomSalvo + " ativo (-10% de desconto)!";
  }
}

// Função central que atualiza todos os componentes da interface
function atualizarTodaInterface() {
  const lista = obterCarrinho();
  atualizarBadgeContador(lista);
  atualizarOffcanvas(lista);
  atualizarPaginaCarrinhoCompleta(lista);
}

// --------------------------------------------------------------------------
// 5. CUPOM DE DESCONTO COM IF / ELSE SIMPLES
// --------------------------------------------------------------------------

// Função chamada quando o usuário clica no botão "Aplicar" do cupom
function aplicarCupomDesconto() {
  const inputCupom = document.getElementById("cupom-input");
  const msgCupom = document.getElementById("cupom-msg");

  if (!inputCupom || !msgCupom) return;

  // Pega o valor digitado, remove espaços nas pontas e converte para MAIÚSCULAS
  const codigo = inputCupom.value.trim().toUpperCase();

  // 1. Verifica se o usuário deixou o campo em branco
  if (codigo === "") {
    msgCupom.className = "text-danger small mt-2";
    msgCupom.textContent = "Por favor, digite um código de cupom.";
    return;
  }

  // 2. Validação simples do cupom solicitado: se for FIAP10, aplica 10%
  if (codigo === "FIAP10") {
    // Salva o cupom no localStorage
    localStorage.setItem(CHAVE_CUPOM, "FIAP10");
    msgCupom.className = "text-success small mt-2 fw-bold";
    msgCupom.textContent = "Cupom FIAP10 aplicado com sucesso! Desconto de 10%.";
    // Atualiza os valores na tela
    atualizarTodaInterface();
  } else {
    // Caso seja qualquer outro código diferente de FIAP10
    localStorage.removeItem(CHAVE_CUPOM);
    msgCupom.className = "text-danger small mt-2";
    msgCupom.textContent = "Cupom inválido. Tente 'FIAP10' para 10% de desconto.";
    // Atualiza os valores na tela
    atualizarTodaInterface();
  }
}

// --------------------------------------------------------------------------
// 6. UTILITÁRIOS E INICIALIZAÇÃO
// --------------------------------------------------------------------------

// Abre o painel lateral do carrinho usando o Bootstrap Offcanvas
function abrirPainelCarrinho() {
  const painel = document.getElementById("offcanvasCarrinho");
  if (!painel) return;

  // Verifica se o Bootstrap está carregado na página
  if (window.bootstrap && window.bootstrap.Offcanvas) {
    const offcanvasInstancia = bootstrap.Offcanvas.getOrCreateInstance(painel);
    offcanvasInstancia.show();
  }
}

// Configura os botões de adicionar ao carrinho presentes na página
function configurarBotoesCompra() {
  // Procura todos os botões com a classe .btn-add-carrinho
  const botoes = document.querySelectorAll(".btn-add-carrinho");

  // Percorre cada botão encontrado
  botoes.forEach(function(botao) {
    // Adiciona o ouvinte de clique
    botao.addEventListener("click", function(evento) {
      evento.preventDefault();

      // Coleta as informações guardadas nos atributos data-* do botão HTML
      const id = botao.getAttribute("data-id");
      const nome = botao.getAttribute("data-nome");
      const preco = botao.getAttribute("data-preco");
      const imagem = botao.getAttribute("data-imagem");

      // Monta o objeto com os dados do jogo
      const jogoParaAdicionar = {
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem
      };

      // Chama a função principal de adicionar ao carrinho
      adicionarAoCarrinho(jogoParaAdicionar);
    });
  });
}

// Quando a página terminar de carregar no navegador
document.addEventListener("DOMContentLoaded", function() {
  // Atualiza toda a interface com os dados existentes no localStorage
  atualizarTodaInterface();

  // Conecta os ouvintes de clique nos botões de compra da página
  configurarBotoesCompra();

  // Conecta o botão de aplicar cupom (se existir na página)
  const botaoAplicarCupom = document.getElementById("cupom-aplicar");
  if (botaoAplicarCupom) {
    botaoAplicarCupom.addEventListener("click", aplicarCupomDesconto);
  }

  // Conecta o botão de finalizar compra de demonstração
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
