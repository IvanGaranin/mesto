let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
 
let formElement = document.querySelector('.popup__form');
let submitButton = document.querySelector ('.popup__form-button');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__form-input_value_name');
let jobInput = document.querySelector('.popup__form-input_value_job');


function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

// popup.addEventListener('click', function(e) {
//     if(e.target === e.currentTarget) {
//         closePopup();
//     }
// });



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();// Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);