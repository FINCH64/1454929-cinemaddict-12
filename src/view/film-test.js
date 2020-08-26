/* eslint-disable strict */
export const getRandomInteger = (lowestNumber = 0, highestNumber = 5) => {
  const lower = Math.ceil(Math.min(lowestNumber, highestNumber));
  const upper = Math.floor(Math.max(lowestNumber, highestNumber));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const namesAndPosters = new Map();
namesAndPosters.set(`made-for-each-other`, `./images/posters/made-for-each-other.png`);
namesAndPosters.set(`popeye-meets-sinbad`, `./images/posters/popeye-meets-sinbad.png`);
namesAndPosters.set(`sagebrush-trail`, `./images/posters/sagebrush-trail.jpg`);
namesAndPosters.set(`santa-claus-conquers-the-martians`, `./images/posters/santa-claus-conquers-the-martians.jpg`);
namesAndPosters.set(`the-dance-of-life`, `./images/posters/the-dance-of-life.jpg`);
namesAndPosters.set(`the-great-flamarion`, `./images/posters/the-great-flamarion.jpg`);
namesAndPosters.set(`the-man-with-the-golden-arm`, `./images/posters/the-man-with-the-golden-arm.jpg`);
const keysForPosters = Array.from(namesAndPosters.keys());

const emojis = [
  `./images/emoji/smile.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
];

const comments = [
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `a`,
    author: `James Cameron`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `b`,
    author: `Someone else`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `c`,
    author: `Stiven King`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `d`,
    author: `William Shakespeare`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `e`,
    author: `Jonathan Swift`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
  {
    emoji: emojis[getRandomInteger(0, 3)],
    text: `f`,
    author: `JENNIFER LAWRENCE`,
    date: getRandomInteger(1, 29) + `/` + getRandomInteger(1, 12) + `/` + getRandomInteger(1990, 2020) + ` ` + getRandomInteger(0, 23) + `:` + getRandomInteger(0, 59),
  },
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const writers = [
  `James Cameron`,
  `Someone else`,
  `Stiven King`,
  `William Shakespeare`,
  `Jonathan Swift`,
];

const actors = [
  `Benedict Kamberbetch`,
  `Chris Evans`,
  `Scarlett Johanson`,
  `ROBERT DOWNEY, JR.`,
  `JENNIFER LAWRENCE`,
];

const genres = [
  `action`,
  `drama`,
  `comedy`,
  `horror`,
  `mystery`,
  `film-noir`,
];

const generateProperty = (length, fullPropertyArray) => {
  let filmProperty = [];
  if (length > 0) {
    for (let counter = 0; counter < length; counter++) {
      const randomIndex = getRandomInteger(0, fullPropertyArray.length - 1);
      filmProperty.unshift(fullPropertyArray[randomIndex]);
    }
  } else {
    filmProperty = `Здесь ничего нет`;
  }
  return filmProperty;
};


export const generateFilmCard = () => {
  let date = getRandomInteger(1990, 2020);
  const filmName = keysForPosters[getRandomInteger(0, 6)];
  let filmComments = generateProperty(getRandomInteger(1, comments.length - 1), comments);
  return {
    name: filmName,
    poster: namesAndPosters.get(filmName),
    rating: getRandomInteger(0, 10),
    releaseDate: date,
    duration: {
      hours: getRandomInteger(0, 2),
      minutes: getRandomInteger(0, 60),
    },
    genre: generateProperty(getRandomInteger(1, genres.length - 1), genres),
    description: generateProperty(getRandomInteger(1, descriptions.length - 2), descriptions),
    originalName: `Original:` + filmName,
    age: `199+`,
    director: `J.Weibe`,
    writers: generateProperty(getRandomInteger(0, writers.length - 1), writers),
    actors: generateProperty(getRandomInteger(1, actors.length - 1), actors),
    fullReleaseDate: getRandomInteger(1, 29) + ` January ` + date,
    country: `Best country`,
    fullDescription: generateProperty(descriptions.length - 1, descriptions),
    comments: filmComments,
    commentsCount: filmComments.length,
  };
};

export const testFilms = [];

for (let moksCount = 0; moksCount < 18; moksCount++) {
  testFilms.unshift(generateFilmCard());
}

