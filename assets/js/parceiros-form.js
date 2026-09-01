/*
  PARCEIROS-FORM.JS
  ------------------
  Cuida do formulário "Envie seus dados" (parceiros/desenvolvedores) que
  fica na Home. Esse formulário não tem um servidor de verdade por trás
  ainda, então aqui a gente só simula o envio:

  1) Impede o comportamento padrão do navegador (que recarregaria a
     página ao enviar um <form>)
  2) Valida os campos obrigatórios
  3) Faz uma pequena animação no botão "Enviar" enquanto "envia"
  4) Depois de um tempinho, mostra a mensagem de agradecimento (com o
     ícone de check), com uma animação de entrada suave
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-parceiros");
  if (!form) return;

  const botao = document.getElementById("parceiro-enviar");
  const feedback = document.getElementById("parceiro-feedback");

  form.addEventListener("submit", (evento) => {
    // Sem isso, o navegador recarregaria a página (comportamento padrão
    // de qualquer <form> ao ser enviado).
    evento.preventDefault();

    // Usa a validação nativa do HTML5 (os campos têm "required").
    // Se algo estiver faltando, o navegador mostra o aviso e a gente para aqui.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Esconde qualquer feedback de um envio anterior, caso o usuário
    // envie o formulário mais de uma vez.
    feedback.classList.remove("halt-form-feedback-show");

    // Início da animação: o botão "pulsa" e o texto muda pra avisar
    // que algo está acontecendo.
    const textoOriginal = botao.textContent.trim();
    botao.classList.add("halt-btn-sending");
    botao.disabled = true;
    botao.textContent = "Enviando...";

    // Simula o tempo de uma requisição de verdade (aqui não existe
    // backend, então usamos um pequeno atraso só pra dar a sensação
    // de que algo foi processado).
    setTimeout(() => {
      botao.classList.remove("halt-btn-sending");
      botao.disabled = false;
      botao.textContent = textoOriginal;

      // requestAnimationFrame garante que o navegador "perceba" o
      // estado inicial (oculto) antes de aplicar a classe que anima
      // a entrada — sem isso, a transição CSS não roda.
      requestAnimationFrame(() => {
        feedback.classList.add("halt-form-feedback-show");
      });

      form.reset();
    }, 900);
  });
});
