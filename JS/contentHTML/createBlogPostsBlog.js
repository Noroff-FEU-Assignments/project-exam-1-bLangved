import {formatDate} from "../formatting/date.js"


/* Creating HTML for blog posts containers */
function createBlogPost(blogPosts){
const blogContainer = document.querySelector(".blogContainer_blog");
const blogPostContainer = document.createElement("div");

// "Fade-in" is a transition effect class for when the containers load in
blogPostContainer.classList.add("blogPostContainer_blog", "fade-in-down");
blogPostContainer.id = blogPosts.id;

  // Create the post link and append the blog post container to it
  const postLink = document.createElement("a");
  postLink.href = `blogSpecific.html?id=${blogPosts.id}`;
  postLink.append(blogPostContainer);  
  blogContainer.append(postLink);


/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("blogPostImage_blog");
const imageUrl = blogPosts.featured_media
? blogPosts._embedded["wp:featuredmedia"][0].source_url
: "";

const imageAlt = blogPosts.featured_media
? blogPosts._embedded["wp:featuredmedia"][0].alt_text
: "";

topImage.src = imageUrl;
topImage.alt = imageAlt;

topImage.append(imageAlt)
topImage.append(imageUrl)

blogPostContainer.append(topImage);


/* blogInfoContainer */
const infoContainer = document.createElement("div");
infoContainer.classList.add("blogPostInfoContainer_blog")
blogPostContainer.append(infoContainer);


/* sub header / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogPostSubHeader_blog")

const author = document.createElement("h6")
author.classList.add("blogPostAuthor_blog");
author.innerText = blogPosts.author
? blogPosts._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("h6");
postDate.classList.add("blogPostDate_blog");
const formattedDate = formatDate(new Date(blogPosts.date));
postDate.innerText = formattedDate;
subHeader.append(postDate);

infoContainer.append(subHeader);

/* Title */
const title = document.createElement("h3");
title.classList.add("blogPostTitle_blog");
title.innerText = blogPosts.title.rendered;
infoContainer.append(title);


/* Categories */
const categoriesContainer = document.createElement("div");
  categoriesContainer.classList.add("blogPostCategories_blog");

  const categoriesTitle = document.createElement("div");
  categoriesTitle.classList.add("blogPostCategoriesTitle_blog");
  categoriesTitle.innerText = "Categories:";
  categoriesContainer.append(categoriesTitle);


  const categories = blogPosts._embedded["wp:term"][0];
  categories.forEach(category => {
    const categoryElement = document.createElement("a");
    categoryElement.classList.add("blogPostCategory_blog");
    categoryElement.href = category.link;
    categoryElement.innerText = category.name;
    categoriesContainer.append(categoryElement);
});
infoContainer.append(categoriesContainer);

}


export function iterateBlogPosts(results){
for(let i = 0; i < results.length; i++){
    const blogPosts = results[i];
    createBlogPost(blogPosts);
}
}
