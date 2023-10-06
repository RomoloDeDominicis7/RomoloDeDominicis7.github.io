const canvas = document.getElementById("snakeCanvas");
const context = canvas.getContext("2d");
const boxSize = 20;

let snake = [{ x: 10, y: 10 }];
let food = {
    x: Math.floor(Math.random() * 21),
    y: Math.floor(Math.random() * 21)
};

let dx = 0;
let dy = 0;

document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));

    if (event.key === "ArrowRight" && dx === 0) {
        dx = 1; dy = 0;
        document.getElementById('right').classList.add('active');
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -1; dy = 0;
        document.getElementById('left').classList.add('active');
    } else if (event.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -1;
        document.getElementById('up').classList.add('active');
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = 1;
        document.getElementById('down').classList.add('active');
    }
}

function update() {
    // ... [Codice per muovere il serpente, controllare collisioni, mangiare cibo, ecc.]
    // Aggiorna il punteggio
    document.getElementById('score').textContent = "Punteggio: " + (snake.length - 1);
}

setInterval(update, 100);


