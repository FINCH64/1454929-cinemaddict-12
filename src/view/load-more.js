/* eslint-disable strict */
import DOMElementFunctions from "../utils/utils.js";
export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMore extends DOMElementFunctions {

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

}

