import {createElement} from "./utils.js";
export const createAllMoviesBoardTemplate = () => {
  return (
    `<section class="films">

    </section>`
  );
};

export default class AllFilmsBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAllMoviesBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
