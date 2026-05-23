function adicionarTarefa(){

    let input = document.getElementById("tarefa");

    let texto = input.value;

    if(texto === ""){
        alert("Digite uma tarefa");
        return;
    }

    let lista = document.getElementById("lista");

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = texto;

    let divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes");

    let btnConcluir = document.createElement("button");
    btnConcluir.innerText = "✓";
    btnConcluir.classList.add("btn-concluir");

    btnConcluir.onclick = function(){
        span.classList.toggle("concluida");
    };

    let btnRemover = document.createElement("button");
    btnRemover.innerText = "X";
    btnRemover.classList.add("btn-remover");

    btnRemover.onclick = function(){
        li.remove();
    };

    divAcoes.appendChild(btnConcluir);
    divAcoes.appendChild(btnRemover);

    li.appendChild(span);
    li.appendChild(divAcoes);

    lista.appendChild(li);

    input.value = "";
}