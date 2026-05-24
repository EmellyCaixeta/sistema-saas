let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

window.onload = function(){
    mostrarTarefas();
};

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
        texto: texto,
        concluida: false
    });

    salvarLocalStorage();

    mostrarTarefas();

    input.value = "";
}

function mostrarTarefas(){

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa, index){

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

            tarefas.splice(index, 1);

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
