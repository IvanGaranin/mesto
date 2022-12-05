import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
      super(selector);
      this._handleFormSubmit = handleFormSubmit;

      this._form = this._popup.querySelector(".popup__form");
      this._inputList = this._form.querySelectorAll(".popup__form-input");

    }

    _getInputValues() {

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    closePopup() {

        super.closePopup();
        this._form.reset();

    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
          });
    }
};