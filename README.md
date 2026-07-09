# BUMAVIT® — Landing Page

Landing page da Bumavit, software house brasileira — experiências digitais que movem negócios.

**Live:** https://bragavaas.github.io/bumavit/

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

Para editar projetos ou posts do blog, altere os dados em `scripts/build-projects.mjs` /
`scripts/build-blog.mjs` e rode o gerador (`node scripts/<arquivo>`).

## Idiomas (pt-BR / EN / ES)

O site é trilíngue via `js/i18n.js`: bandeiras no canto superior direito trocam o idioma
(gravado em `localStorage`, aplicado antes das animações). O conteúdo padrão do HTML é
pt-BR; EN/ES vivem em dicionários `seletor CSS → texto`:

- Textos comuns + página principal: `js/i18n.js`
- Páginas de projeto: campo `t: { en, es }` em `scripts/build-projects.mjs` (regerar após editar)
- Sobre: bloco `window.__pageI18n` inline em `sobre.html`
- Blog: interface traduzida; artigos permanecem em português

## Configuração pendente (troque os placeholders)

- **Formulário**: crie um form em [formspree.io](https://formspree.io) e troque `SEU_FORM_ID`
  no `action` do formulário em `index.html`
- **WhatsApp**: troque `5511999999999` pelos número real (links `wa.me` em `index.html`)
- **Google Analytics**: descomente o bloco GA4 no `<head>` de `index.html` e insira seu
  Measurement ID
- **Estimador**: ajuste a tabela de valores em `PRICING` (e o número de WhatsApp em
  `WHATSAPP`) no topo de `js/estimator.js`
