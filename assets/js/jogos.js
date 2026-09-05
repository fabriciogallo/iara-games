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
    id: "arida",
    nome: "Árida: Backland's Awakening",
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

let categoriaAtual = "Todos";
let termoBuscaAtual = "";

// Páginas dentro de "pages/" usam data-raiz="../" para resolver caminhos relativos
function resolverCaminhoImagemCatalogo(caminhoOriginal) {
  if (!caminhoOriginal) return "";
  if (caminhoOriginal.startsWith("http") || caminhoOriginal.startsWith("../")) {
    return caminhoOriginal;
  }
  const raiz = document.body ? document.body.dataset.raiz || "" : "";
  return raiz + caminhoOriginal;
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

function aplicarFiltros() {
  const listaCompleta = obterTodosJogos();

  const filtradosPorCategoria = listaCompleta.filter(function (jogo) {
    if (categoriaAtual === "Todos") {
      return true;
    }
    const catJogo = jogo.categoria ? jogo.categoria.toLowerCase() : "";
    return catJogo === categoriaAtual.toLowerCase();
  });

  const filtradosFinais = filtradosPorCategoria.filter(function (jogo) {
    if (termoBuscaAtual.trim() === "") {
      return true;
    }
    const nomeJogo = jogo.nome ? jogo.nome.toLowerCase() : "";
    const termo = termoBuscaAtual.toLowerCase().trim();
    return nomeJogo.includes(termo);
  });

  renderizarCardsJogos(filtradosFinais);
}

function renderizarCardsJogos(jogosParaExibir) {
  const container = document.getElementById("jogos-container");
  const contadorTotal = document.getElementById("jogos-contador-resultado");

  if (!container) return;

  if (contadorTotal) {
    contadorTotal.textContent = jogosParaExibir.length + " jogos encontrados";
  }

  if (jogosParaExibir.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <i class="bi bi-search display-1 text-secondary mb-3 d-block"></i>
        <h4 class="text-white">Nenhum jogo encontrado</h4>
        <p class="text-secondary">Tente escolher outra categoria ou limpar a pesquisa.</p>
        <button class="btn btn-outline-warning mt-2" onclick="limparTodosFiltros()">Limpar Filtros</button>
      </div>
    `;
    return;
  }

  let htmlCards = "";

  for (let i = 0; i < jogosParaExibir.length; i++) {
    const jogo = jogosParaExibir[i];
    const precoNumero = Number(jogo.preco) || 0;
    const textoPreco =
      precoNumero === 0
        ? "Gratuito"
        : "R$ " + precoNumero.toFixed(2).replace(".", ",");
    const caminhoImg = resolverCaminhoImagemCatalogo(jogo.imagem);

    htmlCards += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <article class="card game-card h-100 bg-dark text-white border border-secondary rounded-4 overflow-hidden shadow-sm">
          <div class="position-relative" style="height: 180px; overflow: hidden;">
            <img
              src="${caminhoImg}"
              alt="Capa do jogo ${jogo.nome}"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <span class="badge position-absolute top-0 end-0 m-2 ${jogo.categoria === "Gratuito" ? "bg-success" : "bg-primary"}">
              ${jogo.categoria || "Gamer"}
            </span>
          </div>

          <div class="card-body d-flex flex-column justify-content-between p-3">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="card-title text-truncate m-0 fw-bold fs-6" title="${jogo.nome}">${jogo.nome}</h5>
                <span class="small text-warning fw-bold">
                  <i class="bi bi-star-fill me-1"></i>${jogo.avaliacao || "4.5"}
                </span>
              </div>
              <p class="text-secondary small mb-3">${jogo.estudio || "Estúdio Brasileiro"}</p>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary mt-2">
              <span class="fw-bold ${precoNumero === 0 ? "text-success" : "text-warning"} fs-5">
                ${textoPreco}
              </span>
              <button
                type="button"
                class="btn btn-warning btn-sm fw-bold px-3 btn-add-carrinho"
                data-id="${jogo.id}"
                data-nome="${jogo.nome}"
                data-preco="${precoNumero}"
                data-imagem="${jogo.imagem}"
              >
                ${precoNumero === 0 ? "Jogar" : "Comprar"} <i class="bi bi-cart-plus ms-1"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  container.innerHTML = htmlCards;

  if (typeof configurarBotoesCompra === "function") {
    configurarBotoesCompra();
  }
}

function limparTodosFiltros() {
  categoriaAtual = "Todos";
  termoBuscaAtual = "";

  const campoBusca = document.getElementById("busca-jogos");
  if (campoBusca) campoBusca.value = "";

  atualizarBotoesCategoria();
  aplicarFiltros();
}

function atualizarBotoesCategoria() {
  const botoes = document.querySelectorAll(".btn-filtro-categoria");
  botoes.forEach(function (botao) {
    const cat = botao.getAttribute("data-categoria");
    if (cat.toLowerCase() === categoriaAtual.toLowerCase()) {
      botao.classList.add("btn-warning", "active");
      botao.classList.remove("btn-outline-light");
    } else {
      botao.classList.remove("btn-warning", "active");
      botao.classList.add("btn-outline-light");
    }
  });
}

function inicializarPaginaJogos() {
  aplicarFiltros();

  const botoesCategoria = document.querySelectorAll(".btn-filtro-categoria");
  botoesCategoria.forEach(function (botao) {
    botao.addEventListener("click", function () {
      categoriaAtual = botao.getAttribute("data-categoria");
      atualizarBotoesCategoria();
      aplicarFiltros();
    });
  });

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
