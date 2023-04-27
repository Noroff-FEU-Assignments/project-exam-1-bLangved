import { createBlogPost } from "./contentHTML/createBlogSpecific.js";


const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = `wp-json/wp/v2/posts/${id}`;
const embed = "?_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;

async function fetchPosts(){
    const respons = await fetch(fullUrlPosts);
    const result = await respons.json();

    createBlogPost(result);
}
fetchPosts();