const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target)?.classList.add("active");
  });
});

const aionButtons = document.querySelectorAll(".aion-button");
aionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.aion;

    aionButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".aion-panel").forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target)?.classList.add("active");
  });
});

const modal = document.querySelector("#contentModal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const modalClose = document.querySelector(".modal-close");

const modalContent = {
  "soldagem-manutencao": {
    title: "Manutenção e melhoria contínua",
    body: `
      <p>Essa parte mostra minha base prática antes da tecnologia. Na indústria, eu lidava com manutenção, melhoria de processo, segurança e correção de problemas reais.</p>
      <ul>
        <li>Observar falhas antes que virassem problema maior.</li>
        <li>Entender causa, consequência e risco.</li>
        <li>Trabalhar com segurança e eficiência operacional.</li>
        <li>Levar essa visão para QA: prevenir é melhor do que só corrigir depois.</li>
      </ul>`
  },
  "soldagem-prototipo": {
    title: "Prototipagem e validação",
    body: `
      <p>Na prototipagem, o produto ainda está sendo provado. Isso tem tudo a ver com QA: testar, observar, ajustar, validar e melhorar.</p>
      <ul>
        <li>Montagem e soldagem de protótipos.</li>
        <li>Apoio na validação de produtos.</li>
        <li>Ajustes com base em comportamento real.</li>
        <li>Raciocínio parecido com teste exploratório: observar, aprender e refinar.</li>
      </ul>`
  },
  "soldagem-qa": {
    title: "Como a soldagem vira força em QA",
    body: `
      <p>Minha experiência anterior não é peso morto. Ela é base de qualidade aplicada no mundo físico.</p>
      <ul>
        <li>Atenção a detalhe vira evidência bem feita.</li>
        <li>Análise de falha vira investigação de bug.</li>
        <li>Segurança vira pensamento de risco.</li>
        <li>Melhoria contínua vira qualidade de processo.</li>
      </ul>`
  },
  "qa-frameworks": {
    title: "Frameworks morrem, qualidade fica",
    body: `
      <p>Essa frase não é contra ferramenta. Ferramenta é importante, mas ela muda. O que sustenta o profissional é a capacidade de pensar.</p>
      <ul>
        <li>Entender risco.</li>
        <li>Ler requisito.</li>
        <li>Investigar comportamento estranho.</li>
        <li>Gerar evidência clara.</li>
        <li>Proteger usuário e negócio.</li>
      </ul>`
  },
  "qa-requisito": {
    title: "QA entra antes do bug nascer",
    body: `
      <p>Um QA forte não espera a tela pronta para começar a pensar. Ele entra na conversa, no requisito e nos critérios de aceite.</p>
      <p>É ali que muitos bugs já nascem: em uma regra ambígua, em uma exceção esquecida ou em um fluxo que ninguém questionou.</p>`
  },
  "qa-bug": {
    title: "Pensar onde o bug nasce",
    body: `
      <p>Não é só encontrar defeito. É entender por que ele aconteceu, onde pode se repetir e como evitar que volte.</p>
      <p>Esse pensamento transforma QA em alguém que ajuda o time a melhorar, não apenas alguém que aponta erro.</p>`
  },
  "qa-deploy": {
    title: "Dormir tranquilo depois do deploy",
    body: `
      <p>A frase resume responsabilidade. Teste não garante perfeição, mas reduz risco, aumenta confiança e dá clareza para o time tomar decisão.</p>
      <p>O objetivo é chegar no deploy sabendo o que foi validado, o que ficou como risco e onde estão as evidências.</p>`
  },
  "cyber-risco": { title: "Risco", body: "<p>Risco é pensar no impacto real de uma falha: dados expostos, acesso indevido, prejuízo, abuso ou quebra de confiança.</p>" },
  "cyber-api": { title: "API", body: "<p>API precisa ser testada além do status code feliz. É preciso validar payload, erro, contrato, autenticação, autorização e comportamento fora do fluxo ideal.</p>" },
  "cyber-auth": { title: "Auth", body: "<p>Autenticação confirma quem é o usuário. Autorização define o que ele pode fazer. Muito bug sério nasce quando essas duas coisas são confundidas.</p>" },
  "cyber-owasp": { title: "OWASP", body: "<p>OWASP ajuda a organizar riscos comuns de segurança. Para QA, serve como mapa para pensar entradas, autenticação, APIs, dados e exposição indevida.</p>" },
  "cyber-dados": { title: "Dados", body: "<p>Dados precisam ser protegidos. Um QA atento observa se a aplicação expõe informação sensível, retorna campos indevidos ou deixa rastros perigosos.</p>" },
  "cyber-logs": { title: "Logs", body: "<p>Logs ajudam investigação, mas também podem vazar informação. O equilíbrio é registrar o necessário sem expor credenciais, tokens ou dados sensíveis.</p>" },
  "cyber-abuso": { title: "Abuso", body: "<p>Teste bom não valida só o usuário comportado. Também pensa em uso malicioso: repetir ação, manipular parâmetro, forçar limite e tentar quebrar regra.</p>" },
  "cyber-validacao": { title: "Validação", body: "<p>Validação de entrada é uma barreira básica. Campos, payloads e parâmetros precisam rejeitar dados inválidos, inesperados ou potencialmente maliciosos.</p>" },
  "cyber-protecao": { title: "Proteção", body: "<p>Proteção é pensar no produto como algo que precisa funcionar e resistir. Qualidade e segurança se encontram quando o sistema é confiável.</p>" },
  "tavern-fundamentos": {
    title: "Biblioteca: Fundamentos do QA",
    body: "<p>Conteúdos sobre qualidade, testes manuais, cenários, casos de teste, evidências, bug report, regressão e pensamento de risco.</p>"
  },
  "tavern-automacao": {
    title: "Biblioteca: Automação com propósito",
    body: "<p>Conteúdos sobre Cypress, Page Objects, App Actions, intercept, mocks, relatórios, testes instáveis e CI/CD. Automação precisa proteger valor, não inflar currículo.</p>"
  },
  "tavern-cyber": {
    title: "Biblioteca: Cyber para QA",
    body: "<p>Conteúdos sobre OWASP, APIs, autenticação, autorização, validação, dados e falhas que deixam de ser bug comum e viram risco de segurança.</p>"
  },
  "tavern-games": {
    title: "Biblioteca: QA no mundo dos jogos",
    body: "<p>Conteúdos sobre economia de MMO, progressão, exploit, anti-bot, balanceamento, bugs, dupe, eventos, classes e experiência do jogador.</p>"
  },
  "game-mmorpg": {
    title: "MMORPG como sistema",
    body: `
      <p>MMORPG é um laboratório de sistemas: economia, classe, progressão, PvP, PvE, craft, drop, mercado, guilda e comportamento humano.</p>
      <p>Estudar MMO ajuda a pensar como QA porque tudo tem regra, exceção, impacto e risco de abuso.</p>`
  },
  "game-qa": {
    title: "QA em jogos",
    body: `
      <p>Em jogos, bug não é só tela quebrada. Pode ser exploit, dupe, farm abusivo, desbalanceamento, soft lock, item bugado ou vantagem indevida.</p>
      <p>QA em jogos exige pensar no jogador comum e no jogador que tenta quebrar o sistema.</p>`
  },
  "game-aion-focus": {
    title: "Foco em Aion 2",
    body: `
      <p>Meu foco de MMO será Aion 2. Vou concentrar energia em Gladiator solo Asmodian e transformar o estudo em guia prático.</p>
      <p>A ideia é estudar classe, economia, build, PvP, PvE, FPS, macro e rotina, sem copiar ranker como receita universal.</p>`
  },
  "aion-filosofia": {
    title: "Jogar como pobre inteligente",
    body: `
      <p>Significa não gastar recurso raro por impulso. Antes de investir, eu preciso saber se aquilo gera poder real.</p>
      <ul>
        <li>Evitar conveniência disfarçada de progresso.</li>
        <li>Priorizar recurso que libera farm, PvP ou progressão.</li>
        <li>Separar build inicial de build endgame.</li>
        <li>Não copiar top player sem entender contexto.</li>
      </ul>`
  },
  "aion-objetivo": {
    title: "Objetivo do guia",
    body: "<p>O objetivo não é prometer top 1. É dominar o Gladiator solo Asmodian dentro da realidade de jogador solo, entendendo função de item, build, skill e rotina.</p>"
  },
  "aion-solo": {
    title: "Como penso solo player",
    body: "<p>Solo player precisa ser mais estratégico. Guilda ajuda, mas a progressão não pode depender 100% de grupo fixo. A rotina precisa gerar recurso, poder e aprendizado.</p>"
  },
  "aion-build-inicial-prioridades": {
    title: "Build inicial: prioridades",
    body: `
      <ul>
        <li><strong>Precisão:</strong> acertar é mais importante do que parecer forte no papel.</li>
        <li><strong>HP e defesa:</strong> Gladiator morto não causa pressão.</li>
        <li><strong>Ataque e dano de arma:</strong> necessário para farm e pressão.</li>
        <li><strong>Resistência:</strong> ajuda em PvP e em conteúdo mais pesado.</li>
        <li><strong>Traits úteis:</strong> função do item acima de raridade bonita.</li>
      </ul>`
  },
  "aion-build-inicial-erros": {
    title: "Erros iniciais que quero evitar",
    body: `
      <ul>
        <li>Gastar recurso raro antes de entender o sistema.</li>
        <li>Trocar item só porque o número bruto é maior.</li>
        <li>Copiar setup coreano/ranker sem adaptar para solo.</li>
        <li>Ignorar precisão, HP e resistência.</li>
        <li>Montar PvP cedo demais sacrificando farm.</li>
      </ul>`
  },
  "aion-build-inicial-rota": {
    title: "Rota segura da build inicial",
    body: "<p>Usar item funcional, farmar com estabilidade, guardar recurso raro, buscar traits úteis e só trocar peça quando a troca melhorar função real da build.</p>"
  },
  "aion-pvp-core": {
    title: "Núcleo PvP",
    body: "<p>Para PvP, o Gladiator precisa acertar, sobreviver e pressionar. A base é precisão, ataque PvP, HP, resistência, defesa contra dano de arma e ferramentas de controle.</p>"
  },
  "aion-pvp-jewels": {
    title: "Joias PvP",
    body: "<p>Minha ideia é priorizar joias PvP cedo quando elas trouxerem impacto claro, porque podem melhorar combate sem exigir um set PvP completo logo de início.</p>"
  },
  "aion-pvp-swap": {
    title: "Swap PvP",
    body: "<p>Swap serve para adaptar: duelo, zerg, sobrevivência, engage ou fuga. A ideia é ter uma base PvE para farm e opções PvP para combate real.</p>"
  },
  "aion-pve-core": {
    title: "Núcleo PvE",
    body: "<p>PvE precisa entregar dano estável, sustain e eficiência. O objetivo é matar bem, farmar melhor e alimentar a evolução da build PvP.</p>"
  },
  "aion-pve-dg": {
    title: "Dungeons",
    body: "<p>Em dungeon, boss não é tudo. Se mobs dão moeda, material ou recurso, limpar bem pode valer mais do que correr direto para o fim sem aproveitar o conteúdo.</p>"
  },
  "aion-pve-arma": {
    title: "Arma principal PvE",
    body: "<p>A arma PvE ajuda no farm, dungeon e progressão. Minha ideia é usar PvE como motor de crescimento e depois converter recursos em poder PvP.</p>"
  },
  "aion-endgame-stats": {
    title: "Status endgame",
    body: "<p>Referência endgame: precisão muito alta, HP/defesa fortes, resistência a dano de arma, amplificação de dano de arma, redução de cooldown e ferramentas de sobrevivência.</p>"
  },
  "aion-endgame-cd": {
    title: "Cooldown e janelas",
    body: "<p>Redução de cooldown pode mudar o ritmo da luta, permitindo usar controle, engage, escape ou dano em janelas melhores.</p>"
  },
  "aion-endgame-realidade": {
    title: "Endgame como referência",
    body: "<p>Endgame é norte, não obrigação imediata. O erro é tentar copiar build final sem ter economia, recurso e contexto para sustentar aquilo.</p>"
  },
  "skill-golpe-carregado": {
    title: "Golpe Carregado",
    body: "<p>Skill para priorizar por potencial de dano e pressão. Serve como peça importante para abrir ou punir janelas de combate.</p>"
  },
  "skill-furia-ruinosa": {
    title: "Fúria Ruinosa",
    body: "<p>Skill ligada a dano forte e presença ofensiva. Deve ser observada como prioridade para aumentar impacto em PvE e PvP.</p>"
  },
  "skill-onda-esmagadora": {
    title: "Onda Esmagadora",
    body: "<p>Boa candidata para dano em área/pressão. Em Gladiator, skills que atingem bem em grupo podem ter valor em farm e mass PvP.</p>"
  },
  "skill-liberacao-choque": {
    title: "Liberação de Choque",
    body: "<p>Skill importante para resposta defensiva/controle. Em PvP, sair de controle ou responder no tempo certo pode decidir a luta.</p>"
  },
  "skill-pancada": {
    title: "Pancada",
    body: "<p>Skill simples, mas útil se tiver boa aplicação em rotação, controle ou encaixe entre ataques. Precisa ser testada em ritmo real.</p>"
  },
  "skill-corte-tornozelo": {
    title: "Corte no Tornozelo",
    body: "<p>Skill com valor tático por afetar movimentação/controle. Para solo, impedir fuga ou reduzir mobilidade do alvo pode ser decisivo.</p>"
  },
  "skill-espada-ruina": {
    title: "Espada da Ruína",
    body: "<p>Referência ofensiva para burst/pressão. Deve ser avaliada junto do tempo de recarga, custo e janela de uso.</p>"
  },
  "skill-salto-esmagador": {
    title: "Salto Esmagador",
    body: "<p>Skill com cara de engage/impacto. Para Gladiator, aproximação e abertura de luta são pontos-chave.</p>"
  },
  "arcana-pvp": {
    title: "Arcana PvP: 4 Guardião + 2 Inabalável",
    body: `
      <p>Referência inicial para PvP com foco em sobrevivência, resistência e impacto em combate.</p>
      <p>A lógica não é copiar nomes cegamente, mas entender a função: durar mais, resistir melhor e manter pressão.</p>`
  },
  "arcana-pve": {
    title: "Arcana PvE",
    body: "<p>Para PvE, a ideia é organizar Arcana por dano, sabedoria/função, destruição e eficiência de farm/dungeon. A prioridade é matar bem e evoluir sem travar.</p>"
  },
  "arcana-skills": {
    title: "Skills ligadas à Arcana",
    body: "<p>As skills que aparecem na referência incluem Golpe Carregado, Fúria Ruinosa, Salto Esmagador, Corte no Tornozelo, Liberação de Choque, Investida, Espada da Ruína e Onda Esmagadora.</p>"
  },
  "arcana-regra": {
    title: "Regra de análise de Arcana",
    body: "<p>Antes de escolher Arcana, perguntar: isso melhora dano, sobrevivência, controle, farm ou PvP real? Se não melhora função clara, não é prioridade.</p>"
  },
  "eco-daily": {
    title: "Dailies",
    body: "<p>Daily não é obrigação cega. Daily é investimento. Se ela não entrega recurso, poder, acesso, moeda, material ou aprendizado, precisa ser reavaliada.</p>"
  },
  "eco-mercado": {
    title: "Mercado",
    body: "<p>Mercado em MMO é sistema vivo. Preço depende de drop, demanda, raridade, patch, hype e necessidade dos jogadores.</p>"
  },
  "eco-recursos": {
    title: "Recursos raros",
    body: "<p>Recurso raro deve ser guardado até ficar claro onde ele gera poder real. Gastar cedo demais pode travar progressão futura.</p>"
  },
  "config-fps": {
    title: "FPS estável",
    body: "<p>Em PvP, FPS estável vale mais que gráfico bonito. O objetivo é leitura limpa, resposta rápida e skill registrando sem engasgo.</p>"
  },
  "config-macro": {
    title: "Macro e delay",
    body: "<p>Macro precisa conversar com FPS e estabilidade. Delay curto demais pode fazer skill ser engolida se o jogo estiver oscilando.</p>"
  },
  "config-zerg": {
    title: "Zerg e mass PvP",
    body: "<p>Em zerg, efeitos bonitos podem atrapalhar. O foco é ver player, skill, chão, movimentação e ameaça real.</p>"
  },
  "rotina-login": {
    title: "Ao logar",
    body: "<p>Checar eventos, dailies úteis, loja, timers, guilda, recursos travados e oportunidades de farm antes de sair fazendo qualquer coisa.</p>"
  },
  "rotina-farm": {
    title: "Farm inteligente",
    body: "<p>Farm inteligente é escolher conteúdo que dá retorno para Gladiator: moeda, item, material, progressão, skill, recurso ou mercado.</p>"
  },
  "rotina-guild": {
    title: "Guilda",
    body: "<p>Mesmo jogando solo, guilda pode ser usada para loja, benefício, conteúdo, informação e organização. Solo não precisa ser isolado.</p>"
  }
};

function openModal(key) {
  const content = modalContent[key];
  if (!content || !modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = content.title;
  modalBody.innerHTML = content.body;
  modal.showModal();
}

document.querySelectorAll("[data-open]").forEach((element) => {
  element.addEventListener("click", () => openModal(element.dataset.open));
});

modalClose?.addEventListener("click", () => modal.close());

modal?.addEventListener("click", (event) => {
  const rect = modal.querySelector(".modal-card").getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    modal.close();
  }
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((item) => observer.observe(item));


const qaButtons = document.querySelectorAll(".qa-button");
qaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.qa;

    qaButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".qa-panel").forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target)?.classList.add("active");
  });
});

