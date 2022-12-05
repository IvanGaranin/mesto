export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _createCard () {
        const newElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return newElement;
    };

    _handleLike() {
        this._buttonLike.classList.toggle('element__description-button_active');
    }
    
    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.element__description-button');
        this._buttonDelete = this._element.querySelector('.element__delete-button');

        this._cardImage.addEventListener('click', () => {
           this._handleCardClick( {name: this._name, link: this._link} );
        });
        this._buttonLike.addEventListener('click', () => this._handleLike());

       this._buttonDelete.addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });

    }
    generateCard() {
        this._element = this._createCard();
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__description-title').innerText = this._name;
        
        this._setEventListeners();

        return this._element;
    }
}