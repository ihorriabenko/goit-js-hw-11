import NewsApiService from './news-service';

// refs
const refs = {
  form: document.querySelector('.header__form'),
  btnLoadMore: document.querySelector('.load-more'),
};

// variables
// const newsApiService = new NewsApiService();
let searchQuery = '';

// submit
const onSumbit = e => {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.text.value;

  // newsApiService.fetchArticles();
};

refs.form.addEventListener('submit', onSumbit);

// load more
const onClickLoadMore = e => {
  console.log('more');
};

refs.btnLoadMore.addEventListener('click', onClickLoadMore);
