export class Card {
    constructor(data, cardSelector, handleOpenImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleOpenImagePopup = handleOpenImagePopup;
    }
    _createCard () {
        const newElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return newElement;
    };
    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleOpenImagePopup(this._name, this._link);
        });
        this._element.querySelector('.element__description-button').addEventListener('click', (event) => {
            event.target.classList.toggle('element__description-button_active'); // переключатель лайка
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', (event) => {
            event.target.closest('.element').remove(); // удаление карточки
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