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
  const popupEdit = document.querySelector('.popup__edit');
  const popupAdd = document.querySelector('.popup__add')
  const profileContainer = document.querySelector('.profile');
  const formElement = document.querySelector('.popup__form');


  const openPopup = profileContainer.querySelector('.profile__edit-button')
  // const closePopupButton = popup.querySelector('.popup__edit_close'); //
  const closePopup = popup.querySelectorAll('.popup__close');

  const nameInput = formElement.querySelector('.popup__item_type_name');
  const jobInput = formElement.querySelector('.popup__item_type_about');

  const profileName = profileContainer.querySelector('.profile__name');
  const profileJob = profileContainer.querySelector('.profile__about');

  const cardsContainer = document.querySelector('.cards__list');
  const template = document.querySelector('.cards-template');

  const addCardButton = document.querySelector('.profile__add-button');
  // const addCardCloseButton = document.querySelector('.popup__add_close');//
  const inputPlaceName = document.querySelector('.popup__item_type_place-name');
  const inputPlaceLink = document.querySelector('.popup__item_type_place-link');



  // Добаление новой карточки template
  function getCards(item) {
  const addCard = template.content.cloneNode(true);
  const imageCards = addCard.querySelector('.cards__image');
  const nameCards = addCard.querySelector('.cards__name');
  const likeButtonCard = addCard.querySelector('.cards__like-button');
  const deleteButtonCard = addCard.querySelector('.cards__delete-button');

  imageCards.src = item.link;
  imageCards.name = item.name;
  nameCards.textContent = item.name;


  //Слушатели событий

  addCardButton.addEventListener('click', addCardOpen);

  deleteButtonCard.addEventListener('click', deleteCard);
  // likeButtonCard.addEventListener('click', (evt) => likeCard(evt));
  // // deleteButtonCard.addEventListener('click', (evt) => deleteCard(evt));

  return addCard;
  }

  //добаление карточек из массива
  function cardsRender() {
  const cardsArray = initialCards.map(getCards);
  cardsContainer.append(...cardsArray);
  }

  cardsRender ();

  //Лайк
  function likeCard(evt) {
    // const like = evt.target.closest('.cards__like-button');
    // like.classList.toggle('cards__like-button_active');
  evt.target.classList.toggle('cards__like-button_active');
  }

  //Удаление карточки
  function deleteCard(evt) {
  evt.target.closest('.cards__item').remove();
  }



  // открытие окна редактирования профиля
  function editProfile () {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

  }



  function closedPopupButton () {
    popup.classList.remove('popup_opened');
  }

  // function closePopuhBtn () {
  // document.querySelector('.popup_opened').classList.remove('.popup_opened');
  // }

  // closePopupButton.addEventListener('click', () => closePopuhBtn(popupEdit));
  // addCardCloseButton.addEventListener('click', () => closePopuhBtn(popupAdd));

  //редактирование профиля

  function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closedPopupButton()

  }

  // открытие окна добавления карточки
  function addCardOpen() {
  popupAdd.classList.add('popup_opened');
  // nameInput.value = profileName.textContent;
  // jobInput.value = profileJob.textContent;

  }

  //закрытие окна добавления карточки

  // function addCardClosedButton () {
  //   popup.classList.remove('popup_opened');
  // }


  //закрытие окна редактирования

  // function closedPopupButton () {
    closePopup.forEach(btn=> {
      btn.addEventListener('click', closedPopupButton);
    });


  openPopup.addEventListener('click', editProfile);

  // closePopupButton.addEventListener('click', closedPopupButton);

  // addCardCloseButton.addEventListener('click', addCardClosedButton);

  formElement.addEventListener('submit', formSubmitHandler);




  // для закртытия на крестик сделать разные селекторы