function traverseObject(obj, keys) {
  var current = obj;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key === "[]") {
      current = current[0];
    } else if (key === "{}") {
      const firstKey = current.keys[0];
      current = current[firstKey];
    } else {
      current = current[key];
    }
  }
  return current;
}

function parseTotalCount(input) {
  var totalCount = 0;

  const regex = /(\d+)\s*(gifs|pictures)/gi;
  var match;

  while ((match = regex.exec(input.replaceAll(",", ""))) !== null) {
    const count = parseInt(match[1], 10);
    totalCount += count;
  }

  return totalCount;
}

function getPosts(url, page) {
  let api = url;
  if (page !== 1)
    api = api.concat(url.endsWith("/") ? "?page=" : "&page=").concat(page);
  var doc = fetch(api).html();
  var articleList = doc.select("div.o-justified-box");
  var posts = [];
  articleList.forEach((article) => {
    posts.push({
      name: article.select("a").first().attr("title"),
      url: article.select("a").first().absUrl("href"),
      thumbnail: article.select("a img").first().attr("src"),
    });
  });

  const data = parsePostsData(doc);
  const total = traverseObject(data, ["album", "list", "info", "total_pages"]);

  return {
    posts: posts,
    total: total,
    next: url,
  };
}

function getImages(url, page) {
  var api = url.concat("?page=").concat(page);
  console.log(api);
  var doc = fetch(api).html();
  var data = parsePostData(doc);
  var urls = [];
  var images = doc.select(".picture-card-outer img");
  images.forEach((image) => {
    const src = image.attr("src");
    urls.push(src.replaceAll("315", "1680"));
  });

  return {
    images: urls,
    total: traverseObject(data, ["picture", "list", "info", "total_pages"]),
    next: url,
  };
}

function parsePostData(doc) {
  const script = doc.selectFirst("#root ~ script").html();
  const cacheText = /window.__ANANSI_CACHE__ = "(.+)"/.exec(script)[1];
  const data = /PictureListInsideAlbum.+data":(.+)/
    .exec(atob(cacheText))[1]
    .slice(0, -2);

  return JSON.parse(data);
}

function parsePostsData(doc) {
  const script = doc.selectFirst("#root ~ script").html();
  const cacheText = /window.__ANANSI_CACHE__ = "(.+)"/.exec(script)[1];
  const data = /AlbumList.+data":(.+)/.exec(atob(cacheText))[1].slice(0, -2);

  return JSON.parse(data);
}

function getSearchUrl(query) {
  return baseUrl
    .concat(
      "/albums/list/?album_type=pictures&audience_ids=%2B1%2B10%2B12%2B2%2B3%2B5%2B6%2B8%2B9&display=search_score&language_ids=%2B1%2B100%2B101%2B103%2B2%2B3%2B4%2B5%2B6%2B7%2B8%2B9%2B99&search_query="
    )
    .concat(query);
}

function search(queryUrl, page) {
  return getPosts(queryUrl, page);
}
