import DOMElementFunctions from "../utils/utils.js";
import MovieList from "../presenter/presenter.js";
import {renderElement, RenderPosition} from '../utils/render.js';
import {getDataByCardNumber} from "../view/top-rated-films.js";
import {siteBody} from '../view/film-details.js';

export default class Smart extends DOMElementFunctions {
  constructor() {
    super();
    this._fullData = getDataByCardNumber();
    this._renderedData = MovieList.filteredFilms;
  }

  updateData() {


    this.updateElement();
  }

  updateElement() {
    let filmDetails = document.querySelector(`.film-details`);
    filmDetails.remove();
    this._filmData = null;
    this._comment = null;
    this.init();
    renderElement(siteBody, this.getElement(), RenderPosition.BEFOREEND);
    this.restoreHandlers();
    const commentsTitle = document.querySelector(`.film-details__comments-title`);
    renderElement(commentsTitle, this.getComments(), RenderPosition.AFTEREND);

  }

  init() {
    this.getElement();
    this.getComments();
  }

  restoreHandlers() {

  }
}
