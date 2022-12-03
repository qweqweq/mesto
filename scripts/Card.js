export class Card {
  constructor(name, link, components) {
    this._template = components.template;
    this._name = name;
    this._link = link;
    this._like = components.like;
    this._delete = components.delete;
    this._image = components.image;
    this._titleCard = components.title;
    this._openImagePopup = components.imagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }

  //Заполнение шаблона
  getCards() {
    this._cardAdd = this._getTemplate();
    this._cardImage = this._cardAdd.querySelector(this._image);
    this._cardName = this._cardAdd.querySelector(this._titleCard);
    this._cardLikeButton = this._cardAdd.querySelector(this._like);
    this._cardDeleteButton = this._cardAdd.querySelector(this._delete);
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._setEventListeners();
    return this._cardAdd;
  }

  //Лайк
  _likeCard = () => {
    this._cardLikeButton.classList.toggle("cards__like-button_active");
  };

  //Удаление
  _deleteCard = () => {
    this._cardAdd.remove();
  };

  //Слушатели событий
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._likeCard();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup(this._name, this._link);
    });
  }
}
