import './css/styles.css';
import { fetchPicture } from './js/fetchPicture';
import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const inputSearch = document.querySelector('[name="searchQuery"]')
const btn = document.querySelector('.btn')
let page = 1;
let query = ''

loadMoreBtn.style.display = 'none';

const handleChange = e => { 
query = e.target.value
}

const handleClick = async e => {
    e.preventDefault()
    const data = await fetchPicture(40, query)
    console.log(data);
    createGallery(data.hits)
}

const createGallery = (data) => {
    console.log(data);
    const images = data.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads} = image
        
        return(`<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`)
    }).join(' ')
    gallery.innerHTML = images
    console.log(images);

 }
 
 
btn.addEventListener ('click', handleClick)
inputSearch.addEventListener ('input', handleChange)















