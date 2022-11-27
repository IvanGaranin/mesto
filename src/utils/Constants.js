export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-error_active"
};

export const elementsList = document.querySelector('.elements__list');
export const initialCards = [
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

export const popupEditProfile = document.querySelector('.popup_edit');
export const popupAddCard = document.querySelector('.popup_add');
export const popupImage = document.querySelector('.popup_image');
// const popupPhoto = document.querySelector('.popup__photo');
// const popupText = document.querySelector('.popup__photo-description');


export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
// const buttonImageClose = document.querySelector('#image');
// const buttonEditClose = document.querySelector('#edit');
// const buttonAddClose = document.querySelector('#add');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

export const formEdit = popupEditProfile.querySelector('.popup__form');
// Находим поля формы в DOM
export const nameInput = document.querySelector('.popup__form-input_value_name');
export const jobInput = document.querySelector('.popup__form-input_value_job');

export const formCreate = document.querySelector('.popup__form_create');