
const palavras = [
    "javascript",
    "html",
    "computador",
    "internet",
    "teclado",
    "programacao",
    "navegador",
    "monitor",
    "mouse",
    "tecnologia"
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);

    palavraSecreta = palavras[indice];
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    mensagem.textContent = "Boa sorte! Descubra a palavra.";
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();
}

function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (!letrasCorretas.includes(palavraSecreta[i])) {
            return false;
        }
    }

    return true;
}

function verificarLetra() {
    if (jogoFinalizado) return;

    const letra = inputLetra.value.toLowerCase().trim();

    if (!/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra.";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Essa letra já foi utilizada!";
        inputLetra.value = "";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    inputLetra.value = "";

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        jogoFinalizado = true;
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era " + palavraSecreta;
        jogoFinalizado = true;
    }

    if (jogoFinalizado) {
        inputLetra.disabled = true;
        botaoTentar.disabled = true;
    }
}

botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

inputLetra.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarLetra();
    }
});

iniciarJogo();
