# Lucas QA Lab

Site estático multipage de Lucas F. de Lima, também assinado como dbuG-Hun7er.

O projeto funciona como portfólio profissional em Quality Assurance, automação de testes, estudos de cybersecurity, projetos, livros e materiais públicos de apoio. A proposta é manter uma base simples, publicável em GitHub Pages, com HTML, CSS e JavaScript puro.

## Páginas

- `index.html`: home e visão geral do lab
- `sobre.html`: trajetória profissional
- `qa.html`: mapa de estudos e prática em Quality Assurance
- `projetos.html`: projetos técnicos e repositórios
- `cyber.html`: segurança aplicada ao olhar de QA
- `livros.html`: curadoria de livros e apresentação de O QA Lendário
- `downloads.html`: currículo, storytelling e leituras HTML
- `contato.html`: links profissionais

As páginas legadas `taverna.html`, `games.html` e `aion2.html` permanecem no repositório, mas não fazem parte da navegação nem do sitemap principal. `meu-livro.html` redireciona para a seção correspondente em `livros.html`.

## Estrutura

```text
assets/
  css/main.css
  js/main.js
  docs/
    Lucas_F_de_Lima_CV.pdf
    storytelling_lucas_corporativo.pdf
  img/
downloads/
  leituras-html/
private-docs/
private-assets/
```

## Como rodar

Abra `index.html` no navegador ou use a extensão Live Server no VS Code.

Como é um site estático, não há etapa de build.

## Publicação

Para publicar no GitHub Pages:

1. Envie os arquivos para o repositório.
2. Acesse `Settings > Pages`.
3. Escolha `Deploy from a branch`.
4. Selecione `main` e `/root`.

## SEO e compartilhamento

O projeto inclui:

- Metatags de descrição por página
- Canonical URLs
- Open Graph básico
- Favicon
- `sitemap.xml`
- `robots.txt`

Antes de publicar, rode:

```bash
git status --short
git ls-files
```

