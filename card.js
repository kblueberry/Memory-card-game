export default class Card {
    constructor(id, cardVal) {
        this.domElement = null;
        this.id = id;
        this.cardValue = cardVal;
        this.opened = false;
    }

    /**
     * Create card DOM element with proper styles
     * @param width
     * @param height
     * @param id
     * @param cardTextNode
     */
    createDOMElement(width, height, id) {
        this.domElement = document.createElement('div');
        this.domElement.className = 'card-element__back';
        this.domElement.id = id;
        this.domElement.style.width = `${width}px`;
        this.domElement.style.height = `${height}px`;
        this.domElement.style.visibility = 'visible';
    }

    /**
     * Add content to the top side of card
     * @param cardTextNode
     */
    addCardContent(cardTextNode) {
        const cardContent = document.createElement('p');
        cardContent.classList.add('card-value');
        cardContent.appendChild(document.createTextNode(cardTextNode));
        this.domElement.appendChild(cardContent);
    }

    /**
     * Hide card content on reverted card when cards didn't match
     */
    hideCardContent() {
        this.domElement.style.visibility = 'hidden';
    }

    /**
     * Remove/add css classes depending on card opened state
     * @param element
     * @param class1
     * @param class2
     */
    editStylesDynamically(classes) {
        this.domElement.classList.add(classes[0]);
        this.domElement.classList.remove(classes[1]);
    }
}