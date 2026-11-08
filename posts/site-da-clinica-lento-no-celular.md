---
title: Site da clínica lento no celular: o que pesa e como testar
slug: site-da-clinica-lento-no-celular
date: 2026-11-14
category: Performance
cover: rust
excerpt: Site da clínica lento no celular: medimos 97 sites de clínicas odontológicas do Rio e 43 eram lentos. O que pesa, e como testar o seu em cinco minutos.
keyword: site da clínica lento no celular
---

O site da sua clínica está no ar. Tem endereço, telefone, a lista de convênios, fotos do consultório. Do computador da recepção, abre bem. No celular do paciente, no ônibus ou na fila, ele demora, e o paciente não espera.

Em novembro de 2026 medimos 97 sites de clínicas odontológicas de Botafogo, da Tijuca e da Barra da Tijuca, no Rio, num iPhone simulado. 43 eram lentos no celular.

Entre as clínicas que têm site, o problema mais comum que encontramos foi o site da clínica lento no celular, à frente do cadeado quebrado e do site abandonado.

Este levantamento faz parte da prospecção da Bumavit: usamos o resultado para procurar clientes. Leia sabendo disso. Os números abaixo são os que medimos, e o texto diz como medir o seu.

## O que medimos e como

Partimos das fichas do Google Maps de 166 clínicas odontológicas nos três bairros. 48 não têm site nenhum. 21 têm, no campo "site" da ficha, um link de Instagram, de WhatsApp ou de agregador. Sobram 97 com site próprio.

Cada um dos 97 passou por um script nosso, que abre a página inicial num navegador configurado como iPhone e anota o que o paciente sentiria: quanto a página pesa, quantos arquivos baixa e quanto tempo leva para montar a tela.

O mesmo script registra se o site tem HTTPS (o cadeado), se chama algum arquivo pelo endereço sem proteção, que plataforma usa e que ano aparece no rodapé.

83 responderam por completo. 14 não responderam naquela rodada, e não contamos esses como fora do ar sem conferir à mão.

Chamamos de lento o site que pesa mais de 3 MB na página inicial, ou que leva mais de 3 segundos só para montar a página, antes das fotos. É um critério nosso, declarado para você poder discordar dele. Nenhum site é nomeado aqui, e a lista não é publicada.

## O que encontramos nos 97 sites

**Peso da página inicial.** Metade dos 83 sites que carregaram pesava até 2,7 MB. 19 pesavam 5 MB ou mais. 10 tinham 10 MB ou mais. Três passavam de 180 MB. Nesse tamanho, é vídeo tocando sozinho na primeira tela: o script não confirma a causa, mas foto não chega lá.

**Quantidade de arquivos.** Na mediana, a página inicial baixava 74 arquivos para aparecer. 28 sites baixavam 100 ou mais. Cada arquivo é uma ida e volta até o servidor, e no celular cada ida e volta custa.

**Tempo para montar a página.** Mesmo na conexão rápida do nosso laboratório, 11 sites levaram mais de 3 segundos só para montar a estrutura da página. No 4G de um paciente, esse tempo cresce.

**Segurança.** 8 abriam sem HTTPS, e 20 tinham HTTPS, mas chamavam pelo menos um arquivo pelo endereço antigo, sem proteção.

O navegador atual bloqueia esse arquivo, troca sozinho para o endereço seguro ou tira o cadeado da página: o paciente vê uma imagem que falta ou um aviso. É assunto para outro artigo, e pesa na mesma primeira impressão.

**Sinais de abandono.** 18 sites mostravam rodapé parado em 2024 ou antes, ou imagens e scripts que não carregam mais. Dos 18, 14 também eram lentos: site parado e site lento costumam ser o mesmo site.

**Plataforma.** Quase metade dos sites que carregaram roda WordPress, a maior parte com o construtor visual Elementor. Não é a plataforma que deixa o site lento. É o que foi colocado nela, e o que ninguém tirou depois.

## Por que o site da clínica fica lento no celular

O site da clínica raramente nasce lento. Ele fica lento. No dia do lançamento, tinha seis fotos tratadas e um texto por página.

Dois anos depois, tem a foto de cada membro da equipe tirada com o celular, um vídeo do consultório na capa, três plugins de agendamento testados e nunca removidos, e um tema que carrega tudo isso em todas as páginas.

As causas que mais vimos, em ordem:

**Fotos no tamanho da câmera.** Uma foto do consultório sai do celular com 3 ou 4 MB. Na página, ela aparece com a largura de uma tela de celular, e precisaria de uma fração disso. Dez fotos assim são uma página inicial de 30 MB.

**Vídeo de fundo na primeira tela.** Fica bonito na televisão da recepção. No celular do paciente, é o arquivo mais pesado do site carregando antes de o telefone da clínica aparecer.

**Construtor visual e tema carregando tudo.** Temas e construtores trazem animações, fontes, ícones e scripts para todas as páginas, usados ou não. As páginas com 100 arquivos ou mais que medimos são isso.

**Plugins acumulados.** O plugin de agendamento que não deu certo, o de pop-up da promoção de clareamento, o de redes sociais que ninguém olha. Cada um que continua ativo carrega código a cada visita.

**Hospedagem no plano mais barato.** O servidor dividido com centenas de outros sites responde devagar nas horas de mais acesso, e você não controla quando elas são.

