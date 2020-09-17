/* eslint-disable strict */
import DOMElementFunctions from "../utils/utils.js";

export const createFilmListsContainerTemplate = () => {
  return (
    `<div class="films-list__container">

      </div>`
  );
};

export default class FilmsContainer extends DOMElementFunctions {

  getTemplate() {
    return createFilmListsContainerTemplate();
  }

}
