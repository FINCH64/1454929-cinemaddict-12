
import {sortFilterSwitch} from '../view/sort.js';
import {renderTemplate} from '../utils/utils.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import MostCommentedFilm, {createMostCommentedFilmContainerTemplate} from '../view/most-commented-films.js';
import TopRatedFilm, {getDataByCardNumber, createTopRatedFilmsContainerTemplate} from '../view/top-rated-films.js';
import Film, {countOfRenderedFilms} from '../view/films-template.js';
import UserProfile from '../view/user-profile.js';
import SiteNavigation from '../view/site-navigation.js';
import LoadMore from '../view/load-more.js';
import FullBoard from '../view/board.js';
import FilmsContainer from '../view/films-container.js';
import FilmsFilters from '../view/film-filters.js';
import AllFilmsBoard from '../view/all-films-board.js';
import NoMoviesMessage from '../view/no-movies.js';

const siteHeaderElement = document.querySelector(`.header`);
let oldData = [];

export default class MovieList {
  constructor() {
    this._allData = [];
    this._board = new FullBoard();
    this._allFilmsBoard = new AllFilmsBoard();
    this._userProfile = new UserProfile();
    this._filters = new FilmsFilters();
    this._siteNavigation = new SiteNavigation();
    this._filmsContainer = new FilmsContainer();
    this._loadMoreButton = new LoadMore();
    this._noMovieState = new NoMoviesMessage();
    this._filmData = ``;
    this._siteFilmListsContainer = ``;
    this._films = ``;
  }

  activateSort() {
    sortFilterSwitch();
    const changeFilmsArrayForFilter = (clickedFilter) => {
      let allData = getDataByCardNumber();
      let filteredFilms = [];
      switch (clickedFilter.path[0].id) {
        case `default1`:
          filteredFilms = allData.slice();
          this._loadMoreButton.getElement().remove();
          this._loadMoreButton.removeElement();
          this.renderLoadMoreButton(`withoutFilters`);
          break;
        case `rating`:
          let oldFilmRating = -1;
          allData = getDataByCardNumber();
          let mappedRatingData = allData.slice();
          for (let counter = 0; counter < allData.length; counter++) {
            let maxRatedFilm = [];
            oldFilmRating = -1;
            for (let film of mappedRatingData) {
              if (film.rating > oldFilmRating || oldFilmRating === -1) {
                oldFilmRating = film.rating;
                maxRatedFilm = [];
                maxRatedFilm.push(film);

              }
            }
            mappedRatingData.splice(mappedRatingData.indexOf(maxRatedFilm[0]), 1);
            filteredFilms.push(maxRatedFilm[0]);
          }
          this._filteredFilms = filteredFilms;
          this._loadMoreButton.getElement().remove();
          this._loadMoreButton.removeElement();
          this.renderLoadMoreButton(`withFilters`);
          break;
        case `date`:
          let oldFilmDate = -1;
          allData = getDataByCardNumber();
          let mappedForDateData = allData.slice();
          for (let counter = 0; counter < allData.length; counter++) {
            let oldestFilm = [];
            oldFilmDate = -1;
            for (let film of mappedForDateData) {
              if (film.releaseDate > oldFilmDate || oldFilmDate === -1) {
                oldFilmDate = film.releaseDate;
                oldestFilm = [];
                oldestFilm.push(film);

              }
            }
            mappedForDateData.splice(mappedForDateData.indexOf(oldestFilm[0]), 1);
            filteredFilms.push(oldestFilm[0]);
          }
          this._filteredFilms = filteredFilms;
          this._loadMoreButton.getElement().remove();
          this._loadMoreButton.removeElement();
          this.renderLoadMoreButton(`withFilters`);


          break;
        default:
          break;
      }
    };
    const sortComponent = siteMainElement.querySelector(`.sort`);
    sortComponent.addEventListener(`click`, (clickedFilter) => {
      changeFilmsArrayForFilter(clickedFilter);
    });
  }

  renderSuggestedFilmsContainer() {
    renderElement(this._board.getElement(), this._allFilmsBoard.getElement(), RenderPosition.BEFOREEND);
    renderElement(this._allFilmsBoard.getElement(), this._filmsContainer.getElement(), RenderPosition.BEFOREEND);
  }

