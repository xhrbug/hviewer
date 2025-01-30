function getPosts(url, page) {
  let doc = fetch(url).html();
  let articleList = doc.select("article.item-list");
  let posts = [];
  articleList.forEach((article) => {
    let tags = [];
    article.select("p.post-meta span.post-cats a").forEach((tag) => {
      tags.push({
        name: tag.text(),
        url: tag.attr("href"),
      });
    });
    posts.push({
      name: article.select("h2.post-box-title a").first().text(),
      url: article.select("h2.post-box-title a").first().attr("href"),
      thumbnail: article
        .select("div.post-thumbnail img")
        .first()
        .attr("data-src"),
      tags: tags,
    });
  });
  const total = doc.select("div.pagination a").length || 1;
  console.log(url);
  console.log(total);

  let nextEle = doc.select(".pagination .current").first();
  nextEle = nextEle ? nextEle.nextElementSibling() : null;
  nextEle = nextEle ? nextEle.attr("href") : null;

  return {
    posts: posts,
    total: total,
    next: nextEle,
  };
}

function getImages(url, page) {
  let doc = fetch(url).html();
  let urls = [];
  let images = doc.select("div.post-inner div.entry p img");
  images.forEach((image) => {
    urls.push(image.attr("data-src"));
  });
  let total = doc.select("div.post-inner div.entry div.page-link").first();
  total = total ? total.select(".post-page-numbers").length : 1;

  let nextEle = doc.select(".page-link .post-page-numbers.current").first();
  nextEle = nextEle ? nextEle.nextElementSibling() : null;
  nextEle = nextEle ? nextEle.attr("href") : null;

  return {
    images: urls,
    total: total,
    next: nextEle,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl.concat("?s=").concat(query);
}
