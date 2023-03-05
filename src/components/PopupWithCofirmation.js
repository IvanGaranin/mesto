import { Card } from "./Card";
import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleDeleteSubmit) {
      super(selector);
      this._handleDeleteSubmit = handleDeleteSubmit;

      this._form = this._popup.querySelector(".popup__form");
    }

    openPopup(card){
        super.openPopup();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        buttonLoading(true, '#delete', false);
        this._handleDeleteSubmit(this._card)

    }

}