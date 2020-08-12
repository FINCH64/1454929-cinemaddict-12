/* eslint-disable strict */
import {createUsersProfileTemplate} from './view/user-profile.js';
import {createTopRatedFilmsContainerTemplate, createTopRatedFilmCardTemplate} from './view/top-rated-films.js';
import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createMostCommentedFilmContainerTemplate, createMostCommentedFilmCardTemplate} from './view/most-commented-films.js';
import {createShowMoreButtonTemplate} from './view/load-more.js';
import {createFilmListTemplate} from './view/films-template.js';
import {createFilmListsContainerTemplate} from './view/films.js';
import {createSiteFilterTemplate} from './view/film-filters.js';
const FILM_LISTS_COUNT = 5;
const MAX_EXTRA_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUsersProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteNavigationTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmListsContainerTemplate(), `beforeend`);
const filmsLists = siteMainElement.querySelector(`.films-list`);
render(filmsLists, createShowMoreButtonTemplate(), `beforeend`);
const films = siteMainElement.querySelector(`.films`);
const siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let a = 0; a < FILM_LISTS_COUNT; a++) {
  render(siteFilmListsContainer[0], createFilmListTemplate(), `beforeend`);
}

render(films, createMostCommentedFilmContainerTemplate(), `beforeend`);
const sacondSiteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let q = 0; q < MAX_EXTRA_FILMS; q++) {
  render(sacondSiteFilmListsContainer[1], createMostCommentedFilmCardTemplate(), `beforeend`);
}

render(films, createTopRatedFilmsContainerTemplate(), `beforeend`);
const thirdSiteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let q = 0; q < MAX_EXTRA_FILMS; q++) {
  render(thirdSiteFilmListsContainer[2], createTopRatedFilmCardTemplate(), `beforeend`);
}
