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
  let videos = texts[3].trim().slice(3, -4).split("<br>");
  let docSections = texts[5].trim().slice(3, -4).split("###");

  document.querySelector("#tutorials_blurb").innerHTML = texts[1].trim().slice(3, -4);

  let htmlTemplate = "";

  for (let i = 0; i < videos.length; i++) {
    htmlTemplate += `<iframe title="vimeo-player" src="https://player.vimeo.com/video/${videos[i].trim()}" width="400" height="250" frameborder="0" allowfullscreen></iframe>`;
  }

  document.querySelector(".tutorial-video-container").innerHTML = htmlTemplate;

  htmlTemplate = "";

  for (let i = 0; i < docSections.length; i++) {
    let splitDoc = docSections[i].trim().split("<br>");

    htmlTemplate += `
      <div class="tutorial-list-element">
        <p>${splitDoc[0].trim()}</p>
        <ul>
    `;

    for (let q = 1; q < splitDoc.length; q++) {
      if (splitDoc[q] === "") {
        continue;
      }
      let splitElement = splitDoc[q].trim().split("(to)");
      htmlTemplate += `<li><a href="${splitElement[1]}">${splitElement[0]}</a></li>`;
    }

    htmlTemplate += `
        </ul>
      </div>
    `;
  }

  document.querySelector(".tutorial-lists").innerHTML = htmlTemplate;
}

function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "tutorials") {
      return post;
      break;
    }
  }
}
