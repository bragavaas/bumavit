# Faixas de preço da Bumavit

> Gerado por `scripts/build-pricing.mjs` a partir de `js/estimator.js` em 2026-10-07.
> Não edite à mão: mude o estimador e rode o script. O estimador é a fonte de verdade.

Este é o único documento de onde um agente de conteúdo (blog, redes, Post do Google, portfólio) pode tirar um valor em reais. Número que não está aqui não existe.

## Como o estimador calcula

- Preço = horas estimadas × R$ 90/hora. Cada tipo de projeto tem uma faixa de horas; cada funcionalidade soma horas e dias.
- Prazo em dias corridos de produção, contados a partir do início do trabalho, com o conteúdo (textos, fotos, produtos) já em mãos.
- Prazo "é pra ontem" multiplica o preço por 1,35 (35% a mais). Os outros prazos não mudam o preço.
- Site institucional inclui 5 páginas (Home, Sobre, Serviços, Portfólio e Contato); cada página a mais soma 1,4 a 1,8 horas (R$ 130 a R$ 160) e 0,4 dia. O estimador aceita até 15 páginas.
- Valores arredondados para a dezena, como o estimador mostra.

## Faixas por tipo de projeto

Base = tipo escolhido, sem funcionalidade extra, prazo normal. Máximo = todas as funcionalidades do estimador marcadas. Urgente = máximo × 1,35.

| Tipo | Base | Prazo base | Máximo | Prazo máximo | Máximo urgente |
|---|---|---|---|---|---|
| Site institucional | R$ 1.800 a R$ 2.500 | 8 a 13 dias | R$ 5.850 a R$ 8.620 | 21 a 37 dias | R$ 11.640 |
| Loja virtual | R$ 3.240 a R$ 4.590 | 18 a 25 dias | R$ 6.480 a R$ 9.630 | 30 a 47 dias | R$ 13.000 |
| Aplicativo | R$ 5.760 a R$ 7.830 | 29 a 39 dias | R$ 10.350 a R$ 14.670 | 48 a 69 dias | R$ 19.800 |
| Sistema sob medida | R$ 7.110 a R$ 10.620 | 39 a 50 dias | R$ 11.880 a R$ 17.820 | 60 a 82 dias | R$ 24.060 |

Site institucional: o "máximo" considera 15 páginas. Com as 5 páginas inclusas e todas as funcionalidades, fica em R$ 4.590 a R$ 7.000.

## Preço de cada funcionalidade

Cada item soma ao preço base do tipo. Os nomes são os que o estimador mostra.

### Site institucional

| Funcionalidade | Acrescenta | Dias a mais |
|---|---|---|
| blog | R$ 540 a R$ 810 | 2 a 4 |
| idiomas | R$ 360 a R$ 630 | 1 a 3 |
| seo | R$ 540 a R$ 810 | 1 a 3 |
| agendamento | R$ 360 a R$ 630 | 1 a 3 |
| restrita | R$ 630 a R$ 990 | 3 a 4 |
| integracoes | R$ 360 a R$ 630 | 1 a 3 |

### Loja virtual

| Funcionalidade | Acrescenta | Dias a mais |
|---|---|---|
| catalogo | R$ 630 a R$ 990 | 3 a 4 |
| assinaturas | R$ 630 a R$ 990 | 3 a 4 |
| frete | R$ 360 a R$ 630 | 1 a 3 |
| cupons | R$ 540 a R$ 810 | 2 a 4 |
| idiomas | R$ 540 a R$ 810 | 2 a 4 |
| seo | R$ 540 a R$ 810 | 1 a 3 |

### Aplicativo

| Funcionalidade | Acrescenta | Dias a mais |
|---|---|---|
| login | R$ 810 a R$ 1.170 | 3 a 5 |
| push | R$ 540 a R$ 810 | 2 a 4 |
| pagamentos | R$ 810 a R$ 1.170 | 3 a 5 |
| chat | R$ 990 a R$ 1.530 | 4 a 6 |
| offline | R$ 810 a R$ 1.170 | 4 a 6 |
| api | R$ 630 a R$ 990 | 3 a 4 |

### Sistema sob medida

| Funcionalidade | Acrescenta | Dias a mais |
|---|---|---|
| permissoes | R$ 990 a R$ 1.530 | 4 a 6 |
| dashboards | R$ 990 a R$ 1.530 | 4 a 6 |
| assinaturas | R$ 810 a R$ 1.170 | 4 a 6 |
| api | R$ 810 a R$ 1.170 | 4 a 6 |
| automacao | R$ 630 a R$ 990 | 3 a 4 |
| auditoria | R$ 540 a R$ 810 | 2 a 4 |

## Exemplos prontos para citar

Combinações que o estimador devolve. Use a frase inteira, com o que está incluso, nunca só o número.

