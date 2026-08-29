# BUMAVIT® — Landing Page

Landing page da Bumavit, software house brasileira — experiências digitais que movem negócios.

**Live:** https://bumavit.com.br/

## Stack

- HTML/CSS/JS estático — sem build, sem dependências de CDN
- [GSAP](https://gsap.com) + ScrollTrigger — animações e coreografia de scroll
- [Three.js](https://threejs.org) — esfera de partículas do hero (shaders customizados)
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll
- Fontes Clash Display + Satoshi (auto-hospedadas)

## Rodando localmente

```sh
python -m http.server 4173
# abra http://localhost:4173
```

## Estrutura

```
index.html                  — página principal (hero, serviços, projetos, clientes, FAQ, contato)
sobre.html                  — página do estúdio
estimador.html              — wizard "Monte seu projeto" (js/estimator.js)
404.html                    — página de erro personalizada
projetos/*.html             — páginas individuais de projeto (geradas)
blog/*.html                 — blog estático (gerado)
scripts/build-projects.mjs  — gerador das páginas de projeto
scripts/build-blog.mjs      — gerador do blog
css/style.css               — design system + responsivo + reduced-motion
js/i18n.js                  — traduções EN/ES + seletor de idioma (bandeiras na nav)
js/main.js                  — interações GSAP da home (preloader, menu, scroll, cursor, form, FAQ)
js/page.js                  — interações das páginas internas
js/scene.js                 — cena Three.js do hero
og.png / sitemap.xml / robots.txt — SEO
vendor/                     — bibliotecas locais
fonts/                      — woff2 auto-hospedadas
```

Para editar projetos, altere os dados em `scripts/build-projects.mjs` e rode o gerador.

## Blog

Posts são arquivos Markdown em `posts/*.md` com frontmatter (`title, slug, date,
dateLabel, category, excerpt`). Categorias: **SEO**, **Performance**, **Negócios**
(cores/gradientes em `css/style.css`, seletor `.bcov--*`; novas categorias entram no
mapa `CATS` de `scripts/build-blog.mjs`).

Publicar um post = criar o `.md` e rodar:

```sh
node scripts/build-blog.mjs
```

O gerador produz o archive (`blog/index.html` com destaque + filtro por categoria),
as páginas de post (capa por categoria, tempo de leitura, compartilhar, anterior/
próximo, relacionados, JSON-LD), o RSS (`blog/feed.xml`) e regenera o `sitemap.xml`
do site inteiro. Markdown suportado: `##`/`###`, **negrito**, *itálico*, listas e links.

## Idiomas (pt-BR / EN / ES)

O site é trilíngue via `js/i18n.js`: bandeiras no canto superior direito trocam o idioma
(gravado em `localStorage`, aplicado antes das animações). O conteúdo padrão do HTML é
pt-BR; EN/ES vivem em dicionários `seletor CSS → texto`:

- Textos comuns + página principal: `js/i18n.js`
- Páginas de projeto: campo `t: { en, es }` em `scripts/build-projects.mjs` (regerar após editar)
- Sobre: bloco `window.__pageI18n` inline em `sobre.html`
- Blog: interface traduzida; artigos permanecem em português

## Search Console — export de dados (gsc-export.mjs)

O script `scripts/gsc-export.mjs` autentica via conta de serviço e grava dois CSVs
em `data/gsc/` com cliques, impressões, CTR e posição média dos últimos 28 dias —
um por consulta e um por página.

**Pré-requisito:** conta de serviço do Google Cloud com a permissão
"Proprietário" (ou pelo menos "Restrito") na propriedade
`https://bumavit.com.br` no Search Console.

### Configurar a variável de ambiente

```sh
# Opção 1: ler o arquivo uma vez e exportar
export GSC_SERVICE_ACCOUNT_JSON="$(cat /caminho/para/service-account.json)"

# Opção 2: copiar o conteúdo do JSON e colar direto (sem quebra de linha)
export GSC_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN RSA PRIVATE KEY-----\n...","client_email":"bumavit-gsc@<projeto>.iam.gserviceaccount.com",...}'
```

> A variável existe apenas na sessão do terminal. Nenhuma chave é gravada em
> arquivo ou commitada no repositório. `data/gsc/` está no `.gitignore`.

### Rodar manualmente

```sh
node scripts/gsc-export.mjs
```

Saída:

```
data/gsc/2026-08-29_queries.csv   ← desempenho por consulta
data/gsc/2026-08-29_pages.csv     ← desempenho por página
```

### Agendar (Linux/macOS — cron)

Adicione ao crontab (`crontab -e`) para rodar toda segunda-feira às 08:00:

```cron
0 8 * * 1 GSC_SERVICE_ACCOUNT_JSON="$(cat /caminho/para/service-account.json)" /usr/local/bin/node /caminho/para/repo/scripts/gsc-export.mjs >> /var/log/gsc-export.log 2>&1
```

### Agendar (Windows — Agendador de Tarefas)

Crie uma tarefa que execute:

- **Programa:** `node.exe`
- **Argumentos:** `C:\caminho\para\repo\scripts\gsc-export.mjs`
- **Variável de ambiente** (aba "Ambiente"): `GSC_SERVICE_ACCOUNT_JSON` com o
  conteúdo do JSON (sem aspas externas).

---

## Configuração pendente (troque os placeholders)

- ~~Formulário~~: configurado (Formspree `mbdvvyro`, entrega em bragavaas@gmail.com)
- ~~WhatsApp~~: configurado (+55 21 99723-5420) — links `wa.me` em `index.html` e `WHATSAPP` em `js/estimator.js`
- **Google Analytics**: descomente o bloco GA4 no `<head>` de `index.html` e insira seu
  Measurement ID
- **Estimador**: preços calculados por horas × `RATE` (R$90/h). Ajuste `RATE`, as horas/dias
  por tipo em `PRICING`, as horas por funcionalidade em `FEATURES`, o custo de página
  adicional em `EXTRA_PAGE` e o número de WhatsApp em `WHATSAPP` — tudo no topo de
  `js/estimator.js`. Site institucional: pacote de 5 páginas, adicionais via slider.
