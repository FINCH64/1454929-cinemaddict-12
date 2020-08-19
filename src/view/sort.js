/* eslint-disable strict */
export const sa = () => {
  const siteMainElement = document.querySelector(`.main`);
  const sortButtons = siteMainElement.querySelectorAll(`.sort__button`);
  const disableFilter = (evt) => {
    let disablingButton = null;
    for (let sortButton of sortButtons) {
      if (sortButton.classList.contains(`sort__button--active`)) {
        disablingButton = sortButton;
        break;
      }
      continue;
    }
    disablingButton.classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);

  };

  for (let sortButton of sortButtons) {
    sortButton.addEventListener(`mouseup`, (evt) => {
      disableFilter(evt);
    });
  }
};

