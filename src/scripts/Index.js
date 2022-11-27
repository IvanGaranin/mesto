import {Card} from './Card.js';
import '../index.css';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, popupEditProfile, buttonAdd, popupAddCard, popupImage, initialCards, elementsList, settings, profileJob, profileName } from '../utils/Constants.js';


const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);
addFormValidator.enableValidation();


const profileDefault = {};
profileDefault.name = profileName.textContent;
profileDefault.job = profileJob.textContent;

const userEditInfo = new UserInfo( {profileDefault} );

console.log(userEditInfo);

buttonEdit.addEventListener('click', () => {
    const profileValues = userEditInfo.getUserInfo();


    nameInput.value = profileValues.name;
    jobInput.value = profileValues.job;

    const popupEdit = new Popup (popupEditProfile);
    popupEdit.openPopup();
});

const popupEditForm = new PopupWithForm (popupEditProfile, (formData) => {
    userEditInfo.setUserInfo(formData);
});

popupEditForm.setEventListeners();



buttonAdd.addEventListener('click', () => {
    const popupAdd = new Popup(popupAddCard);
    popupAdd.openPopup();
})


function handleCardClick () {
        const popupWithImage = new PopupWithImage(popupImage);
        popupWithImage.openImagePopup(this._name, this._link);
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
    elementsList
);
cardList.renderItems();




const addForm = new PopupWithForm(popupAddCard, (formData) => {
        const addedCard = new Card(formData, '#card', handleCardClick);
        const addedElement = addedCard.generateCard();
        elementsList.prepend(addedElement);
});

addForm.setEventListeners();

