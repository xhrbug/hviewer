function getPosts(url, page) {
  var doc = fetch(url);

  var listItem = doc.select("table.itg.gltc tbody tr");

  var posts = [];
  listItem.forEach((item) => {
    var name = item.select("td.gl3c.glname a div.glink").first();
    if (name) {
      var tags = [];
      item.select("td.gl3c.glname a div div.gt").forEach((tag) => {
        const tagName = tag.text();
        tags.push({
          name: tagName,
          url: getSearchUrl(tagName),
        });
      });
      var thumbnail = item.select("td.gl2c div.glthumb div img").first();

      if (thumbnail.hasAttr("data-src")) {
        thumbnail = thumbnail.attr("data-src");
      } else {
        thumbnail = thumbnail.attr("src");
      }

      const post = {
        name: name.text(),
        url: item.select("td.gl3c.glname a").first().attr("href"),
        thumbnail: thumbnail,
      };
      posts.push(post);
    }
  });

  var next = doc.select("div.searchnav div a#unext").first();
  next = next ? next.attr("href") : null;

  var total = doc.select("div.ido div div.searchtext p").first();
  total = total ? total.text().replaceAll(",", "").match(/\d+/)[0] : 1;
  total = Math.ceil(total / 25);

  return {
    posts: posts,
    total: total,
    next: next,
  };
}

function getImages(url, page) {
  var doc = fetch(url);
  var urls = [];
  var links = doc.select("div#gdt a");
  links.forEach((link) => {
    const href = link.attr("href");
    const html = fetch(String(href)); // convert from object to string
    const src = html.select("img#img").first().attr("src");
    urls.push(src);
  });
  var lastNav = doc.select("div.gtb table.ptb tbody tr td a").last();
  const next = lastNav ? lastNav.attr("href") : null;
  var total = doc.select("div.gtb table.ptb tbody tr td a").length - 2;

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
  return baseUrl + "?f_search=" + query + "&advsearch=1&f_srdd=2";
}
