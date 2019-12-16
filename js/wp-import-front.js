// Original code by Rasmus Cederdorff

"use strict";

const url = "http://open-summit.dk/wordpress/wp-json/wp/v2/posts?_embed";

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

function appendProjects(post) {
  let texts = post.content.rendered.split("\n\n\n\n");
  let projects = texts[7].trim().slice(3, -4).split("<br>");

  let htmlTemplate = "";

  for (let project of projects) {
    let splitProject = project.trim().split(" # ");

    htmlTemplate += `
        <img src="${splitProject[0]}" alt="">
    `;
  }

  document.querySelector('.content-cases').innerHTML = htmlTemplate;
}

function appendContent(content) {

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

  for (let ref of refs) {
    let splitRef = ref.split("(to)");
    htmlTemplate += `
      <a href='${splitRef[1].trim()}'><img src="${splitRef[0].trim()}" alt=""></a>
    `;
  }

  document.querySelector(".content-refs-logos").innerHTML = htmlTemplate
}

function filterProjects(posts) {
  for (let post of posts) {
    if (post.slug === "om-os") {
      return post;
      break;
    }
  }
}

function filterContent(posts) {
  for (let post of posts) {
    if (post.slug === "index") {
      return post;
      break;
    }
  }
}
