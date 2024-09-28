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
// Função para carregar a pergunta atual
function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    
    // Exibe a fase atual
    quizPhaseElement.textContent = `Fase ${currentQuestion + 1}`;
    
    // Definindo as respostas
    answerButtons.forEach((button, index) => {
        button.textContent = current.answers[index];
        button.onclick = () => checkAnswer(index); // Verifica a resposta ao clicar
    });
}


// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    const current = questions[currentQuestion];
    
    // Verificar se a resposta é correta
    if (selectedIndex === current.correctAnswer) {
        score++;
        answerButtons[current.correctAnswer].style.background = 'green';
        setTimeout( function(){
            answerButtons[current.correctAnswer].style.background = '';
        
        }, 1000); 
    
        feedbackElement.textContent = "Correto!"; // Feedback positivo
        feedbackElement.style.color = "green"; // Mudar cor do feedback
        nextQuestion(); // Avançar para a próxima pergunta
    } else {
        answerButtons[selectedIndex].style.background = 'red';
        setTimeout( function(){
            answerButtons[selectedIndex].style.background = '';
            endQuiz();
        }, 1000); 
        feedbackElement.textContent = `Errado! ${playerName}, você perdeu!`;
        
    }
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestion++;
    
    // Se houver mais perguntas, carregar a próxima
    if (currentQuestion < questions.length) {
        setTimeout(() => {
            feedbackElement.textContent = ''; // Limpar o feedback
            loadQuestion();
        }, 1000); // Pequeno atraso antes de carregar a próxima pergunta
    } else {
        endQuiz(); // Termina o quiz se não houver mais perguntas
    }
}

// Função para terminar o quiz
function endQuiz() {
    questionElement.textContent = `${playerName}, você acertou ${score} de ${questions.length} perguntas.`;
    document.querySelector('ul').style.display = 'none'; // Esconde os botões
    restartButton.style.display = 'block'; // Mostra o botão de reinício
}

// Função para reiniciar o quiz
restartButton.addEventListener('click', () => {
    document.querySelector('ul').style.display = 'flex'; // Exibe os botões novamente
    startGame(); // Reinicia o jogo
});

// Iniciar o quiz quando a página carregar
startGame();
