import { data } from "autoprefixer";

export class Card {
    constructor(data, cardSelector, handleCardClick, api, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._owner = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._api = api;
    }
    _createCard() {
        const newElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".element")
            .cloneNode(true);

        return newElement;
    }
    _handleLike() {
        if (
            this._buttonLike.classList.contains(
                "element__description-button_active"
            )
        ) {
            this._api.dislikeCard(this._cardId).then((data) => {
                this._element.querySelector(
                    ".element__count-likes"
                ).textContent = data.likes.length;
                this._buttonLike.classList.remove(
                    "element__description-button_active"
                );
            }) .catch(() => console.log('Что-то пошло не так'))
        } else {
            this._api.likeCard(this._cardId).then((data) => {
                this._element.querySelector(
                    ".element__count-likes"
                ).textContent = data.likes.length;
                this._buttonLike.classList.add(
                    "element__description-button_active"
                );
            }) .catch(() => console.log('Что-то пошло не так')) 
        }
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._buttonLike = this._element.querySelector(
            ".element__description-button"
        );
        this._buttonDelete = this._element.querySelector(
            ".element__delete-button"
        );

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick({ name: this._name, link: this._link });
        });
        this._buttonLike.addEventListener("click", () => this._handleLike());

        this._buttonDelete.addEventListener("click", () =>
            this._handleDeleteClick(this._element)
        );
    }
    generateCard() {
        this._element = this._createCard();
        this._cardImage = this._element.querySelector(".element__photo");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".element__description-title").innerText =
            this._name;
            if(this._likes.length > 0) {
                this._element.querySelector(".element__count-likes").textContent = 
                this._likes.length
            } else {
                this._element.querySelector(".element__count-likes").textContent =
                '0'; 
            }

        

        this._setEventListeners();

        return this._element;
    }
}
