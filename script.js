// Perguntas do quiz
const questions = [
    {
        question: "Qual é o nome do titã que foi condenado a segurar o mundo para sempre?",
        answers: ["Prometeu", "Atlas", "Cronos", "Epimeteu"],
        correctAnswer: 1 // Atlas é a resposta correta (índice 1)
    },
    {
        question: "Qual dos seguintes deuses é conhecido como o deus do vinho?",
        answers: ["Zeus", "Apolo", "Dionísio", "Hermes"],
        correctAnswer: 2 // Dionísio é a resposta correta (índice 2)
    },
    {
        question: "Qual deusa transformou Medusa em um monstro?",
        answers: ["Afrodite", "Atena", "Hera", "Ártemis"],
        correctAnswer: 1 // Atena é a resposta correta (índice 1)
    }
];

// Variáveis de controle
let playerName = ''; // Nome do jogador
let currentQuestion = 0; // Acompanhar a fase atual
let score = 0; // Pontuação do usuário

// Elementos HTML
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const feedbackElement = document.getElementById('feedback');
const playerNameElement = document.getElementById('player-name');
const quizPhaseElement = document.getElementById('quiz-phase');
const restartButton = document.getElementById('restart-btn');

// Iniciar o jogo pedindo o nome do jogador
function startGame() {
    playerName = prompt("Digite o seu nome:"); // Captura o nome via prompt
    playerNameElement.textContent = `Jogador: ${playerName}`; // Exibe o nome
    score = 0; // Reinicia a pontuação
    currentQuestion = 0; // Reinicia a fase
    feedbackElement.textContent = ''; // Limpa o feedback
    restartButton.style.display = 'none'; // Esconde o botão de reinício
    loadQuestion(); // Carrega a primeira pergunta
}

