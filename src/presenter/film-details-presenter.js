import Film from "../view/films-template.js";
import {siteMainElement} from "./presenter.js";
export default class FilmsDetails {
  constructor(newData) {
    this._currentFilmInfo = new Film(newData);
    this._filmDetails = this._currentFilmInfo.getElement();
  }

  setClickHandler() {
    this._currentFilmInfo.setClickHandler();
  }

  init(newCard) {
    this._previousCard = this._currentFilmInfo;
    this._currentFilmInfo = new Film(newCard);
    this._filmDetails = this._currentFilmInfo.getElement();
  }

  alreadyWatchedClickHandler() {
    this._detailsControlContainer = siteMainElement.querySelector(`.film-details__controls`);
    this._alreadyWatchedButton = this._detailsControlContainer(`#watched`);
    this._alreadyWatchedButton.addEventListener(`change`, () => {

    });
  }

  addToWatchlistClickHandler() {
    this._detailsControlContainer = siteMainElement.querySelector(`.film-details__controls`);
    this._addToWatchlistButton = this._detailsControlContainer(`#watchlist`);
    this._addToWatchlistButton.addEventListener(`change`, () => {

    });
  }

  markAsFavouriteClickHandler() {
    this._detailsControlContainer = siteMainElement.querySelector(`.film-details__controls`);
    this._markAsFavoriteButton = this._detailsControlContainer(`#favorite`);
    this._markAsFavoriteButton.addEventListener(`change`, () => {

    });
  }
}
