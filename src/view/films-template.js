/* eslint-disable strict */
import {testFilms} from "./film-test.js";
let counter = -1;
export let stopFlag = false;
export const createFilmListTemplate = () => {
  counter++;
  if (counter >= 18) {
    stopFlag = true;
    return ``;
  }
  return (
    `<article class="film-card">
    <h3 class="film-card__title">` + testFilms[counter].name + `</h3>
    <p class="film-card__rating">` + testFilms[counter].rating + `</p>
    <p class="film-card__info">
      <span class="film-card__year">` + testFilms[counter].releaseDate + `</span>
      <span class="film-card__duration">` + testFilms[counter].duration.hours + `h` + testFilms[counter].duration.minutes + `m` + `</span>
      <span class="film-card__genre">` + testFilms[counter].genre[0] + `</span>
    </p>
    <img src="` + testFilms[counter].poster + `" alt="" class="film-card__poster">
    <p class="film-card__description">` + testFilms[counter].description + `</p>
    <a class="film-card__comments">` + testFilms[counter].commentsCount + ` comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`
  );
};
