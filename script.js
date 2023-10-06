const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
const canvasSize = canvas.width;

let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let food = {
    x: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize
};

let dx = boxSize;
let dy = 0;

document.addEventListener("keydown", moveSnake);

function drawSnakePart(snakePart) {
    context.fillStyle = (snake.indexOf(snakePart) === 0) ? 'green' : 'lightgreen';
    context.fillRect(snakePart.x, snakePart.y, boxSize, boxSize);
    context.strokeStyle = 'darkgreen';
    context.strokeRect(snakePart.x, snakePart.y, boxSize, boxSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake(event) {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));

    if (event.key === "ArrowRight" && dx === 0) {
        dx = boxSize; dy = 0;
        document.getElementById('right').classList.add('active');
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -boxSize; dy = 0;
        document.getElementById('left').classList.add('active');
    } else if (event.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -boxSize;
        document.getElementById('up').classList.add('active');
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = boxSize;
        document.getElementById('down').classList.add('active');
    }
}

function update() {
    // Update snake position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize
        };
    } else {
        snake.pop();
    }

    // Game over conditions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(snakePart => snakePart.x === head.x && snakePart.y === head.y && snakePart !== head)) {
        snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
        dx = boxSize;
        dy = 0;
    }

    // Clear canvas
    context.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food and snake
    drawFood();
    drawSnake();

    // Update score
    document.getElementById('score').textContent = "Punteggio: " + (snake.length - 1);
}

setInterval(update, 100);


