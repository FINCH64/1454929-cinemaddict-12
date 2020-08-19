/* eslint-disable strict */
import {createFilmListTemplate, stopFlag} from './films-template';
import {films, siteFilmListsContainer, render, filmsLists} from '../main.js';
export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export const activateShowMoreButton = () => {
  const showMoreButtton = films.querySelector(`.films-list__show-more`);
  showMoreButtton.addEventListener(`mouseup`, loadNewFilms);
};

const loadNewFilms = () => {
  let oldFilms = siteFilmListsContainer[0].querySelectorAll(`.film-card`);
  for (let filmCard of oldFilms) {
    filmCard.remove();
  }
  for (let i = 0; i < 5; i++) {
    render(siteFilmListsContainer[0], createFilmListTemplate(), `beforeend`);
    if (stopFlag === true) {
      filmsLists.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
      break;
    }
  }
};
