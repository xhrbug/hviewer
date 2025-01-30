function getPosts(url, page) {
  console.log(url);
  var doc = fetch(url).html();
  var articleList = doc.select("#MainContent_piclist div");

  var posts = [];
  articleList.forEach((article) => {
    posts.push({
      name: article.select("h2").first().text(),
      url: article.select("a").first().absUrl("href"),
      thumbnail: article.select("a img").first().attr("src"),
    });
  });

  const total = doc
    .select("nav#MainContent_header_nav span.page-number")
    .first()
    ? parseInt(
        doc
          .select("nav#MainContent_header_nav span.page-number")
          .first()
          .text()
          .split("/")[1]
      )
    : 1;

  var nextPage = doc.select(".page-nav .curr-page").first()
    ? doc.select(".page-nav .curr-page").first().nextElementSibling()
    : null;

  return {
    posts: posts,
    total: total,
    next: nextPage ? nextPage.absUrl("href") : null,
  };
}

function getImages(url, page) {
  var doc = fetch(url).html();

  var urls = [];
  var images = doc.select("#MainContent_piclist a");

  images.forEach((image) => {
    const src = image.attr("href");
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
  return baseUrl + "s?q=" + query;
}
