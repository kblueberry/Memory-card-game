class MatchGrid {
    constructor(...args) {
        this.boardWidth = args[0];
        this.boardHeight = args[1];
        this.colums = args[2];
        this.rows = args[3];
        this.timeLimit = args[4];
    }
}

class Card {
    constructor(element, id, cardVal) {
        this.domElement = element;
        this.id = id;
        this.cardValue = cardVal;
        this.opened = false;
        this.matchFound = false;
    }
}

const board = new MatchGrid(600, 400, 6, 4, 10);
const singleCardUnits = [];
let allCards = [];
let index = 1,
    cardsCount = board.rows * board.colums,
    pairsCount = cardsCount / 2;
while (index <= pairsCount) {
    const textNode = generateRandomString(2);
    singleCardUnits.push(textNode);
    index++;
}

/**
 * On window load generate cards
 */
window.onload = () => {
    const boardElement = document.getElementById('main-board');
    boardElement.style.height = `${board.boardHeight}px`;
    boardElement.style.width = `${board.boardWidth}px`;
    for (let count = 1; count <= cardsCount; count++) {
        let cardTextNode = count <= pairsCount ? singleCardUnits[count - 1] : singleCardUnits[Math.abs(count - cardsCount)];
        let card = new Card(createCard(board.boardWidth / board.colums, board.boardHeight / board.rows, count, cardTextNode), count, cardTextNode);
        card.domElement.addEventListener('click', () => openCard(count));
        boardElement.append(card.domElement);
        allCards.push(card);
    }
}

/**
 * Create a DOM element for card with certain attributes
 * @param width
 * @param height
 * @param id
 * @returns {HTMLDivElement}
 */
function createCard(width, height, id, cardTextNode) {
    const card = document.createElement('div'),
        textNodeElem = document.createElement('p');
    card.className = 'card-element__back';
    card.id = id;
    card.style.width = `${width}px`;
    card.style.height = `${height}px`;
    textNodeElem.classList.add('card-value');
    textNodeElem.appendChild(document.createTextNode(cardTextNode));
    card.appendChild(textNodeElem);
    return card;
}

/**
 * Count time spent for quiz
 * @param duration
 * @param display
 */
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

/**
 * On button click start game and countdown time
 */
function startGame() {
    let duration = board.timeLimit * 60,
        timerDisplay = document.querySelector('.timer');
    startTimer(duration, timerDisplay);
}

/**
 * Open card and search for another card to match
 * @param id
 */
function openCard(id) {
    let openedCard = allCards.find(card => card.id === id);
    openedCard.opened = !openedCard.opened;
    const cardsOpened = allCards.filter(card => card.opened);

    if (cardsOpened.length > 2) return;
    if (openedCard.opened) {
        editStylesDynamically(openedCard.domElement, 'card-element__top', 'card-element__back');
    } else {
        editStylesDynamically(openedCard.domElement, 'card-element__back', 'card-element__top');
    }
    checkIfOpenedCardsMatch(cardsOpened[0], cardsOpened[1]);
}

/**
 * Check opened card if matching
 * @param card1
 * @param card2
 */
function checkIfOpenedCardsMatch(card1, card2) {
    if (card1.cardValue !== card2.cardValue) {
        card1.opened = false;
        card2.opened = false;
        setTimeout(() => {
            editStylesDynamically(card1.domElement, 'card-element__back', 'card-element__top');
            editStylesDynamically(card2.domElement, 'card-element__back', 'card-element__top');
        }, 500);
    } else {
        allCards = allCards.filter(card => card.id !== card1.id && card.id !== card2.id);
        setTimeout(() => {
            document.getElementById(card1.id).style.visibility = 'hidden';
            document.getElementById(card2.id).style.visibility = 'hidden';
        }, 500);
    }
}

/**
 * Generate random string value for a card
 * @param length
 * @returns {string}
 */
function generateRandomString(length) {
    let result = '';
    const characters = 'みに習かす';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

/**
 * Remove/add css classes depending on card opened state
 * @param element
 * @param class1
 * @param class2
 */
function editStylesDynamically(element, class1, class2) {
    element.classList.add(class1);
    element.classList.remove(class2);
}

