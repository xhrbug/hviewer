function getPosts(url, page) {
  console.log(url);
  var doc = fetch(url);
  var listElement = doc.select("#post-list div .post-item");
  var posts = [];
  listElement.forEach((element) => {
    posts.push({
      name: element.select(".post-title a").first().text(),
      url: element.select(".post-title a").first().attr("href"),
      thumbnail: element.select(".box-image img").first().attr("src"),
    });
  });
  const total = doc.select(".page-numbers .page-number").not(".next").last()
    ? parseInt(
        doc.select(".page-numbers .page-number").not(".next").last().text()
      )
    : 1;

  const nextPage = doc.select(".next.page-number").first();

  return {
    posts: posts,
    total: total,
    next: nextPage ? nextPage.attr("href") : null,
  };
}

function getImages(url, page) {
  var doc = fetch(url);

  var urls = [];
  var images = doc.select(".gallery-item img");
  images.forEach((image) => {
    const src = image.attr("src");
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
  return baseUrl + "?s=" + query;
}
