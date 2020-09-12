/* eslint-disable strict */
import AbstractFilm from "../utils/utils.js";

export const createFilmListsContainerTemplate = () => {
  return (
    `<div class="films-list__container">

      </div>`
  );
};

export default class FilmsContainer extends AbstractFilm {

  getTemplate() {
    return createFilmListsContainerTemplate();
  }

}
