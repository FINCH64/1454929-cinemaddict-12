/* eslint-disable strict */
import DOMElementFunctions from "../utils/utils.js";
export const createBoardTemplate = () => {
  return (
    `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>`
  );
};

export default class FullBoard extends DOMElementFunctions {

  getTemplate() {
    return createBoardTemplate();
  }

}
