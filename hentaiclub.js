function getPosts(url, page) {
  console.log(url);

  var doc = fetch(url).html();
  var listElement = doc.select("div.content div#masonry.row div.item");
  var posts = [];
  listElement.forEach((element) => {
    posts.push({
      name: element
        .select("div.item-title a.item-link div.item-link-text")
        .first()
        .text(),
      url: element.select("div.item-title a.item-link").first().attr("href"),
      thumbnail: element.select("img").first().attr("data-original"),
    });
  });

  const lastPage = doc.select(".page-navigator > li").not(".next").last();
  const total = lastPage ? parseInt(lastPage.text()) : 1;

  var nextPage = doc.select(".page-navigator > li.next > a").first();
  nextPage = nextPage ? nextPage.attr("href") : null;

  return {
    posts: posts,
    total: total,
    next: nextPage,
  };
}

function getImages(url, page) {
  console.log(url);
  var doc = fetch(url).html();

  var urls = [];
  var images = doc.select("div.post-item > img");
  images.forEach((image) => {
    const src = image.attr("data-original");
    urls.push(src);
  });

  return {
    images: urls,
    total: 1,
    next: null,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl + "search/" + query;
}
