// Formata o telefone digitado como (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
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

function inicializarFormularioParceiros() {
  const formulario = document.getElementById("form-parceiros");
  if (!formulario) return;

  const botao = document.getElementById("parceiro-enviar");
  const feedback = document.getElementById("parceiro-feedback");
  const campoTelefone = document.getElementById("parceiro-telefone");

  aplicarMascaraTelefoneBR(campoTelefone);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    feedback.classList.remove("halt-form-feedback-show");

    const textoOriginal = botao.textContent.trim();
    botao.classList.add("halt-btn-sending");
    botao.disabled = true;
    botao.textContent = "Enviando...";

    // Sem backend real: simula o tempo de uma requisição
    setTimeout(function () {
      botao.classList.remove("halt-btn-sending");
      botao.disabled = false;
      botao.textContent = textoOriginal;

      requestAnimationFrame(function () {
        feedback.classList.add("halt-form-feedback-show");
      });

      formulario.reset();
    }, 900);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarFormularioParceiros);
} else {
  inicializarFormularioParceiros();
}
