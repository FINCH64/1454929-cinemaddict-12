/* eslint-disable strict */
import DOMElementFunctions from "../utils/utils.js";
export const createSiteFilterTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" id="default1" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" id="date" class="sort__button">Sort by date</a></li>
    <li><a href="#" id="rating" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

export default class FilmsFilters extends DOMElementFunctions {
  getTemplate() {
    return createSiteFilterTemplate();
  }
}
