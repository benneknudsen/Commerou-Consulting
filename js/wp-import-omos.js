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
  document.querySelector("#page_title").innerHTML = content.title.rendered;

  let texts = content.content.rendered.split("\n\n\n\n");

  document.querySelector("#page_blurb").innerHTML = texts[1].trim().slice(3, -4);
  document.querySelector("#employees_content").innerHTML = texts[3].trim().slice(3, -4);
  document.querySelector("#experience_content").innerHTML = texts[5].trim().slice(3, -4);

  let projects = texts[7].trim().slice(3, -4).split("<br>");

  let htmlTemplate = "";

  for (let project of projects) {
    let splitProject = project.trim().split(" # ");

    htmlTemplate += `
      <div class="case-element">
        <img src="${splitProject[0]}" alt="">
        <p>${splitProject[1]}</p>
      </div>
    `;
  }

  document.querySelector(".about-cases").innerHTML = htmlTemplate;
}

function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "om-os") {
      return post;
      break;
    }
  }
}
