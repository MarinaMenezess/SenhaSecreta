let senha = gerarNovaSenha();
let contadorTentativas = 0;
let combinacoesPossiveis = gerarCombinacoesPossiveis();

function gerarNovaSenha() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
}

function gerarCombinacoesPossiveis() {
  // Inicializa um conjunto de todas as combinações possíveis de 4 dígitos
  let combinacoes = [];

  for (let i = 0; i < 10000; i++) {
    combinacoes.push(String(i).padStart(4, '0'));
  }

  return combinacoes;
}

function atualizarCombinacoesPossiveis(tentativa, corretosNaPosicao) {
  // Filtra as combinações possíveis com base nos acertos
  combinacoesPossiveis = combinacoesPossiveis.filter(comb => {
    let acertos = 0;
    for (let i = 0; i < 4; i++) {
      if (comb[i] === tentativa[i]) {
        acertos++;
      }
    }
    return acertos === corretosNaPosicao;
  });
}

function verificarSenha() {
  const tentativa = document.getElementById("entrada").value;
  const mensagem = document.getElementById("mensagem");
  const tentativasTexto = document.getElementById("tentativas");
  const historico = document.getElementById("historico");
  const combinacoesElemento = document.getElementById("combinacoes");
  const chanceElemento = document.getElementById("chance");

  if (tentativa.length !== 4 || isNaN(tentativa)) {
    mensagem.textContent = "Digite exatamente 4 números!";
    mensagem.style.color = "orange";
    return;
  }

  contadorTentativas++;
  tentativasTexto.textContent = `Tentativas: ${contadorTentativas}`;

  // Calcula a quantidade de acertos na posição certa
  let corretosNaPosicao = 0;
  for (let i = 0; i < 4; i++) {
    if (tentativa[i] === senha[i]) {
      corretosNaPosicao++;
    }
  }

  // Atualiza as combinações possíveis baseadas na tentativa
  atualizarCombinacoesPossiveis(tentativa, corretosNaPosicao);

  // Exibe a quantidade de combinações possíveis e a chance de acerto
  const combinacoesTexto = `Há ${combinacoesPossiveis.length} combinações possíveis.`;
  const chanceDeAcerto = (1 / combinacoesPossiveis.length) * 100;
  const chanceTexto = `Sua chance de acertar no próximo chute é de ${chanceDeAcerto.toFixed(2)}%.`;

  // Atualiza os valores no canto superior direito
  combinacoesElemento.textContent = combinacoesTexto;
  chanceElemento.textContent = chanceTexto;

  // Exibe o feedback de acertos
  mensagem.textContent = `❌ Senha incorreta. ${corretosNaPosicao} número(s) estão corretos e na posição certa.`;
  mensagem.style.color = "yellow";

  // Mostra o histórico de jogadas
  const itemHistorico = document.createElement("li");
  itemHistorico.textContent = `Tentativa ${contadorTentativas}: ${tentativa} — ${corretosNaPosicao} correto(s) na posição`;
  historico.appendChild(itemHistorico);

  // Se acertar a senha, reinicia o jogo
  if (tentativa === senha) {
    mensagem.textContent = "🎉 Parabéns! Você acertou a senha! Iniciando nova rodada...";
    mensagem.style.color = "lightgreen";

    // Espera 2 segundos e reinicia o jogo
    setTimeout(() => {
      senha = gerarNovaSenha();
      contadorTentativas = 0;
      tentativasTexto.textContent = "Tentativas: 0";
      historico.innerHTML = "";
      mensagem.textContent = "";
      combinacoesPossiveis = gerarCombinacoesPossiveis();
    }, 2000);
  }

  document.getElementById("entrada").value = "";
}

// Permitir enviar com Enter
document.getElementById("entrada").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verificarSenha();
  }
});
