function getPosts(url, page) {
  var doc = fetch(url).html();
  var articleList = doc.select("li.wp-block-post");
  var posts = [];
  articleList.forEach((article) => {
    posts.push({
      name: article.select("h2.wp-block-post-title").first().text(),
      url: article
        .select("figure.wp-block-post-featured-image a")
        .first()
        .attr("href"),
      thumbnail: article
        .select("figure.wp-block-post-featured-image img")
        .first()
        .attr("src"),
    });
  });

  var lastPage = doc.select("a.page-numbers").last();
  const total = lastPage ? parseInt(lastPage.text().replaceAll(",", "")) : 1;

  var nextPage = doc
    .select(".wp-block-query-pagination-numbers .page-numbers.current")
    .first();
  nextPage = nextPage ? nextPage.nextElementSibling() : null;

  return {
    posts: posts,
    total: total,
    next: nextPage ? nextPage.absUrl("href") : null,
  };
}

function getImages(url, page) {
  var doc = fetch(url).html();

  var urls = [];
  var images = doc.select("p a img");
  images.forEach((image) => {
    const src = image.attr("src");
    urls.push(src);
  });

  var last_page = doc.select("ul.page-links li.numpages").last();
  var total_pages = last_page ? parseInt(last_page.text()) : 1;

  var nextPage = doc.select(".page-links .numpages.current").first();
  nextPage = nextPage ? nextPage.nextElementSibling() : null;

  return {
    images: urls,
    total: total_pages,
    next: nextPage ? nextPage.select("a").first().absUrl("href") : null,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl + "search/" + query;
}
