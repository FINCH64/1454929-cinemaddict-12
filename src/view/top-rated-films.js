/* eslint-disable strict */
import {testFilms} from "./film-test.js";
import {createElement} from "./utils.js";
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
  return testFilms[cardNum];
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

export default class TopRatedFilm {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmCardTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
