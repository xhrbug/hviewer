var config = {
  baseUrl: "https://misskon.com",
  tags: {
    xiuren: "https://misskon.com/tag/xiuren/",
    feilin: "https://misskon.com/tag/feilin/",
    mfstar: "https://misskon.com/tag/mfstar/",
    imiss: "https://misskon.com/tag/imiss/",
    mygirl: "https://misskon.com/tag/mygirl/",
    youmi: "https://misskon.com/tag/youmi/",
    huayang: "https://misskon.com/tag/huayang/",
    xiaoyu: "https://misskon.com/tag/xiaoyu/",
    creamsoda: "https://misskon.com/tag/creamsoda/",
    snap: "https://misskon.com/tag/moon-night-snap/",
    photolife: "https://misskon.com/tag/saint-photolife/",
    djawa: "https://misskon.com/tag/djawa/",
    media: "https://misskon.com/tag/pure-media/",
    loozy: "https://misskon.com/tag/loozy/",
    bluecake: "https://misskon.com/tag/bluecake/",
    sweetbox: "https://misskon.com/tag/sweetbox",
    bimilstory: "https://misskon.com/tag/bimilstory",
    lilynah: "https://misskon.com/tag/lilynah/",
    cosplay: "https://misskon.com/tag/cosplay/",
    top3: "https://misskon.com/top3/",
    top7: "https://misskon.com/top7/",
    top30: "https://misskon.com/top30/",
    top60: "https://misskon.com/top60/",
  },
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
