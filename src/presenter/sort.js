import SiteNavigation from "../view/site-navigation.js";
import {siteMainElement} from "./presenter.js";

export default class FilmsSort {
  constructor(newData) {
    this._films = newData;
    this._siteNavigation = new SiteNavigation();
    this._allSorts = siteMainElement.querySelectorAll(`.main-navigation__item`);
    this._currentNav = siteMainElement.querySelector(`.main-navigation__item--active`);
  }

  renderSort() {
    this._films.renderSiteNavigation();
  }

  renderFilms() {
    for (let nav of this._allSorts) {
      console.log(nav);
      nav.addEventListener(`mousedown`, () => {
        this._currentNav = nav;
      });
    }
    console.log(11111111);
    // let currentNav = siteMainElement.querySelector(`.main-navigation__item--active`);

  }
}
