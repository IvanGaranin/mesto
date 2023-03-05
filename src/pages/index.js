import {Card} from '../components/Card.js';
import '../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, buttonAdd, settings, buttonDelete, popupDelete, profileJob, profileName, buttonEditProfile, formAvatar, avatarLink, myAvatar, buttonLoading} from '../utils/Constants.js';
import { data } from 'autoprefixer';
import PopupWithConfirmation from '../components/PopupWithCofirmation.js';

// let cardList = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: '3a48a443-c581-4331-866e-3f33303c8654',
      'Content-Type': 'application/json'
    }
});

const addCard = (data) => {
    console.log(data);
    const card = new Card(data, '#card', (data) => {
        const popupWithImage = new PopupWithImage('#popup_image');
            popupWithImage.setEventListeners();
            popupWithImage.openPopup({ name: data.name, link: data.link })
    }, api, function handleDeleteClick(data){
        popupToConfirm.openPopup(data);
    })

    const cardElement = card.generateCard(data)
    return cardElement
}




const popupToConfirm = new PopupWithConfirmation('#popup_delete', function handleDeleteSubmit(card) {
    api.deleteCard(card._id)
        .then(() => {
            console.log(card);
            card.remove();
            popupToConfirm.closePopup();
        })
        avatarForm.setEventListeners()
        .catch(() => console.log('Что-то пошло не так')) 
    }
)

api.getInitialCards()
  .then((data) => {
    const cardList = new Section({
        items: data,
        renderer: (data) => {
            const element = addCard(data);
            cardList.addItem(element);
        }
    }, '.elements__list')

    

    const addForm = new PopupWithForm('#popup_add', (formData) => {
        const newCard = addCard(formData);
        api.addNewCard({ name: formData.name, link: formData.link })
        .catch(() => console.log('Что-то пошло не так')) 
        cardList.addItem(newCard);
    })
    buttonAdd.addEventListener('click', () => {
        addFormValidator.enableValidation();
        addForm.openPopup();
    })
    
    addForm.setEventListeners();
    cardList.renderItems();
})
    
    .catch(() => console.log('Что-то пошло не так')) 

api.getProfileInfo()
  .then((data) => {
   profileName.textContent = data.name,
   profileJob.textContent = data.about,
   myAvatar.src = data.avatar
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
    .catch(() => console.log('Что-то пошло не так')) 
    profileName.textContent = user.name;
    profileJob.textContent = user.about;

})
popupEditForm.setEventListeners();

const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);


const avatarFormValidator = new FormValidator(settings, formAvatar);


const avatarForm = new PopupWithForm('#popup_avatar', () => {
    const newAvatar = new UserInfo({ avatar: avatarLink.value })
    const actualAvatar = newAvatar.getUserInfo();
    api.changeAvatar({ avatar: actualAvatar.avatar })
    .catch(() => console.log('Что-то пошло не так')) 
    myAvatar.src = actualAvatar.avatar;
})

buttonEditProfile.addEventListener('click', () => {
    avatarFormValidator.enableValidation();
    avatarForm.openPopup();
})


buttonDelete.addEventListener('click', () => {
    popupDelete.openPopup();
})

const popupWithImage = new PopupWithImage('#popup_image');
popupWithImage.setEventListeners();

// const popupToConfirm = new PopupWithConfirmation('#popup_delete',
//     function handleDeleteSubmit(card) {
//     api.deleteCard(card._id)
//         .then(() => {
//             card.remove();
//             popupToConfirm.closePopup();
//         })
//         .catch(() => console.log('Что-то пошло не так')) 
// })
