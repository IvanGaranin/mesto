export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);


        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);   
    }

    _handleEscClose (evt) {
        if (evt.key === "Escape") { 
            this.closePopup();
        }
    }
        openPopup() {
            this._popup.classList.add('popup_opened');
            document.addEventListener("keydown", this._handleEscClose);
        }

        closePopup() {
            this._popup.classList.remove('popup_opened');
            document.removeEventListener("keydown", this._handleEscClose);
        }

        setEventListeners() {
            this._popup.addEventListener("mousedown", (evt) => {
                if (
                    evt.target.classList.contains('popup_opened')
                ) {
                    this.closePopup();
                }            
            });

            this._closeButton.addEventListener('click', () => this.closePopup());
        }
}
