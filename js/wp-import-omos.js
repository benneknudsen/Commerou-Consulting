// Original code by Rasmus Cederdorff

"use strict";

// Defines the URL of the Wordpress site we're pulling from
const url = "http://open-summit.dk/wordpress/wp-json/wp/v2/posts?_embed";

// Fetches data from Wordpress, filters it and calls appropriate functions
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(posts) {
    let content = filterContent(posts)
    appendContent(content);
  });

// Extracts and appends all the appropriate content from the given Wordpress post
function appendContent(content) {
  document.querySelector("#page_title").innerHTML = content.title.rendered;

  let texts = content.content.rendered.split("\n\n\n\n");

  document.querySelector("#page_blurb").innerHTML = texts[1].trim().slice(3, -4);
  document.querySelector("#employees_content").innerHTML = texts[3].trim().slice(3, -4);
  document.querySelector("#experience_content").innerHTML = texts[5].trim().slice(3, -4);

  let projects = texts[7].trim().slice(3, -4).split("<br>");

  let htmlTemplate = "";

  // Same as on the front page, but here we also need the title of the project;
  // text description is also available, but not displayed
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

// Returns the relevant post from the list of posts
function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "om-os") {
      return post;
      break;
    }
  }
}
