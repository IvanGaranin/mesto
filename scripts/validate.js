const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input_error_active",
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-input_type_error');
    errorElement.textContent = errorMessage;
    console.log (errorElement);
    console.log(errorElement.textContent);
    errorElement.classList.add('popup__form-input_error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form-input_type_error');
    errorElement.classList.remove('popup__form-input_error_active');
    errorElement.textContent = '';
  };
  
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__form-button_disabled');
      buttonElement.setAttribute("disabled", true)
    } else {
      buttonElement.classList.remove('popup__form-button_disabled');
      buttonElement.removeAttribute("disabled");
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const buttonElement = formElement.querySelector('.popup__form-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

const enableValidation = (settings) => {
    const formList = Array.from(
        document.querySelectorAll(settings.formSelector)
    );

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input_error_active",
});
