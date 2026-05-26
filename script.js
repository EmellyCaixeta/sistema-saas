let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

/* LOGIN */
function fazerLogin(){

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    let encontrado = usuarios.find(u =>
        u.usuario === usuario && u.senha === senha
    );

    if(encontrado){
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("sistemaTarefas").style.display = "block";
        localStorage.setItem("logado", "true");
        mostrarTarefas();
    }else{
        document.getElementById("mensagemErro").innerText = "Login inválido!";
    }
}

/* CADASTRO */
function mostrarCadastro(){
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("cadastroContainer").style.display = "flex";
}

function voltarLogin(){
    document.getElementById("cadastroContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "flex";
}

function fazerCadastro(){

    let u = document.getElementById("novoUsuario").value;
    let s = document.getElementById("novaSenha").value;

    if(!u || !s){
        document.getElementById("mensagemCadastro").innerText = "Preencha tudo!";
        return;
    }

    usuarios.push({usuario:u, senha:s});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    document.getElementById("mensagemCadastro").innerText = "Conta criada!";

    setTimeout(voltarLogin, 1200);
}

/* SAIR */
function sair(){
    localStorage.removeItem("logado");
    location.reload();
}

/* TAREFAS */
function adicionarTarefa(){

    let input = document.getElementById("tarefa");
    let texto = input.value.trim();

    if(!texto) return;

    tarefas.push({
        texto,
        concluida:false
    });

    input.value = "";
    salvar();
    mostrarTarefas();
}

/* DASHBOARD + LISTA */
function mostrarTarefas(){

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let total = tarefas.length;
    let feitas = tarefas.filter(t => t.concluida).length;

    document.getElementById("totalHoje").innerText = total;
    document.getElementById("concluidas").innerText = feitas;

    let porcentagem = total === 0 ? 0 : Math.round((feitas / total) * 100);
    document.getElementById("progresso").innerText = porcentagem + "%";

    tarefas.forEach((tarefa, index) => {

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = tarefa.texto;

        if(tarefa.concluida){
            span.classList.add("concluida");
        }

        let div = document.createElement("div");
        div.classList.add("acoes");

        let btnOk = document.createElement("button");
        btnOk.innerText = "✓";
        btnOk.classList.add("btn-concluir");

        btnOk.onclick = function(){
            tarefas[index].concluida = !tarefas[index].concluida;
            salvar();
            mostrarTarefas();
        };

        let btnDel = document.createElement("button");
        btnDel.innerText = "X";
        btnDel.classList.add("btn-remover");

        btnDel.onclick = function(){
            tarefas.splice(index,1);
            salvar();
            mostrarTarefas();
        };

        div.appendChild(btnOk);
        div.appendChild(btnDel);

        li.appendChild(span);
        li.appendChild(div);

        lista.appendChild(li);
    });
}

/* AUTO LOGIN */
window.onload = function(){
    if(localStorage.getItem("logado") === "true"){
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("sistemaTarefas").style.display = "block";
    }

    mostrarTarefas();
};