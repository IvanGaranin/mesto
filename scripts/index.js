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
const forms = document.querySelectorAll('.popup__container');
const elementTemplate = document.querySelector('#card').content;
const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__photo');
const popupText = document.querySelector('.popup__photo-description');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('#edit');
const closeAddButton = document.querySelector('#add');
const submitButton = document.querySelector('#create');
const closeImageButton = document.querySelector('#image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const editForm = editPopup.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__form-input_value_name');
const jobInput = document.querySelector('.popup__form-input_value_job');
const imagePopup = document.querySelector('.popup_image');

const createForm = document.querySelector('.popup__form_create');
const linkInput = document.querySelector('.popup__form-input_value_link');
const titleInput = document.querySelector('.popup__form-input_value_title');

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-error_active"
};

function openPopup(popup) {
    document.addEventListener('keyup', closeByEscape);
    popup.addEventListener('mousedown', closeOnOverlay);
    popup.classList.add('popup_opened');
};

editButton.addEventListener('click', () => {
    openPopup(editPopup)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}); //открытие попапа для профиля
addButton.addEventListener('click', () => openPopup(addPopup)); //открытие попапа для добавления карточки

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEscape);
    popup.removeEventListener('mousedown', closeOnOverlay);
}

closeEditButton.addEventListener('mouseup', () => closePopup(editPopup));
closeAddButton.addEventListener('click', () => closePopup(addPopup));
closeImageButton.addEventListener('click', () => closePopup(imagePopup));

function handleEditForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
};

function submitCardAdd (evt) {
    evt.preventDefault();
    addCards({name: titleInput.value, link: linkInput.value});
    closePopup(addPopup);
    createForm.reset();
    submitButton.setAttribute("disabled", true);
};


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', handleEditForm); // отправка данных в профиле
createForm.addEventListener('submit', submitCardAdd);


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

function createCards (name, link) {
    const newElement = elementTemplate.cloneNode(true);
    const cardPhoto = newElement.querySelector('.element__photo');
    const cardTitle = newElement.querySelector('.element__description-title'); 
    cardPhoto.src = link;
    cardPhoto.alt = name;
    cardTitle.innerText = name;
    newElement.querySelector('.element__description-button').addEventListener('click', (event) => {
        event.target.classList.toggle('element__description-button_active'); // переключатель лайка
    });
    newElement.querySelector('.element__delete-button').addEventListener('click', (event) => {
        event.target.closest('.element').remove(); // удаление карточки
    });
    cardPhoto.addEventListener('click', function() {
        popupImage.src = link;
        popupImage.alt = name;
        popupText.innerText = name;
        openPopup(imagePopup);
    }); // открытие попапа с картинкой

    return newElement;
}; //создание карточек с фотками

function addCards(newElement) {
    const card = createCards(newElement.name, newElement.link);
    elementsList.prepend(card);
};

initialCards.forEach(item => addCards(item)); // перебор массива с карточками

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
