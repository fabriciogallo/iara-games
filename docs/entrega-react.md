# Iara Games — Hospedando React (entrega)

> Texto-base do PDF da entrega. Preencha o que está entre `[colchetes]` e exporte para PDF.
> O PDF deve ser enviado pela ferramenta de criação de grupos, com o nome de **todos os integrantes em ordem alfabética**.

## Integrantes (ordem alfabética)

1. [Nome 1]
2. [Nome 2]
3. [Nome 3]

## Área desenvolvida: a Loja

Escolhemos a **Loja** da plataforma Iara Games e a reconstruímos em React. É a área onde o público encontra, conhece e compra os jogos
brasileiros, e por isso concentra boa parte da experiência da plataforma: catálogo, página de cada jogo e carrinho.

### Objetivos

- Permitir que a pessoa **encontre um jogo rápido**, por categoria, nome, preço ou nota.
- Mostrar **tudo sobre o jogo** antes da compra (capa, descrição, galeria, avaliações, estúdio e requisitos do sistema).
- Fazer a **compra fluir**: adicionar ao carrinho sem sair da página, ajustar quantidades, aplicar cupom e finalizar.
- Manter a **identidade visual** da Iara Games (cores, tipografia e componentes) e funcionar bem no celular e no computador.

### Funcionalidades

| Tela | O que faz |
| --- | --- |
| **Loja** (catálogo) | 23 jogos; filtro por categoria; busca por nome que ignora acento e maiúscula; ordenação por relevância, menor preço, maior preço e melhor avaliado; paginação de 8 em 8; estado vazio com botão "Limpar filtros". |
| **Página do jogo** | Capa com gêneros, descrição, classificação etária, galeria de imagens, avaliações da comunidade, card do estúdio, requisitos do sistema, plataformas, botão de comprar e de favoritar. Jogos sem página completa mostram o básico e permitem comprar. |
| **Carrinho lateral** | Abre ao adicionar um jogo; altera a quantidade; remove itens; fecha com `Esc`, no X ou clicando fora. |
| **Carrinho (página)** | Lista de itens, resumo com subtotal, taxa de serviço e total, **cupom de desconto** (`FIAP10` = 10%), sugestões de jogos e finalização do pedido de demonstração. |
| **Favoritos** | Coração em cada jogo, contador e filtro próprio; fica salvo no navegador. |

### Requisitos da plataforma atendidos

- **Identidade visual**: usa o mesmo CSS e as mesmas imagens das páginas estáticas, então a loja em React é visualmente igual ao restante da plataforma.
- **Responsividade**: testada de 320 px a telas largas (menu recolhido no celular, grade de 1 a 4 colunas).
- **Acessibilidade**: navegação por teclado, foco visível, link "pular para o conteúdo", rótulos em botões de ícone, avisos para leitores de tela, contraste adequado e respeito a "reduzir movimento".
- **Integração**: carrinho, cupom e jogos cadastrados no formulário "Desenvolvedor" são compartilhados com as páginas estáticas (mesmas chaves no `localStorage`).

### Inovação

- **Filtros guardados no endereço** (`/#/?categoria=Terror&pagina=2`): o link é compartilhável e o botão "voltar" funciona.
- **Favoritos** com contador e filtro.
- **Busca tolerante** a acento e maiúscula ("aviao" encontra "Aviãozinho do Tráfico").
- **Carrinho sincronizado** entre a loja em React, a loja estática e outras abas do navegador.
- **Finalização de pedido** com resumo e número do pedido.
- **76 testes automatizados** (lógica e telas), rodando antes de cada publicação.

## Organização do projeto

```
loja-react/
├── src/
│   ├── pages/        Loja, Jogo, Carrinho, NaoEncontrado (uma por rota)
│   ├── components/   Navbar, CardJogo, Paginacao, CarrinhoGaveta... (e jogo/ com as partes da página do jogo)
│   ├── context/      carrinho, favoritos e avisos (estado compartilhado)
│   ├── hooks/        hooks próprios
│   ├── utils/        lógica pura e testada (catálogo, carrinho, moeda, armazenamento)
│   ├── data/         catálogo e dados das páginas dos jogos
│   └── styles/       estilos novos da versão React
└── README.md         como rodar, estrutura e decisões
```

Tecnologias: React 19, React Router, Vite, Bootstrap 5, Vitest e Testing Library.

## Links

- **Repositório público no GitHub**: [https://github.com/USUARIO/REPOSITORIO] (código da loja em `loja-react/`)
- **Hospedagem da área (Loja em React)**: [https://USUARIO.github.io/REPOSITORIO/loja/]
- **Demais áreas da plataforma hospedadas** (opcional): [https://USUARIO.github.io/REPOSITORIO/]

---

# Como hospedar (para quem for publicar)

O workflow `.github/workflows/publicar-pages.yml` faz tudo sozinho: instala, **roda os testes**, gera a loja e publica no GitHub Pages
a plataforma estática (na raiz) e a loja em React (em `/loja/`).

1. **O repositório precisa ser público** (exigência da entrega). Se o repositório do grupo pertence a um integrante, é ele quem liga o Pages; outra opção é
   cada um fazer um *fork* público e ligar no próprio.
2. Faça o *merge* da branch `feature/loja-react` na `main` (por *Pull Request*).
3. No GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. A aba **Actions** roda "Publicar no GitHub Pages". Quando ficar verde, o endereço aparece no resumo da execução e em Settings → Pages.
5. Abra `https://USUARIO.github.io/REPOSITORIO/loja/`, teste a loja e copie os links para o PDF.

**Alternativa (Vercel ou Netlify)**, só para a loja: *Root Directory* `loja-react`, *Build command* `npm run build`, *Output* `dist`.
Defina a variável `VITE_URL_PLATAFORMA` com o endereço da plataforma estática, para os links Home, Desenvolvedor e Suporte funcionarem.

## Lista de conferência antes de enviar

- [ ] PDF com o descritivo da área (este texto), os links e **todos os nomes em ordem alfabética**
- [ ] Repositório **público**
- [ ] Link da hospedagem abre a loja e o carrinho funciona
- [ ] Testado no celular
