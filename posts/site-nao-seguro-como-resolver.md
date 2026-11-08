---
title: Site não seguro: o que é e como resolver
slug: site-nao-seguro-como-resolver
date: 2026-11-21
category: Performance
cover: cyan
excerpt: Seu site aparece como não seguro? São três causas: sem HTTPS, certificado vencido ou conteúdo misto. Como achar a sua e o que pedir a quem cuida do site.
keyword: site não seguro
---

Você manda o link do site para um cliente. Ele abre no celular e, ao lado do endereço, aparece "Não seguro". Ele fecha, e não conta para você.

Esse aviso não fala de vírus nem do computador de quem abriu. É o navegador avisando que a conexão entre o visitante e o seu site não está protegida, e ele avisa isso para todo mundo que entra.

Um site não seguro, na maior parte dos casos, é um site sem HTTPS, com certificado vencido ou com um arquivo antigo carregando sem proteção.

É mais comum do que parece. Em novembro de 2026, um em cada três sites de clínicas odontológicas do Rio que medimos, simulando um celular, tinha um desses problemas. O [levantamento sobre sites de clínica lentos no celular](https://bumavit.com.br/blog/site-da-clinica-lento-no-celular/) conta como medimos.

Nenhum dos três casos exige site novo. Todos se resolvem na configuração. A Bumavit faz manutenção de sites, então leia sabendo disso.

## O que o aviso de site não seguro quer dizer

Todo endereço de site começa com http:// ou https://. O "s" é a diferença entre uma conversa aberta e uma conversa protegida.

Com HTTPS, o que o visitante digita num formulário e o que o site devolve viajam criptografados, e o navegador confirma que você está falando com o domínio que digitou, e não com alguém no meio do caminho. Sem HTTPS, a conversa viaja aberta, e o navegador diz isso com o aviso.

Quem faz essa confirmação é o certificado, um arquivo emitido para o seu domínio, com data de validade. O navegador confere o certificado a cada visita.

Se ele venceu ou foi emitido para outro endereço, o aviso muda de tom: em vez de um "Não seguro" discreto ao lado do endereço, aparece uma tela inteira dizendo que a conexão não é particular, com a opção de seguir mesmo assim escondida atrás de "Avançado". Quase ninguém segue.

Existe ainda o caso intermediário: a página tem HTTPS, mas uma imagem, uma fonte ou um script dentro dela ainda vem de um endereço http://. É o conteúdo misto.

O que o navegador faz com esse arquivo varia. Os mais recentes bloqueiam scripts e fontes vindos de http:// e, para imagens e vídeos, tentam sozinhos o endereço https://; se ele não existe, a imagem fica em branco. Outros ainda carregam a imagem, mas tiram o cadeado da barra de endereço.

Quando a troca automática funciona, o visitante não percebe nada, e o Console do navegador é o único lugar onde o problema aparece. Quando não, ele vê uma imagem quebrada ou um cadeado que sumiu, e não sabe dizer qual dos dois é pior.

## As três causas, da mais comum à mais rara

**Conteúdo misto.** Foi o caso mais frequente no que medimos: 20 dos 83 sites que carregaram, e em todos os 20 era um arquivo só, esquecido.

Acontece quase sempre depois de uma migração: o site ganhou HTTPS, mas os textos e o tema guardaram endereços antigos de imagens, fontes ou scripts começando com http://. Tudo parece certo até alguém abrir o Console do navegador.

**Sem HTTPS.** O site só responde em http://, ou responde nos dois e não redireciona o http:// para o https://. Em geral o certificado nunca foi instalado, ou foi instalado e o redirecionamento não. Foram 8 dos 83 que medimos.

**Certificado vencido ou para outro endereço.** Certificados vencem. Os gratuitos costumam valer três meses, e a hospedagem os renova sozinha, até o dia em que a renovação automática falha: o site mudou de hospedagem, o domínio passou a apontar para outro lugar, o domínio venceu.

Também há o certificado emitido só para o endereço com www, enquanto o site é divulgado sem www, ou o contrário.

Nenhuma das três é culpa de quem usa o site. As três são de quem deveria estar cuidando dele.

## Como descobrir qual é o seu caso

Dois minutos, sem técnico.

**Digite o endereço sem o "s".** Abra http://seusite.com.br e veja o que acontece. Se ficar em http://, com "Não seguro" ao lado do endereço, você está no caso dois. Se virar https:// sozinho, pode ser o site redirecionando ou o próprio navegador tentando a versão segura; o redirecionamento do servidor, quem cuida do site confirma.

**Procure a tela de aviso.** Se, em vez do site, apareceu uma tela inteira dizendo que a conexão não é particular (ou não é privada), é o caso três. Em "Avançado", ou "Mostrar detalhes" no Safari, o navegador diz o motivo: certificado vencido ou emitido para outro endereço.

Se o site abriu, clique no ícone ao lado do endereço: nos detalhes está até quando o certificado vale, a data para anotar. No Chrome atual esse ícone substitui o cadeado; o que importa é não aparecer "Não seguro".

**Teste com e sem www.** Os dois precisam abrir com cadeado e cair no mesmo site. Um deles com aviso é o caso três em metade do site.

**Abra o Console.** Abra a página no Chrome do computador, pressione F12 (no Mac, Cmd+Option+I), escolha a aba Console e recarregue. Mensagens com "Mixed Content" dizem exatamente qual arquivo ainda vem de http://.

Esse é o caso um, e a mensagem já é a lista do que corrigir.

Anote o que viu. É isso que você vai mandar para quem cuida do site, e evita a resposta "aqui abre normal".

## Como resolver cada caso

**Conteúdo misto.** Troque, no conteúdo e no tema, cada endereço http:// pelo equivalente https://. No WordPress, um plugin de busca e substituição faz a troca no banco de dados, com backup antes; o que está escrito no código do tema, e em sites feitos à mão, é uma busca no código.

Se o arquivo vem de um servidor que não responde em https://, troque o arquivo de lugar, não só o endereço. Depois, abra o Console de novo até ele ficar vazio.

**Sem HTTPS.** Peça à hospedagem a ativação do certificado. Hospedagens costumam incluir um certificado gratuito, como os do Let's Encrypt, ativado no próprio painel. Em seguida, ligue o redirecionamento de http:// para https:// e repita o primeiro teste. No WordPress, troque também o endereço do site para https:// nas configurações gerais.

**Certificado vencido ou errado.** Renove, ligue a renovação automática e anote a data de vencimento num lugar que alguém olhe. Se o certificado cobre só um dos endereços, peça um que cubra os dois, com e sem www.

Em todos os casos, o último passo é o mesmo: abrir o site numa aba anônima do celular e conferir a barra de endereço.

## Por que isso acontece com site que já funcionou

O site foi lançado com cadeado. Em algum momento a hospedagem mudou, o domínio foi renovado em outro lugar, alguém trocou o tema ou colou uma imagem com o endereço antigo.

Nada quebrou de forma visível para quem está no escritório, porque ninguém ali abre o site como um visitante novo: entra pelo link salvo ou pelo painel, e não olha a barra de endereço. Quebrou para quem digitou o endereço pela primeira vez, no celular.

É o padrão do site sem dono.

Ninguém tem a tarefa de abrir o site todo mês e olhar o cadeado, o rodapé, as imagens.

O artigo sobre [quanto custa manter um site](https://bumavit.com.br/blog/quanto-custa-manter-um-site/) faz a pergunta que vale aqui: quem tem acesso ao painel e à hospedagem, e quando foi a última vez que alguém olhou.

## Quando não vale a pena refazer o site por isso

Nunca. Aviso de segurança é ajuste de configuração, não projeto. Se alguém propõe um site novo porque o cadeado sumiu, está vendendo outra coisa com a desculpa errada.

O que pode acontecer é o aviso ser o primeiro de uma lista: cadeado, peso, rodapé de 2023, formulário que não chega. Aí a conversa é sobre o estado geral do site, e o cadeado é só o sintoma que o visitante vê primeiro.

Mesmo nesse caso, conserte o cadeado hoje e decida o resto com calma.

Também não vale a pena pagar por certificado caro para um site institucional. O gratuito protege a conexão do mesmo jeito, e o navegador mostra o mesmo cadeado para os dois.

O que os pagos podem acrescentar é a validação da identidade da empresa, que aparece só nos detalhes do certificado, validade mais longa e suporte. Faz sentido em loja virtual grande e em banco, não na página da clínica ou do escritório.

## O que pedir a quem cuida do seu site

Mande o que você anotou no teste e peça três coisas por escrito:

- o site responde em https://, com redirecionamento do http://, com e sem www
- o certificado tem renovação automática ligada, e a data de vencimento está registrada
- o Console do navegador não mostra nenhum "Mixed Content" na página inicial nem nas páginas mais visitadas

Peça também que essa conferência entre na rotina. Quem faz a manutenção do site abre essas telas todo mês. O [checklist para contratar o desenvolvimento de um site](https://bumavit.com.br/blog/checklist-para-contratar-desenvolvimento-de-site/) tem o item do HTTPS com redirecionamento entre os critérios de entrega, para o site novo já nascer certo.

## O que fazer agora

Se o aviso aparece hoje, faça o teste dos dois minutos e mande o resultado para quem cuida do site. Com o diagnóstico na mão, quem cuida do site sabe por onde começar em qualquer um dos três casos.

Se ninguém cuida do site, essa é a conversa de verdade. O conserto de hoje pode voltar a quebrar na próxima renovação, e ninguém vai estar olhando.

A Bumavit cuida de sites pelo [plano de manutenção](https://bumavit.com.br/manutencao-de-sites/), inclusive de sites feitos por outras empresas: backup, atualizações e verificação de segurança todo mês, com o cadeado e o redirecionamento na mesma olhada. A página diz o que está incluso e o que não está.
