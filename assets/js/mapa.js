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
  return "loja/#/?busca=" + encodeURIComponent(jogo.nome);
}

function tocarAnimacaoEntrada(elemento) {
  if (!elemento) return;
  elemento.classList.remove("explore-card-anim");
  void elemento.offsetWidth;
  elemento.classList.add("explore-card-anim");
}

function preencherEstadosComBanners(mapa, estados) {
  const svgNS = "http://www.w3.org/2000/svg";
  const definicoes = document.createElementNS(svgNS, "defs");
  mapa.prepend(definicoes);

  estados.forEach(function (estado) {
    const nome = estado.getAttribute("name");
    const regiao = ESTADO_PARA_REGIAO[normalizarNomeEstado(nome)];
    const jogo = obterJogoPorId(JOGOS_POR_REGIAO[regiao][0]);
    const contorno = estado.querySelector("path");
    const limites = contorno.getBBox();
    const id = "banner-estado-" + estado.getAttribute("code");
    const padrao = document.createElementNS(svgNS, "pattern");
    padrao.id = id;
    padrao.setAttribute("patternUnits", "userSpaceOnUse");
    padrao.setAttribute("viewBox", "0 0 " + limites.width + " " + limites.height);

    const imagem = document.createElementNS(svgNS, "image");
    imagem.setAttribute("href", jogo.imagem);
    imagem.setAttribute("preserveAspectRatio", "xMidYMid slice");
    ["x", "y", "width", "height"].forEach(function (atributo) {
      padrao.setAttribute(atributo, limites[atributo]);
    });
    imagem.setAttribute("width", limites.width);
    imagem.setAttribute("height", limites.height);
    padrao.append(imagem);
    definicoes.append(padrao);
    contorno.style.setProperty("--banner-estado", "url(#" + id + ")");

    const titulo = document.createElementNS(svgNS, "title");
    titulo.textContent = nome + " — " + jogo.nome;
    estado.prepend(titulo);
    estado.setAttribute("aria-label", titulo.textContent);
  });

  mapa.classList.add("mapa-com-banners");
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
  const conteudo = document.querySelector(".explore-conteudo");
  const mapa = document.getElementById("svg-map");
  preencherEstadosComBanners(mapa, elementosEstados);
  const jogos = document.querySelector(".explore-games-side");
  const conexao = document.querySelector(".explore-conexao");
  const legenda = document.querySelector(".explore-estado-selecionado");
  let estadoSelecionado = null;

  function atualizarLinha() {
    if (!conexao || !legenda || !conteudo || !jogos || !estadoSelecionado) {
      if (conexao) conexao.style.visibility = "hidden";
      return;
    }

    const contorno = estadoSelecionado.querySelector("path");
    const limites = contorno.getBBox();
    const matriz = contorno.getScreenCTM();
    if (!matriz) return;

    const centro = new DOMPoint(limites.x + limites.width / 2, limites.y + limites.height / 2).matrixTransform(matriz);
    const area = conteudo.getBoundingClientRect();
    const areaMapa = mapa.getBoundingClientRect();
    const areaJogos = jogos.getBoundingClientRect();
    const ladoALado = areaJogos.left >= areaMapa.right;
    const inicioX = centro.x - area.left;
    const inicioY = centro.y - area.top;
    const fimY = (ladoALado ? Math.max(areaMapa.bottom, areaJogos.bottom) : areaMapa.bottom) - area.top + 12;
    const fimX = ladoALado ? areaJogos.right - area.left : area.width - 8;
    const curvaX = ladoALado ? areaJogos.left - area.left - 20 : Math.min(inicioX + 40, fimX - 24);

    conexao.setAttribute("viewBox", "0 0 " + area.width + " " + area.height);
    conexao.querySelector("path").setAttribute("d", "M " + inicioX + " " + inicioY + " L " + curvaX + " " + fimY + " H " + fimX);
    conexao.querySelector("circle").setAttribute("cx", inicioX);
    conexao.querySelector("circle").setAttribute("cy", inicioY);
    conexao.style.visibility = "visible";
    legenda.style.left = Math.max(0, Math.min(curvaX, area.width - legenda.offsetWidth)) + "px";
    legenda.style.top = fimY + 8 + "px";
  }

  function agendarLinha() {
    requestAnimationFrame(atualizarLinha);
  }
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
      selecionarEstado(nomeEstado);
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

  function selecionarEstado(nomeEstado) {
    const regiao = nomeEstado && ESTADO_PARA_REGIAO[normalizarNomeEstado(nomeEstado)];
    elementosEstados.forEach(function (estado) {
      estado.classList.remove("estado-ativo");
    });
    if (regiao) {
      elementosPorRegiao[regiao].forEach(function (estado) {
        estado.classList.add("estado-ativo");
      });
    }
    estadoSelecionado = Array.from(elementosEstados).find(function (estado) {
      return normalizarNomeEstado(estado.getAttribute("name")) === normalizarNomeEstado(nomeEstado || "");
    });
    if (legenda) legenda.textContent = estadoSelecionado ? estadoSelecionado.getAttribute("name") : "";
    atualizarDestaqueMapa(regiao ? nomeEstado : "São Paulo");
    agendarLinha();
  }

  document.addEventListener("iara:localizar-cep", function (evento) {
    const endereco = evento.detail;
    if (!endereco) {
      selecionarEstado(null);
      return;
    }

    const codigoEstado = endereco.ibge?.slice(0, 2);
    const estado = Array.from(elementosEstados).find(function (elemento) {
      return elemento.getAttribute("code") === codigoEstado;
    });
    selecionarEstado(estado?.getAttribute("name") || endereco.estado);
  });

  atualizarDestaqueMapa("São Paulo");
  estadoSelecionado = Array.from(elementosEstados).find(function (estado) {
    return estado.getAttribute("code") === "35";
  });
  if (legenda) legenda.textContent = "São Paulo";
  if (conteudo && jogos) {
    const observador = new ResizeObserver(agendarLinha);
    observador.observe(conteudo);
    observador.observe(mapa);
    observador.observe(jogos);
  }
  window.addEventListener("resize", agendarLinha);
  document.fonts.ready.then(agendarLinha);
  agendarLinha();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarMapaSVG);
} else {
  inicializarMapaSVG();
}
