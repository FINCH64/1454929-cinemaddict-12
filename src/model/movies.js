import Observer from "../utils/observer.js";
export default class Movies extends Observer {

  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
    console.log(this._movies);
  }

  getMovies() {
    return this._movies;
  }

  updateAddedToWatchListFilm(evt) {
    this._findFilmByName(evt);

    this._addToWatchlistButton = evt.path[0];
    if (this._filmData.addedToWatchList === false || this._filmData.addedToWatchList === undefined) {
      this._filmData.addedToWatchList = true;
      this._addToWatchlistButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.addedToWatchList === true) {
      this._filmData.addedToWatchList = false;
      this._addToWatchlistButton.classList.remove(`film-card__controls-item--active`);
    }

  }

  updateAddedToFavoriteFilm(evt) {
    this._findFilmByName(evt);
    this._markAsFavoriteButton = evt.path[0];
    if (this._filmData.addedToFavorite === false || this._filmData.addedToFavorite === undefined) {
      this._filmData.addedToFavorite = true;
      this._markAsFavoriteButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.addedToFavorite === true) {
      this._filmData.addedToFavorite = false;
      this._markAsFavoriteButton.classList.remove(`film-card__controls-item--active`);
    }
  }

  updateAlreadyWatched(evt) {
    this._findFilmByName(evt);
    this._alreadyWatchedButton = evt.path[0];
    if (this._filmData.alreadyWatched === false || this._filmData.alreadyWatched === undefined) {
      this._filmData.alreadyWatched = true;
      this._alreadyWatchedButton.classList.add(`film-card__controls-item--active`);
    } else if (this._filmData.alreadyWatched === true) {
      this._filmData.alreadyWatched = false;
      this._alreadyWatchedButton.classList.remove(`film-card__controls-item--active`);
    }
  }

  _findFilmByName(clickedFilmCard) {
    let filmName = ``;
    if (clickedFilmCard.path[1].querySelector(`form`)) {
      filmName = clickedFilmCard.path[1].querySelector(`.film-card__title`).textContent;

      for (let testFilm of this.getMovies()) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    } else if (clickedFilmCard.path[2].querySelector(`form`)) {
      filmName = clickedFilmCard.path[2].querySelector(`.film-card__title`).textContent;
      for (let testFilm of this.getMovies()) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    }
  }
}
