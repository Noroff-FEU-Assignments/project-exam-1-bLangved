import { createHighlightPost } from "./contentHTML/createBlogHighlightIndex.js";
import { iterateBlogPosts } from "./contentHTML/createBlogPostsIndex.js";


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts?per_page=10";
const wordpressLatestPost = "wp-json/wp/v2/posts?per_page=1";
const embed = "&_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;
const fullUrlLatestPost = baseURL + wordpressLatestPost + embed;

const blogContainer = document.querySelector(".blogContainer_index")
// const blogHighlighted = document.querySelector(".blogHighlighted_index")



async function fetchLatestPost(){
/* Highlighted post */
const responsPost = await fetch(fullUrlLatestPost);
const resultPost = await responsPost.json();

// console.log(resultPost);
createHighlightPost(resultPost[0]);
}
fetchLatestPost();



async function fetchPosts(){

/* Multiple posts */
    const responsPosts = await fetch(fullUrlPosts);
    const resultsPosts = await responsPosts.json();

    const postPerPage = 4;
    let currentStartIndex = 1;
    let currentEndIndex = postPerPage;
    let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);

    iterateBlogPosts(currentPosts);


    /* Carousel slider buttons - Update content */
    const prevButton = document.querySelector(".carousel .prev");
    const nextButton = document.querySelector(".carousel .next");

    const prevButtonContainer = document.querySelector(".prevButtonContainer_index")
    const nextButtonContainer = document.querySelector(".nextButtonContainer_index")

    prevButton.addEventListener('click', function () {
        // Takes you to the top of the container (Where the "Recent" title is)
        window.location.href = '#' + recentPosts.id;
        // Actual eventListener
        if (currentStartIndex > 0) {
            currentStartIndex -= postPerPage;
            currentEndIndex -= postPerPage;
            currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
            blogContainer.innerHTML = "";
            iterateBlogPosts(currentPosts, true); // Pass true for prevButton
            prevButtonContainer.style.display = "none";
            nextButtonContainer.style.display = "flex";
          }
    });
    nextButton.addEventListener('click', function () {
        // Takes you to the top of the container (Where the "Recent" title is)
        window.location.href = '#' + recentPosts.id;
        // Actual eventListener
        if (currentEndIndex < resultsPosts.length) {
            currentStartIndex += postPerPage;
            currentEndIndex += postPerPage;
            currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
            blogContainer.innerHTML = "";
            iterateBlogPosts(currentPosts, false); // Pass false for nextButton
            nextButtonContainer.style.display = "none";
            prevButtonContainer.style.display = "flex";
          }
    });
}
fetchPosts();


