export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._api = api;
        this._cardId = data._id;
    }
    _createCard() {
        const newElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".element")
            .cloneNode(true);

        return newElement;
    }

    _handleLike() {
        console.log(this._cardId);
        if (this._buttonLike.contains("element__description-button_active")) {
            this._api.dislikeCard(this._cardId).then((data) => {
                this._elementCount = document.querySelector(
                    ".element__count-likes"
                );
                this._elementCount.textContent = data.lenght;
                this._buttonLike.classList.add(
                    "element__description-button_active"
                );
            });
        } else {
            this._api.likeCard(this._cardId).then((data) => {
                this._elementCount = document.querySelector(
                    ".element__count-likes"
                );
                this._elementCount.textContent = data.lenght;
                this._buttonLike.classList.remove(
                    "element__description-button_active"
                );
            });
        }
    }

    _handleDelete() {
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
            this._handleDelete()
        );
    }
    generateCard() {
        this._element = this._createCard();
        this._cardImage = this._element.querySelector(".element__photo");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".element__description-title").innerText =
            this._name;

        this._setEventListeners();

        return this._element;
    }
}
