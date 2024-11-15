// Configurações iniciais do jogo da cobrinha
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');
const grid = 10;
let count = 0;
let snake = [{x: 50, y: 50}];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;

// Aumentando o tamanho do canvas
canvas.width = 500;
canvas.height = 500;

// Função principal de loop do jogo
function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < 8) return; // Diminuindo a velocidade aumentando o valor de count
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    checkCollisions();
    drawSnake();
    drawFood();
    drawScore();
}

// Movimento da cobrinha
function moveSnake() {
    const head = {...snake[0]};
    if (direction === 'LEFT') head.x -= grid;
    if (direction === 'RIGHT') head.x += grid;
    if (direction === 'UP') head.y -= grid;
    if (direction === 'DOWN') head.y += grid;
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Checando colisões
function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Reiniciar o jogo
function resetGame() {
    snake = [{x: 50, y: 50}];
    direction = 'RIGHT';
    score = 0;
    food = generateFood();
}

// Gerar a comida
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    const y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    return {x, y};
}

// Desenhar a cobrinha
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
}

// Desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
}

// Desenhar a pontuação
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, canvas.height - 10);
}

// Controlar a direção com as teclas WASD
function changeDirection(event) {
    if (event.key === 'a' || event.key === 'A') {
        if (direction !== 'RIGHT') direction = 'LEFT';
    }
    if (event.key === 'd' || event.key === 'D') {
        if (direction !== 'LEFT') direction = 'RIGHT';
    }
    if (event.key === 'w' || event.key === 'W') {
        if (direction !== 'DOWN') direction = 'UP';
    }
    if (event.key === 's' || event.key === 'S') {
        if (direction !== 'UP') direction = 'DOWN';
    }
}

window.addEventListener('keydown', changeDirection);
gameLoop();
