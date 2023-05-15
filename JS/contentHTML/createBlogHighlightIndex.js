import {formatDate} from "../formatting/date.js"


export function createHighlightPost(blogPost){

const blogContainer = document.querySelector(".blogContainerHighlighted_index");
const blogPostContainer = document.createElement("div");

blogPostContainer.classList.add("blogHighlighted", "fade-in-down-extended");
blogPostContainer.id = blogPost.id;


// Create the post link and append the blog post container to it
const postLink = document.createElement("a");
postLink.href = `blogSpecific.html?id=${blogPost.id}`;
postLink.append(blogPostContainer);  
blogContainer.append(postLink);


/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("blogHighlightedImage");
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


/* blogInfoContainer */
const infoContainer = document.createElement("div");
infoContainer.classList.add("blogHighlightedInfoContainer")
blogPostContainer.append(infoContainer);


/* sub header / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogHighlightedSubHeader")

/* Author */
const author = document.createElement("h6")
author.classList.add("blogHighlightedAuthor");
const iconUser = document.createElement("i");
iconUser.classList.add("fa-solid", "fa-user", "fa-sm");
subHeader.append(iconUser);

author.innerText = blogPost.author
? blogPost._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("h6");
postDate.classList.add("blogHighlightedDate");
const formattedDate = formatDate(new Date(blogPost.date));
postDate.innerText = formattedDate;
const iconDate = document.createElement("i");
iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");
subHeader.append(iconDate);
subHeader.append(postDate);


infoContainer.append(subHeader);


/* Title */
const title = document.createElement("h3");
title.classList.add("blogHighlightedTitle");
title.innerText = blogPost.title.rendered;
infoContainer.append(title);


/* Content summary / excerpt */
const contentSummary = document.createElement("p");
contentSummary.classList.add("blogHighlightedContentSummary");
contentSummary.innerText = blogPost.excerpt.rendered.replace(/<\/?p>/g, "");
infoContainer.append(contentSummary);


/* Categories */
const categoriesContainer = document.createElement("div");
  categoriesContainer.classList.add("blogHighlightedCategories");

  const categoriesTitle = document.createElement("div");
  categoriesTitle.classList.add("blogHighlightedCategoriesTitle");
  categoriesTitle.innerText = "Categories:";
  categoriesContainer.append(categoriesTitle);


  const categories = blogPost._embedded["wp:term"][0];
  categories.forEach(category => {
    const categoryElement = document.createElement("a");
    categoryElement.classList.add("blogHighlightedCategory");
    categoryElement.href = category.link;
    categoryElement.innerText = category.name;
    categoriesContainer.append(categoryElement);
});
infoContainer.append(categoriesContainer);



infoContainer.addEventListener("mouseover", function() {
  topImage.classList.add("highlighted");
});

infoContainer.addEventListener("mouseout", function() {
  topImage.classList.remove("highlighted");
});

}
