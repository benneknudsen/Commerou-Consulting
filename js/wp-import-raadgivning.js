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

  document.querySelector("#page_blurb").innerHTML = texts[1].trim().slice(3, -4);
  document.querySelector("#consult_concept").innerHTML = texts[3].trim().slice(3, -4);
  document.querySelector("#consult_design").innerHTML = texts[5].trim().slice(3, -4);
  document.querySelector("#consult_print").innerHTML = texts[7].trim().slice(3, -4);
  document.querySelector("#consult_robotics").innerHTML = texts[9].trim().slice(3, -4);
}

function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "radgivning") {
      return post;
      break;
    }
  }
}
