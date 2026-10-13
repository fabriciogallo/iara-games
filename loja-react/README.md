# Iara Games — Loja em React

Área da plataforma **Iara Games** desenvolvida em **React**: o catálogo de jogos brasileiros, a página de cada jogo e o carrinho de compras.
É a mesma loja das páginas estáticas do projeto (`pages/jogos.html`, `pages/pages-game/`, `pages/carrinho.html`), reconstruída como uma aplicação
de página única, com a mesma identidade visual e mais recursos.

## O que dá pra fazer

- **Catálogo**: 23 jogos, com filtro por categoria, busca por nome (ignora acento e maiúscula), ordenação (relevância, menor preço, maior preço, melhor avaliado) e paginação (8 por página).
- **Filtros na URL**: categoria, busca, ordem e página ficam no endereço (`/#/?categoria=Terror&pagina=2`). Dá pra compartilhar o link e o botão "voltar" do navegador funciona.
- **Favoritos**: coração em cada jogo, contador e filtro "Favoritos". Fica salvo no navegador.
- **Página do jogo**: capa, gêneros, descrição, classificação etária, galeria, avaliações da comunidade, estúdio, requisitos do sistema e plataformas. Os jogos que ainda não têm página completa mostram o básico e deixam comprar.
- **Carrinho lateral**: abre ao adicionar um jogo; muda quantidade, remove, fecha com `Esc`, no X ou clicando fora.
- **Página do carrinho**: resumo com subtotal, taxa de serviço e total, **cupom de desconto** (`FIAP10` = 10%), sugestões de jogos e finalização de pedido de demonstração.
- **Integração com a plataforma estática**: carrinho, cupom e jogos cadastrados pelo formulário "Desenvolvedor" usam as mesmas chaves do `localStorage`. O que se coloca no carrinho em uma área aparece na outra.
- **Acessibilidade**: navegação por teclado, foco visível, link "pular para o conteúdo", rótulos em todos os botões de ícone, avisos para leitores de tela e respeito a "reduzir movimento".

## Tecnologias

React 19 · React Router (HashRouter) · Vite · Bootstrap 5 + Bootstrap Icons · Vitest + Testing Library.
Sem biblioteca de estado: o carrinho usa `useReducer` + Context, e os favoritos e avisos usam Context com `useState`.

## Como rodar

```bash
cd loja-react
npm install
npm run dev        # http://localhost:5173
npm test           # testes (Vitest)
npm run build      # gera a pasta dist/
npm run preview    # serve o build em http://localhost:4173
```

As páginas estáticas da plataforma (Home, Desenvolvedor, Suporte) ficam na pasta de cima. Para os links da barra funcionarem em desenvolvimento, sirva o projeto inteiro
(`npx serve ..`) e abra a loja em `/loja-react/dist/`, ou defina `VITE_URL_PLATAFORMA` com o endereço da plataforma estática (ex.: `VITE_URL_PLATAFORMA=https://usuario.github.io/iara-games/`).

## Estrutura de pastas

```
loja-react/
├── index.html            ponto de entrada (fontes e <div id="root">)
├── vite.config.js        Vite + Vitest
├── public/               favicon
└── src/
    ├── main.jsx          importa os estilos e monta o app
    ├── App.jsx           rotas (HashRouter) e layout
    ├── Providers.jsx     contextos compartilhados
    ├── pages/            uma por rota: Loja, Jogo, Carrinho, NaoEncontrado
    ├── components/       peças reutilizáveis (Navbar, CardJogo, Paginacao, CarrinhoGaveta...)
    │   └── jogo/         pedaços da página do jogo (capa, galeria, avaliações, painel de compra)
    ├── context/          estado global: carrinho, favoritos, avisos
    ├── hooks/            hooks próprios (título da aba, classe no <body>)
    ├── utils/            lógica pura e testada: catálogo, carrinho, moeda, armazenamento, imagens
    ├── data/             catálogo (jogos.js) e dados das páginas de detalhes (detalhes.js)
    ├── styles/           só o que é novo na versão React; o resto vem de ../assets/styles/index.css
    └── test/             configuração e ajudantes dos testes
```

## Decisões técnicas

- **Reaproveita o CSS e as imagens da plataforma** (`../assets`), em vez de copiar: a loja em React e as páginas estáticas ficam sempre com a mesma cara.
- **Lógica fora dos componentes**: filtrar, ordenar, paginar e calcular o carrinho são funções puras em `utils/`, testadas sem precisar de tela. Os componentes só mostram o resultado.
- **HashRouter**: o endereço fica `/#/jogo/dandara`, o que funciona em hospedagem estática (GitHub Pages) sem configurar redirecionamento.
- **Dados salvos são sempre validados**: se o `localStorage` tiver algo estragado (ou uma versão antiga), a loja ignora e segue funcionando.
- **Dinheiro arredondado em centavos** (`arredondar`) para a conta do desconto nunca mostrar `4,699000000000001`.

## Testes

`npm test` roda 76 testes: a lógica (catálogo, carrinho, cupom, moeda) e as telas simulando o usuário (filtrar, buscar, paginar, favoritar, comprar, aplicar cupom, finalizar).

## Hospedagem

O workflow `.github/workflows/publicar-pages.yml` testa, gera a loja e publica no **GitHub Pages** junto com a plataforma estática:

- `https://<usuario>.github.io/<repositorio>/` → plataforma estática (Home, Loja estática, Suporte...)
- `https://<usuario>.github.io/<repositorio>/loja/` → **esta loja em React**

Passo a passo para ligar: veja `docs/entrega-react.md`.
