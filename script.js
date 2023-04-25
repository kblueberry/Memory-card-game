class MatchGrid {
    constructor(...args) {
        this.boardWidth = args[0];
        this.boardHeight = args[1];
        this.colums = args[2];
        this.rows = args[3];
        this.timeLimit = args[4];
    }
}

let board = new MatchGrid(600, 400, 6, 4, 10);

window.onload = () => {
    const boardElement = document.getElementById('main-board');
    boardElement.style.height = `${board.boardHeight}px`;
    boardElement.style.width = `${board.boardWidth}px`;
    for (let count = 1; count <= (board.rows * board.colums); count++) {
        boardElement.append(createCard(board.boardWidth / board.colums, board.boardHeight / board.rows));
    }
    console.log('div child modes', boardElement);
}

function createCard(width, height) {
    const card = document.createElement('div');
    card.className = 'card-element';
    card.style.width = `${width}px`;
    card.style.height = `${height}px`;
    return card;
}

function startTimer(duration, display) {
    let timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function startGame() {
    let duration = board.timeLimit * 60,
        timerDisplay = document.querySelector('.timer');
    startTimer(duration, timerDisplay);
}
