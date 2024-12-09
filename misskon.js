function getPosts(url, page) {
  var doc = fetch(url);
  var articleList = doc.select("article.item-list");
  var posts = [];
  articleList.forEach((article) => {
    posts.push({
      name: article.select("h2.post-box-title a").first().text(),
      url: article.select("h2.post-box-title a").first().attr("href"),
      thumbnail: article
        .select("div.post-thumbnail img")
        .first()
        .attr("data-src"),
    });
  });
  const total = doc.select("div.pagination a").length;
  console.log(url);
  console.log(total);

  var nextEle = doc.select(".pagination .current").first();
  nextEle = nextEle ? nextEle.nextElementSibling() : null;

  return {
    posts: posts,
    total: total,
    next: nextEle ? nextEle.attr("href") : null,
  };
}

function getImages(url, page) {
  var doc = fetch(url);
  var urls = [];
  var images = doc.select("div.post-inner div.entry p img");
  images.forEach((image) => {
    urls.push(image.attr("data-src"));
  });
  var total = doc.select("div.post-inner div.entry div.page-link").first();
  total = total ? total.select("a.post-page-numbers").length : 1;

  var nextEle = doc.select(".page-link .post-page-numbers.current").first();
  nextEle = nextEle ? nextEle.nextElementSibling() : null;

  return {
    images: urls,
    total: total,
    next: nextEle ? nextEle.attr("href") : null,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl.concat("?s=").concat(query);
}
