//карточки мест

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//объявление переменных
const popupProfile = document.querySelector('.popup-edit');
const popupNewCard = document.querySelector('.popup-add')
const profileContainer = document.querySelector('.profile');
const profileFormElement = document.querySelector('#profile-form');
const profileOpenButton = profileContainer.querySelector('.profile__edit-button')
const profileCloseButton = popupProfile.querySelector('.popup-edit-close');
const nameInput = profileFormElement.querySelector('.popup__item_type_name');
const jobInput = profileFormElement.querySelector('.popup__item_type_about');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__about');
const cardsContainer = document.querySelector('.cards__list');
const template = document.querySelector('.cards-template');
const newCardOpenButton = document.querySelector('.profile__add-button');
const newCardCloseButton = document.querySelector('.popup-add-close');
const nameInputPlace = document.querySelector('.popup__item_type_place-name');
const linkInputPlace = document.querySelector('.popup__item_type_place-link');
const placeFormElement = document.querySelector('#place-form');
const zoomCard = document.querySelector('.popup-img');
const zoomImage = document.querySelector('.popup-img-src');
const zoomTitle = document.querySelector('.popup-img-title');
const zoomCloseButton = document.querySelector('.popup-img-close');
const popups = document.querySelectorAll('.popup')

// Добаление новой карточки template
function getCards(item) {
  const cardAdd = template.content.cloneNode(true);
  const cardImage = cardAdd.querySelector('.cards__image');
  const cardName = cardAdd.querySelector('.cards__name');
  const cardLikeButton = cardAdd.querySelector('.cards__like-button');
  const cardDeleteButton = cardAdd.querySelector('.cards__delete-button');

  cardImage.src = item.link;
  cardImage.name = item.name;
  cardName.textContent = item.name;

//Слушатели событий
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);

//Приближение карточки
  cardImage.addEventListener('click', function(){
  openPopup(zoomCard);
  zoomImage.src=item.link;
  zoomImage.alt=item.name;
  zoomTitle.textContent=item.name;
})

return cardAdd;
}


//добаление карточек из массива
function renderCards() {
  const cardsArray = initialCards.map(getCards);
  cardsContainer.append(...cardsArray);
}

renderCards ();

//Лайк
function likeCard(evt) {
  evt.target.classList.toggle('cards__like-button_active');
}

//Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.cards__item').remove();
}

// общий попап на открытие
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}



// открытие окна редактирования профиля
function openProfile () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeProfilePopupButton () {
  closePopup(popupProfile);
}

function closeNewCardPopupButton () {
  closePopup(popupNewCard);
}

function closeZoomButton () {
  closePopup(zoomCard);
}

//редактирование профиля
function handleSubmitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeProfilePopupButton()
}

// открытие окна добавления карточки
function openNewCard() {
  nameInputPlace.value = "";
  linkInputPlace.value = "";
  openPopup(popupNewCard)
}

//Добавление карточки
function handleSubmitNewCardForm(evt) {
  evt.preventDefault();
  newCard =
  {
          name: nameInputPlace.value,
          link: linkInputPlace.value,
      }

  cardsContainer.prepend(getCards(newCard));
  closeNewCardButton();
}

// закрытие окна добавления карточки
function closeNewCardButton () {
  closePopup(popupNewCard);

}
// общий попап на закрытие
const closePopup = function () {
  const popupOpened = document.querySelector('.popup_opened');
  if (popupOpened) {
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
  }
}

//закрытие попапа кнопкой Esc
const closePopupEsc = function (evt) {
  if(evt.key === "Escape") {
    closePopup();
  };
};

//Закрытие попапа кликом на оверлей
const closePopupOverlay = function (evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup();
}
newCardOpenButton.addEventListener('click', openNewCard);
profileOpenButton.addEventListener('click', openProfile);
profileCloseButton.addEventListener('click', closeProfilePopupButton);
newCardCloseButton.addEventListener('click', closeNewCardButton);
profileFormElement.addEventListener('submit', handleSubmitProfileForm);
placeFormElement.addEventListener('submit', handleSubmitNewCardForm);
zoomCloseButton.addEventListener('click', closeZoomButton);
popups.forEach((item) => item.addEventListener('click', closePopupOverlay));
