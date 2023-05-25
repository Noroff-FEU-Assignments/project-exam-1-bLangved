import { showLoadingAnimation, hideLoadingAnimation } from "./components/loadingAnimation.js";
import { createHighlightPost } from "./contentHTML/createBlogHighlightIndex.js";
import { iterateBlogPosts } from "./contentHTML/createBlogPostsIndex.js";
import { scrollToElement } from "./components/scrollToLocation.js";

const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts?per_page=10";
const wordpressLatestPost = "wp-json/wp/v2/posts?per_page=1";
const embed = "&_embed";

const fullUrlLatestPost = baseURL + wordpressLatestPost + embed;
const fullUrlPosts = baseURL + wordpressPosts + embed;

const blogContainer = document.querySelector(".blogContainer_index");

const errorMessageContainerTop = document.querySelector("#errorContainerTop");
const errorMessageTop = document.querySelector("#errorTop");


/* Highlighted post */
showLoadingAnimation();
async function fetchLatestPost(){
    try{
        const responsPost = await fetch(fullUrlLatestPost);
        const resultPost = await responsPost.json();
        createHighlightPost(resultPost[0]);
    }
    catch (error){
    errorMessageContainerTop.style.display = "block";
    errorMessageTop.innerText = "There was an issue loading the content. Please try again later. If the problem persists, please reach out to us through our contact form.";
    console.error(error);
    }
    finally{
        hideLoadingAnimation();
    }
}
fetchLatestPost();



const errorMessageContainerBottom = document.querySelector("#errorContainerBottom");
const errorMessageBottom = document.querySelector("#errorBottom");
const carouselContainer = document.querySelector(".containerCarousel-nav");

/* Recent posts */
async function fetchPosts(){
    try{
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

        prevButton.addEventListener("click", function () {
            // Takes you to the top of the container (Where the "Recent" title is) - Only for mobile. Desktop view is different, so no need. 
            if(window.innerWidth < 1200){
                scrollToElement("#" + recentPosts.id)
            }
            // Actual eventListener
            if (currentStartIndex > 0) {
                currentStartIndex -= postPerPage;
                currentEndIndex -= postPerPage;
                currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
                blogContainer.innerHTML = "";
                iterateBlogPosts(currentPosts, true); // Pass true for prevButton
                prevButtonContainer.style.display = "none";
                nextButtonContainer.style.display = "flex";
                carouselContainer.style.float = "right";
            }
        });
        nextButton.addEventListener("click", function () {
            // Takes you to the top of the container (Where the "Recent" title is)
            if(window.innerWidth < 1200){
                scrollToElement("#" + recentPosts.id)
            }
            // Actual eventListener
            if (currentEndIndex < resultsPosts.length) {
                currentStartIndex += postPerPage;
                currentEndIndex += postPerPage;
                currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
                blogContainer.innerHTML = "";
                iterateBlogPosts(currentPosts, false); // Pass false for nextButton
                nextButtonContainer.style.display = "none";
                prevButtonContainer.style.display = "flex";
                carouselContainer.style.float = "left";
            }
        });
    }
    catch (error){
        carouselContainer.style.display = "none";
        errorMessageContainerBottom.style.display = "block";
        errorMessageBottom.innerText = "There was an issue loading the content. Please try again later. If the problem persists, please reach out to us through our contact form.";
        console.error(error);
        }
}
fetchPosts();


