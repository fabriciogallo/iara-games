const CHAVE_JOGOS_CUSTOMIZADOS = "iaraJogosCustomizados";

function obterJogosCustomizados() {
  const textoSalvo = localStorage.getItem(CHAVE_JOGOS_CUSTOMIZADOS);
  if (!textoSalvo) {
    return [];
  }
  try {
    const lista = JSON.parse(textoSalvo);
    return Array.isArray(lista) ? lista : [];
  } catch (e) {
    return [];
  }
}

function salvarJogosCustomizados(lista) {
  localStorage.setItem(CHAVE_JOGOS_CUSTOMIZADOS, JSON.stringify(lista));
}

function gerarIdDoJogo(titulo) {
  return titulo
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cadastrarNovoJogo(evento) {
  evento.preventDefault();

  const campoTitulo = document.getElementById("jogo-titulo");
  const campoPreco = document.getElementById("jogo-preco");
  const campoCategoria = document.getElementById("jogo-categoria");
  const campoImagem = document.getElementById("jogo-imagem");
  const campoEstudio = document.getElementById("jogo-estudio");
  const campoDescricao = document.getElementById("jogo-descricao");

  const titulo = campoTitulo ? campoTitulo.value.trim() : "";
  const precoTexto = campoPreco ? campoPreco.value.trim() : "";
  const categoria = campoCategoria ? campoCategoria.value : "";
  const imagem = campoImagem ? campoImagem.value.trim() : "";
  const estudio = campoEstudio ? campoEstudio.value.trim() : "";
  const descricao = campoDescricao ? campoDescricao.value.trim() : "";

  if (titulo === "") {
    exibirAlertaAddGame("Por favor, informe o título do jogo.", "danger");
    if (campoTitulo) campoTitulo.focus();
    return;
  }

  const precoNumero = parseFloat(precoTexto);
  if (precoTexto === "" || isNaN(precoNumero) || precoNumero < 0) {
    exibirAlertaAddGame(
      "Por favor, digite um preço válido (ex: 0 para grátis ou 49.90).",
      "danger",
    );
    if (campoPreco) campoPreco.focus();
    return;
  }

  if (categoria === "") {
    exibirAlertaAddGame("Por favor, selecione a categoria do jogo.", "danger");
    if (campoCategoria) campoCategoria.focus();
    return;
  }

  if (imagem === "") {
    exibirAlertaAddGame(
      "Por favor, informe a URL ou caminho da imagem da capa.",
      "danger",
    );
    if (campoImagem) campoImagem.focus();
    return;
  }

  const novoJogo = {
    id: (gerarIdDoJogo(titulo) || "jogo") + "-" + Date.now(),
    nome: titulo,
    preco: precoNumero,
    categoria: categoria,
    imagem: imagem,
    estudio: estudio !== "" ? estudio : "Estúdio Independente",
    descricao: descricao,
    avaliacao: 5.0,
  };

  const listaExistente = obterJogosCustomizados();
  listaExistente.push(novoJogo);
  salvarJogosCustomizados(listaExistente);

  exibirAlertaAddGame(
    `Jogo "<strong>${titulo}</strong>" cadastrado com sucesso! <a href="jogos.html" class="alert-link text-decoration-underline ms-2">Ver na Loja</a>`,
    "success",
  );

  if (campoTitulo) campoTitulo.value = "";
  if (campoPreco) campoPreco.value = "";
  if (campoCategoria) campoCategoria.value = "";
  if (campoImagem) campoImagem.value = "";
  if (campoEstudio) campoEstudio.value = "";
  if (campoDescricao) campoDescricao.value = "";

  const previewImg = document.getElementById("imagem-preview");
  if (previewImg) previewImg.style.display = "none";
}

function exibirAlertaAddGame(mensagemHtml, tipo) {
  const container = document.getElementById("add-game-alerta");
  if (!container) return;

  container.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <div class="d-flex align-items-center gap-2">
        <i class="bi ${tipo === "success" ? "bi-check-circle-fill text-success" : "bi-exclamation-triangle-fill text-danger"} fs-5"></i>
        <div>${mensagemHtml}</div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>
  `;
}

function configurarPreviewImagem() {
  const inputImagem = document.getElementById("jogo-imagem");
  const previewImg = document.getElementById("imagem-preview");

  if (!inputImagem || !previewImg) return;

  inputImagem.addEventListener("input", function () {
    const url = inputImagem.value.trim();
    if (url.length > 3) {
      previewImg.src =
        url.startsWith("http") || url.startsWith("../") ? url : "../" + url;
      previewImg.style.display = "block";
    } else {
      previewImg.style.display = "none";
    }
  });

  const botoesSugestao = document.querySelectorAll(".btn-sugestao-img");
  botoesSugestao.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const caminho = botao.getAttribute("data-caminho");
      inputImagem.value = caminho;
      previewImg.src = "../" + caminho;
      previewImg.style.display = "block";
    });
  });
}

function inicializarAddGame() {
  const formulario = document.getElementById("form-add-game");
  if (formulario) {
    formulario.addEventListener("submit", cadastrarNovoJogo);
  }
  configurarPreviewImagem();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarAddGame);
} else {
  inicializarAddGame();
}
