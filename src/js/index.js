import NewsApiService from './news-service';

// refs
const refs = {
  form: document.querySelector('.header__form'),
  list: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

// variables
const newsApiService = new NewsApiService();

// submit
const onSumbit = e => {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.text.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(hits => console.log(hits));
};

refs.form.addEventListener('submit', onSumbit);

// load more
const onClickLoadMore = () => {
  newsApiService.fetchArticles().then(hits => console.log(hits));
};

refs.btnLoadMore.addEventListener('click', onClickLoadMore);
