// ==========================================================================
// MAPA.JS - IARA GAMES
// ==========================================================================
// Este script gerencia a interatividade do Mapa do Brasil (SVG original).
// 1. Identifica todos os estados brasileiros no elemento SVG (#svg-map).
// 2. Adiciona eventos de clique e passagem do mouse (hover) em cada estado.
// 3. Destaca visualmente o estado selecionado com a cor amarela da Iara Games.
// 4. Atualiza o painel lateral com o jogo desenvolvido no estado clicado.
// Todo o código é didático, leve e comentado passo a passo para aprendizado.
// ==========================================================================

// Dicionário relacionando estados brasileiros aos seus respectivos jogos
const JOGOS_POR_ESTADO = {
  "sao paulo": {
    nome: "Fobia - St. Dinfna Hotel",
    estudio: "Pulsatrix Studios",
    cidade: "São Paulo, SP",
    imagem: "assets/images/image-fobia.jpg",
    link: "pages/jogos.html"
  },
  "parana": {
    nome: "Enigma do Medo",
    estudio: "Dumativa & Cellbit",
    cidade: "Curitiba, PR",
    imagem: "assets/images/image-enigma-do-medo.jpg",
    link: "pages/pages-game/page-interna-enigma-do-medo.html"
  },
  "minas gerais": {
    nome: "Dandara",
    estudio: "Long Hat House",
    cidade: "Belo Horizonte, MG",
    imagem: "assets/images/image-dandara.jpg",
    link: "pages/pages-game/page-interna-dandara.html"
  },
  "rio grande do sul": {
    nome: "Horizon Chase Turbo",
    estudio: "Aquiris Game Studio",
    cidade: "Porto Alegre, RS",
    imagem: "assets/images/image-horizon-chase.jpg",
    link: "pages/jogos.html"
  },
  "distrito federal": {
    nome: "Mullet MadJack",
    estudio: "HAMMER95",
    cidade: "Brasília, DF",
    imagem: "assets/images/image-mullet-madjack.jpg",
    link: "pages/jogos.html"
  },
  "bahia": {
    nome: "Árida: Backland's Awakening",
    estudio: "Aoca Game Lab",
    cidade: "Salvador, BA",
    imagem: "assets/images/image-aila.jpg",
    link: "pages/jogos.html"
  },
  "pernambuco": {
    nome: "Cordels & Spells",
    estudio: "Supernova Games",
    cidade: "Recife, PE",
    imagem: "assets/images/image-cordels-&-spells.jpg",
    link: "pages/jogos.html"
  },
  "rio de janeiro": {
    nome: "Unsighted",
    estudio: "Studio Pixel Punk",
    cidade: "Rio de Janeiro, RJ",
    imagem: "assets/images/image-unsighted.jpg",
    link: "pages/jogos.html"
  },
  "santa catarina": {
    nome: "9 Kings",
    estudio: "Sad Socket",
    cidade: "Florianópolis, SC",
    imagem: "assets/images/image-9kings.jpg",
    link: "pages/pages-game/page-interna-9-kings.html"
  }
};

// Função para atualizar as informações do jogo em destaque no painel lateral
function atualizarDestaqueMapa(nomeEstado) {
  // Normaliza o nome do estado (em minúsculas e sem acentos para busca)
  const chave = nomeEstado
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // Busca as informações do jogo no nosso dicionário (ou usa São Paulo como padrão)
  const dados = JOGOS_POR_ESTADO[chave] || JOGOS_POR_ESTADO["sao paulo"];

  // 1. Atualiza o badge com o nome do estado selecionado
  const badgeEstado = document.querySelector(".explore-featured-badge");
  if (badgeEstado) {
    badgeEstado.textContent = nomeEstado.toUpperCase();
  }

  // 2. Atualiza a imagem de destaque do jogo
  const imgDestaque = document.querySelector(".explore-featured-img");
  if (imgDestaque) {
    imgDestaque.src = dados.imagem;
    imgDestaque.alt = "Imagem para o Banner jogo " + dados.nome;
  }

  // 3. Atualiza o link do jogo em destaque
  const linkDestaque = document.querySelector(".explore-featured a");
  if (linkDestaque) {
    linkDestaque.href = dados.link;
  }

  // 4. Atualiza o selo flutuante de localização (se existir)
  const seloCidade = document.querySelector(".explore-city-label");
  if (seloCidade) {
    seloCidade.textContent = dados.cidade + " — " + dados.nome;
  }
}

// Função principal que ativa a interatividade no mapa SVG
function inicializarMapaSVG() {
  // Busca todos os elementos de estado no mapa SVG através da classe .estado
  const elementosEstados = document.querySelectorAll("#svg-map .estado");

  // Se não encontrar o mapa SVG nesta página, encerra a função
  if (elementosEstados.length === 0) {
    return;
  }

  // Percorre cada estado do mapa usando um forEach tradicional
  elementosEstados.forEach(function(elementoEstado) {
    // Lê o nome do estado a partir do atributo "name" colocado na tag <a>
    const nomeEstado = elementoEstado.getAttribute("name");

    // Evento de clique no estado
    elementoEstado.addEventListener("click", function(evento) {
      // Impede que a página pule pro topo com o hash do link
      evento.preventDefault();

      // Remove a classe de seleção ativa de todos os estados anteriores
      elementosEstados.forEach(function(est) {
        est.classList.remove("estado-ativo");
        const pathEst = est.querySelector("path");
        if (pathEst) {
          pathEst.style.fill = "";
          pathEst.style.stroke = "#FFFFFF";
        }
      });

      // Adiciona o destaque amarelo no estado clicado
      elementoEstado.classList.add("estado-ativo");
      const pathAtual = elementoEstado.querySelector("path");
      if (pathAtual) {
        pathAtual.style.fill = "#ffcb20";
        pathAtual.style.stroke = "#ffcb20";
      }

      // Atualiza o painel lateral com o jogo do estado clicado
      if (nomeEstado) {
        atualizarDestaqueMapa(nomeEstado);
      }
    });

    // Evento ao passar o mouse por cima do estado (hover)
    elementoEstado.addEventListener("mouseenter", function() {
      const pathHover = elementoEstado.querySelector("path");
      if (pathHover && !elementoEstado.classList.contains("estado-ativo")) {
        pathHover.style.fill = "rgba(255, 203, 32, 0.4)";
      }
    });

    // Evento ao tirar o mouse do estado
    elementoEstado.addEventListener("mouseleave", function() {
      const pathHover = elementoEstado.querySelector("path");
      if (pathHover && !elementoEstado.classList.contains("estado-ativo")) {
        pathHover.style.fill = "";
      }
    });
  });

  // Estado inicial: destaca São Paulo ao carregar
  atualizarDestaqueMapa("São Paulo");
}

// Executa a inicialização do mapa com verificação imediata para evitar atrasos
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarMapaSVG);
} else {
  inicializarMapaSVG();
}
