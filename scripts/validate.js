import { settings } from "./index.js";

// const settings = {
//     formSelector: ".popup__form",
//     inputSelector: ".popup__form-input",
//     submitButtonSelector: ".popup__form-button",
//     inactiveButtonClass: "popup__form-button_disabled",
//     inputErrorClass: "popup__form-input_type_error",
//     errorClass: "popup__form-error_active"
// };

export class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
    }
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement); 
        };
    }
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
          })
    }
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute("disabled", true)
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute("disabled");
        }
    }
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () =>  {   
                this._isValid(formElement, inputElement); 
                this._toggleButtonState(inputList, buttonElement);
            }
        );
    });
    }
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener("submit", (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    }
}

// const showInputError = (formElement, inputElement, errorMessage, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(settings.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(settings.errorClass);
//   };
  
//   const hideInputError = (formElement, inputElement, settings) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(settings.inputErrorClass);
//     errorElement.classList.remove(settings.errorClass);
//     errorElement.textContent = '';
//   };
  
//   const isValid = (formElement, inputElement) => {
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//     } else {
//       hideInputError(formElement, inputElement, settings);
//     }
//   };
  
//   function hasInvalidInput(inputList){
//     return inputList.some((inputElement) => {
//       return !inputElement.validity.valid
//     })
//   }
  
//   const toggleButtonState = (inputList, buttonElement, settings) => {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(settings.inactiveButtonClass);
//       buttonElement.setAttribute("disabled", true)
//     } else {
//       buttonElement.classList.remove(settings.inactiveButtonClass);
//       buttonElement.removeAttribute("disabled");
//     }
//   };
  
//   const setEventListeners = (formElement, settings) => {
//     const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//     const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//     toggleButtonState(inputList, buttonElement, settings);
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         isValid(formElement, inputElement);
//         toggleButtonState(inputList, buttonElement, settings);
//       });
//     });
//   };

  
// const enableValidation = (settings) => {
//     const formList = Array.from(
//         document.querySelectorAll(settings.formSelector)
//     );

//     formList.forEach((formElement) => {
//         formElement.addEventListener("submit", (evt) => {
//             evt.preventDefault();
//         });
//         setEventListeners(formElement, settings);
//     });
// };

// enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__form-input",
//     submitButtonSelector: ".popup__form-button",
//     inactiveButtonClass: "popup__form-button_disabled",
//     inputErrorClass: "popup__form-input_type_error",
//     errorClass: "popup__form-error_active"
// });