O artigo sobre [por que o site lento perde vendas](https://bumavit.com.br/blog/site-lento-perde-vendas/) traz o estudo do Google sobre abandono por tempo de carregamento e a conta do que isso custa por mês.

Aqui o ponto é mais simples: a clínica paga para aparecer, no Maps, no Instagram ou no anúncio, e o site devolve o paciente para a lista antes de ele ver o telefone.

## Como testar o seu site em cinco minutos

Você não precisa de técnico para a primeira medição.

**Abra no celular, fora do Wi-Fi.** Desligue o Wi-Fi do consultório, use os dados móveis e abra o site como um paciente abriria, numa aba anônima, para o celular não aproveitar o que guardou de uma visita anterior.

Conte os segundos até a primeira tela útil, com o telefone ou o botão de WhatsApp visível. Se passou de 3 segundos, o paciente da fila já voltou para o Google.

**Cole o endereço no PageSpeed Insights.** A ferramenta do Google ([pagespeed.web.dev](https://pagespeed.web.dev/)) é gratuita e leva um minuto. Olhe a aba de celular, não a de computador. A lista de oportunidades diz o que pesa: imagens, vídeo, scripts, fontes. É a sua lista de pedidos para quem cuida do site.

**Olhe o rodapé.** Que ano está escrito lá? Se é 2024 ou antes, ninguém atualiza o site há tempo, e o peso é só um dos problemas acumulados. Ano atual no rodapé não prova nada: muitos temas trocam o ano sozinhos.

**Confira o cadeado ou o aviso.** No Safari do iPhone, veja se o cadeado aparece ao lado do endereço. No Chrome, que não mostra mais o cadeado, veja se aparece "Não seguro". Nos dois casos, anote junto. Resolve-se em outra frente, mas na mesma conversa.

Três sites de concorrentes do seu bairro, no mesmo teste, dizem onde você está em relação a eles. É a comparação que o paciente faz sem perceber.

## O que resolver primeiro

A ordem importa, porque os primeiros itens custam pouco e resolvem a maior parte do peso.

**Comprima as fotos.** Toda foto do site passa por um compressor antes de subir. Ferramentas gratuitas reduzem o arquivo a uma fração do tamanho sem diferença visível na tela. No WordPress, um plugin de otimização faz isso nas fotos que já estão lá.

**Tire o vídeo de fundo.** Troque por uma foto na versão para celular, ou tire de vez. Uma foto bem tratada do consultório diz o mesmo que o vídeo.

**Remova o que não usa.** Plugin que ficou ativo sem função é código que o celular do paciente baixa a cada visita: desative e depois apague. Plugins desativados e temas antigos não pesam na página, mas continuam instalados como porta de entrada para invasão, e saem também.

**Suba um degrau na hospedagem.** Se, depois disso, o site continua lento nas horas de mais acesso, o problema é o servidor dividido com centenas de outros sites. Um plano acima resolve essa parte, e só essa.

**Se nada disso bastou.** O problema é estrutural: tema pesado, construtor que carrega tudo, código acumulado por anos. Nesse caso, otimizar é enxugar gelo: o site novo nasce com o peso como requisito, não como correção.

## Quando não vale a pena mexer

Se o seu site pesa menos de 3 MB e abre em menos de 3 segundos no 4G, velocidade não é o seu problema. Olhe para o que o paciente procura: convênios, horários, quem é o dentista e um botão de WhatsApp no topo.

O artigo sobre [o que o site de uma clínica odontológica precisa ter](https://bumavit.com.br/blog/site-para-clinica-odontologica/) cobre isso ponto a ponto.

Se a clínica vai trocar de site nos próximos meses, não gaste com otimização. Leve a lista do PageSpeed para a conversa com quem vai fazer o novo, e peça o peso da página inicial como item do contrato.

Se a clínica não tem site próprio, nada disto se aplica ainda. Quatro em cada dez clínicas que levantamos estão nessa situação, e o primeiro passo é outro.

## Quem mede isso depois do lançamento

O site ficou lento porque ninguém mediu de novo depois do dia em que ficou pronto. Foto nova entrou, plugin novo entrou, ninguém tirou nada. Em dois anos, é outro site, bem mais pesado.

A pergunta que vale fazer hoje é a mesma do artigo sobre [quanto custa manter um site](https://bumavit.com.br/blog/quanto-custa-manter-um-site/): quem cuida disso, e quando foi a última vez que alguém olhou.

Um plano de manutenção, contratado à parte, existe para a rotina: atualizar, fazer backup e conferir a segurança. Medir o peso de novo é o pedido que você faz a quem cuida do site, com plano ou sem.

A Bumavit faz essa rotina pelo [plano de manutenção de sites](https://bumavit.com.br/manutencao-de-sites/), inclusive em sites que não foram feitos por ela.

## O que fazer esta semana

Se o seu site passou dos 3 segundos no teste do celular, comece pelas fotos e pelo vídeo de fundo. É uma tarde de trabalho de quem cuida do site. Na nossa experiência, resolve a maior parte dos casos.

Se o PageSpeed apontou dezenas de itens e o rodapé diz 2023, a conversa é sobre quem vai cuidar do site daqui para a frente, não sobre uma correção.

Se você está pensando em um site novo, peça que o peso da página inicial e o tempo no celular entrem por escrito na proposta.

Se quiser um ponto de partida antes de falar com qualquer fornecedor, o estimador da Bumavit devolve uma faixa de orçamento e de prazo a partir de três respostas: [monte seu projeto](https://bumavit.com.br/estimador.html). Você não precisa ter decidido nada para usar a ferramenta.