| Projeto | Faixa | Prazo |
|---|---|---|
| Site institucional de 5 páginas, textos do cliente, sem integrações | R$ 1.800 a R$ 2.500 | 8 a 13 dias |
| Site de 8 páginas com SEO avançado e integrações (CRM, WhatsApp) | R$ 3.080 a R$ 4.430 | 11 a 21 dias |
| Site de 8 páginas com blog, SEO avançado, agendamento e integrações | R$ 3.980 a R$ 5.870 | 14 a 28 dias |
| Site de 8 páginas com área restrita, agendamento, blog e integrações (CRM) | R$ 4.070 a R$ 6.050 | 16 a 29 dias |
| Site de 15 páginas com todas as funcionalidades | R$ 5.850 a R$ 8.620 | 21 a 37 dias |
| Loja virtual inicial: catálogo pequeno, pagamento e frete padrão | R$ 3.240 a R$ 4.590 | 18 a 25 dias |
| Loja virtual com frete integrado, cupons e SEO avançado | R$ 4.680 a R$ 6.840 | 22 a 35 dias |
| Loja virtual com todas as funcionalidades | R$ 6.480 a R$ 9.630 | 30 a 47 dias |
| Aplicativo básico para iPhone e Android | R$ 5.760 a R$ 7.830 | 29 a 39 dias |
| Aplicativo com todas as funcionalidades | R$ 10.350 a R$ 14.670 | 48 a 69 dias |
| Sistema sob medida básico | R$ 7.110 a R$ 10.620 | 39 a 50 dias |
| Sistema sob medida com todas as funcionalidades | R$ 11.880 a R$ 17.820 | 60 a 82 dias |

## Faixas de orçamento que o estimador pergunta ao visitante

Servem para o visitante se situar; não são preços da Bumavit.

- até R$ 3.000
- R$ 3.000 a R$ 6.000
- R$ 6.000 a R$ 12.000
- acima de R$ 12.000

## Condições de pagamento

Definidas pelo fundador em 28/09. Citar junto com a faixa sempre que o valor passar de alguns milhares de reais: é o que torna um projeto maior viável para uma empresa pequena.

| Tipo | Como se paga |
|---|---|
| Site institucional | Pagamento em 2 vezes: metade no ato e metade um mês depois. |
| Loja virtual | Pagamento em até 4 vezes. |
| Aplicativo | Pagamento parcelado ao longo do projeto, combinado na proposta. |
| Sistema sob medida | Pagamento parcelado ao longo do projeto, combinado na proposta. |

## Regras para citar preço em conteúdo

1. Só cite valor que esteja neste arquivo, na combinação exata (tipo + funcionalidades + páginas). Não interpole, não arredonde para cima, não crie faixa nova.
2. Toda faixa vem com o que está incluso, no mesmo parágrafo. "De R$ 1.800 a R$ 2.500" sozinho não diz nada; "site de 5 páginas, textos do cliente, sem integrações, de R$ 1.800 a R$ 2.500" diz.
3. Prazo em dias, como o estimador, ou em semanas arredondando para cima (8 a 13 dias = "até 2 semanas"). Sempre contado a partir do conteúdo pronto.
4. Preço de mercado (o que outros fornecedores cobram) só com fonte aberta e link. Sem fonte, não entra.
5. O estimador é o destino padrão de quem quer saber o próprio caso: https://bumavit.com.br/estimador.html
6. Nada de garantia de resultado, posição no Google ou aumento de vendas junto com o preço.
7. Domínio, hospedagem, textos, fotos e manutenção não estão nas faixas. Diga isso quando citar valor de projeto.
8. Loja virtual construída do zero, sem plataforma, e projetos fora dos quatro tipos do estimador não têm faixa: são orçados na conversa. Não invente número para eles.
9. Ao citar preço de loja virtual, aplicativo ou sistema, diga como se paga (tabela acima). Site pode citar ou não; loja e projetos maiores, sempre.

## Valores em reais que já estão nos posts

Varredura de `posts/*.md` na data de geração. A última coluna lista o que não bate com nenhum valor deste documento e precisa de revisão, ou de fonte externa linkada, se for preço de mercado.

| Post | Valores citados | Fora do estimador |
|---|---|---|
| agencia-ou-freelancer-para-criar-site | R$ 2.500, R$ 5.800, R$ 9.200 | R$ 5.800, R$ 9.200 |
| como-avaliar-proposta-de-criacao-de-site | R$ 1.800, R$ 4.500, R$ 11.000 | R$ 4.500, R$ 11.000 |
| preciso-de-site-se-ja-tenho-instagram | R$ 150, R$ 4.000 | R$ 150, R$ 4.000 |
| quanto-custa-criar-um-site-no-rio-de-janeiro | R$ 1.800, R$ 2.500, R$ 3.080, R$ 4.430, R$ 4.070, R$ 6.050, R$ 130, R$ 160, R$ 500, R$ 12.000 | R$ 500 |
| quanto-custa-um-site-institucional | R$ 1.800, R$ 2.500, R$ 130, R$ 160, R$ 260, R$ 320, R$ 500, R$ 30.000, R$ 3.240, R$ 4.590, R$ 3.080, R$ 4.430, R$ 4.070, R$ 6.050 | R$ 260, R$ 320, R$ 500, R$ 30.000 |
