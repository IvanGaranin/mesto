export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-error_active"
};

export const elementsList = document.querySelector('.elements__list');


export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const popupDelete = document.querySelector('#popup_delete');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

export const formEdit = document.querySelector('.popup__form_edit');
// Находим поля формы в DOM
export const nameInput = document.querySelector('.popup__form-input_value_name');
export const jobInput = document.querySelector('.popup__form-input_value_job');
export const avatar = document.querySelector('.profile__avatar').src;

export const formCreate = document.querySelector('.popup__form_create');
export const buttonDelete = document.querySelector('.element__delete-button');
