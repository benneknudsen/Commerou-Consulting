// Original code by Rasmus Cederdorff

"use strict";

const url = "http://open-summit.dk/wordpress/wp-json/wp/v2/posts?_embed";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(posts) {
    let content = filterContent(posts)
    appendContent(content);
  });

function appendContent(content) {
  let texts = content.content.rendered.split("\n\n\n\n");

  document.querySelector("#contact_title").innerHTML = texts[0].trim().slice(4, -5);
  document.querySelector("#contact_text").innerHTML = texts[1].trim().slice(3, -4);
}

function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "kontakt") {
      return post;
      break;
    }
  }
}
