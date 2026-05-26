let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function fazerLogin(){

    let usuario = document.getElementById("usuario").value;

    let senha = document.getElementById("senha").value;

    let mensagemErro = document.getElementById("mensagemErro");

    let usuarioEncontrado = usuarios.find(function(user){

        return user.usuario === usuario && user.senha === senha;
    });

    if(usuarioEncontrado){

        document.getElementById("loginContainer").style.display = "none";

        document.getElementById("cadastroContainer").style.display = "none";

        document.getElementById("sistemaTarefas").style.display = "block";

        localStorage.setItem("usuarioLogado", "true");

    }else{

        mensagemErro.innerText = "Usuário ou senha inválidos!";
    }
}

function mostrarCadastro(){

    document.getElementById("loginContainer").style.display = "none";

    document.getElementById("cadastroContainer").style.display = "flex";
}

function voltarLogin(){

    document.getElementById("cadastroContainer").style.display = "none";

    document.getElementById("loginContainer").style.display = "flex";
}

function fazerCadastro(){

    let novoUsuario = document.getElementById("novoUsuario").value;

    let novaSenha = document.getElementById("novaSenha").value;

    let mensagemCadastro = document.getElementById("mensagemCadastro");

    if(novoUsuario === "" || novaSenha === ""){

        mensagemCadastro.innerText = "Preencha todos os campos!";

        return;
    }

    let usuarioExistente = usuarios.find(function(user){

        return user.usuario === novoUsuario;
    });

    if(usuarioExistente){

        mensagemCadastro.innerText = "Usuário já existe!";

        return;
    }

    usuarios.push({

        usuario: novoUsuario,
        senha: novaSenha
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagemCadastro.innerText = "Cadastro realizado com sucesso!";

    setTimeout(function(){

        voltarLogin();

    }, 1500);
}

function sair(){

    localStorage.removeItem("usuarioLogado");

    location.reload();
}

if(localStorage.getItem("usuarioLogado") === "true"){

    window.onload = function(){

        document.getElementById("loginContainer").style.display = "none";

        document.getElementById("cadastroContainer").style.display = "none";

        document.getElementById("sistemaTarefas").style.display = "block";

        mostrarTarefas();
    }

}else{

    window.onload = function(){

        mostrarTarefas();
    }
}

function salvarLocalStorage(){

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa(){

    let input = document.getElementById("tarefa");

    let texto = input.value;

    if(texto === ""){

        alert("Digite uma tarefa");

        return;
    }

    tarefas.push({

        texto:texto,
        concluida:false
    });

    salvarLocalStorage();

    mostrarTarefas();

    input.value = "";
}

function mostrarTarefas(){

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa,index){

        let li = document.createElement("li");

        let span = document.createElement("span");

        span.innerText = tarefa.texto;

        if(tarefa.concluida){

            span.classList.add("concluida");
        }

        let divAcoes = document.createElement("div");

        divAcoes.classList.add("acoes");

        let btnConcluir = document.createElement("button");

        btnConcluir.innerText = "✓";

        btnConcluir.classList.add("btn-concluir");

        btnConcluir.onclick = function(){

            tarefas[index].concluida = !tarefas[index].concluida;

            salvarLocalStorage();

            mostrarTarefas();
        };

        let btnRemover = document.createElement("button");

        btnRemover.innerText = "X";

        btnRemover.classList.add("btn-remover");

        btnRemover.onclick = function(){

            tarefas.splice(index,1);

            salvarLocalStorage();

            mostrarTarefas();
        };

        divAcoes.appendChild(btnConcluir);

        divAcoes.appendChild(btnRemover);

        li.appendChild(span);

        li.appendChild(divAcoes);

        lista.appendChild(li);
    });
}