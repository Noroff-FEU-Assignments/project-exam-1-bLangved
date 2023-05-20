import {formatDate} from "../formatting/date.js"


export function createHighlightPost(blogPost){

const blogContainer = document.querySelector(".highlightedContainer_index");
const blogPostContainer = document.createElement("div");

blogPostContainer.classList.add("fade-in-down-extended");
blogPostContainer.id = blogPost.id;


// Create the post link and append the blog post container to it
const postLink = document.createElement("a");
postLink.href = `blogSpecific.html?id=${blogPost.id}`;
postLink.append(blogPostContainer);  
blogContainer.append(postLink);



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
    categoryElement.href = category.link;
    categoryElement.innerText = category.name;
    categoriesContainer.append(categoryElement);
});
infoContainer.append(categoriesContainer);

/* Title */
const title = document.createElement("h2");
title.classList.add("highlightedTitle_index");
title.innerText = blogPost.title.rendered;
infoContainer.append(title);

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

blogPostContainer.append(topImage);


/* Content summary / excerpt */
const contentSummary = document.createElement("p");
contentSummary.classList.add("highlightedContentSummary_index");
contentSummary.innerText = blogPost.excerpt.rendered.replace(/<\/?p>/g, "");
blogPostContainer.append(contentSummary);

}
