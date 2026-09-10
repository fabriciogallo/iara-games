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

// Sem backend real: simula o tempo de uma requisição e reseta o formulário
function tratarEnvioSimulado(formulario, botao, feedback) {
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

function inicializarFormularioParceiros() {
  const formulario = document.getElementById("form-parceiros");
  if (!formulario) return;

  aplicarMascaraTelefoneBR(document.getElementById("parceiro-telefone"));
  tratarEnvioSimulado(
    formulario,
    document.getElementById("parceiro-enviar"),
    document.getElementById("parceiro-feedback"),
  );
}

function inicializarFormularioSuporte() {
  const formulario = document.getElementById("form-cadastro");
  if (!formulario) return;

  tratarEnvioSimulado(
    formulario,
    document.getElementById("suporte-enviar"),
    document.getElementById("suporte-feedback"),
  );
}

function inicializarFormulariosDeContato() {
  inicializarFormularioParceiros();
  inicializarFormularioSuporte();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarFormulariosDeContato);
} else {
  inicializarFormulariosDeContato();
}
