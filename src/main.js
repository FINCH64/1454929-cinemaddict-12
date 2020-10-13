/* eslint-disable strict */
import MovieList from './presenter/presenter.js';
import Movies from './model/movies.js';
import {getDataByCardNumber} from './view/top-rated-films.js';
import FilmsSort from './presenter/sort.js';
let filmModel = new Movies();
export let movieList = new MovieList(filmModel);
export let filmsSort = new FilmsSort(movieList);
filmModel.setMovies(getDataByCardNumber());
movieList.init();
movieList.renderUserProfile();
// filmsSort.renderSort();
filmsSort.renderFilms();
movieList.renderFilmsFilters();
movieList.activateSort();
movieList.renderAllTypesContainer();
movieList.renderSuggestedFilmsContainer();
movieList.renderSuggestedFilms();
movieList.renderLoadMoreButton();
movieList.renderMostCommentedFilms();
movieList.renderTopRatedFilms();

export const removeFilmDettails = (pressedFilmDetails) => {
  pressedFilmDetails.removeElement();
};
