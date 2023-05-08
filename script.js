import Card from './card.js';
import Board from './board.js'

const BOARD_WIDTH = 1200;
const BOARD_HEIGHT = 800;
const COLUMNS = 6;
const ROWS = 4;
const TIME = 3;

const board = new Board(BOARD_WIDTH, BOARD_HEIGHT, COLUMNS, ROWS, TIME);
const singleCardUnits = [];
let allCards = [], initialCardsCollection = [];
let gameStarted = false;
let index = 1;
while (index <= board.cardPairsCount) {
    const textNode = generateRandomString(2);
    singleCardUnits.push(textNode);
    index++;
}
let timeCounterId;
let timerDisplay = document.querySelector('.timer');
document.querySelector('.start').onclick = () => startGame();
document.querySelector('.replay').onclick = () => replayGame();

/**
 * On window load generate cards
 */
window.onload = () => {
    board.setBoardSize();

    for (let count = 1; count <= board.cardsCount; count++) {
        let cardContent = count <= board.cardPairsCount ? singleCardUnits[count - 1] : singleCardUnits[Math.abs(count - board.cardsCount)],
            card = new Card(count, cardContent);
        card.createDOMElement(board.boardWidth / board.colums, board.boardHeight / board.rows, count);
        card.addCardContent(cardContent);
        card.domElement.onclick = () => openCard(count);
        board.boardElementRef.append(card.domElement);
        allCards.push(card);
        initialCardsCollection.push({...card});
    }
}

/**
 * Count time spent for quiz
 * @param duration
 * @param displayElement
 */
function startTimer(duration, displayElement) {
    let timer = duration,
        minutes, seconds;
    clearInterval(timeCounterId);
    timeCounterId = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayElement.textContent = minutes + ":" + seconds;

        if (--timer === 0) {
            alert(!!allCards.length ? 'You lost!' : 'You won!');
            return;
        }
        if (!allCards.length) {
            clearInterval(timeCounterId);
            alert('You won!');
        }
    }, 1000);
}

/**
 * On button click start game and countdown time
 */
function startGame() {
    let duration = board.timeLimit * 60;
    startTimer(duration, timerDisplay);
    gameStarted = true;
}

function replayGame() {
    allCards = initialCardsCollection;
    Array.from(board.boardElementRef.children).forEach(childNode => {
        childNode.style.visibility = 'visible';
        editStylesDynamically(childNode, 'card-element__back', 'card-element__top');
    });
    clearInterval(timeCounterId);
    startGame();
}

/**
 * Open card and search for another card to match
 * @param id
 */
function openCard(id) {
    if (!gameStarted) {
        return;
    }
    let openedCard = allCards.find(card => card.id === id);
    openedCard.opened = !openedCard.opened;
    const cardsOpened = allCards.filter(card => card.opened);

    if (cardsOpened.length > 2) return;
    if (openedCard.opened) {
        openedCard.editStylesDynamically('card-element__top', 'card-element__back');
    } else {
        openedCard.editStylesDynamically('card-element__back', 'card-element__top');
    }
    checkIfOpenedCardsMatch(cardsOpened[0], cardsOpened[1]);
}

/**
 * Check opened card if matching
 * @param card1
 * @param card2
 */
function checkIfOpenedCardsMatch(card1, card2) {
    let textContent, matchesShower = document.getElementById('cards-match-shower');
    if (card1.cardValue !== card2.cardValue) {
        card1.opened = false;
        card2.opened = false;
        setTimeout(() => {
            card1.editStylesDynamically('card-element__back', 'card-element__top');
            card2.editStylesDynamically('card-element__back', 'card-element__top');
            textContent = '';
            matchesShower.textContent = textContent;
        }, 500);
    } else {
        allCards = allCards.filter(card => card.id !== card1.id && card.id !== card2.id);
        setTimeout(() => {
            card1.hideCardContent();
            card2.hideCardContent();
            textContent = `Cards width ids ${card1.id} and ${card2.id} matched`;
            matchesShower.textContent = textContent;
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

