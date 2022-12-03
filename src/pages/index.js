import {Card} from '../components/Card.js';
import '../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, popupEditProfile, buttonAdd, popupAddCard, popupImage, initialCards, settings, profileJob, profileName } from '../utils/Constants.js';


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

    const popupEdit = new Popup (".popup_edit");
    popupEdit.setEventListeners();
    popupEdit.openPopup();
});

const popupEditForm = new PopupWithForm (popupEditProfile, (formData) => {
    userEditInfo.setUserInfo(formData);
});

popupEditForm.setEventListeners();



buttonAdd.addEventListener('click', () => {
    const popupAdd = new Popup(".popup_add");
    popupAdd.setEventListeners();
    popupAdd.openPopup();
})


function handleCardClick () {
        const popupWithImage = new PopupWithImage(popupImage);
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
    document.querySelector('.elements__list')
);
cardList.renderItems();




const addForm = new PopupWithForm(popupAddCard, (formData) => {
        const addedCard = new Card(formData, '#card', handleCardClick);
        const addedElement = addedCard.generateCard();
        document.querySelector('.elements__list').prepend(addedElement);
});

addForm.setEventListeners();

