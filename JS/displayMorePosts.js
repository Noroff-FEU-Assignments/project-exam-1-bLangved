import { showLoadingAnimation, hideLoadingAnimation } from "./components/loadingAnimation.js";
import { iterateBlogPosts } from "./contentHTML/createBlogPostsBlog.js";


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts?per_page=30";
const embed = "&_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;

const errorMessageContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#error");

showLoadingAnimation();
async function fetchPosts(){
  try{
  const responsPosts = await fetch(fullUrlPosts);
  const resultsPosts = await responsPosts.json();

  const postPerPage = 10;
  let currentStartIndex = 0;
  let currentEndIndex = postPerPage;
  let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
  iterateBlogPosts(currentPosts);

  const moreButton = document.querySelector("#olderPostsBtn");

  moreButton.addEventListener("click", function () {

      if (currentStartIndex < resultsPosts.length - postPerPage) {
        currentStartIndex += postPerPage;
        currentEndIndex += postPerPage;
        currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);
        iterateBlogPosts(currentPosts);
      }
    });
  }
  catch (error){
    errorMessageContainer.style.display = "block";
    errorMessage.innerText = "There was an issue loading the content. Please try again later. If the problem persists, please reach out to us through our contact form.";
    console.error(error);
    }
    finally{
        hideLoadingAnimation();
    }

}
fetchPosts();