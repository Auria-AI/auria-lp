// Vision scripts for the Auria demo — single source of truth for what each
// live camera "shows" over the 2-minute session.
//
// Scenario: a small retail store experiencing a FALSE ALARM from the front
// door's vibration sensor during business hours. Both cameras show ordinary
// activity, which the agent uses to reassure the visitor and classify the
// alarm as false.
//
// The browser plays both videos from the same start instant. When the agent
// calls get_vision_update(), the page looks up each camera's window for the
// current elapsed time and returns both, joined, in the format the agent's
// prompt expects: "<label>: <description>. <label>: <description>."
//
// Windows are [start, end) in seconds and cover the full [0, 90) span,
// matched to the actual footage:
//   - rua  → demo-cam-street.mp4 (natural speed, trimmed: first 20s and
//            last 10s of the source dropped, so original t=20s is now t=0)
//   - loja → demo-cam-hall.mp4   (sped up 4/3, so original timestamps ×0.75)
//
// Descriptions are deliberately factual (what is visible), not interpretive.

export const CAMERAS = [
  {
    id: "rua",
    label: "Câmera externa — rua em frente à loja",
    script: [
      { start: 0, end: 10,
        description: "Uma pessoa aparece à direita, perto dos carros estacionados, parada junto à via. Movimento comum de quem passa pela rua, nada que chame atenção." },
      { start: 10, end: 20,
        description: "A via volta a ficar tranquila. Carros estacionados, calçada livre, sem aglomeração nem movimento suspeito." },
      { start: 20, end: 30,
        description: "Um pedestre atravessa a rua a pé, em ritmo normal, cruzando a via em direção ao outro lado. Trânsito comum de pessoas para o horário." },
      { start: 30, end: 40,
        description: "O pedestre já saiu do enquadramento. A rua está novamente vazia e calma, apenas com os carros estacionados." },
      { start: 40, end: 50,
        description: "Ambiente externo segue tranquilo. Nenhum movimento na calçada nem na via, fora os veículos parados." },
      { start: 50, end: 60,
        description: "A rua permanece calma e sem pessoas. Dia claro, nada de incomum no entorno da loja." },
      { start: 60, end: 70,
        description: "Uma pessoa de roupa clara e calça rosa caminha pela calçada em frente à loja, em passo tranquilo, seguindo o seu caminho. Pedestre comum de passagem." },
      { start: 70, end: 80,
        description: "Um carro azul entra na rua e desce a via devagar, como quem procura uma vaga. Movimento normal de trânsito." },
      { start: 80, end: 90,
        description: "O carro azul segue pela via em baixa velocidade, manobrando perto dos veículos já estacionados. Nada de anormal." },
    ],
  },
  {
    id: "loja",
    label: "Câmera interna — salão de atendimento",
    script: [
      { start: 0, end: 7.5,
        description: "Salão da loja bem iluminado. Uma funcionária está sentada sozinha a uma mesa, mexendo no celular. Nenhum cliente no ambiente, tudo calmo." },
      { start: 7.5, end: 15,
        description: "A funcionária continua sentada à mesa, tranquila, sem clientes na loja. Ambiente parado, um momento de pouco movimento." },
      { start: 15, end: 22.5,
        description: "Sem alterações: a funcionária permanece sentada à mesa, sozinha no salão. Nenhuma movimentação na entrada." },
      { start: 22.5, end: 30,
        description: "A funcionária segue na mesa, ainda sem clientes. O salão continua vazio e tranquilo." },
      { start: 30, end: 37.5,
        description: "Situação inalterada. A funcionária permanece sentada, a loja sem clientes, ambiente calmo e iluminado." },
      { start: 37.5, end: 45,
        description: "A funcionária continua na mesa. Nenhum cliente entrou até agora; o salão segue tranquilo." },
      { start: 45, end: 52.5,
        description: "A funcionária se levanta da mesa e começa a se movimentar pelo salão, como quem vai atender ou organizar algo." },
      { start: 52.5, end: 60,
        description: "Um cliente — homem de boné, camiseta e bermuda — entra na loja pela porta da frente. A funcionária se aproxima para recebê-lo. Atendimento começando, tudo normal." },
      { start: 60, end: 67.5,
        description: "A funcionária e o cliente estão em pé perto da entrada, conversando. Interação tranquila de atendimento ao público." },
      { start: 67.5, end: 75,
        description: "A funcionária se afasta em direção ao interior da loja. O cliente fica andando pelo salão, observando os expositores." },
      { start: 75, end: 82.5,
        description: "O cliente continua circulando pelo salão, olhando os produtos com calma, próximo aos expositores. Atendimento normal em andamento." },
      { start: 82.5, end: 90,
        description: "O cliente se acomoda perto da janela, à direita do salão, aguardando tranquilamente. Ambiente segue calmo, atividade comercial comum." },
    ],
  },
];
