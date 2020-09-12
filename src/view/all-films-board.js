import AbstractFilm from "../utils/utils.js";
export const createAllMoviesBoardTemplate = () => {
  return (
    `<section class="films">

    </section>`
  );
};

export default class AllFilmsBoard extends AbstractFilm {

  getTemplate() {
    return createAllMoviesBoardTemplate();
  }

}

