import {Card} from './Card.js';
import '../index.css';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-error_active"
};

const elementsList = document.querySelector('.elements__list');
const initialCards = [
    {
      name: 'Барселона',
      link: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Рим',
      link: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Париж',
      link: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Лондон',
      link: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Берлин',
      link: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVybGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
// const popupPhoto = document.querySelector('.popup__photo');
// const popupText = document.querySelector('.popup__photo-description');


const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
// const buttonImageClose = document.querySelector('#image');
// const buttonEditClose = document.querySelector('#edit');
// const buttonAddClose = document.querySelector('#add');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

const formEdit = popupEditProfile.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__form-input_value_name');
const jobInput = document.querySelector('.popup__form-input_value_job');

const formCreate = document.querySelector('.popup__form_create');
const linkInput = document.querySelector('.popup__form-input_value_link');
const titleInput = document.querySelector('.popup__form-input_value_title');

const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);
addFormValidator.enableValidation();

const profileDefault = {};
profileDefault.name = profileName.textContent;
profileDefault.job = profileJob.textContent;

console.log(profileDefault);


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

