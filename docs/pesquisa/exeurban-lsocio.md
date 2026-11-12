# Pesquisa: Exeurban e L. Socio

Levantamento feito em 12/11/2026 para os cartões da home e as futuras páginas de case. Tudo abaixo foi lido nos próprios sites, com o Chromium do Playwright. Textos em inglês estão citados como aparecem. O que não está escrito no site aparece como "não informado". Não há preços em nenhum dos dois sites.

Páginas lidas:

- Exeurban: https://exeurban.com/, /services/, /about-us/, /portfolio/, /contact/, /privacy-policy/ e as três páginas de projeto ligadas em /services/.
- L. Socio: https://lsocio.com/, /services/, /about-me/, /contact/. O sitemap (https://lsocio.com/page-sitemap.xml) lista só essas quatro páginas.

## Exeurban

| Item | Dado | Onde aparece |
|---|---|---|
| Nome da marca | "EXE URBAN" (logo, título das páginas e hero). Razão social no rodapé: "EXE URBAN INC.". Os textos das páginas de projeto também escrevem "EXEURBAN". | https://exeurban.com/ (logo, hero e rodapé); https://exeurban.com/services/mclean-toronto-renovation-project/ |
| O que faz | "EXE URBAN INC. is a professional architectural practice providing a broad spectrum of design services including, initial budgeting and conceptual design to permit submission, finishes selection, contract administration and project management." Abaixo do logo: "Architecture, Interior Design & Cabinetry". | Rodapé de todas as páginas, por exemplo https://exeurban.com/ |
| Cidade e país | Dois escritórios: Mississauga, Ontario, Canada (55 Village Centre Pl, Unit 200) e Toronto, Ontario, Canada (592 Mount Pleasant Road). A página de contato diz ainda: "We offer our services across Ontario including the GTA, cottage country, and beyond, to include other provinces." | Rodapé (bloco "Locations") e https://exeurban.com/contact/ |
| Idiomas | Só inglês. `lang="en-CA"`, sem seletor de idioma e sem `hreflang`. /fr/ e /pt/ respondem 404. | https://exeurban.com/ |
| Título do hero | H1: "Transform your space with EXE URBAN" (no HTML há uma quebra de linha antes de "with"). Subtítulo: "Bring your residential project to life with our tailored architecture and interior design solutions." | https://exeurban.com/ |
| Crédito no rodapé | "Website design by L. Socio Digital Marketing", com link para https://lsocio.com/. Linha completa: "© Copyright 2025 \| All Rights Reserved \| Privacy Policy \| Website design by L. Socio Digital Marketing". | Rodapé de todas as páginas |

### Seções e funcionalidades visíveis

