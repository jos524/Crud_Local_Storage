document.onload = mostraPessoas();

function validaFormulario() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const idade = document.getElementById("idade").value;
  const email = document.getElementById("email").value;

  if (
    nome.length == 0 ||
    endereco.length == 0 ||
    idade.length == 0 ||
    email.length == 0
  ) {
    alert("Todos os campos devem ser preenchidos!");
    return false;
  }

  if (idade <= 0 || isNaN(idade)) {
    alert("A idade precisa ser positiva e maior que 0!");
    return false;
  }

  if (!email.includes("@") || !email.includes(".com")) {
    alert("O email precisa ser um email valido!");
    return false;
  }

  return true;
}

function mostraPessoas() {
  const pessoasDb = getPessoasDoLocalStorage();

  let html = ``;

  pessoasDb.forEach(function (pessoa, index) {
    html += `
      <tr>
      <td> ${pessoa.nome} </td>
      <td> ${pessoa.idade} </td>
      <td> ${pessoa.endereco} </td>
      <td> ${pessoa.email} </td>
      <td> 
      <button onclick="deletaPessoa(${index})" class= 'btn btn-danger' id='deletar'> Deletar </button> 
      <button onclick=mostraDadosParaAtualizacao(${index}) class= 'btn btn-warning' id='atualizar'> Atualizar </button>
      </td>
      </tr>
    `;
  });

  document.querySelector("#tabela tbody").innerHTML = html;
}

function adicionarPessoa() {
  if (validaFormulario()) {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const endereco = document.getElementById("endereco").value;
    const email = document.getElementById("email").value;

    const pessoasDb = getPessoasDoLocalStorage();

    pessoasDb.push({
      nome: nome,
      idade: idade,
      endereco: endereco,
      email: email,
    });

    localStorage.setItem("pessoas", JSON.stringify(pessoasDb));

    mostraPessoas();
    limpaFormulario();
  }
}

function deletaPessoa(index) {
  const pessoasDb = getPessoasDoLocalStorage();

  pessoasDb.splice(index, 1);
  localStorage.setItem("pessoas", JSON.stringify(pessoasDb));

  mostraPessoas();
}

function mostraDadosParaAtualizacao(index) {
  document.getElementById("btnAdicionar").style.display = "none";
  document.getElementById("deletar").style.display = "none";
  document.getElementById("atualizar").style.display = "none";
  document.getElementById("btnAtualizar").style.display = "block";
  document.getElementById("btnCancelar").style.display = "block";

  const pessoasDb = getPessoasDoLocalStorage();

  document.getElementById("nome").value = pessoasDb[index].nome;
  document.getElementById("idade").value = pessoasDb[index].idade;
  document.getElementById("endereco").value = pessoasDb[index].endereco;
  document.getElementById("email").value = pessoasDb[index].email;

  document.getElementById("btnAtualizar").onclick = function () {
    if (validaFormulario()) {
      pessoasDb[index].nome = document.getElementById("nome").value;
      pessoasDb[index].idade = document.getElementById("idade").value;
      pessoasDb[index].endereco = document.getElementById("endereco").value;
      pessoasDb[index].email = document.getElementById("email").value;

      localStorage.setItem("pessoas", JSON.stringify(pessoasDb));

      limpaFormulario();
      mostraPessoas();
      encerraAtualizacao();
    }
  };
}

function encerraAtualizacao() {
  document.getElementById("btnAdicionar").style.display = "block";
  document.getElementById("deletar").style.display = "inline-block";
  document.getElementById("atualizar").style.display = "inline-block";
  document.getElementById("btnAtualizar").style.display = "none";
  document.getElementById("btnCancelar").style.display = "none";

  limpaFormulario();
}

function limpaFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("email").value = "";
}

function getPessoasDoLocalStorage() {
  return JSON.parse(localStorage.getItem("pessoas")) ?? [];
}
