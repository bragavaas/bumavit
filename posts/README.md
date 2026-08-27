# Como publicar um post

Um post é **um arquivo Markdown** em `posts/`. Você não precisa editar HTML, CSS
nem mexer no gerador.

```sh
cp posts/_TEMPLATE.md posts/meu-post.md   # 1. copie o template
# 2. escreva
node scripts/build-blog.mjs               # 3. gere o HTML
```

O passo 3 regenera `blog/index.html`, `blog/<slug>.html`, `blog/feed.xml` e
`sitemap.xml`. **Faça commit do `.md` e de tudo que o build alterou** — o site é
estático, o HTML gerado é o que vai ao ar.

Abra um branch e um PR. Quem publica é o fundador, com o merge.

## Frontmatter

O bloco entre `---` no topo do arquivo.

| Campo | Obrigatório | O que é |
|---|---|---|
| `title` | sim | Vira o `<h1>`, o `<title>` e o título no compartilhamento. |
| `slug` | sim | Define a URL: `slug: seo-local` → `/blog/seo-local.html`. |
| `date` | sim | `AAAA-MM-DD`. Ordena a listagem e alimenta o RSS e o `lastmod` do sitemap. |
| `category` | sim | Uma de: `SEO`, `Performance`, `Negócios`. Outro valor quebra o build de propósito. |
| `excerpt` | sim | Meta description + card da listagem + descrição no RSS. Escreva para ser lida no Google. |
| `keyword` | não | Termo-alvo. Documenta a intenção do post; não é publicado. |
| `image` | não | OG image própria, caminho a partir da raiz (`/og-meu-post.png`). Sem isso usa `/og.png`. |
| `updated` | não | `AAAA-MM-DD` de uma revisão relevante. Vira `dateModified` e o `lastmod` do sitemap. |
| `draft` | não | `draft: true` mantém o texto no repositório **sem publicar**. |

Não existe campo de data por extenso: "01 Jul 2026" é derivado de `date`.
Não existe campo de canonical: a URL canônica é montada sozinha.

O build falha, com mensagem, se faltar campo obrigatório, se a data não estiver
em `AAAA-MM-DD`, se a categoria não existir ou se dois posts tiverem o mesmo
`slug`. Se `node scripts/build-blog.mjs` rodar sem erro, o post está válido.

## Markdown suportado

`## H2`, `### H3`, parágrafos, `**negrito**`, `*itálico*`, `[link](url)`,
listas com `-` e listas numeradas.

Não há suporte a tabela, imagem inline, citação ou bloco de código. Se precisar
de um deles, peça — é mudança no gerador, não no seu texto.

Separe todo bloco por **uma linha em branco**. Parágrafo colado no `##` vira
parte do parágrafo anterior.

## Regras de URL (não improvise aqui)

- O site é servido na **raiz** de `https://bumavit.com.br`. Não existe
  `/bumavit/` em lugar nenhum.
- Canônica de post: `https://bumavit.com.br/blog/<slug>.html`
- Canônica da listagem: `https://bumavit.com.br/blog/` — **com barra, sem
  `index.html`**. As duas formas respondem, mas só essa é canônica.
- `bragavaas.github.io` **nunca** é uma URL nossa.
- Link interno para outra página do site: relativo (`../sobre.html`,
  `./outro-post.html`). Absoluto só para fora do site.

**Trocar o `slug` de um post publicado quebra a URL** e perde o ranqueamento
dela. Depois de no ar, o slug é definitivo — se precisar mudar mesmo assim,
fale com o engenheiro antes, porque exige um redirecionamento.

## O que já é automático

Título e meta description, Open Graph e Twitter card, canonical, JSON-LD
(`BlogPosting`, `BreadcrumbList`, `Organization`, `ProfessionalService`),
breadcrumb, tempo de leitura, posts relacionados, navegação anterior/próximo,
botões de compartilhar, entrada no RSS e no sitemap.

Você escreve o texto. O resto é o gerador.

## Uma coisa que não é automática

As traduções EN/ES da interface do post são geradas, mas **o texto do artigo
continua em português** nos três idiomas. É intencional: o blog é PT-BR.
