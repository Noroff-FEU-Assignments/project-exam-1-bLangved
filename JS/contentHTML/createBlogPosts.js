

/* Creating HTML for blog posts containers */
function createBlogPost(blogPosts){
const blogContainer = document.querySelector(".blogContainer_index");
const blogPostContainer = document.createElement("div");
blogPostContainer.classList.add("blogPostContainer");
blogPostContainer.id = blogPosts.id;

  // Create the post link and append the blog post container to it
  const postLink = document.createElement("a");
  postLink.href = `blogSpecific.html?id=${blogPosts.id}`;
  postLink.append(blogPostContainer);  
  blogContainer.append(postLink);


/* Title */
const title = document.createElement("h2");
title.classList.add("blogPostTitle");
title.innerText = blogPosts.title.rendered;
blogPostContainer.append(title);

/* sub header / author and date */
const subHeader = document.createElement("div");
subHeader.classList.add("blogPostSubHeader")

const author = document.createElement("h3")
author.classList.add("blogPostAuthor");
author.innerText = blogPosts.author
? blogPosts._embedded["author"][0].name
: "";
subHeader.append(author);


/* Date posted */
const postDate = document.createElement("h3");
postDate.classList.add("blogPostDate");
postDate.innerText = blogPosts.date;
subHeader.append(postDate);

blogPostContainer.append(subHeader);


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

/* Content summary / excerpt */
const contentSummary = document.createElement("p");
contentSummary.classList.add("blogPostContentSummary");
contentSummary.innerText = blogPosts.excerpt.rendered.replace(/<\/?p>/g, "");
blogPostContainer.append(contentSummary);


/* Categories */
const categoriesContainer = document.createElement("div");
  categoriesContainer.classList.add("blogPostCategories");

  const categoriesTitle = document.createElement("h4");
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
blogPostContainer.append(categoriesContainer);

}


export function iterateBlogPosts(results){
    // console.log(results)
for(let i = 0; i < results.length; i++){
    const blogPosts = results[i];
    console.log(blogPosts);
    createBlogPost(blogPosts);
}
}