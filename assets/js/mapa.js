// O mapa e o card usam o mesmo destaque. Quatro estados usam artes alternativas do hero.
const DESTAQUES_POR_ESTADO = {
  tocantins: { regiao: "norte", jogo: "lead-the-dragon" },
  amapa: { regiao: "norte", jogo: "two-strikes" },
  para: { regiao: "norte", jogo: "moonleap" },
  roraima: { regiao: "norte", jogo: "onikura" },
  amazonas: { regiao: "norte", jogo: "sky-dust" },
  acre: { regiao: "norte", jogo: "unsighted" },
  rondonia: { regiao: "norte", jogo: "sludge-life" },

  bahia: { regiao: "nordeste", jogo: "dandara" },
  sergipe: { regiao: "nordeste", jogo: "hell-clock" },
  pernambuco: { regiao: "nordeste", jogo: "cordels-e-spells" },
  alagoas: { regiao: "nordeste", jogo: "aviao-trafico" },
  "rio grande do norte": { regiao: "nordeste", jogo: "aila" },
  ceara: { regiao: "nordeste", jogo: "mullet-madjack" },
  piaui: { regiao: "nordeste", jogo: "enigma-do-medo", imagem: "assets/images/image-enigma-do-medo-hero.webp" },
  maranhao: { regiao: "nordeste", jogo: "9-kings", imagem: "assets/images/image-9kings-hero.webp" },
  paraiba: { regiao: "nordeste", jogo: "investigacao-postuma" },

  "mato grosso": { regiao: "centro-oeste", jogo: "9-kings" },
  "mato grosso do sul": { regiao: "centro-oeste", jogo: "zueirama-2" },
  goias: { regiao: "centro-oeste", jogo: "asleep" },
  "distrito federal": { regiao: "centro-oeste", jogo: "horizon-chase", imagem: "assets/images/image-horizon-chase-hero.webp" },

  parana: { regiao: "sul", jogo: "99-vidas" },
  "santa catarina": { regiao: "sul", jogo: "171" },
  "rio grande do sul": { regiao: "sul", jogo: "horizon-chase" },

  "sao paulo": { regiao: "sudeste", jogo: "fobia" },
  "minas gerais": { regiao: "sudeste", jogo: "bloodless" },
  "rio de janeiro": { regiao: "sudeste", jogo: "enigma-do-medo" },
  "espirito santo": { regiao: "sudeste", jogo: "hell-clock", imagem: "assets/images/image-hellclock-hero.webp" },
};

const NOME_REGIAO = {
  norte: "Norte",
  nordeste: "Nordeste",
  "centro-oeste": "Centro-Oeste",
  sudeste: "Sudeste",
  sul: "Sul",
};

function normalizarNomeEstado(nomeEstado) {
  return nomeEstado
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function obterDestaque(nomeEstado) {
  const destaque = DESTAQUES_POR_ESTADO[normalizarNomeEstado(nomeEstado)];
  const jogo = JOGOS_PADRAO.find(function (jogo) {
    return jogo.id === destaque.jogo;
  });
  return { ...jogo, regiao: destaque.regiao, imagem: destaque.imagem || jogo.imagem };
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
    const jogo = obterDestaque(nome);
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
  const jogoDestaque = obterDestaque(nomeEstado);
  const indiceDestaque = JOGOS_PADRAO.findIndex(function (jogo) {
    return jogo.id === jogoDestaque.id;
  });

  const regiaoLabel = document.querySelector(".explore-featured-regiao");
  if (regiaoLabel) {
    regiaoLabel.textContent = nomeEstado + " · Região " + NOME_REGIAO[jogoDestaque.regiao];
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
    const jogo = JOGOS_PADRAO[(indiceDestaque + indice + 1) % JOGOS_PADRAO.length];

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

  const conteudo = document.querySelector(".explore-conteudo");
  const mapa = document.getElementById("svg-map");
  preencherEstadosComBanners(mapa, elementosEstados);
  const jogos = document.querySelector(".explore-games-side");
  const conexao = document.querySelector(".explore-conexao");
  const legenda = document.querySelector(".explore-estado-selecionado");
  let estadoSelecionado = null;
  let estadoExpandido = null;
  let contornoAmpliado = null;

  function ampliarEstado(estado) {
    if (contornoAmpliado) contornoAmpliado.remove();
    contornoAmpliado = null;
    const alvo = estadoExpandido || estado;
    if (!alvo) return;

    const ampliado = alvo.querySelector("path").cloneNode(true);
    ampliado.classList.add("estado-zoom");
    ampliado.setAttribute("aria-hidden", "true");
    if (estadoExpandido) ampliado.classList.add("estado-zoom-selecionado");
    mapa.append(ampliado);
    contornoAmpliado = ampliado;
    if (!estadoExpandido) {
      requestAnimationFrame(function () {
        ampliado.classList.add("estado-ampliado");
      });
    }
  }

  function recolherEstado() {
    if (!estadoExpandido) return;
    estadoExpandido = null;
    ampliarEstado(null);
  }

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
    const nomeEstado = elementoEstado.getAttribute("name");

    elementoEstado.addEventListener("click", function (evento) {
      evento.preventDefault();
      selecionarEstado(nomeEstado, true);
    });

    elementoEstado.addEventListener("mouseenter", function () {
      elementoEstado.classList.add("estado-hover");
      if (!estadoExpandido) ampliarEstado(elementoEstado);
    });

    elementoEstado.addEventListener("mouseleave", function () {
      elementoEstado.classList.remove("estado-hover");
      if (!estadoExpandido) ampliarEstado(null);
    });

    elementoEstado.addEventListener("focus", function () {
      if (!estadoExpandido) ampliarEstado(elementoEstado);
    });

    elementoEstado.addEventListener("blur", function () {
      if (!estadoExpandido) ampliarEstado(null);
    });
  });

  function selecionarEstado(nomeEstado, deveAmpliar = false) {
    elementosEstados.forEach(function (estado) {
      estado.classList.remove("estado-ativo");
    });
    estadoSelecionado = Array.from(elementosEstados).find(function (estado) {
      return normalizarNomeEstado(estado.getAttribute("name")) === normalizarNomeEstado(nomeEstado || "");
    });
    if (estadoSelecionado) estadoSelecionado.classList.add("estado-ativo");
    estadoExpandido = deveAmpliar && estadoSelecionado !== estadoExpandido ? estadoSelecionado : null;
    ampliarEstado(null);
    const nomeSelecionado = estadoSelecionado ? estadoSelecionado.getAttribute("name") : "";
    if (legenda) legenda.textContent = nomeSelecionado;
    atualizarDestaqueMapa(nomeSelecionado || "São Paulo");
    agendarLinha();
  }

  document.addEventListener("click", function (evento) {
    if (!evento.target.closest?.("#svg-map .estado")) recolherEstado();
  }, true);

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") recolherEstado();
  });

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
