var config = {
  baseUrl: "https://misskon.com",
};

function getPosts(url, page) {
  var doc = fetch(url.concat("page/").concat(page));
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
      views: article.select("span.post-views i").first().text(),
    });
  });
  const total = doc.select("div.pagination a").length;
  console.log("total posts pages".concat(total));
  return {
    posts: posts,
    total: total,
  };
}

function getImages(url, page) {
  var doc = fetch(url.concat(page));
  var urls = [];
  var images = doc.select("#fukie2 p img");
  images.forEach((image) => {
    urls.push(image.attr("data-src"));
  });
  var total = doc
    .select("div#fukie2 div.page-link")
    .first()
    .select(".post-page-numbers").length;
  console.log(total);

  return {
    images: urls,
    total: total,
  };
}
