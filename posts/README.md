# Como publicar um post

Um post é **um arquivo Markdown** em `posts/`. Você não precisa editar HTML, CSS
nem mexer no gerador.

```sh
cp posts/_TEMPLATE.md posts/meu-post.md   # 1. copie o template
# 2. escreva
node scripts/build-blog.mjs               # 3. gere o HTML
```

O passo 3 regenera `blog/index.html`, `blog/<slug>/index.html`, `blog/feed.xml` e
`sitemap.xml`. **Faça commit do `.md` e de tudo que o build alterou** — o site é
estático, o HTML gerado é o que vai ao ar.

Abra um branch e um PR. Quem publica é o fundador, com o merge.

## Frontmatter

O bloco entre `---` no topo do arquivo.

| Campo | Obrigatório | O que é |
|---|---|---|
| `title` | sim | Vira o `<h1>`, o `<title>` e o título no compartilhamento. |
| `slug` | sim | Define a URL: `slug: seo-local` → `/blog/seo-local/`. |
| `date` | sim | `AAAA-MM-DD`. **É a data efetiva de publicação**: com data futura o post fica fora do build (não aparece na listagem, no RSS nem no sitemap) até a data chegar — aí o build diário publica sozinho. Também ordena a listagem e alimenta o RSS e o `lastmod` do sitemap. |
| `category` | sim | Uma de: `SEO`, `Performance`, `Negócios`. Outro valor quebra o build de propósito. |
| `cover` | não | Tinta da capa e do card: `cyan` (padrão) ou `rust`. Alterne com o post anterior na listagem; é ritmo visual, não categoria. |
| `excerpt` | sim | Meta description + card da listagem + descrição no RSS. Escreva para ser lida no Google. |
| `keyword` | não | Termo-alvo. Documenta a intenção do post; não é publicado. |
| `image` | não | OG image própria, caminho a partir da raiz (`/og-meu-post.png`). Sem isso usa `/og.png`. |
| `updated` | não | `AAAA-MM-DD` de uma revisão relevante. Vira `dateModified` e o `lastmod` do sitemap. |
| `draft` | não | `draft: true` mantém o texto no repositório **sem publicar**. |

Não existe campo de data por extenso: "01 Jul 2026" é derivado de `date`.
Não existe campo de canonical: a URL canônica é montada sozinha.

## Agendamento (posts "[PUBLICAR dd/mm]")

Quem agenda a publicação é o **`date` do frontmatter**, não o título do PR.
O fluxo é: escreva o `date` com a data desejada de publicação, faça o merge
do `.md` quando quiser — o post fica retido pelo build enquanto a data não
chega, e o workflow diário (`build-blog.yml`, 12:00 UTC) publica sozinho no
dia. O rótulo "[PUBLICAR dd/mm]" no título do PR é só comunicação humana:
**a data do título e a do frontmatter precisam ser a mesma**. Já houve post
com título pedindo 10/09 e frontmatter marcando 29/09 — o que vale é o
frontmatter, e a divergência atrasa a publicação sem ninguém perceber.

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
- Canônica de post: `https://bumavit.com.br/blog/<slug>/` — **com barra final,
  sem `.html`**. O arquivo servido é `/blog/<slug>/index.html`.
- Canônica da listagem: `https://bumavit.com.br/blog/` — **com barra, sem
  `index.html`**. As duas formas respondem, mas só essa é canônica.
- `bragavaas.github.io` **nunca** é uma URL nossa.
- Link interno em post: **sempre absoluto** (`https://bumavit.com.br/sobre.html`,
  `https://bumavit.com.br/blog/outro-post/`). O post é servido em
  `/blog/<slug>/`, um nível abaixo de onde parece — um link relativo como
  `../sobre.html` resolve para `/blog/sobre.html` (404).

**Trocar o `slug` de um post publicado quebra a URL** e perde o ranqueamento
dela. Depois de no ar, o slug é definitivo — se precisar mudar mesmo assim,
fale com o engenheiro antes, porque exige um redirecionamento.

## Quem roda o build

**O redator envia só o `.md` no PR.** Depois do merge, o GitHub Actions
(`.github/workflows/build-blog.yml`) roda o build e commita o resultado
(`blog/`, `sitemap.xml`, `blog/feed.xml`, `images/posts/`) sozinho — em todo
push que toque `posts/` e uma vez por dia (12:00 UTC), que é o que publica os
posts agendados quando o `date` chega. Rodar `node scripts/build-blog.mjs`
localmente continua valendo como validação antes do PR.

## O que já é automático

Título e meta description, Open Graph e Twitter card, canonical, JSON-LD
(`BlogPosting`, `BreadcrumbList`, `Organization`, `ProfessionalService`),
breadcrumb, tempo de leitura, posts relacionados, navegação anterior/próximo,
botões de compartilhar, entrada no RSS e no sitemap.

Você escreve o texto. O resto é o gerador.

## Uma coisa que não é automática

As traduções EN/ES da interface do post são geradas, mas **o texto do artigo
continua em português** nos três idiomas. É intencional: o blog é PT-BR.
