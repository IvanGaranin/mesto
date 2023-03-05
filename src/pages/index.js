import {Card} from '../components/Card.js';
import '../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, buttonAdd, settings, buttonDelete, popupDelete, avatar, profileJob, profileName, profile} from '../utils/Constants.js';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60/',
    headers: {
      authorization: '3a48a443-c581-4331-866e-3f33303c8654',
      'Content-Type': 'application/json'
    }
});

  let cardList = null;



api.getInitialCards()
  .then((data) => {
    const myArray = data
    myArray.reverse()
    cardList = new Section({
        items: myArray,
        renderer: (data) => {
            const element = addCard(data);
            cardList.addItem(element);
        }
    }, '.elements__list')
    cardList.renderItems()
    })

    const addCard = (data) => {
        console.log(data);
        const card = new Card(data, '#card', (data) => {
            const popupWithImage = new PopupWithImage('#popup_image');
                popupWithImage.setEventListeners();
                popupWithImage.openPopup({ name: data.name, link: data.link })
        });
        const cardElement = card.generateCard(data)
        return cardElement
    }

api.getProfileInfo()
  .then((data) => {
   profileName.textContent = data.name,
   profileJob.textContent = data.about,
   avatar.src = data.avatar
  })
  .catch(() => console.log('Что-то пошло не так'))

buttonEdit.addEventListener('click', () => {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        popupEditForm.openPopup();
})

const popupEditForm = new PopupWithForm ('#popup_edit', () => {
    const newUser = new UserInfo({ name: nameInput.value, about: jobInput.value });
    
    const user = newUser.getUserInfo();
    api.editProfileInfo({ name: user.name, about: user.about })
    profileName.textContent = user.name;
    profileJob.textContent = user.about;

})
popupEditForm.setEventListeners();

buttonAdd.addEventListener('click', () => {
    addFormValidator.enableValidation();
    addForm.openPopup();
})

const addForm = new PopupWithForm('#popup_add', (formData) => {
    const newCard = addCard(formData);
    api.addNewCard({ name: formData.name, link: formData.link })
    cardList.addItem(newCard);
});
addForm.setEventListeners();


api.likeCard()
    .then((data) => {
        
    })

const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);
addFormValidator.enableValidation();






buttonDelete.addEventListener('click', () => {
    popupDelete.openPopup();
})

// const addCard = (data) => {
//     const card = new Card(data, '#card', handleCardClick);
//     const cardElement = card.generateCard();

//     return cardElement;
// };

const popupWithImage = new PopupWithImage('#popup_image');
popupWithImage.setEventListeners();
