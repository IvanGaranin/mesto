import {Card} from '../components/Card.js';
import '../pages/index.css';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { formEdit, formCreate, buttonEdit, nameInput, jobInput, buttonAdd, settings, buttonDelete, popupDelete, avatar} from '../utils/Constants.js';
import { data } from 'autoprefixer';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60/',
    headers: {
      authorization: '3a48a443-c581-4331-866e-3f33303c8654',
      'Content-Type': 'application/json'
    }
  }); 

api.getInitialCards()
buttonEdit.addEventListener('click', () => {
    api.getProfileInfo()
        .then((data) => {
            const user = new UserInfo(data)
            user.getUserInfo();
            console.log(user.getUserInfo());
            nameInput.value = data.name;
            jobInput.value = data.about;
            popupEditForm.openPopup();
        })
        .catch(() => console.log('Something went wrong'))
}); 

const popupEditForm = new PopupWithForm ('#popup_edit', () => { 
    api.getProfileInfo()
        .then((data) => {
            const newUser = new UserInfo(data)
            console.log(newUser)
            newUser.setUserInfo()
            console.log(newUser.setUserInfo()); 
            api.editProfileInfo()  
        }) 
    
});

popupEditForm.setEventListeners();

// buttonEdit.addEventListener('click', (data) => {
//     nameInput.value = data.name;
//     jobInput.value = data.about;
//     popupEditForm.openPopup();
// }); 
 
// const popupEditForm = new PopupWithForm ('#popup_edit', () => {
//     const userEditInfo = new UserInfo(data);
//     userEditInfo.getUserInfo(); 
// });
//             .catch(() => console.log('Something went wrong'))
                //    


//     const popupEditForm = new PopupWithForm ('#popup_edit', (data) => {
//         const userEditInfo = new UserInfo(data);
//         userEditInfo.getUserInfo();
//         });
//    userEditInfo.setUserInfo(data);
//         popupEditForm.setEventListeners(data);   
//         api.editProfileInfo()
//             .then((res) => {
//                 console.log(res);
//             })
//             .catch(() => console.log('Something went wrong')) 

const editFormValidator = new FormValidator(settings, formEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, formCreate);
addFormValidator.enableValidation();

// buttonEdit.addEventListener('click', () => {
//     const profileValues = userEditInfo.getUserInfo();

//     nameInput.value = profileValues.name;
//     jobInput.value = profileValues.job;
//     popupEditForm.openPopup();
// });




buttonAdd.addEventListener('click', () => {
    addFormValidator.enableValidation();
    addForm.openPopup();
})

buttonDelete.addEventListener('click', () => {
    popupDelete.openPopup();
})

const addCard = (data) => {
    const card = new Card(data, '#card', handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
};

const cardList = new Section( {
    items: (data),
    renderer: (data) => {
        const element = addCard(data);
        cardList.addItem(element);
    }, }, 
    '.elements__list'
);
cardList.renderItems();

const popupWithImage = new PopupWithImage('#popup_image');
popupWithImage.setEventListeners();

function handleCardClick () {
    popupWithImage.openPopup(this._name, this._link);
};

buttonAdd.addEventListener('click', () => {
    addFormValidator.enableValidation();
    addForm.openPopup();
})

const addForm = new PopupWithForm('#popup_add', (formData) => {
    const newCard = addCard(formData);
    cardList.addItem(newCard);
});

addForm.setEventListeners();
