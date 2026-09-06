// Lista padrão de jogos da plataforma Iara Games
const JOGOS_PADRAO = [
  {
    id: "enigma-do-medo",
    nome: "Enigma do Medo",
    preco: 65.0,
    categoria: "Terror",
    imagem: "assets/images/image-enigma-do-medo.jpg",
    estudio: "Dumativa & Cellbit",
    avaliacao: 4.8,
  },
  {
    id: "bloodless",
    nome: "Bloodless",
    preco: 57.9,
    categoria: "Ação",
    imagem: "assets/images/image-bloodless.jpg",
    estudio: "Vaki Games",
    avaliacao: 4.5,
  },
  {
    id: "171",
    nome: "171",
    preco: 49.9,
    categoria: "Ação",
    imagem: "assets/images/image-171.jpg",
    estudio: "Betagames Group",
    avaliacao: 4.2,
  },
  {
    id: "mullet-madjack",
    nome: "Mullet MadJack",
    preco: 29.96,
    categoria: "Ação",
    imagem: "assets/images/image-mullet-madjack.jpg",
    estudio: "HAMMER95",
    avaliacao: 4.9,
  },
  {
    id: "fobia",
    nome: "Fobia - St. Dinfna Hotel",
    preco: 89.0,
    categoria: "Terror",
    imagem: "assets/images/image-fobia.jpg",
    estudio: "Pulsatrix Studios",
    avaliacao: 4.6,
  },
  {
    id: "dandara",
    nome: "Dandara",
    preco: 46.99,
    categoria: "Aventura",
    imagem: "assets/images/image-dandara.jpg",
    estudio: "Long Hat House",
    avaliacao: 4.7,
  },
  {
    id: "horizon-chase",
    nome: "Horizon Chase Turbo",
    preco: 49.99,
    categoria: "Corrida",
    imagem: "assets/images/image-horizon-chase.jpg",
    estudio: "Aquiris Game Studio",
    avaliacao: 4.8,
  },
  {
    id: "9-kings",
    nome: "9 Kings",
    preco: 39.99,
    categoria: "RPG",
    imagem: "assets/images/image-9kings.jpg",
    estudio: "Sad Socket",
    avaliacao: 4.3,
  },
  {
    id: "hell-clock",
    nome: "Hell Clock",
    preco: 59.99,
    categoria: "Terror",
    imagem: "assets/images/image-hellclock.jpg",
    estudio: "Rogue Snail",
    avaliacao: 4.1,
  },
  {
    id: "sky-dust",
    nome: "Sky Dust",
    preco: 46.99,
    categoria: "Aventura",
    imagem: "assets/images/image-sky-dust.jpg",
    estudio: "Indie BR",
    avaliacao: 4.0,
  },
  {
    id: "99-vidas",
    nome: "99 Vidas",
    preco: 27.9,
    categoria: "Ação",
    imagem: "assets/images/image-99-vidas.jpg",
    estudio: "QUByte Interactive",
    avaliacao: 4.4,
  },
  {
    id: "aviao-trafico",
    nome: "Aviãozinho do Tráfico",
    preco: 19.99,
    categoria: "Ação",
    imagem: "assets/images/image-aviaozinho.jpg",
    estudio: "Joeveno",
    avaliacao: 4.7,
  },
  {
    id: "sludge-life",
    nome: "Sludge Life Demo",
    preco: 0.0,
    categoria: "Gratuito",
    imagem: "assets/images/image-sludge-life.jpg",
    estudio: "Devolver & Terri",
    avaliacao: 4.2,
  },
  {
    id: "moonleap",
    nome: "Moonleap",
    preco: 34.9,
    categoria: "Aventura",
    imagem: "assets/images/image-moonleap.jpg",
    estudio: "Sonhador Studio",
    avaliacao: 4.3,
  },
  {
    id: "onikura",
    nome: "Onikura",
    preco: 0.0,
    categoria: "Gratuito",
    imagem: "assets/images/image-onikura.jpg",
    estudio: "Kurokora Games",
    avaliacao: 4.1,
  },
  {
    id: "two-strikes",
    nome: "Two Strikes Demo",
    preco: 0.0,
    categoria: "Gratuito",
    imagem: "assets/images/image-two-strikes.jpg",
    estudio: "Retro Reactor",
    avaliacao: 4.5,
  },
  {
    id: "lead-the-dragon",
    nome: "Lead the Dragon Demo",
    preco: 0.0,
    categoria: "Gratuito",
    imagem: "assets/images/image-lead-the-dragon.jpg",
    estudio: "Estúdio Independente",
    avaliacao: 4.0,
  },
  {
    id: "zueirama-2",
    nome: "Zueirama 2",
    preco: 19.99,
    categoria: "Aventura",
    imagem: "assets/images/image-zueirama-2.jpg",
    estudio: "Memes Games",
    avaliacao: 4.2,
  },
  {
    id: "investigacao-postuma",
    nome: "A Investigação Póstuma",
    preco: 49.99,
    categoria: "Aventura",
    imagem: "assets/images/image-investigacao-postuma.jpg",
    estudio: "Mother Gaia Studio",
    avaliacao: 4.4,
  },
  {
    id: "asleep",
    nome: "Asleep: Ato 2",
    preco: 19.99,
    categoria: "Terror",
    imagem: "assets/images/image-asleep.png",
    estudio: "Black Hole Games",
    avaliacao: 4.3,
  },
  {
    id: "aila",
    nome: "A.I.L.A",
    preco: 13.99,
    categoria: "Aventura",
    imagem: "assets/images/image-aila.jpg",
    estudio: "Aoca Game Lab",
    avaliacao: 4.5,
  },
  {
    id: "cordels-e-spells",
    nome: "Cordels & Spells",
    preco: 0.0,
    categoria: "Gratuito",
    imagem: "assets/images/image-cordels-&-spells.jpg",
    estudio: "Supernova Games",
    avaliacao: 4.1,
  },
  {
    id: "unsighted",
    nome: "Unsighted",
    preco: 49.99,
    categoria: "Ação",
    imagem: "assets/images/image-unsighted.jpg",
    estudio: "Studio Pixel Punk",
    avaliacao: 4.7,
  },
];

