/* eslint-disable strict */
import {sa} from './view/sort.js';
import {createUsersProfileTemplate} from './view/user-profile.js';
import {createTopRatedFilmsContainerTemplate, createTopRatedFilmCardTemplate} from './view/top-rated-films.js';
import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createMostCommentedFilmContainerTemplate, createMostCommentedFilmCardTemplate} from './view/most-commented-films.js';
import {createShowMoreButtonTemplate, activateShowMoreButton} from './view/load-more.js';
import {createFilmListTemplate} from './view/films-template.js';
import {createFilmListsContainerTemplate} from './view/films.js';
import {createSiteFilterTemplate} from './view/film-filters.js';
import {createFilmDetailsTemplate, siteBody, readyComments} from './view/film-details.js';
export const siteMainElement = document.querySelector(`.main`);
export const FILM_LISTS_COUNT = 5;
const MAX_EXTRA_FILMS = 2;
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUsersProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteNavigationTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmListsContainerTemplate(), `beforeend`);
export const filmsLists = siteMainElement.querySelector(`.films-list`);
render(filmsLists, createShowMoreButtonTemplate(), `beforeend`);
export const films = siteMainElement.querySelector(`.films`);
export let siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let a = 0; a < FILM_LISTS_COUNT; a++) {
  render(siteFilmListsContainer[0], createFilmListTemplate(), `beforeend`);
}

render(films, createMostCommentedFilmContainerTemplate(), `beforeend`);
siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let q = 0; q < MAX_EXTRA_FILMS; q++) {
  render(siteFilmListsContainer[1], createMostCommentedFilmCardTemplate(), `beforeend`);
}

render(films, createTopRatedFilmsContainerTemplate(), `beforeend`);
siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let q = 0; q < MAX_EXTRA_FILMS; q++) {
  render(siteFilmListsContainer[2], createTopRatedFilmCardTemplate(), `beforeend`);
}
export const filmCards = document.querySelectorAll(`.film-card`);
const footer = document.querySelector(`.footer`);
sa();


const removeFilmDettails = () => {
  let filmDetails = document.querySelector(`.film-details`);
  filmDetails.remove();
};

for (let film of filmCards) {
  film.addEventListener(`mouseup`, (evt) => {
    render(footer, createFilmDetailsTemplate(evt), `afterend`);
    const popupCloseButton = document.querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`mouseup`, () => {
      removeFilmDettails();
      siteBody.classList.remove(`hide-overflow`);
    }, {once: true});
    const commentsList = document.querySelector(`.film-details__comments-list`);
    for (let commentarii of readyComments) {
      render(commentsList, commentarii, `beforeend`);
    }
  });
}
activateShowMoreButton();
