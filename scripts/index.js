import {initialCards, elementsList, Card} from './card.js';

import { FormValidator } from './validate.js';


export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-error_active"
};


const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('#edit');
const closeAddButton = document.querySelector('#add');
const submitButton = document.querySelector('#create');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const editForm = editPopup.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__form-input_value_name');
const jobInput = document.querySelector('.popup__form-input_value_job');

const createForm = document.querySelector('.popup__form_create');
const linkInput = document.querySelector('.popup__form-input_value_link');
const titleInput = document.querySelector('.popup__form-input_value_title');



function openPopup(popup) {
    document.addEventListener('keyup', closeByEscape);
    popup.addEventListener('mousedown', closeOnOverlay);
    popup.classList.add('popup_opened');
};

editButton.addEventListener('click', () => {
    openPopup(editPopup)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    const turnOn = new FormValidator(settings, '.popup__form_edit');
    const validateOn = turnOn.enableValidation();
}); //открытие попапа для профиля
addButton.addEventListener('click', () => {
    openPopup(addPopup)
    const turnOn = new FormValidator(settings, '.popup__form_create');
    const validateOn = turnOn.enableValidation();
}); //открытие попапа для добавления карточки

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEscape);
    popup.removeEventListener('mousedown', closeOnOverlay);
}

closeEditButton.addEventListener('mouseup', () => closePopup(editPopup));
closeAddButton.addEventListener('click', () => closePopup(addPopup));

function handleEditForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
};

function submitCardAdd (evt) {
    evt.preventDefault();
    addCard({name: titleInput.value, link: linkInput.value});
    closePopup(addPopup);
    createForm.reset();
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add('popup__form-button_disabled');
};


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', handleEditForm); // отправка данных в профиле
createForm.addEventListener('submit', submitCardAdd);


export function closeOnOverlay (evt) {
        if(evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
};

export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }

const addCard = (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.generateCard();

    elementsList.prepend(cardElement);
}

initialCards.forEach((item) => {
    addCard(item);
});



// function createCards (name, link) {
//     const newElement = elementTemplate.cloneNode(true);
//     const cardPhoto = newElement.querySelector('.element__photo');
//     const cardTitle = newElement.querySelector('.element__description-title'); 
//     cardPhoto.src = link;
//     cardPhoto.alt = name;
//     cardTitle.innerText = name;
//     newElement.querySelector('.element__description-button').addEventListener('click', (event) => {
//         event.target.classList.toggle('element__description-button_active'); // переключатель лайка
//     });
//     newElement.querySelector('.element__delete-button').addEventListener('click', (event) => {
//         event.target.closest('.element').remove(); // удаление карточки
//     });
//     cardPhoto.addEventListener('click', function() {
//         popupImage.src = link;
//         popupImage.alt = name;
//         popupText.innerText = name;
//         openPopup(imagePopup);
//     }); // открытие попапа с картинкой

//     return newElement;
// }; //создание карточек с фотками

// function addCards(newElement) {
//     const card = new Card(linkInput, '#card'); 
//     elementsList.prepend(card);
// };

// initialCards.forEach(item => addCards(item)); // перебор массива с карточками

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