Object.assign(modalContent, {
  "qa-visao-risco": {
    title: "QA começa pelo risco",
    body: "<p>Antes de testar, eu preciso entender o que pode dar errado e qual impacto isso gera. Um bug em texto pode ser pequeno; um bug em pagamento, login, permissão ou dado pode ser crítico.</p>"
  },
  "qa-visao-negocio": {
    title: "QA protege negócio",
    body: "<p>QA não testa só tela. QA protege venda, fluxo, reputação, confiança, operação e experiência do usuário. O bug mais importante é o que prejudica valor real.</p>"
  },
  "qa-visao-postura": {
    title: "Postura de QA",
    body: "<p>QA não precisa parecer dono da verdade. Precisa ser claro, investigativo e colaborativo: mostrar evidência, explicar impacto e ajudar o time a decidir.</p>"
  },
  "qa-manual-cenarios": {
    title: "Cenários de teste",
    body: "<p>Um bom cenário cobre fluxo feliz, fluxo alternativo, entrada inválida, borda, permissão, exceção e regressão. O objetivo é pensar além do caminho perfeito.</p>"
  },
  "qa-manual-casos": {
    title: "Casos de teste",
    body: "<p>Casos de teste precisam ter pré-condição, passos, dados usados, resultado esperado e clareza para outra pessoa conseguir executar sem adivinhar.</p>"
  },
  "qa-manual-exploratorio": {
    title: "Teste exploratório",
    body: "<p>Exploratório não é bagunça. É investigação guiada por risco, curiosidade, comportamento estranho e hipóteses. Muitas falhas reais aparecem quando o QA sai do roteiro óbvio.</p>"
  },
  "qa-api-contrato": {
    title: "Contrato de API",
    body: "<p>Contrato é verificar se a API retorna os campos esperados, tipos corretos, status coerente e estrutura combinada. Quando contrato quebra, front, integração e negócio podem quebrar junto.</p>"
  },
  "qa-api-negativo": {
    title: "Testes negativos de API",
    body: "<p>Testar API só com dado certo é fraco. É preciso mandar payload incompleto, tipo errado, campo inválido, token ausente e usuário sem permissão.</p>"
  },
  "qa-api-auth": {
    title: "Autenticação e autorização",
    body: "<p>Autenticação responde quem é o usuário. Autorização responde o que ele pode fazer. Um QA atento valida as duas coisas.</p>"
  },
  "qa-auto-cypress": {
    title: "Cypress com propósito",
    body: "<p>Cypress é forte para automação E2E e validação de fluxo. O valor não está só no script rodando, mas na clareza, estabilidade, manutenção e confiança que ele entrega.</p>"
  },
  "qa-auto-pageobjects": {
    title: "Page Objects",
    body: "<p>Page Objects ajudam a separar elementos e ações da regra do teste. Isso deixa o projeto mais organizado, legível e fácil de manter.</p>"
  },
  "qa-auto-flaky": {
    title: "Flaky tests",
    body: "<p>Teste instável destrói confiança. Pode ser timing, dependência externa, massa ruim, espera fraca ou ambiente instável. QA bom investiga a causa, não só aumenta timeout.</p>"
  },
  "qa-bdd-gherkin": {
    title: "Gherkin",
    body: "<p>Given, When, Then só faz sentido se deixar a regra clara. O cenário deve ser lido por QA, dev e negócio sem virar código disfarçado.</p>"
  },
  "qa-bdd-regra": {
    title: "Regra de negócio",
    body: "<p>BDD é ótimo quando prova comportamento. O foco é entender a regra: quando algo acontece, o sistema deve responder de forma clara e esperada.</p>"
  },
  "qa-bdd-comunicacao": {
    title: "Comunicação em BDD",
    body: "<p>BDD antes de ser automação é conversa. Ajuda a evitar requisito ambíguo e reduz bug que nasce por entendimento diferente entre as pessoas.</p>"
  },
  "qa-perf-k6": {
    title: "Performance com k6",
    body: "<p>k6 ajuda a criar scripts de carga, definir thresholds e analisar comportamento sob pressão. O foco é medir com objetivo, não só rodar carga aleatória.</p>"
  },
  "qa-perf-jmeter": {
    title: "Performance com JMeter",
    body: "<p>JMeter permite montar planos de teste, usar CSV, configurar ramp-up, usuários virtuais e coletar evidências sobre tempo de resposta e estabilidade.</p>"
  },
  "qa-perf-analise": {
    title: "Análise de performance",
    body: "<p>O gráfico sozinho não resolve. O valor está em interpretar: onde degradou, quando começou, qual endpoint sofreu e qual hipótese explica o gargalo.</p>"
  },
  "qa-mobile-appium": {
    title: "Appium / WebdriverIO",
    body: "<p>Automação mobile precisa de estrutura: páginas, ações reutilizáveis, waits corretos, dados estáveis e validação de fluxo real do app.</p>"
  },
  "qa-mobile-fluxo": {
    title: "Fluxos críticos mobile",
    body: "<p>No mobile, login, busca, carrinho, endereço, checkout, permissões e estados do app precisam de atenção porque qualquer timing ou tela pode quebrar experiência.</p>"
  },
  "qa-mobile-real": {
    title: "Realidade mobile",
    body: "<p>Mobile sofre com rede, teclado, tamanho de tela, permissões, background, atualização, aparelho lento e timing. Teste precisa considerar isso.</p>"
  },
  "qa-evid-titulo": {
    title: "Título claro de bug",
    body: "<p>Um bom título diz onde acontece e qual comportamento errado. Exemplo: 'Checkout permite finalizar compra sem endereço obrigatório'.</p>"
  },
  "qa-evid-passos": {
    title: "Passos de reprodução",
    body: "<p>Passos precisam ser objetivos: ambiente, usuário, dados, ação e resultado. Se outra pessoa não consegue reproduzir, o bug perde força.</p>"
  },
  "qa-evid-impacto": {
    title: "Impacto do bug",
    body: "<p>Impacto explica por que o bug importa. Afeta dinheiro? Segurança? Usuário? Conversão? Operação? Reputação? Isso ajuda a priorizar.</p>"
  },
  "qa-career-base": {
    title: "Base para QA Jr",
    body: "<p>Minha base passa por testes manuais, API, Git, SQL, automação, evidências, relatório de bug, lógica e comunicação.</p>"
  },
  "qa-career-projetos": {
    title: "Projetos como prova",
    body: "<p>Projeto bom precisa mostrar objetivo, stack, como rodar, o que foi testado, decisões técnicas e aprendizado. README é parte do portfólio.</p>"
  },
  "qa-career-proximo": {
    title: "Próximo nível",
    body: "<p>Depois da base, quero fortalecer CI/CD, Docker, segurança, performance, arquitetura de testes, observabilidade e boas práticas profissionais.</p>"
  },
  "lore-aion1-aion": {
    title: "Aion, Atreia e a Torre da Eternidade",
    body: "<p>Na base do lore clássico, Atreia é o mundo ligado à Torre da Eternidade, símbolo central da presença de Aion. A queda da Torre é o evento que separa o mundo e alimenta a guerra entre facções.</p>"
  },
  "lore-aion1-balaur": {
    title: "Balaur",
    body: "<p>Os Balaur/Drakan surgem como seres poderosos ligados à proteção, mas se tornam ameaça. Eles são uma força central no conflito e ajudam a explicar por que os Daevas existem.</p>"
  },
  "lore-aion1-daeva": {
    title: "Daevas",
    body: "<p>Daevas são humanos ascendidos que usam Aether e lutam em uma guerra muito maior que uma disputa simples entre povos. O jogador entra nesse papel de guerreiro alado.</p>"
  },
  "lore-aion1-cataclisma": {
    title: "Cataclismo",
    body: "<p>O Cataclismo/Torre destruída é o ponto de ruptura. O mundo se divide, os povos se separam, a memória do evento vira culpa e a culpa vira guerra.</p>"
  },
  "lore-aion1-abyss": {
    title: "Abyss",
    body: "<p>O Abyss é o espaço de conflito entre as metades do mundo. Para o guia, ele representa a alma PvPvE de Aion: facção, combate, risco e disputa territorial.</p>"
  },
  "lore-aion1-balaurea": {
    title: "Balaurea",
    body: "<p>Balaurea expande a guerra para além das terras iniciais de Elyos e Asmodians. É importante porque mostra que o conflito não é só entre facções: os Balaur também são ameaça central.</p>"
  },
  "lore-aion2-retorno": {
    title: "Retorno a Atreia",
    body: "<p>Aion 2 retorna ao universo clássico com escala moderna. Para o site, essa parte será tratada como continuidade espiritual do estudo: mundo, facção, classe, voo, PvP e progressão.</p>"
  },
  "lore-aion2-daeva": {
    title: "Ascensão como Daeva",
    body: "<p>O jogador continua dentro da fantasia de Daeva: guerreiro alado, classe, combate, exploração e guerra. Isso combina com a proposta de estudar Gladiator como identidade principal.</p>"
  },
  "lore-aion2-guerra": {
    title: "Guerra de facções",
    body: "<p>Aion 2 mantém a força da escolha de facção. Elyos e Asmodians não são só estética; eles organizam comunidade, PvP, narrativa, servidor e sensação de pertencimento.</p>"
  },
  "lore-aion2-site": {
    title: "Como usar lore no site",
    body: "<p>A lore vai servir para dar alma ao guia. Build sem contexto vira tabela fria. Com história, facção e identidade, o guia vira uma jornada de Gladiator Asmodian.</p>"
  },
  "fac-asmodian": {
    title: "Asmodians",
    body: "<p>Asmodians vivem ligados a Asmodae, uma metade mais escura e hostil de Atreia. A imagem deles é de sobrevivência, adaptação, dureza e lealdade ao próprio povo. Para meu guia, isso combina com Gladiator solo: resistência, pressão e sobrevivência.</p>"
  },
  "fac-elyos": {
    title: "Elyos",
    body: "<p>Elyos vivem em Elysea, a parte mais iluminada e abundante. Eles carregam uma identidade mais solar, nobre e ligada à ideia de povo escolhido. No conflito, veem os Asmodians como inimigos históricos.</p>"
  },
  "fac-conflito": {
    title: "Conflito de versões",
    body: "<p>A guerra entre Elyos e Asmodians é alimentada por culpa, memória e narrativa. Cada lado constrói sua verdade sobre a queda da Torre e sobre quem deve pagar pelo passado.</p>"
  },
  "fac-minha-escolha": {
    title: "Minha escolha: Asmodian",
    body: "<p>Vou jogar de Asmodian porque combina com minha fantasia de sobrevivente, Gladiator solo e jogador que prefere resistência, pressão e identidade mais sombria. No site, essa escolha vira parte do guia.</p>"
  }
});
