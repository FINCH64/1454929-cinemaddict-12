import {testFilms} from "./film-test.js";
import moment from "moment";

import {createElement} from "../utils/utils.js";
import Smart from "../utils/smart.js";
import {renderElement, RenderPosition} from "../utils/render.js";
import {siteMainElement, database} from "../presenter/presenter.js";
import Film from "./films-template.js";

let popupData = [];
export const siteBody = document.querySelector(`body`);
export let readyComments = [];

moment.locale(`en`, {
  calendar: {
    lastDay: `[Yesterday at] LT`,
    sameDay: `[Today at] LT`,
    nextDay: `[Tomorrow at] LT`,
    lastWeek: `[last] dddd [at] LT`,
    nextWeek: `dddd [at] LT`,
    sameElse: `L HH:mm`
  }
});

const createComments = (clickedFilmCard, num) => {
  let commentsData = moment().year(popupData.comments[num].date.year).month(popupData.comments[num].date.month).date(popupData.comments[num].date.day).hour(popupData.comments[num].date.hour).minute(popupData.comments[num].date.minute);
  let calendar = commentsData.calendar();

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="` + popupData.comments[num].emoji + `" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">` + popupData.comments[num].text + `</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">` + popupData.comments[num].author + `</span>
        <span class="film-details__comment-day">` + calendar + `</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const getReadyComments = (clickedFilmCard) => {
  readyComments = [];
  readyComments.unshift(`</ul>`);
  let filmName = ``;
  if (clickedFilmCard.path[1].querySelector(`form`)) {
    filmName = clickedFilmCard.path[1].querySelector(`.film-card__title`).textContent;
    for (let testFilm of testFilms) {
      if (testFilm.name === filmName) {
        popupData = testFilm;
        break;
      }
      continue;
    }

    for (let unshiftingComment = 0; unshiftingComment < popupData.commentsCount; unshiftingComment++) {
      readyComments.unshift(createComments(filmName, unshiftingComment));
    }
    readyComments.unshift(`<ul class="film-details__comments-list">`);
    return (
      readyComments.reduce((sum, current) => sum + ` \n\ ` + current)
    );
  }
  return (``);
};

export const createFilmDetailsTemplate = (clickedFilmCard) => {
  let filmName = ``;
  if (clickedFilmCard.path[1].querySelector(`form`)) {
    filmName = clickedFilmCard.path[1].querySelector(`.film-card__title`).textContent;

    for (let testFilm of testFilms) {
      if (testFilm.name === filmName) {

        popupData = testFilm;
        break;
      }
      continue;
    }
    siteBody.classList.add(`hide-overflow`);
    let genresCounter = `genre`;
    if (popupData.genre.length > 1) {
      genresCounter = `genres`;
    } else {
      genresCounter = `genre`;
    }

    let genresFragment = ``;

    for (let genre of popupData.genre) {
      genresFragment += `<span class="film-details__genre">` + genre + `</span>`;
    }
    let alreadyWatched = ``;
    let addedToWatchlist = ``;
    let addedToFavorite = ``;

    if (popupData.alreadyWatched === true) {
      alreadyWatched = `checked`;
    }

    if (popupData.addedToWatchList === true) {
      addedToWatchlist = `checked`;
    }

    if (popupData.addedToFavorite === true) {
      addedToFavorite = `checked`;
    }

    let hours = popupData.duration.minutes / 60;
    let minutes = popupData.duration.minutes % 60;
    let newDate = moment().year(popupData.releaseDate.year).month(popupData.releaseDate.month).date(popupData.releaseDate.day).hour(hours).minute(minutes);


    return (
      `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="` + popupData.poster + `" alt="">

          <p class="film-details__age">` + popupData.age + `</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">` + popupData.name + `</h3>
              <p class="film-details__title-original">` + popupData.originalName + `</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">` + popupData.rating + `</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">` + popupData.director + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">` + popupData.writers.toString() + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">` + popupData.actors.toString() + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">` + newDate.format(`DD MMMM yyyy`) + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">` + newDate.format(`H`) + `h ` + newDate.format(`mm`) + `m` + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">` + popupData.country + `</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">` + genresCounter + `</td>
              <td class="film-details__cell">
                ` + genresFragment + `</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ` + popupData.fullDescription + `
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"` + addedToWatchlist + `>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"` + alreadyWatched + `>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"` + addedToFavorite + `>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">` + popupData.commentsCount + `</span></h3>


        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section> `
    );
  }
  return (1);
};

export default class FilmDetails extends Smart {
  constructor(clickedCard) {
    super();
    this._clickedFilm = clickedCard;
    this._filmData = null;
    this._comment = null;
  }

  getDetailsTemplate() {
    return createFilmDetailsTemplate(this._clickedFilm);
  }

  restoreHandlers() {
    const popupCloseButton = document.querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`mouseup`, (closeButtonClicked) => {

      if (closeButtonClicked.button === 0) {
        this.removeElement();
        siteBody.classList.remove(`hide-overflow`);
        this.updateFilm(this._clickedFilm);
      }
    }, {once: true});

    window.addEventListener(`keydown`, (pressedKey) => {
      if (pressedKey.key === `Escape`) {
        this.removeElement();
        siteBody.classList.remove(`hide-overflow`);
        this.updateFilm(this._clickedFilm);
      }
    }, {once: true});
    this.alreadyWatchedClickHandler();
    this.addToWatchlistClickHandler();
    this.markAsFavouriteClickHandler();
  }

  getElement() {
    if (!this._filmData) {
      this._filmData = createElement(this.getDetailsTemplate());
    }

    return this._filmData;
  }

  getCommentsTemplate() {
    return getReadyComments(this._clickedFilm);
  }

  getComments() {
    if (!this._comment) {
      this._comment = createElement(this.getCommentsTemplate());
    }
    return this._comment;
  }

  removeElement() {
    this._clickedFilm = null;
    this._filmData = null;
    this._comment = null;
    this._filmDetails = document.querySelector(`.film-details`);
    this._filmDetails.remove();
  }

  updateFilm(clickedFilm) {
    clickedFilm.path[1].remove();
    let filmsContainer = siteMainElement.querySelector(`.films-list__container`);
    this._renewedFilm = new Film(popupData);
    renderElement(filmsContainer, this._renewedFilm.getElement(), RenderPosition.BEFOREEND);
    this._renewedFilm.setClickHandler();
    let controlContainer = this._renewedFilm.getElement().querySelector(`.film-card__controls`);
    this._addToWatchlistButton = controlContainer.querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._alreadyWatchedButton = controlContainer.querySelector(`.film-card__controls-item--mark-as-watched`);
    this._markAsFavoriteButton = controlContainer.querySelector(`.film-card__controls-item--favorite`);
    this.alreadyWatchedClickHandler();
    this.addToWatchlistClickHandler();
    this.markAsFavoriteClickHandler();
  }

  alreadyWatchedClickHandler() {
    this._alreadyWatchedButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.updateAlreadyWatched(evt);
    });
  }

  addToWatchlistClickHandler() {
    this._addToWatchlistButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.updateAddedToWatchListFilm(evt);
    });
  }

  markAsFavoriteClickHandler() {
    this._markAsFavoriteButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.updateAddedToFavoriteFilm(evt);
    });
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
    let allFilms = database;
    let filmName = ``;
    if (clickedFilmCard.path[1].querySelector(`form`)) {
      filmName = clickedFilmCard.path[1].querySelector(`.film-card__title`).textContent;

      for (let testFilm of allFilms) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    } else if (clickedFilmCard.path[2].querySelector(`form`)) {
      filmName = clickedFilmCard.path[2].querySelector(`.film-card__title`).textContent;

      for (let testFilm of allFilms) {
        if (testFilm.name === filmName) {
          this._filmData = testFilm;
          break;
        }
        continue;
      }
    }
  }
}

