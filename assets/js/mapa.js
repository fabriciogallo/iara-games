// Estados brasileiros agrupados por região, usados para escolher os jogos em destaque
const ESTADO_PARA_REGIAO = {
  tocantins: "norte",
  amapa: "norte",
  para: "norte",
  roraima: "norte",
  amazonas: "norte",
  acre: "norte",
  rondonia: "norte",

  bahia: "nordeste",
  sergipe: "nordeste",
  pernambuco: "nordeste",
  alagoas: "nordeste",
  "rio grande do norte": "nordeste",
  ceara: "nordeste",
  piaui: "nordeste",
  maranhao: "nordeste",
  paraiba: "nordeste",

  "mato grosso": "centro-oeste",
  "mato grosso do sul": "centro-oeste",
  goias: "centro-oeste",
  "distrito federal": "centro-oeste",

  parana: "sul",
  "santa catarina": "sul",
  "rio grande do sul": "sul",

  "sao paulo": "sudeste",
  "minas gerais": "sudeste",
  "rio de janeiro": "sudeste",
  "espirito santo": "sudeste",
};

const NOME_REGIAO = {
  norte: "Norte",
  nordeste: "Nordeste",
  "centro-oeste": "Centro-Oeste",
  sudeste: "Sudeste",
  sul: "Sul",
};

// Top 4 jogos mais jogados de cada região (posição 0 = card em destaque, 1-3 = cards menores)
const JOGOS_POR_REGIAO = {
  norte: ["sky-dust", "onikura", "moonleap", "two-strikes"],
  nordeste: ["dandara", "aila", "cordels-e-spells", "aviao-trafico"],
  "centro-oeste": ["9-kings", "unsighted", "zueirama-2", "lead-the-dragon"],
  sudeste: ["fobia", "enigma-do-medo", "hell-clock", "bloodless"],
  sul: ["horizon-chase", "99-vidas", "171", "mullet-madjack"],
};

function normalizarNomeEstado(nomeEstado) {
  return nomeEstado
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function obterJogoPorId(id) {
  return obterTodosJogos().find(function (jogo) {
    return jogo.id === id;
  });
}

function linkBuscaJogo(jogo) {
  return "pages/jogos.html?busca=" + encodeURIComponent(jogo.nome);
}

function tocarAnimacaoEntrada(elemento) {
  if (!elemento) return;
  elemento.classList.remove("explore-card-anim");
  void elemento.offsetWidth;
  elemento.classList.add("explore-card-anim");
}

function atualizarDestaqueMapa(nomeEstado) {
  const chave = normalizarNomeEstado(nomeEstado);
  const regiao = ESTADO_PARA_REGIAO[chave] || "sudeste";
  const jogos = JOGOS_POR_REGIAO[regiao].map(obterJogoPorId);
  const jogoDestaque = jogos[0];

  const regiaoLabel = document.querySelector(".explore-featured-regiao");
  if (regiaoLabel) {
    regiaoLabel.textContent = nomeEstado + " · Região " + NOME_REGIAO[regiao];
  }

  const nomeDestaque = document.querySelector(".explore-featured-nome");
  if (nomeDestaque) {
    nomeDestaque.textContent = jogoDestaque.nome;
  }

  const estudioDestaque = document.querySelector(".explore-featured-estudio");
  if (estudioDestaque) {
    estudioDestaque.textContent = jogoDestaque.estudio;
  }

  const notaDestaque = document.querySelector(".explore-featured-nota-valor");
  if (notaDestaque) {
    notaDestaque.textContent = jogoDestaque.avaliacao.toFixed(1);
  }

  const imgDestaque = document.querySelector(".explore-featured-img");
  if (imgDestaque) {
    imgDestaque.src = jogoDestaque.imagem;
    imgDestaque.alt = "Imagem para o Banner jogo " + jogoDestaque.nome;
  }

  const linkDestaque = document.querySelector(".explore-featured a");
  if (linkDestaque) {
    linkDestaque.href = linkBuscaJogo(jogoDestaque);
  }

  tocarAnimacaoEntrada(document.querySelector(".explore-featured"));

  const thumbs = document.querySelectorAll(".explore-thumb");
  thumbs.forEach(function (thumb, indice) {
    const jogo = jogos[indice + 1];

    thumb.href = linkBuscaJogo(jogo);

    const imgThumb = thumb.querySelector(".explore-thumb-img");
    imgThumb.src = jogo.imagem;
    imgThumb.alt = "Imagem para o Banner jogo " + jogo.nome;

    const nomeThumb = thumb.querySelector(".explore-thumb-nome");
    nomeThumb.textContent = jogo.nome;

    tocarAnimacaoEntrada(thumb);
  });
}

function inicializarMapaSVG() {
  const elementosEstados = document.querySelectorAll("#svg-map .estado");

  if (elementosEstados.length === 0) {
    return;
  }

  const elementosPorRegiao = {};
  elementosEstados.forEach(function (elementoEstado) {
    const regiao = ESTADO_PARA_REGIAO[normalizarNomeEstado(elementoEstado.getAttribute("name"))];
    if (!elementosPorRegiao[regiao]) {
      elementosPorRegiao[regiao] = [];
    }
    elementosPorRegiao[regiao].push(elementoEstado);
  });

  elementosEstados.forEach(function (elementoEstado) {
    const nomeEstado = elementoEstado.getAttribute("name");
    const regiao = ESTADO_PARA_REGIAO[normalizarNomeEstado(nomeEstado)];
    const elementosRegiao = elementosPorRegiao[regiao];

    elementoEstado.addEventListener("click", function (evento) {
      evento.preventDefault();

      elementosEstados.forEach(function (est) {
        est.classList.remove("estado-ativo");
      });
      elementosRegiao.forEach(function (est) {
        est.classList.add("estado-ativo");
      });

      if (nomeEstado) {
        atualizarDestaqueMapa(nomeEstado);
      }
    });

    elementoEstado.addEventListener("mouseenter", function () {
      elementosRegiao.forEach(function (est) {
        est.classList.add("regiao-hover");
      });
    });

    elementoEstado.addEventListener("mouseleave", function () {
      elementosRegiao.forEach(function (est) {
        est.classList.remove("regiao-hover");
      });
    });
  });

  atualizarDestaqueMapa("São Paulo");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarMapaSVG);
} else {
  inicializarMapaSVG();
}
