
export default class MovieList {
  constructor(filmsModel) {
    this._allData = filmsModel;
  }

  rerenderCard() {
    this._filmData.removeElement();
  }
}
