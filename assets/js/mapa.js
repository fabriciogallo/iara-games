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

function atualizarDestaqueMapa(nomeEstado) {
  const chave = nomeEstado
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const dados = JOGOS_POR_ESTADO[chave] || JOGOS_POR_ESTADO["sao paulo"];

  const badgeEstado = document.querySelector(".explore-featured-badge");
  if (badgeEstado) {
    badgeEstado.textContent = nomeEstado.toUpperCase();
  }

  const imgDestaque = document.querySelector(".explore-featured-img");
  if (imgDestaque) {
    imgDestaque.src = dados.imagem;
    imgDestaque.alt = "Imagem para o Banner jogo " + dados.nome;
  }

  const linkDestaque = document.querySelector(".explore-featured a");
  if (linkDestaque) {
    linkDestaque.href = dados.link;
  }

  const seloCidade = document.querySelector(".explore-city-label");
  if (seloCidade) {
    seloCidade.textContent = dados.cidade + " — " + dados.nome;
  }
}

function inicializarMapaSVG() {
  const elementosEstados = document.querySelectorAll("#svg-map .estado");

  if (elementosEstados.length === 0) {
    return;
  }

  elementosEstados.forEach(function(elementoEstado) {
    const nomeEstado = elementoEstado.getAttribute("name");

    elementoEstado.addEventListener("click", function(evento) {
      evento.preventDefault();

      elementosEstados.forEach(function(est) {
        est.classList.remove("estado-ativo");
        const pathEst = est.querySelector("path");
        if (pathEst) {
          pathEst.style.fill = "";
          pathEst.style.stroke = "#FFFFFF";
        }
      });

      elementoEstado.classList.add("estado-ativo");
      const pathAtual = elementoEstado.querySelector("path");
      if (pathAtual) {
        pathAtual.style.fill = "#ffcb20";
        pathAtual.style.stroke = "#ffcb20";
      }

      if (nomeEstado) {
        atualizarDestaqueMapa(nomeEstado);
      }
    });

    elementoEstado.addEventListener("mouseenter", function() {
      const pathHover = elementoEstado.querySelector("path");
      if (pathHover && !elementoEstado.classList.contains("estado-ativo")) {
        pathHover.style.fill = "rgba(255, 203, 32, 0.4)";
      }
    });

    elementoEstado.addEventListener("mouseleave", function() {
      const pathHover = elementoEstado.querySelector("path");
      if (pathHover && !elementoEstado.classList.contains("estado-ativo")) {
        pathHover.style.fill = "";
      }
    });
  });

  atualizarDestaqueMapa("São Paulo");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarMapaSVG);
} else {
  inicializarMapaSVG();
}
