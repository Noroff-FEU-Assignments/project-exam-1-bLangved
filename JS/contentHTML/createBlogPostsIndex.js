import {formatDate} from "../formatting/date.js"
import { categoryIdCheck } from "../validation/categoryIdCheck.js";

/* Creating HTML for blog posts containers */
function createBlogPost(blogPosts, isPrevButtonPressed){
const blogContainer = document.querySelector(".blogContainer_index");
const blogPostContainer = document.createElement("div");

// "Fade-in" is a transition effect class for when the containers load in
blogPostContainer.classList.add("blogPostContainer_index");
blogPostContainer.id = blogPosts.id;

// Add animation class based on which button pressed
const animationClass = isPrevButtonPressed ? "fade-in-left" : "fade-in-right";
blogPostContainer.classList.add(animationClass);


/* blogInfoContainer */
const infoContainer = document.createElement("div");
infoContainer.classList.add("blogPostInfoContainer_index")
blogPostContainer.append(infoContainer);


/* Categories */
const categoriesContainer = document.createElement("div");
categoriesContainer.classList.add("blogPostCategories_index");

const categoriesTitle = document.createElement("div");
categoriesTitle.classList.add("blogPostCategoriesTitle_index");
categoriesTitle.innerText = "Categories:";
categoriesContainer.append(categoriesTitle);

const categories = blogPosts._embedded["wp:term"][0];
categories.forEach(category => {
  const categoryElement = document.createElement("a");
  categoryElement.classList.add("blogPostCategory_index");

  const categoryRef = category.link.split("/category/");
  if (categoryRef.length > 1) {
    const categoryString = categoryRef[1];
    categoryElement.href = `categories.html?id=${categoryIdCheck(categoryString)}`;
  }
  categoryElement.innerText = category.name;
  categoriesContainer.append(categoryElement);
});


infoContainer.append(categoriesContainer);


/* Title */
const title = document.createElement("h3");
title.classList.add("blogPostTitle_index", "small-header");

 // Since the rendered text from the REST API is containing html tags, this solution sanitze the html tags from the string itself. 
 const tempTitle = document.createElement("div");
 tempTitle.innerHTML = blogPosts.title.rendered; 
 const contentTitle = tempTitle.textContent;
 title.innerText = contentTitle;

// Create the post link and append title to it
const postLinkTitle = document.createElement("a");
postLinkTitle.href = `blogSpecific.html?id=${blogPosts.id}`;

postLinkTitle.append(title)
infoContainer.append(postLinkTitle);


/* SUBHEADER / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogPostSubHeader_index")

const author = document.createElement("span")
author.classList.add("blogPostAuthor_index");

const iconUser = document.createElement("i");
iconUser.classList.add("fa-solid", "fa-user", "fa-sm");

subHeader.append(iconUser);

author.innerText = blogPosts.author
? blogPosts._embedded["author"][0].name
: "";

subHeader.append(author);

/* Date posted */
const postDate = document.createElement("span");
postDate.classList.add("blogPostDate_index");
const formattedDate = formatDate(new Date(blogPosts.date));
postDate.innerText = formattedDate;

const iconDate = document.createElement("i");
iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");

subHeader.append(iconDate);
subHeader.append(postDate);
infoContainer.append(subHeader);



/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("blogPostImage_index");

// Create the post link and append image to it
const postLinkImage = document.createElement("a");
postLinkImage.href = `blogSpecific.html?id=${blogPosts.id}`;

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

postLinkImage.append(topImage);
infoContainer.append(postLinkImage);

/* Content summary / excerpt */
const summary = document.createElement("p");
summary.classList.add("blogPostContentSummary_index");
const tempSummary = document.createElement("div");
tempSummary.innerHTML = blogPosts.excerpt.rendered; 
const contentSummary = tempSummary.textContent;
// Shortens the text to only 150 characters
const shortenedSummary = contentSummary.length > 150 ? contentSummary.substring(0, 150) + "..." : contentSummary;
summary.innerText = shortenedSummary;
blogPostContainer.append(summary);


blogContainer.append(blogPostContainer)

}


export function iterateBlogPosts(results, isPrevButtonPressed){
for(let i = 0; i < results.length; i++){
    const blogPosts = results[i];
    createBlogPost(blogPosts, isPrevButtonPressed);
}
}
