import { closeByEscape, closeOnOverlay } from "./index.js";

export const initialCards = [
    {
      name: 'Барселона',
      link: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Рим',
      link: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Париж',
      link: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Лондон',
      link: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Берлин',
      link: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVybGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const elementsList = document.querySelector('.elements__list');
const imagePopup = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__photo');
const closeImageButton = document.querySelector('#image');
const popupText = document.querySelector('.popup__photo-description');



export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    _createCard () {
        const newElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return newElement;
    };
    _handleOpenImagePopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupText.innerText = this._name;
        imagePopup.classList.add('popup_opened');
        document.addEventListener('keyup', closeByEscape);
        imagePopup.addEventListener('mousedown', closeOnOverlay);
    }
    _handleCloseImagePopup() {
        imagePopup.classList.remove('popup_opened');
        document.removeEventListener('keyup', closeByEscape);
        imagePopup.removeEventListener('mousedown', closeOnOverlay);
    }
    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleOpenImagePopup();
        });
        closeImageButton.addEventListener('click', () => {
            this._handleCloseImagePopup();
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
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__description-title').innerText = this._name;
        
        this._setEventListeners();

        return this._element;
    }
}