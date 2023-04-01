import './css/styles.css';
import { getImages } from './js/getImages';
import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const inputSearch = document.querySelector('[name="searchQuery"]');
const btn = document.querySelector('.btn');
const loadMore = document.querySelector('.load-more');
let totalImages;
let page = 1;
let query = '';

const handleChange = e => {
  query = e.target.value;
};

const hideLoadMore = () => {
  loadMore.className = 'load-more hidden';
};

const handleClick = async e => {
  e.preventDefault();
  hideLoadMore();
  page = 1;
  const data = await getImages(page, query);
  createGallery(data.hits);
  const { total, totalHits } = data;
  if (total && totalHits) {
    totalImages = total;
    if (total - (page - 1) * 40 > 40) {
      loadMore.className = 'load-more';
    } else {
      loadMore.className = 'hidden';
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
};

const createGallery = data => {
  const images = data
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
      <div class="photo-card">
      <a href=${largeImageURL}>
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
  </a>
  </div>
`;
    })
    .join(' ');
  // gallery.innerHTML = images;
  gallery.insertAdjacentHTML('beforeend', images);
};

const handleLoadMore = async () => {
  if (totalImages - page * 40 > 40) {
    loadMore.className = 'load-more';
  } else {
    loadMore.className = 'hidden';
    Notiflix.Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
  }
  page++;
  const data = await getImages(page, query);
  console.log(data);
  createGallery(data.hits);
  const { total } = data;
};

btn.addEventListener('click', handleClick);
handleChange && inputSearch.addEventListener('input', handleChange);

loadMore.addEventListener('click', handleLoadMore);
