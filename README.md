![Logo da Iara Games](assets/images/logo-iara-games.png)

# Iara Games

A Iara Games é uma loja fictícia dedicada a jogos brasileiros. O projeto da faculdade reúne a Home e as páginas institucionais em HTML, CSS e JavaScript, uma loja em React e um mapa interativo para explorar jogos por estado.

## Fase 7 · Explore jogos pelo Brasil

Na Home, a seção **Explore jogos pelo Brasil** tem um formulário em React integrado à API pública do ViaCEP. A pessoa digita um CEP, vê o endereço retornado e encontra seu estado no mapa, junto dos jogos em destaque.

### Como a consulta funciona

1. Ao clicar em **Buscar**, o formulário remove o hífen e os demais caracteres que não são dígitos. A consulta só é feita quando restam oito dígitos.
2. O navegador faz uma requisição GET para `https://viacep.com.br/ws/{cep}/json/`. A interface mostra **Consultando CEP…** enquanto aguarda a resposta.
3. Quando o CEP é encontrado, o formulário exibe os dados disponíveis do endereço, como logradouro, bairro, cidade e UF. O mapa usa o código IBGE retornado pela API para selecionar o estado, com o nome do estado como alternativa.
4. A seção mostra o estado selecionado, a região e os destaques do catálogo. Uma linha liga o estado aos jogos. O formulário também exibe mensagens para CEP incompleto, CEP não encontrado ou falha na consulta.

O formulário fica em [`loja-react/src/consulta-cep.jsx`](loja-react/src/consulta-cep.jsx). A seleção do mapa e os jogos em destaque ficam em [`assets/js/mapa.js`](assets/js/mapa.js). [Documentação do ViaCEP](https://viacep.com.br/)

### Outras melhorias da Fase 7

- Contornos do mapa atualizados com a malha do IBGE.
- Cada estado tem uma arte fixa de um jogo do catálogo. Ao passar o mouse ou navegar com o teclado, o mapa amplia e destaca o estado com a arte e um contorno luminoso.
- Ao clicar, o mapa seleciona o estado e atualiza os jogos ao lado.
- O carrossel principal da Home troca de imagem a cada três segundos.
- A loja exibe a quantidade total de jogos do catálogo no fim da página.

## Projeto no ar

- [Home da plataforma](https://fabriciogallo.github.io/iara-games/)
- [Loja em React](https://fabriciogallo.github.io/iara-games/loja/)

Esses links mostram a versão publicada no GitHub Pages. Quando a Fase 7 for integrada à `main`, o [workflow de publicação](.github/workflows/publicar-pages.yml) vai rodar os testes, gerar o build e publicar a atualização se as etapas anteriores passarem. O workflow publica a Home na raiz do site e a loja em `/loja/`.

## Como testar no computador

Para rodar a loja em desenvolvimento, use o Node.js 24. Execute estes comandos na raiz do repositório.

```powershell
npm.cmd --prefix loja-react ci
npm.cmd --prefix loja-react run dev
```

Abra o endereço mostrado pelo Vite. Para rodar os testes da loja, use `npm.cmd --prefix loja-react test`.

### Testar a Home, o CEP e a loja juntos

No Windows, com Node.js 24 e Python 3 instalados, execute os comandos abaixo no PowerShell a partir da raiz do repositório. O primeiro comando instala as dependências, o segundo gera a loja e o restante monta uma cópia de teste em uma pasta temporária.

```powershell
npm.cmd --prefix loja-react ci
npm.cmd --prefix loja-react run build -- --base /loja/

$site = Join-Path $env:TEMP ("iara-games-preview-" + (Get-Date -Format yyyyMMdd-HHmmss))
New-Item -ItemType Directory -Path "$site/loja" -Force | Out-Null
Copy-Item -Path index.html, assets, pages -Destination $site -Recurse
Copy-Item -Path "loja-react/dist/*" -Destination "$site/loja" -Recurse
python -m http.server 8000 --bind 127.0.0.1 --directory "$site"
```

1. Abra [http://127.0.0.1:8000](http://127.0.0.1:8000) e encontre a seção **Explore jogos pelo Brasil**.
2. Busque `01001-000`. Com acesso à internet, o resultado mostra Praça da Sé, em São Paulo (SP), e seleciona o estado no mapa.
3. Busque `123` para testar a validação de oito dígitos ou `99999-999` para testar o aviso de CEP não encontrado.
4. Clique em outro estado e siga o link do jogo em destaque para a loja. Confira o total de jogos abaixo da paginação.

## Loja em React

A loja reaproveita os estilos e as imagens da plataforma.

- Catálogo inicial com 23 jogos, busca por nome, filtros por categoria, ordenação e paginação.
- Filtros na URL, que permitem compartilhar uma busca, e favoritos salvos no navegador.
- Páginas de detalhes com informações dos jogos, galerias, avaliações e requisitos.
- Carrinho com cupom `FIAP10` e finalização de pedido de demonstração.
- Carrinho, cupom e jogos cadastrados pelo formulário Desenvolvedor compartilhados com as páginas estáticas pelo `localStorage`.

A loja usa React 19, React Router, Vite, Bootstrap 5, Vitest e Testing Library.

## Identidade visual e acessibilidade

A identidade visual combina tecnologia, games e brasilidade. O logotipo une a cauda inspirada na Iara do folclore brasileiro a um controle de videogame. A tipografia usa Montserrat e Lexend.

| Cor | Hex | Papel na identidade |
| --- | --- | --- |
| Amarelo | `#FFCB20` | Destaque, criatividade e energia |
| Azul | `#2550FF` | Tecnologia e referência ao azul da bandeira brasileira |
| Verde | `#1AA108` | Brasilidade, diversidade e crescimento |

O Bootstrap ajuda a organizar o layout em diferentes tamanhos de tela. A interface usa elementos semânticos, textos alternativos para imagens e foco visível. No formulário de CEP, as mensagens de erro e resultado também são anunciadas por leitores de tela.

## Integrantes

- Edu Eder Batagelo Rodrigues Carvalho
- Fabricio Costa Gallo
- Kauã Aurelio Silva
- Matheus Santos Matta
- Patrick de Souza Bigi dos Santos
