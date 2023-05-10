import { iterateBlogPosts } from "./contentHTML/createBlogPostsBlog.js";


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts?per_page=30";
const embed = "&_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;

async function fetchPosts(){
    const responsPosts = await fetch(fullUrlPosts);
    const resultsPosts = await responsPosts.json();

    const postPerPage = 6;
    let currentStartIndex = 0;
    let currentEndIndex = postPerPage;
    let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);

    iterateBlogPosts(currentPosts);


    const moreButton = document.querySelector("#olderPostsBtn");

    moreButton.addEventListener('click', function () {
        if (currentStartIndex < resultsPosts.length - postPerPage) {
          currentStartIndex += postPerPage;
          currentEndIndex += postPerPage;
          currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
          iterateBlogPosts(currentPosts);
        }
      });
}
fetchPosts();