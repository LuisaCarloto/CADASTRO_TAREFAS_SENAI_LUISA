class Tarefa {
    constructor(nome) {
        if (nome.trim() == "") {
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

const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHTML = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-tema");

const iconeTema = botaoTema.querySelector("i");

const botaoAlerta = document.getElementById("botao-alerta");
const painelAlteracoes = document.getElementById("painel-alteracoes");
const botaoFechar = document.getElementById("botao-fechar");

// Botões das fotos
const botaoMabel = document.getElementById("botao-mabel");
const botaoLuisa = document.getElementById("botao-luisa");
const botaoAna = document.getElementById("botao-anavitoria");


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

// coloca as tarefas
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

// aqui eu consigo clicar no enter e ele salva a tarefa
campoTarefa.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        botaoAdicionar.click();
    }
});

// mostra as tarefas
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

// clica na terfa e mostra se ela ta pronta ou não, no caso ela fica cinza e riscada
function marcarTarefa(index) {
    listaDeTarefas[index].marcarComoPronta();
    renderizarLista();
}

function removerTarefa(index) {
    listaDeTarefas.splice(index, 1);
    renderizarLista();
}

// quantas tarefas tem
function atualizarContador() {
    const quantidade = listaDeTarefas.length;

    contador.textContent =
        `${quantidade} ${quantidade === 1 ? "tarefa" : "tarefas"} na lista`;
}

// é onde abe e fecha o painelzinho de alterações
botaoAlerta.addEventListener("click", function () {
    const estaAberto = !painelAlteracoes.hidden;

    painelAlteracoes.hidden = estaAberto;

    botaoAlerta.setAttribute("aria-expanded", String(!estaAberto));
});

// Meszma coisa do enter, soq aqui quando eu clico no x que aparece, ele sai da tabelinha de alterações
botaoFechar.addEventListener("click", function () {
    painelAlteracoes.hidden = true;

    botaoAlerta.setAttribute("aria-expanded", "false");
});

// PARTE MAIS LEGAL DO MUNDO. OS EMOJIS VOAM🌟
function soltarEfeitos(emoji, botao) {
    const posicao = botao.getBoundingClientRect();

    for (let i = 0; i < 18; i++) {
        const efeito = document.createElement("span");

        efeito.classList.add("efeito-voando");
        efeito.textContent = emoji;

        efeito.style.fontSize = (20 + Math.random() * 22) + "px";

        efeito.style.left =
            (posicao.left + posicao.width / 2) + "px";

        efeito.style.top =
            (posicao.top + posicao.height / 2) + "px";

        efeito.style.setProperty(
            "--movimento-x",
            (Math.random() * 300 - 150) + "px"
        );

        efeito.style.setProperty(
            "--rotacao",
            (Math.random() * 720 - 360) + "deg"
        );

        efeito.style.animationDelay =
            (Math.random() * 0.5) + "s";

        document.body.appendChild(efeito);

        setTimeout(function () {
            efeito.remove();
        }, 3500);
    }
}

// Clica na minha foto e aparece morcego, e a mesma coisa pra mabel e anavito
botaoLuisa.addEventListener("click", function () {
    soltarEfeitos("🦇", botaoLuisa);
});

botaoMabel.addEventListener("click", function () {
    soltarEfeitos("🌈", botaoMabel);
});

botaoAna.addEventListener("click", function () {
    soltarEfeitos("🦋", botaoAna);
});