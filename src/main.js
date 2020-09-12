/* eslint-disable strict */
import MovieList from './presenter/presenter.js';
// import {sortFilterSwitch} from './view/sort.js';
// import UserProfile from './view/user-profile.js';
// import {getDataByCardNumber} from './view/top-rated-films.js';
// import TopRatedFilm from './view/top-rated-films.js';
// import SiteNavigation from './view/site-navigation.js';
// import MostCommentedFilm from './view/most-commented-films.js';
// import LoadMore from './view/load-more.js';
// import {countOfRenderedFilms} from './view/films-template.js';
// import Film from './view/films-template.js';
// import FullBoard from './view/board.js';
// import FilmsContainer from "./view/films-container.js";
// import FilmsFilters from './view/film-filters.js';
// import AllFilmsBoard from './view/all-films-board.js';
// import NoMoviesMessage from './view/no-movies.js';
// import {renderTemplate} from "./utils/utils.js";
// import {renderElement, RenderPosition} from "./utils/render.js";
// export const siteMainElement = document.querySelector(`.main`);
// export const FILM_LISTS_COUNT = 5;
// const MAX_EXTRA_FILMS = 2;
// export let allFilmsCounter = -1;
// let topRatedFilmsCounter = -1;
// let MostCommentedFilmsCounter = -1;
// let filmData = null;

let movieList = new MovieList();
movieList._renderUserProfile();
movieList._renderSiteNavigation();
movieList._renderFilmsFilters();
movieList._renderAllTypesContainer();
movieList._renderSuggestedFilms();
movieList._renderLoadMoreButton();
movieList._renderMostCommentedFilms();
movieList._renderTopRatedFilms();


export const removeFilmDettails = (pressedFilmDetails) => {
  pressedFilmDetails.removeElement();
};
