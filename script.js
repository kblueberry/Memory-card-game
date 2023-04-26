class MatchGrid {
    constructor(...args) {
        this.boardWidth = args[0];
        this.boardHeight = args[1];
        this.colums = args[2];
        this.rows = args[3];
        this.timeLimit = args[4];
    }
}

const board = new MatchGrid(600, 400, 6, 4, 10);
const singleSymbolsNotMatchedArr = [];
let index = 1;
while (index <= (board.rows * board.colums) / 2) {
    const textNode = document.createTextNode(generateRandomString(2));
    singleSymbolsNotMatchedArr.push(textNode);
    index++;
}

window.onload = () => {
    const boardElement = document.getElementById('main-board');
    boardElement.style.height = `${board.boardHeight}px`;
    boardElement.style.width = `${board.boardWidth}px`;
    for (let count = 1; count <= (board.rows * board.colums); count++) {
        let card = createCard(board.boardWidth / board.colums, board.boardHeight / board.rows, count);
        card.addEventListener('click', () => openCard(count));
        boardElement.append(card);
    }
    console.log('div child modes', boardElement);
}

function createCard(width, height, id) {
    const card = document.createElement('div');
    card.className = 'card-element__back';
    card.id = id;
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

function openCard(id) {
    let openedCard = document.getElementById(id);
    openedCard.appendChild((id <= (board.rows * board.colums) / 2) ? singleSymbolsNotMatchedArr[id] : singleSymbolsNotMatchedArr[Math.abs(id - (board.rows * board.colums))]);
    openedCard.classList.add('card-element__top');
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDE';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

