/* eslint-disable strict */
import moment from "moment";
import DOMElementFunctions from "../utils/utils.js";
import FilmDetails, {siteBody} from './film-details.js';
import {renderElement, RenderPosition} from "../utils/render.js";
import {removeFilmDettails} from '../main.js';
import {Observer, database, allFilmsCounter} from "../presenter/presenter.js";
export let stopFlag = false;
export const countOfRenderedFilms = (counter) => {
  if (counter >= 18) {
    stopFlag = true;
    return false;
  }
  return true;
};

export const createFilmListTemplate = (filmCardData) => {
  let watchListStyle = ``;
  let addedToFavoriteStyle = ``;
  let alreadyWatchedStyle = ``;
  if (filmCardData.addedToWatchList === true) {
    watchListStyle = `film-card__controls-item--active`;
  }
  if (filmCardData.addedToFavorite === true) {
    addedToFavoriteStyle = `film-card__controls-item--active`;
  }
  if (filmCardData.alreadyWatched === true) {
    alreadyWatchedStyle = `film-card__controls-item--active`;
  }

  let hours = filmCardData.duration.minutes / 60;
  let minutes = filmCardData.duration.minutes % 60;
  let newDate = moment().year(filmCardData.releaseDate.year).month(filmCardData.releaseDate.month).date(filmCardData.releaseDate.day).hour(hours).minute(minutes);

  return (
    `<article class="film-card">
    <h3 class="film-card__title">` + filmCardData.name + `</h3>
    <p class="film-card__rating">` + filmCardData.rating + `</p>
    <p class="film-card__info">
      <span class="film-card__year">` + newDate.format(`yyyy`) + `</span>
      <span class="film-card__duration">` + newDate.format(`H`) + `h ` + newDate.format(`mm`) + `m` + `</span>
      <span class="film-card__genre">` + filmCardData.genre[0] + `</span>
    </p>
    <img src="` + filmCardData.poster + `" alt="" class="film-card__poster">
    <p class="film-card__description">` + filmCardData.description + `</p>
    <a class="film-card__comments">` + filmCardData.commentsCount + ` comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ` + watchListStyle + `">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ` + alreadyWatchedStyle + `">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ` + addedToFavoriteStyle + `">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class Film extends DOMElementFunctions {
  constructor(task) {
    super();
    this._task = task;
    this._filmData = null;
    // this._details = new Smart();
    // this._filmCardClick = ``;
  }

  getTemplate() {
    return createFilmListTemplate(this._task);
  }


  setClickHandler() {
    this._element.addEventListener(`click`, (filmCardClick) => {
      Observer.notify();
      if (filmCardClick.button === 0) {
        let pressedFilmDetails = new FilmDetails(filmCardClick);
        this._filmCardClick = filmCardClick;
        renderElement(siteBody, pressedFilmDetails.getElement(), RenderPosition.BEFOREEND);
        // pressedFilmDetails.updateElement();
        const popupCloseButton = document.querySelector(`.film-details__close-btn`);
        if (popupCloseButton !== null) {
          popupCloseButton.addEventListener(`mouseup`, (closeButtonClicked) => {

            if (closeButtonClicked.button === 0) {
              removeFilmDettails(pressedFilmDetails);
              siteBody.classList.remove(`hide-overflow`);
              pressedFilmDetails.updateFilm(this._filmCardClick);
              Observer.notify();
            }
          }, {once: true});

          window.addEventListener(`keydown`, (pressedKey) => {
            if (pressedKey.key === `Escape`) {
              removeFilmDettails(pressedFilmDetails);
              siteBody.classList.remove(`hide-overflow`);
              pressedFilmDetails.updateFilm(this._filmCardClick);
            }
          }, {once: true});

          this.alreadyWatchedClickHandler();
          this.addToWatchlistClickHandler();
          this.markAsFavoriteClickHandler();
          const commentsTitle = document.querySelector(`.film-details__comments-title`);

          renderElement(commentsTitle, pressedFilmDetails.getComments(), RenderPosition.AFTEREND);
        }
      }
    });
  }

  // alreadyWatchedClickHandler() {
  //   this._detailsControlContainer = document.querySelector(`.film-details__controls`);
  //   console.log(this._detailsControlContainer)
  //   this._alreadyWatchedButton = this._detailsControlContainer.querySelector(`#watched`);
  //   console.log(1111);
  //   this._alreadyWatchedButton.addEventListener(`change`, () => {
  //     console.log(2222);
  //   });
  // }

  // addToWatchlistClickHandler() {
  //   this._detailsControlContainer = document.querySelector(`.film-details__controls`);
  //   this._addToWatchlistButton = this._detailsControlContainer.querySelector(`#watchlist`);
  //   this._addToWatchlistButton.addEventListener(`change`, () => {

  //   });
  // }

  // markAsFavouriteClickHandler() {
  //   this._detailsControlContainer = document.querySelector(`.film-details__controls`);
  //   this._markAsFavoriteButton = this._detailsControlContainer.querySelector(`#favorite`);
  //   this._markAsFavoriteButton.addEventListener(`change`, () => {

  //   });
  // }

  alreadyWatchedClickHandler() {
    this._detailsControlContainer = document.querySelector(`.film-details__controls`);
    this._alreadyWatchedButton = this._detailsControlContainer.querySelector(`#watched`);
    this._alreadyWatchedButton.addEventListener(`click`, (evt) => {
      this.updateAlreadyWatched(evt);
    });
  }

  addToWatchlistClickHandler() {
    this._detailsControlContainer = document.querySelector(`.film-details__controls`);
    this._addToWatchlistButton = this._detailsControlContainer.querySelector(`#watchlist`);
    this._addToWatchlistButton.addEventListener(`click`, (evt) => {
      this.updateAddedToWatchListFilm(evt);
    });
  }

  markAsFavoriteClickHandler() {
    this._detailsControlContainer = document.querySelector(`.film-details__controls`);
    this._markAsFavoriteButton = this._detailsControlContainer.querySelector(`#favorite`);
    this._markAsFavoriteButton.addEventListener(`click`, (evt) => {
      this.updateAddedToFavoriteFilm(evt);
    });
  }

  updateAddedToWatchListFilm() {
    this._findFilmByName(this._filmCardClick);

    // this._addToWatchlistButton = evt.path[0];
    if (this._filmData.addedToWatchList === false || this._filmData.addedToWatchList === undefined) {
      this._filmData.addedToWatchList = true;
      this._addToWatchlistButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.addedToWatchList === true) {
      this._filmData.addedToWatchList = false;
      this._addToWatchlistButton.classList.remove(`film-card__controls-item--active`);
    }

  }

  updateAddedToFavoriteFilm() {
    this._findFilmByName(this._filmCardClick);
    // this._markAsFavoriteButton = evt.path[0];
    if (this._filmData.addedToFavorite === false || this._filmData.addedToFavorite === undefined) {
      this._filmData.addedToFavorite = true;
      this._markAsFavoriteButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.addedToFavorite === true) {
      this._filmData.addedToFavorite = false;
      this._markAsFavoriteButton.classList.remove(`film-card__controls-item--active`);
    }
  }

  updateAlreadyWatched() {
    this._findFilmByName(this._filmCardClick);
    // this._alreadyWatchedButton = evt.path[0];
    if (this._filmData.alreadyWatched === false || this._filmData.alreadyWatched === undefined) {
      this._filmData.alreadyWatched = true;
      this._alreadyWatchedButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.alreadyWatched === true) {
      this._filmData.alreadyWatched = false;
      this._alreadyWatchedButton.classList.remove(`film-card__controls-item--active`);
    }
  }

  _findFilmByName(clickedFilmCard) {
    let filmName = ``;
    let allFilms = database;
    console.log(allFilms);
    if (clickedFilmCard.path[1].querySelector(`form`)) {
      filmName = clickedFilmCard.path[1].querySelector(`.film-card__title`).textContent;

      for (let testFilm of allFilms) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    } else if (clickedFilmCard.path[2].querySelector(`form`)) {
      filmName = clickedFilmCard.path[2].querySelector(`.film-card__title`).textContent;

      for (let testFilm of allFilms) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    }
  }
}

