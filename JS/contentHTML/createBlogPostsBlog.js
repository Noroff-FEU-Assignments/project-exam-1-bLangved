import {formatDate} from "../formatting/date.js"


/* Creating HTML for blog posts containers */
function createBlogPost(blogPosts){
const blogContainer = document.querySelector(".blogContainer_blog");
const blogPostContainer = document.createElement("div");

// "Fade-in" is a transition effect class for when the containers load in
blogPostContainer.classList.add("blogPostContainer_blog", "fade-in-down");
blogPostContainer.id = blogPosts.id;


/* blogInfoContainer */
const infoContainer = document.createElement("div");
infoContainer.classList.add("blogPostInfoContainer_blog")
blogPostContainer.append(infoContainer);


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


/* Title */
const title = document.createElement("h2");
title.classList.add("blogPostTitle_blog", "medium-header");
title.innerText = blogPosts.title.rendered;

// Create the post link and append title to it
const postLinkTitle = document.createElement("a");
postLinkTitle.href = `blogSpecific.html?id=${blogPosts.id}`;

postLinkTitle.append(title)
infoContainer.append(postLinkTitle);


/* SubHeader - author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogPostSubHeader_blog")

const author = document.createElement("span")
author.classList.add("blogPostAuthor_blog");

const iconUser = document.createElement("i");
iconUser.classList.add("fa-solid", "fa-user", "fa-sm");
subHeader.append(iconUser);

author.innerText = blogPosts.author
? blogPosts._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("span");
postDate.classList.add("blogPostDate_blog");
const formattedDate = formatDate(new Date(blogPosts.date));
postDate.innerText = formattedDate;

const iconDate = document.createElement("i");
iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");
subHeader.append(iconDate);
subHeader.append(postDate);
infoContainer.append(subHeader);
  

/* Main image */
const topImage = document.createElement("img");
topImage.classList.add("blogPostImage_blog");

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
const contentSummary = document.createElement("p");
contentSummary.classList.add("blogPostContentSummary_blog");

let excerptText = blogPosts.excerpt.rendered.replace(/<\/?p>/g, "");
contentSummary.innerText = excerptText.length > 250 ? excerptText.substring(0, 250) + "..." : excerptText;
// contentSummary.innerText = blogPosts.excerpt.rendered.replace(/<\/?p>/g, "");
blogPostContainer.append(contentSummary);

blogContainer.append(blogPostContainer)

}


export function iterateBlogPosts(results){
for(let i = 0; i < results.length; i++){
    const blogPosts = results[i];
    createBlogPost(blogPosts);
}
}