  renderSuggestedFilms() {
    for (let renderedFilm = 0; renderedFilm < FILM_LISTS_COUNT; renderedFilm++) {
      allFilmsCounter++;
      this._filmData = getDataByCardNumber(allFilmsCounter);
      this._allData.unshift(this._filmData);
      this._cardAllFilmsElement = new Film(this._filmData);
      this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
      renderElement(this._siteFilmListsContainer[0], this._cardAllFilmsElement.getElement(), RenderPosition.BEFOREEND);
      this._cardAllFilmsElement.setClickHandler();
    }
  }

  renderTopRatedFilms() {
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

  renderMostCommentedFilms() {
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

  renderNoFilmsState() {

  }

  renderFilmDetails() {

  }

  renderUserProfile() {
    renderElement(siteHeaderElement, this._userProfile.getElement(), RenderPosition.BEFOREEND);
  }

  renderSiteNavigation() {
    renderElement(siteMainElement, this._siteNavigation.getElement(), RenderPosition.BEFOREEND);
  }

  renderFilmsFilters() {
    renderElement(siteMainElement, this._filters.getElement(), RenderPosition.BEFOREEND);
  }

  renderAllTypesContainer() {
    renderElement(siteMainElement, this._board.getElement(), RenderPosition.BEFOREEND);
  }

  _loadNewFilms(newData) {
    if (newData !== oldData) {
      allFilmsCounter = 0;
    }
    const filmsLists = siteMainElement.querySelector(`.films-list`);
    this._siteFilmListsContainer = siteMainElement.querySelectorAll(`.films-list__container`);
    let oldFilms = this._siteFilmListsContainer[0].querySelectorAll(`.film-card`);
    for (let filmCard of oldFilms) {
      filmCard.remove();
    }
    for (let i = 0; i < 5; i++) {
      allFilmsCounter++;
      if (countOfRenderedFilms(allFilmsCounter) === true) {
        this._filmData = getDataByCardNumber(allFilmsCounter);
        this._cardAllFilmsElement = new Film(newData[allFilmsCounter]);
        renderElement(this._siteFilmListsContainer[0], this._cardAllFilmsElement.getElement(), RenderPosition.BEFOREEND);
        this._cardAllFilmsElement.setClickHandler();
      } else {
        this._loadMoreButton.getElement().remove();
        this._loadMoreButton.removeElement();
        filmsLists.remove();
        break;
      }
    }
    oldData = newData;
    renderElement(this._siteFilmListsContainer[0], this._cardAllFilmsElement.getElement(), RenderPosition.BEFOREEND);
    this._cardAllFilmsElement.setClickHandler();
  }

  renderLoadMoreButton(sorts) {
    switch (sorts) {
      case `withFilters`:
        renderElement(this._siteFilmListsContainer[0], this._loadMoreButton.getElement(), `afterend`);
        this._loadMoreButton.getElement().addEventListener(`mouseup`, () => {
          this._loadNewFilms(this._filteredFilms);
        });
        this._loadNewFilms(this._filteredFilms);
        break;
      case `withoutFilters`:
        renderElement(this._siteFilmListsContainer[0], this._loadMoreButton.getElement(), `afterend`);
        this._loadMoreButton.getElement().addEventListener(`mouseup`, () => {
          this._loadNewFilms(getDataByCardNumber());
        });
        this._loadNewFilms(getDataByCardNumber());
        break;
      default:
        renderElement(this._allFilmsBoard.getElement(), this._loadMoreButton.getElement(), `beforeend`);
        this._loadMoreButton.getElement().addEventListener(`mouseup`, () => {
          this._loadNewFilms(getDataByCardNumber());
        });
        break;
    }
    // this._loadMoreButton.getElement().addEventListener(`mousedown`, () => {
    //   this._loadNewFilms(getDataByCardNumber());
    // });
  }
}

export const FILM_LISTS_COUNT = 5;
export let allFilmsCounter = -1;
export let MostCommentedFilmsCounter = -1;
export let topRatedFilmsCounter = -1;
export const MAX_EXTRA_FILMS = 2;
export const siteMainElement = document.querySelector(`.main`);
