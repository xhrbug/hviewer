function getPosts(url, page) {
  var doc = fetch(url);
  var listElement = doc.select(
    "div.gridshow-posts-content div.gridshow-posts div.gridshow-grid-post"
  );
  var posts = [];
  listElement.forEach((article) => {
    posts.push({
      name: article
        .select(
          "div.gridshow-grid-post-inside div.gridshow-grid-post-header.gridshow-grid-post-block.gridshow-clearfix div.gridshow-grid-post-header-inside.gridshow-clearfix h3.gridshow-grid-post-title a"
        )
        .first()
        .text(),
      url: article
        .select(
          "div.gridshow-grid-post-inside div.gridshow-grid-post-header.gridshow-grid-post-block.gridshow-clearfix div.gridshow-grid-post-header-inside.gridshow-clearfix h3.gridshow-grid-post-title a"
        )
        .first()
        .attr("href"),
      thumbnail: article
        .select(
          "div.gridshow-grid-post-inside div.gridshow-grid-post-thumbnail.gridshow-grid-post-block a.gridshow-grid-post-thumbnail-link img.gridshow-grid-post-thumbnail-img.wp-post-image"
        )
        .first()
        .attr("data-lazy-src"),
    });
  });
  var total = doc.select("a.page-numbers").not(".next").last();
  total = total ? total.text() : 1;

  var nextEle = doc.select("a.page-numbers.next").first();
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
  var images = doc.select(".entry-content > div > a");

  var index = 0;
  for (index = 0; index < images.length; index++) {
    // except last one
    var element = images[index];
    if (index !== images.length - 1) {
      urls.push(element.attr("href"));
    }
  }

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
  return baseUrl.concat("?s=").concat(query);
}
