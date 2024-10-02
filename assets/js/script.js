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
        answers:  ["Afrodite", "Atena", "Hera", "Ártemis"],
        correctAnswer: 1 // Atena é a resposta correta (índice 1)
    },
    { 
        question: "Quem é o rei dos deuses na mitologia grega?",
        answers: ["Hades","Apolo", "Poseidon", "Zeus"],
        correctAnswer: 3 // zeus é a resposta correta (índice 1)
    },
    { 
        question: "Qual arma é símbolo do poder de Zeus e produz os raios?",
        answers: [" A espada sagrada", "O tridente", "O raio-mestre", "O elmo das trevas "],
        correctAnswer: 2 // raio mestre é a resposta correta (índice 2)
    },
    { 
        question: "Quem é a deusa do amor e da beleza?",
        answers: ["Deméter", "Afrodite", "Hera", "Atena "],
        correctAnswer: 1 // afrodite é a resposta correta (índice 2)
    },
    { 
        question: "Qual é o deus do mar na mitologia grega?",
        answers: [" Hermes", "Ares", "Poseidon", "Dionísio"],
        correctAnswer: 2 // Poseidon é a resposta correta (índice 2)
    },
    { 
        question: "Quem é a deusa da sabedoria e da guerra estratégica?",
        answers: [" Afrodite", "Ártemis ", " Atena", "Hera"],
        correctAnswer: 2// hera é a resposta correta (índice 2)
    },
    { 
        question: "Qual é o nome da esposa de Zeus?",
        answers: ["Atena", " Hera", "Afrodite", " Deméter"],
        correctAnswer: 1 // Hera é a resposta correta (índice 2)
    },
    { 
        question: "Qual é o nome do herói que realizou os doze trabalhos?",
        answers: [" Perseu", "Aquiles", "Hércules", "Teseu"],
        correctAnswer: 2 // Hércules é a resposta correta (índice 2)
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
const quizMusic = document.getElementById('quiz-music');

// Iniciar o jogo pedindo o nome do jogador
function startGame() {
    playerName = prompt("Digite o seu nome:"); // Captura o nome via prompt
    while(playerName == '' || playerName == null){
        playerName = prompt("Nome invalido, por favor digite seu nome novamente:");
    }
    playerNameElement.textContent = `Jogador: ${playerName}`; // Exibe o nome
    score = 0; // Reinicia a pontuação
    currentQuestion = 0; // Reinicia a fase
    feedbackElement.textContent = ''; // Limpa o feedback
    restartButton.style.display = 'none'; // Esconde o botão de reinício
    quizMusic.play();
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
        feedbackElement.style.color = '';
        nextQuestion(); // Avançar para a próxima pergunta
    } else {

        
        answerButtons[selectedIndex].style.background = 'red';
        setTimeout( function(){
            answerButtons[selectedIndex].style.background = '';
            endQuiz();
        }, 1000); 
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = `Errado! ${playerName}, você perdeu!`;
        quizMusic.pause();
        quizMusic.currentTime = 0;
        
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
    quizMusic.pause();
    restartButton.style.display = 'block'; // Mostra o botão de reinício
}

function restartGame() {
    score = 0; // Reinicia a pontuação
    currentQuestion = 0; // Reinicia a fase
    feedbackElement.textContent = ''; // Limpa o feedback
    restartButton.style.display = 'none'; // Esconde o botão de reinício
    quizMusic.play();
    loadQuestion(); // Carrega a primeira pergunta
} 

// Função para reiniciar o quiz
restartButton.addEventListener('click', () => {
    document.querySelector('ul').style.display = 'flex'; // Exibe os botões novamente
    restartGame(); // Reinicia o jogo
});

// Iniciar o quiz quando a página carregar
startGame();
