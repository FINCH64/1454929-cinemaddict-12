/* eslint-disable strict */
import {testFilms} from "./film-test.js";
import DOMElementFunctions from "../utils/utils.js";
import FilmDetails, {siteBody} from './film-details.js';
import {renderElement, RenderPosition} from "../utils/render.js";
import {removeFilmDettails} from '../main.js';
export const createTopRatedFilmsContainerTemplate = () => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">

    </div>
  </section>`
  );
};

export const getDataByCardNumber = (cardNum) => {
  if (cardNum !== undefined && cardNum !== null) {
    return testFilms[cardNum];
  }
  return testFilms;
};

export const createTopRatedFilmCardTemplate = (filmCardData) => {
  return (
    `<article class="film-card">
    <h3 class="film-card__title">` + filmCardData.name + `</h3>
    <p class="film-card__rating">` + filmCardData.rating + `</p>
    <p class="film-card__info">
      <span class="film-card__year">` + filmCardData.releaseDate + `</span>
      <span class="film-card__duration">` + filmCardData.duration.hours + `h` + filmCardData.duration.minutes + `m` + `</span>
      <span class="film-card__genre">` + filmCardData.genre[0] + `</span>
    </p>
    <img src="` + filmCardData.poster + `" alt="" class="film-card__poster">
    <p class="film-card__description">` + filmCardData.description + `</p>
    <a class="film-card__comments">` + filmCardData.commentsCount + `</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class TopRatedFilm extends DOMElementFunctions {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTopRatedFilmCardTemplate(this._task);
  }

  setClickHandler() {
    this._element.addEventListener(`click`, (filmCardClick) => {
      if (filmCardClick.button === 0) {
        let pressedFilmDetails = new FilmDetails(filmCardClick);
        renderElement(siteBody, pressedFilmDetails.getElement(), RenderPosition.BEFOREEND);
        const popupCloseButton = document.querySelector(`.film-details__close-btn`);
        popupCloseButton.addEventListener(`mouseup`, (closeButtonClicked) => {
          if (closeButtonClicked.button === 0) {
            removeFilmDettails(pressedFilmDetails);
            siteBody.classList.remove(`hide-overflow`);
          }
        }, {once: true});

        window.addEventListener(`keydown`, (pressedKey) => {
          if (pressedKey.key === `Escape`) {
            removeFilmDettails(pressedFilmDetails);
            siteBody.classList.remove(`hide-overflow`);
          }
        }, {once: true});

        const commentsTitle = document.querySelector(`.film-details__comments-title`);
        renderElement(commentsTitle, pressedFilmDetails.getComments(), RenderPosition.AFTEREND);
      }
    });
  }
}
