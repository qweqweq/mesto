let popup = document.querySelector('.popup');
let profileContainer = document.querySelector('.profile');
let formElement = document.querySelector('.popup__form');

let openPopup = profileContainer.querySelector('.profile__edit-button')
let closePopup = popup.querySelector('.popup__close');

let nameInput = formElement.querySelector('.popup__item_name');
let jobInput = formElement.querySelector('.popup__item_about');

let profileName = profileContainer.querySelector('.profile__name');
let profileJob = profileContainer.querySelector('.profile__about');

// открытие окна редактирования профиля
function editProfile () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}

//закрытие окна редактирования

function closedPopup () {
    popup.classList.remove('popup_opened');
}
//редактирование профиля

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closedPopup()

}
openPopup.addEventListener('click', editProfile);

closePopup.addEventListener('click', closedPopup);

formElement.addEventListener('submit', formSubmitHandler);
