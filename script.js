const HOTMART_ALUNO_URL = "https://members.hotmart.com/";

function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

function chaveAluno(email) {
  return "aluno_" + normalizarEmail(email);
}

function alternarSenha() {
  const senhaInput = document.getElementById("senhaAluno");
  const botao = document.querySelector(".mostrar-senha");

  if (senhaInput.type === "password") {
    senhaInput.type = "text";
    botao.textContent = "Ocultar";
  } else {
    senhaInput.type = "password";
    botao.textContent = "Mostrar";
  }
}

function criarAcessoAluno() {
  const emailInput = document.getElementById("emailAluno");
  const senhaInput = document.getElementById("senhaAluno");
  const mensagem = document.getElementById("mensagemLogin");

  const email = normalizarEmail(emailInput.value);
  const senha = senhaInput.value.trim();

  mensagem.style.color = "#dc2626";

  if (!email || !senha) {
    mensagem.textContent = "Preencha e-mail e senha para criar seu acesso.";
    return;
  }

  if (senha.length < 4) {
    mensagem.textContent = "A senha precisa ter pelo menos 4 caracteres.";
    return;
  }

  const chave = chaveAluno(email);

  if (localStorage.getItem(chave)) {
    mensagem.textContent = "Esse e-mail já possui acesso neste navegador. Faça login.";
    return;
  }

  const dadosAluno = {
    email: email,
    senha: senha
  };

  localStorage.setItem(chave, JSON.stringify(dadosAluno));
  mensagem.style.color = "#15803d";
  mensagem.textContent = "Acesso criado com sucesso. Agora clique em Entrar.";
}

function entrarAluno() {
  const emailInput = document.getElementById("emailAluno");
  const senhaInput = document.getElementById("senhaAluno");
  const mensagem = document.getElementById("mensagemLogin");

  const email = normalizarEmail(emailInput.value);
  const senha = senhaInput.value.trim();

  mensagem.style.color = "#dc2626";

  if (!email || !senha) {
    mensagem.textContent = "Preencha e-mail e senha.";
    return;
  }

  const chave = chaveAluno(email);
  const registro = localStorage.getItem(chave);

  if (!registro) {
    mensagem.textContent = "Acesso não encontrado. Clique em Criar acesso primeiro.";
    return;
  }

  const aluno = JSON.parse(registro);

  if (aluno.senha !== senha) {
    mensagem.textContent = "Senha incorreta.";
    return;
  }

  mensagem.style.color = "#15803d";
  mensagem.textContent = "Entrando na plataforma...";

  localStorage.setItem("ultimo_aluno_logado", email);

  setTimeout(() => {
    window.location.href = HOTMART_ALUNO_URL;
  }, 800);
}
function gerarCertificado() {
  const nome = document.getElementById("nomeCertificado").value.trim();
  const cpf = document.getElementById("cpfCertificado").value.trim();
  const concluiu = document.getElementById("concluiuCurso").checked;

  const mensagem = document.getElementById("mensagemCertificado");

  if (!nome) {
    mensagem.textContent = "Digite seu nome completo.";
    return;
  }

  if (!cpf) {
    mensagem.textContent = "Digite seu CPF.";
    return;
  }

  if (!concluiu) {
    mensagem.textContent = "Marque que concluiu o curso.";
    return;
  }

  mensagem.textContent = "";

  const nomeCodificado = encodeURIComponent(nome);
  const cpfCodificado = encodeURIComponent(cpf);

  window.open(`certificado.html?nome=${nomeCodificado}&cpf=${cpfCodificado}`, "_blank");
}
  }

  const url = `certificado.html?nome=${encodeURIComponent(nome)}&carga=${encodeURIComponent("20 horas")}`;
  window.open(url, "_blank");
}
