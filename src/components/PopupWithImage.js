import Popup from './Popup.js';



export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._elementImage = this._popup.querySelector('.popup__photo');
        this._elementImageText = this._popup.querySelector('.popup__photo-description');
    }

    openPopup(data) {
        super.openPopup();

        this._elementImage.src = data.link;
        this._elementImage.alt = data.name;
        this._elementImageText.textContent = data.name;
        
    }

    closePopup() {
        super.closePopup();

        this._elementImage.src = '';
        this._elementImage.alt = '';
        this._elementImage.textContent = '';

        
    }

}