import { iterateBlogPosts } from "./contentHTML/createBlogPosts.js";


const baseURL = "https://projectexam1.bhlweb.no/";
const wordpressPosts = "wp-json/wp/v2/posts";
const embed = "?_embed";

const fullUrlPosts = baseURL + wordpressPosts + embed;

async function fetchPosts(){
    const responsPosts = await fetch(fullUrlPosts);
    const resultsPosts = await responsPosts.json();

    // console.log(results);

    iterateBlogPosts(resultsPosts);
}
fetchPosts();