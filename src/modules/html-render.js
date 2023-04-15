import { globalGenres } from './starting-fetch/globalGenres';
import { IMAGE_URL } from './api-service';
import { refs } from './refs';
const imageSize = 'w500';

export default function renderMoviesList(moviesArr) {
  const markup = moviesArr
    .map(movie => {
      const {
        title,
        name,
        poster_path,
        id,
        release_date,
        first_air_date = '',
        genre_ids = [],
      } = movie;
      let movieYear = release_date
        ? getMovieYear(release_date)
        : getMovieYear(first_air_date);
      let movieName = title ? title : name;
      const movieGenres = getMovieGenres(genre_ids, globalGenres);
      const fullImageUrl = `${IMAGE_URL}/${imageSize}${poster_path}`;
      return `<li class="movie" data-id=${id}>
  <img src="${fullImageUrl}" alt="${movieName}"/>
  <p class="movie__title">${movieName}</p>
  <div class="movie__position">
   <p class="movie__genres">${movieGenres}</p>
  <p class="movie__genres">|</p>
  <p class="movie__year">${movieYear}</p>
  </div>
 
  </li>
  `;
    })
    .join('');
  refs.galleryListRef.innerHTML = markup;
}

function getMovieYear(releasedate) {
  return releasedate.slice(0, 4);
}

function getMovieGenres(genreIdsArray, genres) {
  const genreNames = [];
  genreIdsArray.forEach(id => {
    if (genreNames.length >= 2) {
      return;
    }
    const genre = genres.find(genreObj => genreObj.id === id);
    if (genre) {
      genreNames.push(genre.name);
    }
  });
  return genreNames.join(', ');
}