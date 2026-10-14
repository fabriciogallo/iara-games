![Logo](assets/images/logo-iara-games.png)

# Iara Games

Nesta sexta fase do projeto, o grupo teve como objetivo aplicar a identidade visual da Iara Games no ambiente digital, utilizando conceitos modernos de desenvolvimento front-end, responsividade e acessibilidade.

A proposta foi transformar a identidade criada anteriormente em uma experiência funcional e visualmente consistente, desenvolvendo páginas responsivas com foco em navegação intuitiva, organização visual e valorização dos jogos brasileiros.

Foram desenvolvidas duas páginas principais:

- Home da plataforma Iara Games
- Página extra com temática complementar ao projeto

Durante o desenvolvimento, utilizamos o Bootstrap para estruturar os elementos da interface e otimizar a responsividade da plataforma.

Na fase seguinte, a Loja foi reconstruída em React (veja a seção [Loja em React](#loja-em-react)).

## PROJETO NO AR

- Plataforma (Home e demais páginas): https://fabriciogallo.github.io/iara-games/
- Loja em React: https://fabriciogallo.github.io/iara-games/loja/

## INTEGRANTES

- Edu Eder Batagelo Rodrigues Carvalho
- Fabricio Costa Gallo
- Kauã Aurelio Silva
- Matheus Santos Matta
- Patrick de Souza Bigi dos Santos

## IDENTIDADE VISUAL

A identidade visual da Iara Games foi criada para representar a conexão entre tecnologia, games e brasilidade.

O conceito visual combina elementos modernos com referências culturais brasileiras, criando uma marca jovem, dinâmica e facilmente reconhecível.

### LOGOTIPO

![Logo](assets/images/logo-iara-games.png)

O logotipo da Iara Games foi desenvolvido de forma original, unindo a representação de uma cauda inspirada na personagem folclórica Iara com um controle de videogame, reforçando a conexão entre cultura brasileira e universo gamer.

Essa construção visual transmite:

- Modernidade
- Criatividade
- Tecnologia
- Identidade nacional

### PALETA DE CORES

As cores escolhidas foram definidas estrategicamente para fortalecer a identidade da plataforma:

| Cor     | Hex                                                                |
| ------- | ------------------------------------------------------------------ |
| AMARELO | ![#FFCB20](https://dummyimage.com/50/FFCB20/white?text=+) #FFCB20 |
| AZUL    | ![#2550FF](https://dummyimage.com/50/2550FF/white?text=+) #2550FF |
| VERDE   | ![#1AA108](https://dummyimage.com/50/1AA108/white?text=+) #1AA108 |

AMARELO — Representa criatividade, destaque e energia.

AZUL — Transmite inovação, tecnologia e conexão com o azul da bandeira brasileira.

VERDE — Simboliza brasilidade, diversidade e crescimento.

A combinação dessas cores cria uma identidade vibrante e moderna, alinhada à proposta da plataforma de valorizar jogos brasileiros.

### TIPOGRAFIA

A fonte principal utilizada é a Montserrat e Lexend.

Sua escolha foi baseada em características como:

- Fácil leitura
- Visual moderno
- Boa acessibilidade
- Clareza em diferentes tamanhos de tela

A tipografia fortalece a proposta tecnológica da plataforma e melhora a experiência de navegação do usuário.

## DESENVOLVIMENTO FRONT-END

### UTILIZAÇÃO DO BOOTSTRAP

O framework Bootstrap foi utilizado para estruturar e organizar o layout das páginas.

Entre os principais recursos utilizados estão:

- Containers responsivos
- Sistema de Grid
- Navbar
- Cards
- Responsividade com colunas adaptáveis
- Espaçamentos e alinhamentos utilitários

Esses recursos facilitaram o desenvolvimento de uma interface moderna, organizada e compatível com diferentes resoluções de tela.

### ACESSIBILIDADE

A interface utiliza uma paleta inspirada nas cores do Brasil, reforçando a proposta da plataforma de valorizar jogos desenvolvidos no país. O amarelo aparece como cor de destaque para ações importantes e elementos de navegação, criando contraste com o fundo escuro e ajudando a direcionar a atenção do usuário. Além de fortalecer a identidade visual da plataforma, essa escolha conecta o produto à cultura brasileira de forma sutil e reconhecível.

Durante o desenvolvimento, aplicamos boas práticas de acessibilidade para garantir melhor usabilidade e inclusão digital.

#### RECURSOS IMPLEMENTADOS

- Uso correto de tags semânticas
- Contraste adequado entre texto e fundo
- Navegação simples e intuitiva
- Textos alternativos para imagens
- Fontes legíveis
- Estrutura clara de conteúdo

## LOJA EM REACT

Na fase de React, a área da Loja (catálogo, página do jogo e carrinho) foi reconstruída com React, reaproveitando o CSS e as imagens da plataforma. Por isso a loja nova mantém a mesma aparência do resto do site.

### O que a loja faz

- Catálogo com 23 jogos, filtro por categoria, busca por nome (ignora acento e maiúscula), ordenação e paginação de 8 em 8
- Filtros guardados no endereço (por exemplo, `/#/?categoria=Terror&pagina=2`), então o link pode ser compartilhado
- Página de cada jogo, com descrição, galeria, avaliações, estúdio e requisitos do sistema
- Carrinho lateral e página do carrinho, com cupom `FIAP10` (10% de desconto) e finalização de um pedido de demonstração
- Favoritos com contador e filtro próprio, salvos no navegador
- Carrinho, cupom e jogos cadastrados no formulário Desenvolvedor compartilhados com as páginas estáticas, pelas mesmas chaves do `localStorage`

### Tecnologias

React 19, React Router, Vite, Bootstrap 5, Vitest e Testing Library.

### Como rodar a loja

O código fica na pasta [`loja-react/`](loja-react/README.md). Dentro dela:

```bash
npm install     # instala as dependências (só na primeira vez)
npm run dev     # servidor de desenvolvimento
npm test        # roda os 76 testes automatizados
npm run build   # gera a versão de produção na pasta dist
```

Os links Home, Desenvolvedor e Suporte da loja apontam para a plataforma estática. Quando a loja é publicada fora do GitHub Pages (por exemplo, na Vercel), defina a variável de ambiente `VITE_URL_PLATAFORMA` com o endereço da plataforma.

### Publicação

O site é publicado no GitHub Pages pelo GitHub Actions (arquivo `.github/workflows/publicar-pages.yml`). A cada alteração na branch `main`, o workflow instala as dependências, roda os testes, gera a loja e publica a plataforma estática na raiz do site e a loja em React em `/loja/`. Se algum teste falhar, nada é publicado.

No workflow, a variável `VITE_BASE` define a pasta em que a loja fica no endereço. Sem ela, a loja usa a raiz (`/`), que é o valor certo para o `npm run dev` e para hospedagens como a Vercel.

### Observação sobre o ambiente local

A plataforma estática, aberta direto no computador (por exemplo, com o Live Server), não enxerga a loja em React: o link **Loja** leva à pasta `loja/`, que só existe no site publicado. Para ver a loja localmente, rode `npm run dev` dentro de `loja-react/`.
