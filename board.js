export default class Board {
    boardElementRef = document.getElementById('main-board');
    
    constructor(...args) {
        this.boardWidth = args[0];
        this.boardHeight = args[1];
        this.colums = args[2];
        this.rows = args[3];
        this.timeLimit = args[4];
    }

    /**
     * Calculate cards count
     * @returns {number}
     */
    get cardsCount() {
        return this.colums * this.rows;
    }

    /**
     * Calculate card pairs count
     * @returns {number}
     */
    get cardPairsCount() {
        return this.cardsCount / 2;
    }

    /**
     * Set board width and height
     * @param boardEl
     */
    setBoardSize() {
        this.boardElementRef.style.height = `${this.boardHeight}px`;
        this.boardElementRef.style.width = `${this.boardWidth}px`;
    }
}