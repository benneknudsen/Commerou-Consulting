// Original code by Rasmus Cederdorff

"use strict";

// Defines the URL of the Wordpress site we're pulling from
const url = "https://open-summit.dk/wordpress/wp-json/wp/v2/posts?_embed";

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
  let texts = content.content.rendered.split("\n\n\n\n");
  let videos = texts[3].trim().slice(3, -4).split("<br>");
  let docSections = texts[5].trim().slice(3, -4).split("###");

  document.querySelector("#tutorials_blurb").innerHTML = texts[1].trim().slice(3, -4);

  let htmlTemplate = "";

  // Here we take the list of Vimeo video ID's from the post and embed them into an iframe;
  // currently only supports Vimeo, but could be adjusted to fit Youtube or any similar embedding formats
  for (let i = 0; i < videos.length; i++) {
    htmlTemplate += `<iframe title="vimeo-player" src="https://player.vimeo.com/video/${videos[i].trim()}" width="400" height="250" frameborder="0" allowfullscreen></iframe>`;
  }

  document.querySelector(".tutorial-video-container").innerHTML = htmlTemplate;

  htmlTemplate = "";

  // Loops through all the sections of the Arduino documentation
  for (let i = 0; i < docSections.length; i++) {
    let splitDoc = docSections[i].trim().split("<br>");

    // Start out by adding the start of a list element with the appropriate title
    htmlTemplate += `
      <div class="tutorial-list-element">
        <p>${splitDoc[0].trim()}</p>
        <ul>
    `;

    // Loops through all the individual links in the section
    // ... we are aware that nested for-loops are ineffective
    for (let q = 1; q < splitDoc.length; q++) {
      // Discard empty entries
      if (splitDoc[q] === "") {
        continue;
      }

      // Split up the entry into link and text, and add them to the template
      let splitElement = splitDoc[q].trim().split("(to)");
      htmlTemplate += `<li><a href="${splitElement[1]}">${splitElement[0]}</a></li>`;
    }

    // Close the list element
    htmlTemplate += `
        </ul>
      </div>
    `;
  }

  // Finally, add the lists to the DOM
  document.querySelector(".tutorial-lists").innerHTML = htmlTemplate;
}

// Returns the relevant post from the list of posts
function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "tutorials") {
      return post;
      break;
    }
  }
}