// Jogos que já possuem página interna própria (pages/pages-game/page-interna-<id>.html)
const JOGOS_COM_PAGINA_INTERNA = [
  "9-kings",
  "dandara",
  "enigma-do-medo",
  "hell-clock",
  "sky-dust",
];

let categoriaAtual = "Todos";
let termoBuscaAtual = "";
let ordenacaoAtual = "relevancia";
let paginaAtual = 1;
const JOGOS_POR_PAGINA = 8;

// Páginas dentro de "pages/" usam data-raiz="../" para resolver caminhos relativos
function resolverCaminhoImagemCatalogo(caminhoOriginal) {
  if (!caminhoOriginal) return "";
  if (caminhoOriginal.startsWith("http") || caminhoOriginal.startsWith("../")) {
    return caminhoOriginal;
  }
  const raiz = document.body ? document.body.dataset.raiz || "" : "";
  return raiz + caminhoOriginal;
}

// Jogos sem página interna própria caem na página de detalhes "em desenvolvimento"
function resolverCaminhoDetalhes(jogo) {
  const raiz = document.body ? document.body.dataset.raiz || "" : "";

  if (JOGOS_COM_PAGINA_INTERNA.includes(jogo.id)) {
    return raiz + "pages/pages-game/page-interna-" + jogo.id + ".html";
  }

  return (
    raiz +
    "pages/pagina-em-desenvolvimento.html?jogo=" +
    encodeURIComponent(jogo.nome)
  );
}

function obterTodosJogos() {
  const todosJogos = [];
  for (let i = 0; i < JOGOS_PADRAO.length; i++) {
    todosJogos.push(JOGOS_PADRAO[i]);
  }

  try {
    const jogosSalvosTexto = localStorage.getItem("iaraJogosCustomizados");
    if (jogosSalvosTexto) {
      const jogosCustomizados = JSON.parse(jogosSalvosTexto);
      if (Array.isArray(jogosCustomizados)) {
        for (let i = 0; i < jogosCustomizados.length; i++) {
          todosJogos.unshift(jogosCustomizados[i]);
        }
      }
    }
  } catch (erro) {
    console.error("Erro ao carregar jogos do localStorage:", erro);
  }

  return todosJogos;
}

function ordenarJogos(lista) {
  const copia = lista.slice();

  if (ordenacaoAtual === "menor-preco") {
    copia.sort(function (a, b) {
      return (Number(a.preco) || 0) - (Number(b.preco) || 0);
    });
  } else if (ordenacaoAtual === "maior-preco") {
    copia.sort(function (a, b) {
      return (Number(b.preco) || 0) - (Number(a.preco) || 0);
    });
  } else if (ordenacaoAtual === "melhor-avaliado") {
    copia.sort(function (a, b) {
      return (Number(b.avaliacao) || 0) - (Number(a.avaliacao) || 0);
    });
  }

  return copia;
}

