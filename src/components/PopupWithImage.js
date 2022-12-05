import Popup from './Popup.js';



export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);

        this._elementImage = this._popup.querySelector('.popup__photo');
        this._elementImageText = this._popup.querySelector('.popup__photo-description');
    }

    openPopup(name, link) {
        super.openPopup();

        this._elementImage.src = link;
        this._elementImage.alt = name;
        this._elementImageText.textContent = name;
        
    }

    closePopup() {
        super.closePopup();

        this._elementImage.src = '';
        this._elementImage.alt = '';
        this._elementImage.textContent = '';

        
    }

}