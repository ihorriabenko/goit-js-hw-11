import axios from 'axios';

export default class NewsApiService {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '27832642-aa50f7f08c8a181668a8915c7';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    return axios
      .get(`${this.#BASE_URL}`, {
        params: {
          key: this.#API_KEY,
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page: this.page,
        },
      })
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
