import {formatDate} from "../formatting/date.js"


/* Creating HTML for blog posts containers */
function createBlogPost(blogPosts, isPrevButtonPressed){
const blogContainer = document.querySelector(".blogContainer_index");
const blogPostContainer = document.createElement("div");

// "Fade-in" is a transition effect class for when the containers load in
blogPostContainer.classList.add("blogPostContainer");
blogPostContainer.id = blogPosts.id;

 // Add animation class based on which button pressed
 const animationClass = isPrevButtonPressed ? "fade-in-left" : "fade-in-right";
 blogPostContainer.classList.add(animationClass);


  // Create the post link and append the blog post container to it
  const postLink = document.createElement("a");
  postLink.href = `blogSpecific.html?id=${blogPosts.id}`;
  postLink.append(blogPostContainer);  
  blogContainer.append(postLink);


/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("blogPostImage");
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
infoContainer.classList.add("blogPostInfoContainer")
blogPostContainer.append(infoContainer);


/* sub header / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogPostSubHeader")


const author = document.createElement("h6")
author.classList.add("blogPostAuthor");

const iconUser = document.createElement("i");
iconUser.classList.add("fa-solid", "fa-user", "fa-sm");
subHeader.append(iconUser);

author.innerText = blogPosts.author
? blogPosts._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("h6");
postDate.classList.add("blogPostDate");
const formattedDate = formatDate(new Date(blogPosts.date));
postDate.innerText = formattedDate;

const iconDate = document.createElement("i");
iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");
subHeader.append(iconDate);

subHeader.append(postDate);


infoContainer.append(subHeader);

/* Title */
const title = document.createElement("h3");
title.classList.add("blogPostTitle");
title.innerText = blogPosts.title.rendered;
infoContainer.append(title);


/* Content summary / excerpt */
const contentSummary = document.createElement("p");
contentSummary.classList.add("blogPostContentSummary");
contentSummary.innerText = blogPosts.excerpt.rendered.replace(/<\/?p>/g, "");
infoContainer.append(contentSummary);


/* Categories */
const categoriesContainer = document.createElement("div");
  categoriesContainer.classList.add("blogPostCategories");

  const categoriesTitle = document.createElement("div");
  categoriesTitle.classList.add("blogPostCategoriesTitle");
  categoriesTitle.innerText = "Categories:";
  categoriesContainer.append(categoriesTitle);


  const categories = blogPosts._embedded["wp:term"][0];
  categories.forEach(category => {
    const categoryElement = document.createElement("a");
    categoryElement.classList.add("blogPostCategory");
    categoryElement.href = category.link;
    categoryElement.innerText = category.name;
    categoriesContainer.append(categoryElement);
});
infoContainer.append(categoriesContainer);

}


export function iterateBlogPosts(results, isPrevButtonPressed){
for(let i = 0; i < results.length; i++){
    const blogPosts = results[i];
    createBlogPost(blogPosts, isPrevButtonPressed);
}
}
