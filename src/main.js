/* eslint-disable strict */
import MovieList from './presenter/presenter.js';
let movieList = new MovieList();
movieList.renderUserProfile();
movieList.renderSiteNavigation();
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
