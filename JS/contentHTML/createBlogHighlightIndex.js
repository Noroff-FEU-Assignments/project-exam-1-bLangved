import { formatDate } from "../formatting/date.js"
import { categoryIdCheck } from "../validation/categoryIdCheck.js";

export function createHighlightPost(blogPost){

const blogContainer = document.querySelector(".highlightedContainer_index");
const blogPostContainer = document.createElement("div");

blogPostContainer.classList.add("fade-in-down-extended");
blogPostContainer.id = blogPost.id;


/* blogInfoContainer */
const infoContainer = document.createElement("div");
infoContainer.classList.add("highlightedInfoContainer_index")
blogPostContainer.append(infoContainer);


/* Categories */
const categoriesContainer = document.createElement("div");
categoriesContainer.classList.add("highlightedCategories_index");

const categoriesTitle = document.createElement("div");
categoriesTitle.classList.add("highlightedCategoriesTitle_index");
categoriesTitle.innerText = "Categories:";
categoriesContainer.append(categoriesTitle);

const categories = blogPost._embedded["wp:term"][0];
categories.forEach(category => {
  const categoryElement = document.createElement("a");
  categoryElement.classList.add("highlightedCategory_index");

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
const title = document.createElement("h2");
title.classList.add("highlightedTitle_index", "medium-header");

 // Since the rendered text from the REST API is containing html tags, this solution sanitze the html tags from the string itself. 
 const tempTitle = document.createElement("div");
 tempTitle.innerHTML = blogPost.title.rendered; 
 const contentTitle = tempTitle.textContent;
 title.innerText = contentTitle;

// Create the post link and append title to it
const postLinkTitle = document.createElement("a");
postLinkTitle.href = `blogSpecific.html?id=${blogPost.id}`;

postLinkTitle.append(title)
infoContainer.append(postLinkTitle);

/* sub header / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("highlightedSubHeader_index")

/* Author */
const author = document.createElement("span")
author.classList.add("highlightedAuthor_index");
const iconUser = document.createElement("i");
iconUser.classList.add("fa-solid", "fa-user", "fa-sm");
subHeader.append(iconUser);

author.innerText = blogPost.author
? blogPost._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("span");
postDate.classList.add("highlightedDate_index");
const formattedDate = formatDate(new Date(blogPost.date));
postDate.innerText = formattedDate;
const iconDate = document.createElement("i");
iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");
subHeader.append(iconDate);
subHeader.append(postDate);


infoContainer.append(subHeader);

/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("highlightedImage_index");

// Create the post link and append image to it
const postLinkImage = document.createElement("a");
postLinkImage.href = `blogSpecific.html?id=${blogPost.id}`;

const imageUrl = blogPost.featured_media
? blogPost._embedded["wp:featuredmedia"][0].source_url
: "";

const imageAlt = blogPost.featured_media
? blogPost._embedded["wp:featuredmedia"][0].alt_text
: "";

topImage.src = imageUrl;
topImage.alt = imageAlt;

topImage.append(imageAlt)
topImage.append(imageUrl)

postLinkImage.append(topImage);
infoContainer.append(postLinkImage);


/* Content summary / excerpt */
const summary = document.createElement("p");
summary.classList.add("highlightedContentSummary_index");
const tempSummary = document.createElement("div");
tempSummary.innerHTML = blogPost.excerpt.rendered; 
const contentSummary = tempSummary.textContent;
summary.innerText = contentSummary;
blogPostContainer.append(summary);

blogContainer.append(blogPostContainer)

}
