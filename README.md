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
index.html                  — página principal
projetos/*.html             — páginas individuais de projeto (geradas)
scripts/build-projects.mjs  — gerador das páginas de projeto (node scripts/build-projects.mjs)
css/style.css               — design system + responsivo + reduced-motion
js/main.js                  — interações GSAP da home (preloader, menu, scroll, cursor)
js/page.js                  — interações das páginas de projeto
js/scene.js                 — cena Three.js do hero
vendor/                     — bibliotecas locais
fonts/                      — woff2 auto-hospedadas
```

Para editar o conteúdo dos projetos, altere os dados em `scripts/build-projects.mjs` e rode o gerador novamente.
