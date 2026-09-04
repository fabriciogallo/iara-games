// ==========================================================================
// CONTATO.JS - IARA GAMES
// ==========================================================================
// Cuida do formulário "Envie seus dados" (parceiros/desenvolvedores) que
// fica na Home:
// 1) Aplica uma máscara de telefone brasileiro enquanto o usuário digita,
//    aceitando apenas números.
// 2) Valida os campos obrigatórios usando a validação nativa do HTML5.
// 3) Faz uma pequena animação no botão "Enviar" enquanto "envia".
// 4) Depois de um tempinho, mostra a mensagem de agradecimento (com o
//    ícone de check), com uma animação de entrada suave.
// Escrito de forma didática e comentado linha por linha para aprendizado.
// ==========================================================================

// Formata o telefone digitado como (XX) XXXX-XXXX ou (XX) XXXXX-XXXX,
// sempre removendo qualquer caractere que não seja número.
function aplicarMascaraTelefoneBR(campoTelefone) {
  if (!campoTelefone) return;

  campoTelefone.addEventListener("input", function () {
    const numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
    const fimDDD = 2;
    const ehCelular = numeros.length > 10;
    const fimPrimeiraParte = ehCelular ? 7 : 6;

    let valorFormatado = "";
    if (numeros.length > 0) {
      valorFormatado = "(" + numeros.slice(0, fimDDD);
    }
    if (numeros.length > fimDDD) {
      valorFormatado += ") " + numeros.slice(fimDDD, fimPrimeiraParte);
    }
    if (numeros.length > fimPrimeiraParte) {
      valorFormatado += "-" + numeros.slice(fimPrimeiraParte, 11);
    }

    campoTelefone.value = valorFormatado;
  });
}

// Inicializa o formulário de parceiros/desenvolvedores da Home
function inicializarFormularioParceiros() {
  const formulario = document.getElementById("form-parceiros");
  if (!formulario) return;

  const botao = document.getElementById("parceiro-enviar");
  const feedback = document.getElementById("parceiro-feedback");
  const campoTelefone = document.getElementById("parceiro-telefone");

  aplicarMascaraTelefoneBR(campoTelefone);

  formulario.addEventListener("submit", function (evento) {
    // Sem isso, o navegador recarregaria a página ao enviar o <form>
    evento.preventDefault();

    // Usa a validação nativa do HTML5 (os campos têm "required")
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    // Esconde qualquer feedback de um envio anterior
    feedback.classList.remove("halt-form-feedback-show");

    // Início da animação: o botão "pulsa" e o texto avisa que está enviando
    const textoOriginal = botao.textContent.trim();
    botao.classList.add("halt-btn-sending");
    botao.disabled = true;
    botao.textContent = "Enviando...";

    // Simula o tempo de uma requisição de verdade (não existe backend aqui)
    setTimeout(function () {
      botao.classList.remove("halt-btn-sending");
      botao.disabled = false;
      botao.textContent = textoOriginal;

      // requestAnimationFrame garante que o navegador "perceba" o estado
      // inicial (oculto) antes de aplicar a classe que anima a entrada
      requestAnimationFrame(function () {
        feedback.classList.add("halt-form-feedback-show");
      });

      formulario.reset();
    }, 900);
  });
}

// Inicializa com verificação imediata para nunca perder o evento
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarFormularioParceiros);
} else {
  inicializarFormularioParceiros();
}
