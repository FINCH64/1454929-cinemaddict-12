import {sortFilterSwitch} from '../view/sort.js';
import UserProfile from '../view/user-profile.js';
import {getDataByCardNumber, createTopRatedFilmsContainerTemplate} from '../view/top-rated-films.js';
import TopRatedFilm from '../view/top-rated-films.js';
import SiteNavigation from '../view/site-navigation.js';
import MostCommentedFilm, {createMostCommentedFilmContainerTemplate} from '../view/most-commented-films.js';
import LoadMore from '../view/load-more.js';
import {countOfRenderedFilms} from '../view/films-template.js';
import Film from '../view/films-template.js';
import FullBoard from '../view/board.js';
import FilmsContainer from "../view/films-container.js";
import FilmsFilters from '../view/film-filters.js';
import AllFilmsBoard from '../view/all-films-board.js';
import NoMoviesMessage from '../view/no-movies.js';
import {renderTemplate} from "../utils/utils.js";
import {renderElement, RenderPosition} from "../utils/render.js";
export const FILM_LISTS_COUNT = 5;
export let allFilmsCounter = -1;
export let MostCommentedFilmsCounter = -1;
export let topRatedFilmsCounter = -1;
export const MAX_EXTRA_FILMS = 2;
export const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

export default class MovieList {
  constructor() {
    this._board = new FullBoard();
    this._allFilmsBoard = new AllFilmsBoard();
    // this._allFilms = ;
    // this._topRatesFilms = ;
    // this._mostCommentedFilms = ;
    this._userProfile = new UserProfile();
    this._filters = new FilmsFilters();
    // this._filmsTemplate = ;
    this._siteNavigation = new SiteNavigation();
    // this._noMovies = ;
    this._filmsContainer = new FilmsContainer();
    this._loadMoreButton = new LoadMore();
    this._filmData = ``;
    this._siteFilmListsContainer = ``;
    this._films = ``;
  }

  _renderSuggestedFilms() {
    renderElement(this._board.getElement(), this._allFilmsBoard.getElement(), RenderPosition.BEFOREEND);
    renderElement(this._allFilmsBoard.getElement(), this._filmsContainer.getElement(), RenderPosition.BEFOREEND);


    for (let renderedFilm = 0; renderedFilm < FILM_LISTS_COUNT; renderedFilm++) {
      allFilmsCounter++;
      this._filmData = getDataByCardNumber(allFilmsCounter);
      let cardAllFilmsElement = new Film(this._filmData);
      this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
      renderElement(this._siteFilmListsContainer[0], cardAllFilmsElement.getElement(), RenderPosition.BEFOREEND);
      cardAllFilmsElement.setClickHandler();
    }
  }

  _renderTopRatedFilms() {
    this._films = siteMainElement.querySelector(`.films`);
    renderTemplate(this._films, createTopRatedFilmsContainerTemplate(), `beforeend`);
    this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
    for (let renderedRatedFilm = 0; renderedRatedFilm < MAX_EXTRA_FILMS; renderedRatedFilm++) {
      topRatedFilmsCounter++;
      this._filmData = getDataByCardNumber(topRatedFilmsCounter);
      let cardTopRatedFilmsElement = new TopRatedFilm(this._filmData);
      this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
      renderElement(this._siteFilmListsContainer[2], cardTopRatedFilmsElement.getElement(), RenderPosition.BEFOREEND);
      cardTopRatedFilmsElement.setClickHandler();
    }
  }

  _renderMostCommentedFilms() {
    this._films = siteMainElement.querySelector(`.films`);
    renderTemplate(this._films, createMostCommentedFilmContainerTemplate(), `beforeend`);

    for (let renderedCommentedFilm = 0; renderedCommentedFilm < MAX_EXTRA_FILMS; renderedCommentedFilm++) {
      MostCommentedFilmsCounter++;
      this._filmData = getDataByCardNumber(MostCommentedFilmsCounter);
      let cardMostCommentedFilmsElement = new MostCommentedFilm(this._filmData);
      this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
      renderElement(this._siteFilmListsContainer[1], cardMostCommentedFilmsElement.getElement(), RenderPosition.BEFOREEND);
      cardMostCommentedFilmsElement.setClickHandler();
    }
  }

  _renderNoFilmsState() {

  }

  _renderFilmDetails() {

  }

  _renderUserProfile() {
    renderElement(siteHeaderElement, this._userProfile.getElement(), RenderPosition.BEFOREEND);
  }

  _renderSiteNavigation() {
    renderElement(siteMainElement, this._siteNavigation.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilmsFilters() {
    renderElement(siteMainElement, this._filters.getElement(), RenderPosition.BEFOREEND);
    sortFilterSwitch();
  }

  _renderAllTypesContainer() {
    renderElement(siteMainElement, this._board.getElement(), RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    renderElement(this._allFilmsBoard.getElement(), this._loadMoreButton.getElement(), `beforeend`);
    const filmsLists = siteMainElement.querySelector(`.films-list`);

    const loadNewFilms = () => {
      let oldFilms = this._siteFilmListsContainer[0].querySelectorAll(`.film-card`);
      for (let filmCard of oldFilms) {
        filmCard.remove();
      }
      for (let i = 0; i < 5; i++) {
        allFilmsCounter++;
        if (countOfRenderedFilms(allFilmsCounter) === true) {
          this._filmData = getDataByCardNumber(allFilmsCounter);
          renderElement(this._siteFilmListsContainer[0], new Film(this._filmData).getElement(), RenderPosition.BEFOREEND);
        } else {
          this._loadMoreButton.getElement().remove();
          this._loadMoreButton.removeElement();
          filmsLists.remove();
          renderElement(siteMainElement.querySelector(`.sort`), new NoMoviesMessage().getElement(), RenderPosition.BEFOREEND);
          break;
        }
      }
    };
    this._loadMoreButton.getElement().addEventListener(`mouseup`, loadNewFilms);
  }
}