function aplicarFiltros(resetarPagina) {
  const listaCompleta = obterTodosJogos();

  const filtradosPorCategoria = listaCompleta.filter(function (jogo) {
    if (categoriaAtual === "Todos") {
      return true;
    }
    const catJogo = jogo.categoria ? jogo.categoria.toLowerCase() : "";
    return catJogo === categoriaAtual.toLowerCase();
  });

  const filtradosPorBusca = filtradosPorCategoria.filter(function (jogo) {
    if (termoBuscaAtual.trim() === "") {
      return true;
    }
    const nomeJogo = jogo.nome ? jogo.nome.toLowerCase() : "";
    const termo = termoBuscaAtual.toLowerCase().trim();
    return nomeJogo.includes(termo);
  });

  const filtradosFinais = ordenarJogos(filtradosPorBusca);

  if (resetarPagina !== false) {
    paginaAtual = 1;
  }

  renderizarCardsJogos(filtradosFinais);
}

function atualizarSubtitulo(totalFiltrado, totalGeral) {
  const subtitulo = document.getElementById("jogos-contador-resultado");
  if (!subtitulo) return;

  const semFiltroAtivo =
    categoriaAtual === "Todos" && termoBuscaAtual.trim() === "";

  subtitulo.textContent = semFiltroAtivo
    ? "Mostrando todos os jogos disponíveis na Iara Games"
    : "Mostrando " + totalFiltrado + " de " + totalGeral + " jogos disponíveis";
}

function renderizarCardsJogos(jogosFiltrados) {
  const container = document.getElementById("jogos-container");
  if (!container) return;

  atualizarSubtitulo(jogosFiltrados.length, obterTodosJogos().length);

  if (jogosFiltrados.length === 0) {
    container.innerHTML = `
      <div class="loja-empty">
        <i class="bi bi-search display-1 text-secondary mb-3 d-block"></i>
        <h4 class="text-white">Nenhum jogo encontrado</h4>
        <p class="text-secondary">Tente escolher outra categoria ou limpar a pesquisa.</p>
        <button class="btn btn-outline-warning mt-2" onclick="limparTodosFiltros()">Limpar Filtros</button>
      </div>
    `;
    renderizarPaginacao(0);
    return;
  }

  const totalPaginas = Math.max(
    1,
    Math.ceil(jogosFiltrados.length / JOGOS_POR_PAGINA),
  );
  if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

  const inicio = (paginaAtual - 1) * JOGOS_POR_PAGINA;
  const jogosDaPagina = jogosFiltrados.slice(inicio, inicio + JOGOS_POR_PAGINA);

  let htmlCards = "";

  for (let i = 0; i < jogosDaPagina.length; i++) {
    const jogo = jogosDaPagina[i];
    const precoNumero = Number(jogo.preco) || 0;
    const textoPreco =
      precoNumero === 0
        ? "Gratuito"
        : "R$ " + precoNumero.toFixed(2).replace(".", ",");
    const caminhoImg = resolverCaminhoImagemCatalogo(jogo.imagem);
    const textoBotao = precoNumero === 0 ? "Jogar" : "Colocar no carrinho";
    const caminhoDetalhes = resolverCaminhoDetalhes(jogo);
    const linkDetalhes = `<a href="${caminhoDetalhes}" class="loja-card-detalhes">Ver detalhes <i class="bi bi-arrow-right"></i></a>`;

    htmlCards += `
      <article class="loja-card" data-detalhes-href="${caminhoDetalhes}">
        <div class="loja-card-img">
          <img
            src="${caminhoImg}"
            alt="Capa do jogo ${jogo.nome}"
            loading="lazy"
          />
        </div>
        <div class="loja-card-body">
          <div>
            <div class="loja-card-top">
              <h3 class="loja-card-name" title="${jogo.nome}">${jogo.nome}</h3>
              <span class="loja-card-rating">
                <i class="bi bi-star-fill"></i>${jogo.avaliacao || "4.5"}
              </span>
            </div>
            <p class="loja-card-studio">${jogo.estudio || "Estúdio Brasileiro"}</p>
            ${linkDetalhes}
          </div>

          <span class="loja-card-price ${precoNumero === 0 ? "is-free" : ""}">${textoPreco}</span>

          <button
            type="button"
            class="loja-card-btn btn-add-carrinho"
            data-id="${jogo.id}"
            data-nome="${jogo.nome}"
            data-preco="${precoNumero}"
            data-imagem="${jogo.imagem}"
          >
            ${textoBotao}
          </button>
        </div>
      </article>
    `;
  }

  container.innerHTML = htmlCards;
  renderizarPaginacao(totalPaginas);

  if (typeof configurarBotoesCompra === "function") {
    configurarBotoesCompra();
  }
}

