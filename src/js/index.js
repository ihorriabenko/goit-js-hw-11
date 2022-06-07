import Notiflix from 'notiflix';
import NewsApiService from './news-service';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// refs
const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__input'),
  btnClose: document.querySelector('.header__button-close'),
  list: document.querySelector('.container--gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

// btn d:n
refs.btnLoadMore.style.display = 'none';

// variables
const newsApiService = new NewsApiService();
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

// btn close
refs.btnClose.style.display = 'none';

refs.input.addEventListener('focus', () => {
  setTimeout(() => {
    refs.btnClose.style.display = 'block';
  }, 100);
});

refs.btnClose.addEventListener('click', e => {
  refs.input.value = '';
  e.target.style.display = 'none';
});

refs.input.addEventListener('blur', () => {
  setTimeout(() => {
    refs.btnClose.style.display = 'none';
  }, 100);
});

// submit
const onSumbit = async e => {
  e.preventDefault();
  refs.list.innerHTML = '';

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  try {
    const { data } = await newsApiService.fetchArticles();
    console.log(data);
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btnLoadMore.style.display = 'none';
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      makeMarkup(data.hits);
      lightbox.refresh();
      refs.btnLoadMore.style.display = 'none';
      refs.btnLoadMore.style.display = 'block';
      const { height: cardHeight } = document
        .querySelector('.container--gallery')
        .firstElementChild.getBoundingClientRect();
    }
  } catch (err) {
    console.log(err);
  }

  newsApiService.incrementPage();
};

refs.form.addEventListener('submit', onSumbit);

// load more
const onClickLoadMore = async () => {
  try {
    const { data } = await newsApiService.fetchArticles();

    let totalPages = Math.ceil(data.totalHits / data.hits.length);

    if (totalPages === newsApiService.page + 1) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.btnLoadMore.style.display = 'none';
      makeMarkup(data.hits);
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector('.container--gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    } else {
      makeMarkup(data.hits);
      lightbox.refresh();
      newsApiService.incrementPage();
      const { height: cardHeight } = document
        .querySelector('.container--gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

refs.btnLoadMore.addEventListener('click', onClickLoadMore);

// markup function
function makeMarkup(hits) {
  let markup = hits
    .map(
      hit => `<li class="photo-card">
      <a class="gallery__item" href="${hit.largeImageURL}">
      <img class="photo-card__img" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=300 height=190/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${hit.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${hit.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${hit.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${hit.downloads}
        </p>
      </div>
    </li>`
    )
    .join('');
  return refs.list.insertAdjacentHTML('beforeend', markup);
}
