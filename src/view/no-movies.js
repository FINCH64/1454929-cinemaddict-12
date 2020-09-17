/* eslint-disable strict */
import DOMElementFunctions from "../utils/utils.js";
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

export default class NoMoviesMessage extends DOMElementFunctions {

  getTemplate() {
    return createNoMoviesMessage();
  }

}
