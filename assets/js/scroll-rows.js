// SCROLL-ROWS.JS - IARA GAMES
// Dá rolagem horizontal apenas por arraste (clique e arraste)
// para qualquer carrossel ".halt-scroll-row" da página.
// A roda do mouse rola a página normalmente (verticalmente).

document.addEventListener("DOMContentLoaded", function () {
  const fileiras = document.querySelectorAll(".halt-scroll-row");

  fileiras.forEach(function (fileira) {
    // Clique e arraste: permite arrastar o carrossel para os lados
    let arrastando = false;
    let posicaoInicialX = 0;
    let scrollInicial = 0;
    let moveu = false;

    fileira.addEventListener("mousedown", function (evento) {
      arrastando = true;
      moveu = false;
      posicaoInicialX = evento.pageX;
      scrollInicial = fileira.scrollLeft;
      fileira.classList.add("is-dragging");
    });

    window.addEventListener("mouseup", function () {
      if (!arrastando) return;
      arrastando = false;
      fileira.classList.remove("is-dragging");
    });

    window.addEventListener("mousemove", function (evento) {
      if (!arrastando) return;
      const distancia = evento.pageX - posicaoInicialX;

      if (Math.abs(distancia) > 5) {
        moveu = true;
      }

      fileira.scrollLeft = scrollInicial - distancia;
    });

    // Evita que o arraste dispare um clique indesejado nos cards/botões
    fileira.addEventListener(
      "click",
      function (evento) {
        if (moveu) {
          evento.preventDefault();
          evento.stopPropagation();
        }
      },
      { capture: true }
    );
  });
});