function obterPaginasVisiveis(atual, total) {
  if (total <= 7) {
    const paginas = [];
    for (let i = 1; i <= total; i++) paginas.push(i);
    return paginas;
  }

  const candidatas = [
    1,
    2,
    atual - 1,
    atual,
    atual + 1,
    total - 1,
    total,
  ].filter(function (p) {
    return p >= 1 && p <= total;
  });

  const unicas = Array.from(new Set(candidatas)).sort(function (a, b) {
    return a - b;
  });

  const resultado = [];
  let anterior = null;
  unicas.forEach(function (pagina) {
    if (anterior !== null && pagina - anterior > 1) {
      resultado.push("...");
    }
    resultado.push(pagina);
    anterior = pagina;
  });

  return resultado;
}

function renderizarPaginacao(totalPaginas) {
  const nav = document.getElementById("loja-paginacao");
  if (!nav) return;

  if (totalPaginas <= 1) {
    nav.innerHTML = "";
    return;
  }

  let html = `
    <button type="button" class="loja-page-btn" data-pagina="prev" ${paginaAtual === 1 ? "disabled" : ""} aria-label="Página anterior">
      <i class="bi bi-chevron-left"></i>
    </button>
  `;

  obterPaginasVisiveis(paginaAtual, totalPaginas).forEach(function (pagina) {
    if (pagina === "...") {
      html += `<span class="loja-page-btn is-ellipsis">...</span>`;
    } else {
      html += `
        <button type="button" class="loja-page-btn ${pagina === paginaAtual ? "active" : ""}" data-pagina="${pagina}">
          ${pagina}
        </button>
      `;
    }
  });

  html += `
    <button type="button" class="loja-page-btn" data-pagina="next" ${paginaAtual === totalPaginas ? "disabled" : ""} aria-label="Próxima página">
      <i class="bi bi-chevron-right"></i>
    </button>
  `;

  nav.innerHTML = html;

  nav.querySelectorAll("[data-pagina]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      const valor = botao.getAttribute("data-pagina");

      if (valor === "prev") {
        paginaAtual = Math.max(1, paginaAtual - 1);
      } else if (valor === "next") {
        paginaAtual = Math.min(totalPaginas, paginaAtual + 1);
      } else {
        paginaAtual = Number(valor);
      }

      aplicarFiltros(false);

      const container = document.getElementById("jogos-container");
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Clique em qualquer ponto do card (imagem ou borda) leva aos detalhes do jogo,
// exceto quando o clique é no botão de carrinho ou em outro link do próprio card
function configurarCliqueCardsLoja() {
  const container = document.getElementById("jogos-container");
  if (!container) return;

  container.addEventListener("click", function (evento) {
    if (evento.target.closest(".btn-add-carrinho") || evento.target.closest("a")) {
      return;
    }

    const card = evento.target.closest(".loja-card");
    const destino = card ? card.getAttribute("data-detalhes-href") : null;
    if (destino) {
      window.location.href = destino;
    }
  });
}

function limparTodosFiltros() {
  categoriaAtual = "Todos";
  termoBuscaAtual = "";

  const campoBusca = document.getElementById("busca-jogos");
  if (campoBusca) campoBusca.value = "";

  atualizarTabsCategoria();
  aplicarFiltros();
}

function atualizarTabsCategoria() {
  const abas = document.querySelectorAll(".loja-tab");
  abas.forEach(function (aba) {
    const cat = aba.getAttribute("data-categoria");
    aba.classList.toggle(
      "active",
      cat.toLowerCase() === categoriaAtual.toLowerCase(),
    );
  });
}

function inicializarPaginaJogos() {
  aplicarFiltros();
  configurarCliqueCardsLoja();

  const abasCategoria = document.querySelectorAll(".loja-tab");
  abasCategoria.forEach(function (aba) {
    aba.addEventListener("click", function () {
      categoriaAtual = aba.getAttribute("data-categoria");
      atualizarTabsCategoria();
      aplicarFiltros();
    });
  });

  const seletorOrdenacao = document.getElementById("ordenar-jogos");
  if (seletorOrdenacao) {
    seletorOrdenacao.addEventListener("change", function (evento) {
      ordenacaoAtual = evento.target.value;
      aplicarFiltros();
    });
  }

  const campoBusca = document.getElementById("busca-jogos");
  if (campoBusca) {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const buscaUrl = parametrosUrl.get("busca");
    if (buscaUrl) {
      campoBusca.value = buscaUrl;
      termoBuscaAtual = buscaUrl;
      aplicarFiltros();
    }

    campoBusca.addEventListener("input", function (evento) {
      termoBuscaAtual = evento.target.value;
      aplicarFiltros();
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarPaginaJogos);
} else {
  inicializarPaginaJogos();
}
