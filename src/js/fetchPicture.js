import axios from 'axios';

const API_URL = 'https://pixabay.com/api';
const API_KEY = '34752040-45bcd231572a27f770c5128af';
const PARAMS = `?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=`;

export const fetchPicture = async (perPage, query) => {
  const endPoint =
    API_URL +
    `?key=${API_KEY}&image_type=${query}&orientation=horizontal&safesearch=true&per_page=${perPage}`;
  const response = await axios.get(endPoint);
  if (response.status != 200) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return {};
  }

  const { data } = response;
  return data;
};
