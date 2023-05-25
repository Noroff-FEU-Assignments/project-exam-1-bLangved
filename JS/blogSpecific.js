import { showLoadingAnimation, hideLoadingAnimation } from "./components/loadingAnimation.js";
import { createBlogPost } from "./contentHTML/createBlogSpecific.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = `wp-json/wp/v2/posts/${id}`;
const embed = "?_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;

const errorMessageContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#error");

showLoadingAnimation();
async function fetchPosts(){
    try{
        const respons = await fetch(fullUrlPosts);
        const result = await respons.json();

        createBlogPost(result);
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