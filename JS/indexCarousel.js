import { iterateBlogPosts } from "./contentHTML/createBlogPosts.js";


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts";
const embed = "?_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;


const blogContainer = document.querySelector(".blogContainer_index")

async function fetchPosts(){
    const responsPosts = await fetch(fullUrlPosts);
    const resultsPosts = await responsPosts.json();

    const postPerPage = 4;
    let currentStartIndex = 0;
    let currentEndIndex = postPerPage;
    let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);

    iterateBlogPosts(currentPosts);


    const prevButton = document.querySelector(".carousel .prev");
    const nextButton = document.querySelector(".carousel .next");

    prevButton.addEventListener('click', function () {
        if (currentStartIndex > 0) {
            currentStartIndex -= postPerPage;
            currentEndIndex -= postPerPage;
            currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
            blogContainer.innerHTML = "";
            iterateBlogPosts(currentPosts);
          }
    });
    nextButton.addEventListener('click', function () {
        if (currentEndIndex < resultsPosts.length) {
            currentStartIndex += postPerPage;
            currentEndIndex += postPerPage;
            currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
            blogContainer.innerHTML = "";
            iterateBlogPosts(currentPosts);
          }
    });
}
fetchPosts();




