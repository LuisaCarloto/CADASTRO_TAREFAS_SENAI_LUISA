class Tarefa {
    constructor(nome) {
        if (nome == "") {
            throw new Error("Adicione alguma tarefa!");
        }

        this.nome = nome;
        this.pronta = false;
    }

    marcarComoPronta() {
        this.pronta = !this.pronta;
    }

}

const listaDeTarefas = [];

// Elementos do HTML
const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHTML = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-tema");

const iconeTema = botaoTema.querySelector("i");

// MODO ESCURO / MODO CLARO
botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        iconeTema.classList.remove("fa-moon");
        iconeTema.classList.add("fa-sun");
    } else {
        iconeTema.classList.remove("fa-sun");
        iconeTema.classList.add("fa-moon");
    }

});
// ADICIONAR TAREFA
botaoAdicionar.addEventListener("click", function () {

    try {
        const nome = campoTarefa.value;
        const novaTarefa = new Tarefa(nome);
        listaDeTarefas.push(novaTarefa);
        campoTarefa.value = "";
        renderizarLista();

    } catch (erro) {
        alert(erro.message);
    }

});
// MOSTRAR TAREFAS
function renderizarLista() {

    listaHTML.innerHTML = "";

    listaDeTarefas.forEach((tarefa, index) => {

        const item = document.createElement("li");

        item.classList.add("item-tarefa");

        if (tarefa.pronta) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <span onclick="marcarTarefa(${index})">
                ${tarefa.nome}
            </span>

            <div class="acoes-tarefa">

                <button 
                    class="botao-acao"
                    onclick="marcarTarefa(${index})"
                    title="Concluir tarefa"
                >
                    <i class="fa-solid fa-check"></i>
                </button>

                <button 
                    class="botao-acao excluir" 
                    onclick="removerTarefa(${index})"
                    title="Remover tarefa"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        listaHTML.appendChild(item);
    });

    atualizarContador();

}
// CLICAR NA TAREFA → PRONTA / NÃO PRONTA
function marcarTarefa(index) {

    listaDeTarefas[index].marcarComoPronta();

    renderizarLista();

}
// REMOVER TAREFA
function removerTarefa(index) {

    listaDeTarefas.splice(index, 1);

    renderizarLista();

}
// CONTADOR
function atualizarContador() {

    const quantidade = listaDeTarefas.length;

    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;

}