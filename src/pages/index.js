import {Card} from '../components/Card.js';
import '../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, buttonAdd, initialCards, settings } from '../utils/Constants.js';


const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);
addFormValidator.enableValidation();



const userEditInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });

buttonEdit.addEventListener('click', () => {
    const profileValues = userEditInfo.getUserInfo();

    nameInput.value = profileValues.name;
    jobInput.value = profileValues.job;
    popupEditForm.openPopup();
});
//     const popupEdit = new Popup ('.popup_edit');
//     popupEdit.setEventListeners();
//     popupEdit.openPopup();
// });

const popupEditForm = new PopupWithForm ('#popup_edit', (formData) => {
    userEditInfo.setUserInfo(formData);
});

popupEditForm.setEventListeners();



buttonAdd.addEventListener('click', () => {
    addFormValidator.enableValidation();
    addForm.openPopup();
})

const addForm = new PopupWithForm('#popup_add', (formData) => {
    const newCard = addCard(formData);
    cardList.addItem(newCard);
});

addForm.setEventListeners();


const popupWithImage = new PopupWithImage('#popup_image');

function handleCardClick () {
        popupWithImage.openPopup(this._name, this._link);
};

const addCard = (item) => {
    const card = new Card(item, '#card', handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
};

const cardList = new Section( {
    items: initialCards,
    renderer: (item) => {
        const element = addCard(item);
        cardList.addItem(element);
    }, }, 
    '.elements__list'
);
cardList.renderItems();

