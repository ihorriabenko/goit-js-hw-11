export default class NewsApiService {
  constructor() {}

  fetchArticles() {
    const fetchParams = `?key=27832642-aa50f7f08c8a181668a8915c7&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;

    fetch(`https://pixabay.com/api/${fetchParams}`)
      .then(r => r.json())
      .then(console.log);
  }
}
