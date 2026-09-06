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

  // Clicar em um card de jogo leva à página de detalhes daquele jogo
  // (página interna, quando existe, ou a página "em desenvolvimento")
  document
    .querySelectorAll(".halt-game-card, .halt-offer-card")
    .forEach(function (card) {
      card.addEventListener("click", function (evento) {
        if (evento.target.closest(".btn-add-carrinho") || evento.target.closest("a")) {
          return;
        }

        const botaoCarrinho = card.querySelector(".btn-add-carrinho");
        const idJogo = botaoCarrinho ? botaoCarrinho.getAttribute("data-id") : "";
        const jogo =
          idJogo && typeof obterTodosJogos === "function"
            ? obterTodosJogos().find(function (j) {
                return j.id === idJogo;
              })
            : null;
        if (!jogo) return;

        window.location.href = resolverCaminhoDetalhes(jogo);
      });
    });
});
