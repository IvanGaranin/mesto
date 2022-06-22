const popups = document.querySelectorAll('.popup');
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
const elementTemplate = document.querySelector('#card').content;
const popupImage = document.querySelector('.popup__photo');
const popupText = document.querySelector('.popup__photo-description');
let editPopup = document.querySelector('.popup_edit');
let addPopup = document.querySelector('.popup_add');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form');
let submitButton = document.querySelector ('.popup__form-button');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__form-input_value_name');
let jobInput = document.querySelector('.popup__form-input_value_job');
let imagePopup = document.querySelector('.popup_image');



function openEditPopup () {
    editPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openAddPopup () {
    addPopup.classList.add('popup_opened');
}

function openImagePopup () {
    imagePopup.classList.add('popup_opened');
}

function closePopup () {
    popups.forEach((item) => {
    item.classList.remove('popup_opened');
    })
}

editButton.addEventListener('click', openEditPopup); //открытие попапа для профиля
addButton.addEventListener('click', openAddPopup); //открытие попапа для добавления карточки

closeButtons.forEach((button) => {
    button.addEventListener('click', closePopup);
}); // закрытие попапов

function createCards (name, link) {
    const newElement = elementTemplate.cloneNode(true);
    newElement.querySelector('.element__photo').src = link;
    newElement.querySelector('.element__photo').alt = name;
    newElement.querySelector('.element__description-title').innerText = name;
    newElement.querySelector('.element__description-button');
    newElement.querySelector('.element__delete-button').addEventListener('click', (event) => {
        event.target.closest('.element').remove(); // удаление карточки
    });
    newElement.querySelector('.element__description-button').addEventListener('click', (event) => {
        event.target.classList.toggle('element__description-button_active'); // переключатель лайка
    });
    newElement.querySelector('.element__photo').addEventListener('click', function() {
        popupImage.src = link;
        popupImage.alt = name;
        popupText.innerText = name;
        openImagePopup();
    }); // открытие попапа с картинкой
        elementsList.prepend(newElement);
}; //создание карточек с фотками

initialCards.forEach((item) => {
    createCards(item.name, item.link)
}); // перебор массива с карточками

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
};

function submitCardAdd (evt) {
    evt.preventDefault(); 
    let createForm = document.querySelector('.popup__form_create');
    let linkInput = document.querySelector('.popup__form-input_value_link');
    let titleInput = document.querySelector('.popup__form-input_value_title');
    let newCard = document.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__photo').src = linkInput.value;
    newCard.querySelector('.element__photo').alt = titleInput.value;
    newCard.querySelector('.element__description-title').textContent = titleInput.value;
    newCard.querySelector('.element__delete-button').addEventListener('click', (event) => {
        event.target.closest('.element').remove(); // удаление карточки
    });
    newCard.querySelector('.element__description-button').addEventListener('click', (event) => {
        event.target.classList.toggle('element__description-button_active'); // переключатель лайка
    });
    newCard.querySelector('.element__photo').addEventListener('click', function() {
        popupImage.src = linkInput.value;
        popupImage.alt = titleInput.value;
        popupText.innerText = titleInput.value;
        openImagePopup();
    });
    elementsList.prepend(newCard);
    closePopup();
    createForm.reset();
};

let createButton = document.querySelector('.popup__form_create');
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); // отправка данных в профиле
createButton.addEventListener('submit', submitCardAdd);
// popup.addEventListener('click', function(e) {
//     if(e.target === e.currentTarget) {
//         closePopup();
//     }
// });