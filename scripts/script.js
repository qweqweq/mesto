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
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add')
const profileContainer = document.querySelector('.profile');
const profileFormElement = document.querySelector('#profile-form');
const profileOpenPopup = profileContainer.querySelector('.profile__edit-button')
const popupProfileCloseButton = popupProfile.querySelector('.popup-edit-close');
const nameInput = profileFormElement.querySelector('.popup__item_type_name');
const jobInput = profileFormElement.querySelector('.popup__item_type_about');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__about');
const cardsContainer = document.querySelector('.cards__list');
const template = document.querySelector('.cards-template');
const cardAddOpenButton = document.querySelector('.profile__add-button');
const cardAddCloseButton = document.querySelector('.popup-add-close');
const nameInputPlace = document.querySelector('.popup__item_type_place-name');
const linkInputPlace = document.querySelector('.popup__item_type_place-link');
const placeFormElement = document.querySelector('#place-form');
const zoomCard = document.querySelector('.popup-img');
const zoomImage = document.querySelector('.popup-img-src');
const zoomTitle = document.querySelector('.popup-img-title');
const zoomCloseButton = document.querySelector('.popup-img-close');
const cardImage = document.querySelector('.cards__image');

// Добаление новой карточки template
function getCards(item) {
  const cardAdd = template.content.cloneNode(true);
  const cardImage = cardAdd.querySelector('.cards__image');
  const nameCard = cardAdd.querySelector('.cards__name');
  const cardLikeButton = cardAdd.querySelector('.cards__like-button');
  const cardDeleteButton = cardAdd.querySelector('.cards__delete-button');

  cardImage.src = item.link;
  cardImage.name = item.name;
  nameCard.textContent = item.name;

//Слушатели событий
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);

//Приближение карточки
  cardImage.addEventListener('click', function(){
  zoomCard.classList.add('popup_opened');
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
}

// общий попап на закрытие
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открытие окна редактирования профиля
function editProfile () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closedPopupButton () {
  closePopup(popupProfile);
}

function closedAddPopupButton () {
  closePopup(popupAdd);
}

function closedZoomButton () {
  closePopup(zoomCard);
}

//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closedPopupButton()
}

// открытие окна добавления карточки
function addCardOpen() {
  nameInputPlace.value = "";
  linkInputPlace.value = "";
  openPopup(popupAdd)
}

//Добавление карточки
function addCard(e) {
  e.preventDefault();
  newCard =
  {
          name: nameInputPlace.value,
          link: linkInputPlace.value,
      }

  cardsContainer.prepend(getCards(newCard));
  addCardClosedButton();
}

// закрытие окна добавления карточки
function addCardClosedButton () {
  closePopup(popupAdd);

}

cardAddOpenButton.addEventListener('click', addCardOpen);

profileOpenPopup.addEventListener('click', editProfile);

popupProfileCloseButton.addEventListener('click', closedPopupButton);

cardAddCloseButton.addEventListener('click', addCardClosedButton);

profileFormElement.addEventListener('submit', formSubmitHandler);

placeFormElement.addEventListener('submit', addCard);

zoomCloseButton.addEventListener('click', closedZoomButton);