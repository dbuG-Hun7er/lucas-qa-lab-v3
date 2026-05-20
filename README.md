# Lucas QA Lab v6 — Multipage

Site estático multipage do dbuG-Hun7er / Lucas F. de Lima.

## Estrutura

- Home profissional
- Sobre
- QA
- Projetos
- Cybersecurity
- Taverna QA
- Games & Sistemas
- Aion 2
- Livros recomendados
- Meu livro: O QA Lendário
- Downloads
- Contato

## Como rodar

Abra `index.html` no navegador ou use Live Server no VS Code.

## Como publicar

Suba todos os arquivos para um repositório GitHub e ative:

Settings > Pages > Deploy from a branch > main > /root

## Observações

- A página de livros usa imagens remotas da Amazon CDN. Se alguma capa não carregar, o placeholder local aparece.
- Os HTMLs de leitura estão em `assets/docs/leituras-html/`.

## Privacidade do manuscrito

O manuscrito do livro **não** fica dentro de `assets/` nem é incluído como download público. Caso seja necessário manter uma cópia local, use `private-docs/`, que está no `.gitignore`.

Antes de publicar, confirme que `assets/docs/` contém apenas currículo, storytelling e HTMLs de leitura.

## v8

Removido o bloco de observação/curadoria da página de livros para deixar a seção mais direta e profissional.

## v9

Páginas QA e Cyber reescritas com mais profundidade e blocos clicáveis/expansíveis usando `<details>` e `<summary>`.

## v10

Páginas QA e Cyber refeitas com cards grandes clicáveis, explicações detalhadas e melhor apresentação visual.

## v11

Removido o bloco 'Arquitetura do site' da home e página Aion 2 complementada com cards clicáveis mais completos.

## v12

Auditoria técnica aplicada: SEO/OG/canonical, `robots.txt`, `sitemap.xml`, acessibilidade de navegação, foco visível, imagens otimizadas e reforço de privacidade do manuscrito.
