import {Card} from './Card.js';

import {FormValidator} from './FormValidator.js';

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

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
const popupPhoto = document.querySelector('.popup__photo'); 
const popupText = document.querySelector('.popup__photo-description');


const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonImageClose = document.querySelector('#image');
const buttonEditClose = document.querySelector('#edit');
const buttonAddClose = document.querySelector('#add');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const formEdit = popupEdit.querySelector('.popup__form');
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

function openPopup(popup) {
    document.addEventListener('keyup', closeByEscape);
    popup.addEventListener('mousedown', closeOnOverlay);
    popup.classList.add('popup_opened');
};

function handleOpenImagePopup (name, link) {
    popupPhoto.src = link;
    popupPhoto.alt = name;
    popupText.textContent = name;
    openPopup(popupImage);
}

buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}); //открытие попапа для профиля
buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
}); //открытие попапа для добавления карточки

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEscape);
    popup.removeEventListener('mousedown', closeOnOverlay);
}

buttonEditClose.addEventListener('mouseup', () => closePopup(popupEdit));
buttonAddClose.addEventListener('click', () => closePopup(popupAdd));
buttonImageClose.addEventListener('click', () => closePopup(popupImage));

function handleEditForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
};

function submitCardAdd (evt) {
    evt.preventDefault();
    elementsList.prepend(addCard({name: titleInput.value, link: linkInput.value}));
    closePopup(popupAdd);
    formCreate.reset();
    addFormValidator.resetValidation();
};


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleEditForm); // отправка данных в профиле
formCreate.addEventListener('submit', submitCardAdd);


function closeOnOverlay (evt) {
        if(evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }

const addCard = (item) => {
    const card = new Card(item, '#card', handleOpenImagePopup);
    const cardElement = card.generateCard();

    return cardElement;
}

initialCards.forEach((item) => {
    addCard(item);
    elementsList.prepend(addCard(item));
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
