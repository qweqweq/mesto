import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./constants.js";

//объявление переменных
const popupProfile = document.querySelector(".popup-edit");
const popupNewCard = document.querySelector(".popup-add");
const profileContainer = document.querySelector(".profile");
const profileFormElement = document.querySelector("#profile-form");
const profileOpenButton = profileContainer.querySelector(
  ".profile__edit-button"
);
const nameInput = profileFormElement.querySelector(".popup__item_type_name");
const jobInput = profileFormElement.querySelector(".popup__item_type_about");
const profileName = profileContainer.querySelector(".profile__name");
const profileJob = profileContainer.querySelector(".profile__about");
const cardsContainer = document.querySelector(".cards__list");
const newCardOpenButton = document.querySelector(".profile__add-button");
const nameInputPlace = document.querySelector(".popup__item_type_place-name");
const linkInputPlace = document.querySelector(".popup__item_type_place-link");
const placeFormElement = document.querySelector("#place-form");
const zoomCard = document.querySelector(".popup-img");
const zoomImage = document.querySelector(".popup-img-src");
const zoomTitle = document.querySelector(".popup-img-title");
const popups = document.querySelectorAll(".popup");

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_is_invalid",
  errorClass: "popup__input-error_active",
};

const components = {
  template: ".cards-template",
  image: ".cards__image",
  title: ".cards__name",
  like: ".cards__like-button",
  delete: ".cards__delete-button",
  imagePopup: openImagePopup,
};

//Создание объекта карточки
function createCard(name, link, components) {
  const card = new Card(name, link, components);
  const cardElement = card.getCards();
  return cardElement;
}

//Добавление карточки
function renderCard(item) {
  cardsContainer.prepend(item);
}

//Вывод карточек
initialCards.forEach(function (item) {
  renderCard(createCard(item.name, item.link, components));
});

//Общий попап на открытие
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Открытие окна редактирования профиля
function openProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

//Редактирование профиля
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

//Открытие окна добавления карточки
function openNewCard() {
  placeFormElement.reset();
  popupNewCardFormValidation.resetErrors();
  openPopup(popupNewCard);
}

//Добавление карточки
function handleSubmitNewCardForm(evt) {
  evt.preventDefault();
  renderCard(
    createCard(nameInputPlace.value, linkInputPlace.value, components)
  );
  closePopup(popupNewCard);
}

//Приближение карточки
function openImagePopup(titleValue, imageValue) {
  zoomImage.src = imageValue;
  zoomImage.alt = titleValue;
  zoomTitle.textContent = titleValue;
  openPopup(zoomCard);
}

// общий попап на закрытие
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
};

//закрытие попапа нажатием Esc
const closePopupEsc = function (evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
};

//Валидация формы редактирования
const popupProfileFormValidation = new FormValidator(
  settings,
  profileFormElement
);
popupProfileFormValidation.enableValidation();

//Валидация формы добавления
const popupNewCardFormValidation = new FormValidator(
  settings,
  placeFormElement
);
popupNewCardFormValidation.enableValidation();

//Закрытие попапа кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

//Обработчики событий
profileOpenButton.addEventListener("click", openProfile);
popupProfile.addEventListener("submit", handleSubmitProfileForm);
newCardOpenButton.addEventListener("click", openNewCard);
popupNewCard.addEventListener("submit", handleSubmitNewCardForm);
