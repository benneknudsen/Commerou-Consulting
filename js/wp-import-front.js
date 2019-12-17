// Original code by Rasmus Cederdorff!

"use strict";

// Defines the URL of the Wordpress site we're pulling from
const url = "https://open-summit.dk/wordpress/wp-json/wp/v2/posts?_embed";

// Fetches data from Wordpress, filters it and calls appropriate functions
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(posts) {
    let cases = filterProjects(posts);
    let content = filterContent(posts);
    appendProjects(cases);
    appendContent(content);
  });

// Appends project thumbnails to the project section
function appendProjects(post) {
  // You'll see this a lot; it has to do with how we structured the content in Wordpress posts, as they automatically
  // get tags and newline characters that we have to split and remove; also trim() everywhere to remove unnecessary whitespace
  let texts = post.content.rendered.split("\n\n\n\n");
  let projects = texts[7].trim().slice(3, -4).split("<br>");

  let htmlTemplate = "";


  for (let project of projects) {
    let splitProject = project.trim().split(" # ");

    // We only need the image here
    htmlTemplate += `
      <img src="${splitProject[0]}" alt="">
    `;
  }

  // Append the thumbnails
  document.querySelector('.content-cases').innerHTML = htmlTemplate;
}

// Extracts and appends all the appropriate content from the given Wordpress post
function appendContent(content) {
  // ... As mentioned before, you'll see this a lot in the other import scripts
  let texts = content.content.rendered.split("\n\n\n\n");
  let refs = texts[17].trim().slice(3, -4).split("<br>");

  document.querySelector("#front_blurb").innerHTML = texts[1].trim().slice(3, -4);
  document.querySelector("#front_concept").innerHTML = texts[3].trim().slice(3, -4);
  document.querySelector("#front_design").innerHTML = texts[5].trim().slice(3, -4);
  document.querySelector("#front_print").innerHTML = texts[7].trim().slice(3, -4);
  document.querySelector("#front_robotics").innerHTML = texts[9].trim().slice(3, -4);
  document.querySelector("#front_projects").innerHTML = texts[11].trim().slice(3, -4);
  document.querySelector("#front_tutorials").innerHTML = texts[13].trim().slice(3, -4);
  document.querySelector("#front_webshop").innerHTML = texts[15].trim().slice(3, -4);

  let htmlTemplate = "";

  // Have to make sure our client can link to the references
  for (let ref of refs) {
    let splitRef = ref.split("(to)");
    htmlTemplate += `
      <a href='${splitRef[1].trim()}'><img src="${splitRef[0].trim()}" alt=""></a>
    `;
  }

  document.querySelector(".content-refs-logos").innerHTML = htmlTemplate
}

// Returns the relevant post from the list of posts
function filterProjects(posts) {
  for (let post of posts) {
    if (post.slug === "om-os") {
      return post;
      break;
    }
  }
}

// Returns the relevant post from the list of posts
function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "index") {
      return post;
      break;
    }
  }
}
