/* eslint-disable strict */
import {sortFilterSwitch} from './view/sort.js';
import UserProfile from './view/user-profile.js';
import {createTopRatedFilmsContainerTemplate, getDataByCardNumber} from './view/top-rated-films.js';
import TopRatedFilm from './view/top-rated-films.js';
import SiteNavigation from './view/site-navigation.js';
import {createMostCommentedFilmContainerTemplate} from './view/most-commented-films.js';
import MostCommentedFilm from './view/most-commented-films.js';
import LoadMore from './view/load-more.js';
import {countOfRenderedFilms} from './view/films-template.js';
import Film from './view/films-template.js';
import FullBoard from './view/board.js';
import FilmsContainer from "./view/films-container.js";
import FilmsFilters from './view/film-filters.js';
import AllFilmsBoard from './view/all-films-board.js';
import {createFilmDetailsTemplate, siteBody, readyComments} from './view/film-details.js';
import {renderTemplate, renderElement, RenderPosition} from "./view/utils.js";
export const siteMainElement = document.querySelector(`.main`);
export const FILM_LISTS_COUNT = 5;
const MAX_EXTRA_FILMS = 2;
export let allFilmsCounter = -1;
let topRatedFilmsCounter = -1;
let MostCommentedFilmsCounter = -1;
let filmData = null;
// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

const siteHeaderElement = document.querySelector(`.header`);
const board = new FullBoard();
const allFilmsBoard = new AllFilmsBoard();
const filmsContainer = new FilmsContainer();

renderElement(siteHeaderElement, new UserProfile().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteNavigation().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsFilters().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, board.getElement(), RenderPosition.BEFOREEND);
renderElement(board.getElement(), allFilmsBoard.getElement(), RenderPosition.BEFOREEND);
renderElement(allFilmsBoard.getElement(), filmsContainer.getElement(), RenderPosition.BEFOREEND);
export const filmsLists = siteMainElement.querySelector(`.films-list`);

const loadMoreButton = new LoadMore();
renderElement(allFilmsBoard.getElement(), loadMoreButton.getElement(), `beforeend`);

export const films = siteMainElement.querySelector(`.films`);
export let siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let renderedFilm = 0; renderedFilm < FILM_LISTS_COUNT; renderedFilm++) {
  allFilmsCounter++;
  filmData = getDataByCardNumber(allFilmsCounter);
  renderElement(siteFilmListsContainer[0], new Film(filmData).getElement(), RenderPosition.BEFOREEND);
}

renderTemplate(films, createMostCommentedFilmContainerTemplate(), `beforeend`);
siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let renderedCommentedFilm = 0; renderedCommentedFilm < MAX_EXTRA_FILMS; renderedCommentedFilm++) {
  MostCommentedFilmsCounter++;
  filmData = getDataByCardNumber(MostCommentedFilmsCounter);
  renderElement(siteFilmListsContainer[1], new MostCommentedFilm(filmData).getElement(), `beforeend`);
}

renderTemplate(films, createTopRatedFilmsContainerTemplate(), `beforeend`);
siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);

for (let renderedRatedFilm = 0; renderedRatedFilm < MAX_EXTRA_FILMS; renderedRatedFilm++) {
  topRatedFilmsCounter++;
  filmData = getDataByCardNumber(topRatedFilmsCounter);
  renderElement(siteFilmListsContainer[2], new TopRatedFilm(filmData).getElement(), `beforeend`);
}
export const filmCards = document.querySelectorAll(`.film-card`);
const footer = document.querySelector(`.footer`);
sortFilterSwitch();


const removeFilmDettails = () => {
  let filmDetails = document.querySelector(`.film-details`);
  filmDetails.remove();
};

for (let film of filmCards) {
  film.addEventListener(`mouseup`, (evt) => {
    renderTemplate(footer, createFilmDetailsTemplate(evt), `afterend`);
    const popupCloseButton = document.querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`mouseup`, () => {
      removeFilmDettails();
      siteBody.classList.remove(`hide-overflow`);
    }, {once: true});
    const commentsList = document.querySelector(`.film-details__comments-list`);
    for (let commentarii of readyComments) {
      renderTemplate(commentsList, commentarii, `beforeend`);
    }
  });
}

const loadNewFilms = () => {
  let oldFilms = siteFilmListsContainer[0].querySelectorAll(`.film-card`);
  for (let filmCard of oldFilms) {
    filmCard.remove();
  }
  for (let i = 0; i < 5; i++) {
    allFilmsCounter++;
    if (countOfRenderedFilms(allFilmsCounter) === true) {
      filmData = getDataByCardNumber(allFilmsCounter);
      renderElement(siteFilmListsContainer[0], new Film(filmData).getElement(), RenderPosition.BEFOREEND);
    } else {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
      break;
    }
  }
};
loadMoreButton.getElement().addEventListener(`mouseup`, loadNewFilms);
