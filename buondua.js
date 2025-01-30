function getPosts(url, page) {
  console.log(url);

  var doc = fetch(url).html();
  var listElement = doc.select("div.blog div.items-row");
  var posts = [];

  listElement.forEach((element) => {
    var tags = [];
    element
      .select("div.item-content div.item-tags.tags a.tag.is-small")
      .forEach((e) => {
        tags.push({
          name: e.text(),
          url: e.absUrl("href"),
        });
      });
    posts.push({
      name: element
        .select("div.item-content div.page-header h2 a.item-link")
        .first()
        .text(),
      url: element
        .select("div.item-content div.page-header h2 a.item-link")
        .first()
        .absUrl("href"),
      thumbnail: element
        .select("div.item-thumb a.item-link.popunder img")
        .first()
        .attr("src"),
      tags: tags,
    });
  });

  const lastPage = doc.select("ul.pagination-list li a.pagination-link").last();
  const total = lastPage ? parseInt(lastPage.text()) : 1;

  var nextPage = doc.select("nav.pagination a.pagination-next").first();
  nextPage = nextPage ? nextPage.absUrl("href") : null;

  console.log(nextPage);

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
  var images = doc.select("div.article.content div.article-fulltext p img");
  images.forEach((image) => {
    const src = image.attr("src");
    urls.push(src);
  });

  var total = doc
    .select("nav.pagination div.pagination-list span a.pagination-link")
    .last();

  total = total ? parseInt(total.text()) : 1;

  var next = doc
    .select(
      "nav.pagination div.pagination-list span a.pagination-link.is-current"
    )
    .last();
  next = next ? next.parent().nextElementSibling() : null;
  next = next ? next.select("a").first().absUrl("href") : null;

  return {
    images: urls,
    total: total,
    next: next,
  };
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}

function getSearchUrl(query) {
  return baseUrl + "?search=" + query;
}
