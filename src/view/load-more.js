/* eslint-disable strict */
import AbstractFilm from "../utils/utils.js";
export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMore extends AbstractFilm {

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

}