- Menu: Home, Services, About us, Portfolio, Contact. No celular vira menu hambúrguer. (https://exeurban.com/)
- Home: hero com ilustração em traço; três colunas de serviços com foto e lista (Architecture, Interior Design, Cabinetry Design) e botão "Our services"; bloco "Client Satisfaction is Our Top Priority" com botão "Contact Us". O HTML também tem três títulos ocultos ("Renovations", "Addition & new build", "Sustainable Design") que não aparecem na tela. (https://exeurban.com/)
- Services: textos de Architecture, Interior Design, Custom Cabinetry, Sustainable Design e Design Process, mais links para três projetos. (https://exeurban.com/services/)
- Páginas de projeto, com fotos de antes e depois ("Before" e "Final" ou "After"; Cluny e Gibson também mostram "Renovation Progress"):
  - Cluny Dr. Toronto Renovation Project (https://exeurban.com/services/cluny-dr-toronto-renovation-project/)
  - Gibson St. Toronto Renovation Project (https://exeurban.com/services/gibson-st-toronto-renovation-project/)
  - McLean Toronto Renovation Project (https://exeurban.com/services/mclean-toronto-renovation-project/)
- Portfolio: três galerias de fotos com lightbox: Architecture (8 imagens), Interior Design (16) e Custom Cabinetry Design (8). (https://exeurban.com/portfolio/)
- About us: textos "About Us" e "Our History", com os fundadores citados no site, Nicola Osborn e James Reinke, e o trecho "Since 2001, we have been providing clients with a residential niche market...". Há um bloco "Memberships" com quatro logos sem texto alternativo. (https://exeurban.com/about-us/)
- Contact: formulário "Request a Consultation" com os campos Name, Email e Message, e o botão "Send"; telefone clicável; endereço dos dois escritórios. Não há mapa embutido. (https://exeurban.com/contact/)
- Rodapé: telefone clicável; links para Instagram, Houzz e LinkedIn; página de política de privacidade. (https://exeurban.com/privacy-policy/)
- Não aparecem: reservas ou agendamento online, loja, blog (a API de posts do WordPress volta vazia), área de cliente, mapa, WhatsApp, banner de cookies.
- Observação técnica, lida nas meta tags `generator`: WordPress, Elementor, All in One SEO e Site Kit by Google. A página também carrega o Google Tag Manager.

## L. Socio

| Item | Dado | Onde aparece |
|---|---|---|
| Nome da marca | "L. Socio Digital Marketing" (título das páginas, `og:site_name` e copyright). O logo mostra "L.SOCIO" e, embaixo, "Digital Marketing". Um depoimento escreve "L.Socio". | https://lsocio.com/ (logo e rodapé); https://lsocio.com/contact/ |
| O que faz | "I help business owners take control of their marketing initiatives and grow their businesses with performance-driven digital marketing solutions." Na página About: "I'm an independent digital marketing strategist based in Halifax, Nova Scotia." | Rodapé de todas as páginas; https://lsocio.com/about-me/ |
| Cidade e país | Cidade: Halifax, Nova Scotia ("based in Halifax, Nova Scotia"). O país não aparece junto da cidade. A mesma frase diz que atende "service-based businesses across Canada". | https://lsocio.com/about-me/ |
| Idiomas | Só inglês. `lang="en-US"`, sem seletor de idioma e sem `hreflang`. /fr/, /pt/ e /pt-br/ respondem 404. | https://lsocio.com/ |
| Título do hero | H1: "Agency-level marketing. Without the agency" (o ponto final dourado que aparece na tela é decorativo e não faz parte do texto). Selos acima: "GOOGLE PARTNER", "★★★★★ 5-STAR REVIEWS", "IN MARKETING SINCE 2009". | https://lsocio.com/ |
| Crédito no rodapé | Nenhum crédito de terceiros. Só "© 2026 L. Socio Digital Marketing". | Rodapé de todas as páginas |

### Seções e funcionalidades visíveis

- Menu: Services, About Me e o botão "Contact". No celular vira menu hambúrguer. (https://lsocio.com/)
- Home, na ordem: hero com botão "Book a 30-minute call" e selo giratório "GET IN TOUCH · BOOK A CALL"; carrossel de fotos de clientes (Swiper); "Businesses that have trusted me" (grade com 12 logos); "Why businesses work with me"; "Certified and partnered" (logos de parceiros); "What sets me apart from agencies" (tabela que compara "Typical agency" com "Working with me"); "What I do" (quatro serviços); "What my clients have to say"; "How we'll work together" (quatro etapas); faixa final "Talk to the person who'll do the work." (https://lsocio.com/)
- "What my clients have to say" carrega um widget do Trustindex. Ele não apareceu no navegador headless usado aqui, então o bloco ficou vazio nas capturas. Não consegui confirmar o que um visitante vê. (https://lsocio.com/)
- Services: quatro serviços detalhados (Digital Strategy & Execution, Paid Media, Analytics & Reporting, SEO & AI Search), "Your dedicated team: me", "Partnerships that matter" e um processo em três etapas. (https://lsocio.com/services/)
- About Me: apresentação ("Hi, I'm Lucas. Your growth is my job"), filosofia de trabalho, "How I work with every client" e "Get to know me". Um trecho aparece na tela literalmente assim: "[10] Google reviews and counting, all five stars." (https://lsocio.com/about-me/)
- Contact: formulário com os campos Your name, Your email address, Your job title, Your company name, Company website e "How can I help?", e o botão "Send message". Ao lado, dois depoimentos com nome e empresa. (https://lsocio.com/contact/)
- Os botões de agendamento ("Book a 30-minute call", "Book a call", "Meet me on a call", "Book a session with me") levam para a página Contact, para a âncora `#contact` ou para um link de e-mail (`mailto`). Não há ferramenta de agendamento embutida.
- Seções ocultas no HTML, que não aparecem na tela: "Real clients. Real results" na home e "Real results from real clients" em Services, com cartões de texto provisório ("[Client name]", "[Client] · Paid Media"). O link "Learn more" dessas seções aponta para https://lsocio.com/case-studies/, que responde 404.
- Links do rodapé: "Contact" aponta para `http://contact/` (link quebrado); "Terms & Conditions" aponta para a âncora `/#terms`; "Privacy Policy" abre uma página 404 com um rodapé de layout antigo.
- Não aparecem: loja, blog (a API de posts do WordPress volta vazia), área de cliente, mapa, WhatsApp, banner de cookies.
- Observação técnica: WordPress com Elementor (meta `generator`), Swiper via cdn.jsdelivr.net, Trustindex e Google Tag Manager.

### Menções a Bumavit, Exeurban e Yacht Day

Busquei nas quatro páginas do site, no HTML e na busca do WordPress (https://lsocio.com/wp-json/wp/v2/search).

- Bumavit: não aparece em nenhum lugar.
- Exeurban: não aparece em nenhum texto. Aparece só como imagem no carrossel logo abaixo do hero, na home e em Services: o arquivo `Homepage-EXE-Urban.png` é a foto de uma casa com o logo "EXE URBAN" por cima. A imagem não tem texto alternativo e o slide leva para /about-me/. A Exeurban não está na grade de logos "Businesses that have trusted me". (https://lsocio.com/, https://lsocio.com/services/)
- Yacht Day: aparece em dois lugares, os dois como imagem, sem texto alternativo:
  - no mesmo carrossel, com o arquivo `Homepage-Yacht-Day.png`: foto de um grupo num barco diante do skyline de Toronto, com o logo "YACHT DAY Luxury Rentals" e as caixas de busca "BOAT RENTAL", "LUXURY YACHT" e "TORONTO BOAT RENTAL" (https://lsocio.com/, https://lsocio.com/services/);
  - na grade de logos da seção "Businesses that have trusted me", com o arquivo `Yacht-Day.png`, logo "YACHT DAY Luxury Rentals" (https://lsocio.com/). O texto da seção, copiado do site: "Businesses that have trusted me. My clients work with me month to month and stay because the results are tangible. Most have been with me for over two years."

## Capturas

Feitas com Playwright e Chromium em 12/11/2026, depois de carregar a página, rolar até o fim para disparar imagens e animações e esperar alguns segundos parada no topo. Nenhum dos dois sites mostrou banner de cookies ou pop-up. O Google Tag Manager não carregou nas capturas (bloqueado pela rede do ambiente); ele não muda o layout visível.

| Arquivo | Página | Janela |
|---|---|---|
| [img/exeurban-desktop.png](img/exeurban-desktop.png) | https://exeurban.com/ | 1600x973, deviceScaleFactor 1, primeira dobra |
| [img/exeurban-mobile.png](img/exeurban-mobile.png) | https://exeurban.com/ | 390x844, deviceScaleFactor 2 (arquivo 780x1688), primeira dobra |
| [img/exeurban-full.png](img/exeurban-full.png) | https://exeurban.com/ | 1600 de largura, deviceScaleFactor 1, página inteira (1600x3095) |
| [img/lsocio-desktop.png](img/lsocio-desktop.png) | https://lsocio.com/ | 1600x973, deviceScaleFactor 1, primeira dobra |
| [img/lsocio-mobile.png](img/lsocio-mobile.png) | https://lsocio.com/ | 390x844, deviceScaleFactor 2 (arquivo 780x1688), primeira dobra |
| [img/lsocio-full.png](img/lsocio-full.png) | https://lsocio.com/ | 1600 de largura, deviceScaleFactor 1, página inteira (1600x6621) |

Na L. Socio, o carrossel abaixo do hero e o selo "GET IN TOUCH · BOOK A CALL" giram o tempo todo, então cada captura mostra um momento desse movimento. O bloco "What my clients have to say" aparece vazio na captura de página inteira (ver acima).
