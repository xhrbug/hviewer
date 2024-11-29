var config = {
  baseUrl: "https://www.4khd.com/",
};

function getPosts(url, page) {
  var _url = page == 1 ? url : url.concat("?query-3-page=").concat(page);
  var doc = fetch(_url);
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
  const total = parseInt(doc.select("a.page-numbers").last().text());

  return {
    posts: posts,
    total: total,
  };
}

function getImages(url, page) {
  var _url = page == 1 ? url : url.concat("/").concat(page);
  var doc = fetch(_url);

  var urls = [];
  var images = doc.select("p a img");
  images.forEach((image) => {
    const src = image.attr("src");
    urls.push(src);
  });

  var last_page = doc.select("ul.page-links li.numpages").last();
  var total_pages = last_page ? parseInt(last_page.text()) : 1;

  return {
    images: urls,
    total: total_pages,
  };
}
