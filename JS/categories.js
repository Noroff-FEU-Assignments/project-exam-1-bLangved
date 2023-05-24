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
// console.log(fullUrlPosts)

async function fetchPosts(){
  const responsPosts = await fetch(fullUrlPosts);
  const resultsPosts = await responsPosts.json();

  console.log(resultsPosts.length);

  const postPerPage = 5;
  let currentStartIndex = 0;
  let currentEndIndex = postPerPage;
  let currentPosts = resultsPosts.slice(currentStartIndex, currentEndIndex);

  iterateBlogPosts(currentPosts);

  const moreButton = document.querySelector("#olderPostsBtn");

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
fetchPosts();
