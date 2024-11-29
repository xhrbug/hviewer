function getPosts(url, page) {
  var doc = fetch(url);
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
  const total = parseInt(
    doc.select("a.page-numbers").last().text().replaceAll(",", "")
  );

  const nextPage = doc
    .select(".wp-block-query-pagination-numbers .page-numbers.current")
    .first()
    ? doc
        .select(".wp-block-query-pagination-numbers .page-numbers.current")
        .first()
        .nextElementSibling()
    : null;

  return {
    posts: posts,
    total: total,
    next: nextPage ? nextPage.absUrl("href") : null,
  };
}

function getImages(url, page) {
  var doc = fetch(url);

  var urls = [];
  var images = doc.select("p a img");
  images.forEach((image) => {
    const src = image.attr("src");
    urls.push(src);
  });

  var last_page = doc.select("ul.page-links li.numpages").last();
  var total_pages = last_page ? parseInt(last_page.text()) : 1;

  const nextPage = doc.select(".page-links .numpages.current").first()
    ? doc.select(".page-links .numpages.current").first().nextElementSibling()
    : null;

  return {
    images: urls,
    total: total_pages,
    next: nextPage ? nextPage.select("a").first().absUrl("href") : null,
  };
}
