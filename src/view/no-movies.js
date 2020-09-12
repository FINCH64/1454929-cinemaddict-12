/* eslint-disable strict */
import AbstractFilm from "../utils/utils.js";
export const createNoMoviesMessage = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>
`
  );
};

export default class NoMoviesMessage extends AbstractFilm {

  getTemplate() {
    return createNoMoviesMessage();
  }

}
