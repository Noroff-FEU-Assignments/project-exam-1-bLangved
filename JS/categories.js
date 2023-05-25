import { showLoadingAnimation, hideLoadingAnimation } from "./components/loadingAnimation.js";
import { iterateBlogPosts } from "./contentHTML/createBlogPostsBlog.js";
import { reverseCategoryIdCheck } from "./validation/categoryIdCheck.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const idForHeader = reverseCategoryIdCheck(id);


const categoriesTitle = document.querySelector(".typeOfCategory-Title");
categoriesTitle.innerText = "Blog posts with category of: " + idForHeader;

const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressCategoryPosts = `wp-json/wp/v2/posts?categories=${id}&per_page=30`;
const embed = "&_embed";

const fullUrlPosts = baseURL + wordpressCategoryPosts + embed;


const moreButton = document.querySelector("#olderPostsBtn");
const backToTopButton = document.querySelector(".scrollToTop-btn");
const errorMessageContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#error");

showLoadingAnimation();
async function fetchPosts(){
  try{
    const responsPosts = await fetch(fullUrlPosts);
    const resultsPosts = await responsPosts.json();

    console.log(resultsPosts.length);

    const postPerPage = 5;
    let currentStartIndex = 0;
    let currentEndIndex = postPerPage;
    let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);

    iterateBlogPosts(currentPosts);
    hideLoadingAnimation();

    // If There is more then 5 of the specific category blog posts available, then display "Show older posts - btn". If not, hide. 
    if(resultsPosts.length > 5){
      moreButton.style.display = "block"
    }
    else{
      moreButton.style.display = "none"
    }

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
    moreButton.style.display = "none"
    backToTopButton.style.display = "none"
    errorMessageContainer.style.display = "block";
    errorMessage.innerText = "There was an issue loading the content. Please try again later. If the problem persists, please reach out to us through our contact form.";
    console.error(error);
    }
    finally{
        hideLoadingAnimation();
    }
}
fetchPosts();
