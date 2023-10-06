const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;

document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
    if (event.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
    if (event.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
}

function update() {
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Eat food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }

    // Check for game over
    if (snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= 20 || snake[0].y >= 20) {
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
    }

    // Draw everything
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "blue";
    for (let part of snake) {
        context.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);
    }

    context.fillStyle = "red";
    context.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

setInterval(update, 100);
