"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts(); // const posts will get the whole fetched data
  // posts.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  displayPostGrid(posts);
}

async function getPosts(){
  // fetch projects
  const response = await fetch("https://headlesswp.koseioki.dk/wp-json/wp/v2/projects?acf_format=standard");
  const data = await response.json();
  return data;
}



function displayPostGrid(posts){
  const postsGrid = document.querySelector("#posts-grid");
  for (const post of posts) {
    postsGrid.insertAdjacentHTML(
      "beforeend",`
      <div class="grid-item" data-link="${post.acf.link}" onclick="handleBoxClick(this)">
      <h2>${post.acf.title}</h2>
      <img class="grid-image" src="${post.acf.image.url}" alt="${post.acf.image.alt}">
      <div class="types"><h3><span aria-hidden="true">🖥️ </span>Type: </h3><p>${post.acf.type}</p></div>
      <div class="types"><h3><span aria-hidden="true">👨‍💻 </span>Client: </h3><p>${post.acf.client}</p></div>
      <div class="types"><h3><span aria-hidden="true">🕒 </span>Duration: </h3><p>${post.acf.duration}</p></div>
      <p>${post.acf.description}</p>

      <a href="${post.acf.link}" class="link-text">${post.acf.ctatext}<span aria-hidden="true"> → </span></a>
      </div>`
    );
  }
}

function handleBoxClick(box) {
  window.location.href = box.getAttribute('data-link');
}