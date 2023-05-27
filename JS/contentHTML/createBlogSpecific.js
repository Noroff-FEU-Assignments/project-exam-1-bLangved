import { formatDate } from "../formatting/date.js";
import { modalImage } from "../components/modal.js";
import { categoryIdCheck} from "../validation/categoryIdCheck.js";

const pageTitle = document.querySelector(".pageTitle_blogSpecific");


/* Creating HTML for blog posts containers */
export function createBlogPost(result){


  const postContainer = document.querySelector(".blogContainer_blogSpecific");
  postContainer.id = result.id;
  
  /* Title */
  const title = document.createElement("h1");
  title.classList.add("postTitle_blogSpecific", "large-header");
  
  // Since the rendered text from the REST API is containing html tags, this solution sanitze the html tags from the string itself. 
  const tempTitle = document.createElement("div");
  tempTitle.innerHTML = result.title.rendered; 
  const contentTitle = tempTitle.textContent;
  title.innerText = contentTitle;
  postContainer.append(title);
  
  // Title on blogSpecific.html
  pageTitle.innerText = `Guitar Haven | ${title.innerText}`;

  /* sub header / author and date */
  const subHeader = document.createElement("div");
  subHeader.classList.add("postSubheader_blogSpecific")
  
  /* AUTHOR */
  const author = document.createElement("span")
  author.classList.add("postAuthor_blogSpecific");

  const iconUser = document.createElement("i");
  iconUser.classList.add("fa-solid", "fa-user", "fa-sm");
  subHeader.append(iconUser);

  author.innerText = result.author
  ? result._embedded["author"][0].name
  : "";
  subHeader.append(author);
  
  
  /* DATE POSTED */
  const postDate = document.createElement("span");
  postDate.classList.add("postDate_blogSpecific");
  const formattedDate = formatDate(new Date(result.date));
  postDate.innerText = formattedDate;

  const iconDate = document.createElement("i");
  iconDate.classList.add("fa-sharp", "fa-regular", "fa-clock", "fa-sm", "date-Icon");
  subHeader.append(iconDate);

  subHeader.append(postDate);
  
  postContainer.append(subHeader);
  
  
  /* Main image */
  const topImage = document.createElement("img");
  topImage.classList.add("postImage_blogSpecific");
  topImage.id = "image-blog-specific";
  const imageUrl = result.featured_media
  ? result._embedded["wp:featuredmedia"][0].source_url
  : "";
  
  const imageAlt = result.featured_media
  ? result._embedded["wp:featuredmedia"][0].alt_text
  : "";
  
  topImage.src = imageUrl;
  topImage.alt = imageAlt;
  
  topImage.append(imageAlt)
  topImage.append(imageUrl)
  
  postContainer.append(topImage);


  // Creates modal Image in modal.js
  modalImage(topImage);


  /* Description / paragraph */

  // I tried so many different approaches instead of using innerHTML for this, but I could not figure out any that kept formatting any good. 
  // Sub Titles with different styling was also a major issue. 
  // .replace was tried with a hugh amount of different solutions, but I ended up sticking with this as a last minute call, and rewrote all my blog posts in wordpress
  const paragraph = document.createElement("p");
  paragraph.classList.add("paragraph_blogSpecific");
  paragraph.innerHTML = result.content.rendered;

  const subTitleTag = paragraph.querySelectorAll("h2");
  // Checking for all h2 tags 
  if (subTitleTag.length > 0) {
    // Add class to each h2 tag
    subTitleTag.forEach((subTitles) => {
      subTitles.classList.add("paragraphSubTitle_blogSpecific");
    });
  }
  const listTag = paragraph.querySelectorAll("li");
  // Checking for all list tags 
  if (listTag.length > 0) {
    // Add class to each list tag
    listTag.forEach((list) => {
      list.classList.add("paragraphListElement_blogSpecific");
    });
  }
  // Currently not filling entire width of page, but works (the img tags are being nested inside figure tags)
  const imgTag = paragraph.querySelectorAll("img");
  // Checking for all img tags 
  if (imgTag.length > 0) {
    // Add class to each img tag
    imgTag.forEach((img) => {
      img.classList.add("paragraphImgElement_blogSpecific");
    });
  }
postContainer.append(paragraph);    



  /* Last Modified Time */
  const lastModifiedDate = document.createElement("div");
  lastModifiedDate.classList.add("postLastModifiedDate_blogSpecific");
  
  if(result.modified !== result.date){
  const modifiedDate = new Date(result.modified);
  const formattedModifiedDate = formatDate(modifiedDate);
  lastModifiedDate.innerText = "This blog post was updated: " + formattedModifiedDate;
  postContainer.append(lastModifiedDate);
  }

  /* Categories */
  const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("postCategories_blogSpecific");
  
    const categoriesTitle = document.createElement("div");
    categoriesTitle.classList.add("postCategoriesTitle_blogSpecific");
    categoriesTitle.innerText = "Categories:";
    categoriesContainer.append(categoriesTitle);
  
  
    const categories = result._embedded["wp:term"][0];
    categories.forEach(category => {
      const categoryElement = document.createElement("a");
      categoryElement.classList.add("postCategory_blogSpecific");

      const categoryRef = category.link.split("/category/");
      if (categoryRef.length > 1) {
        const categoryString = categoryRef[1];
        categoryElement.href = `categories.html?id=${categoryIdCheck(categoryString)}`;
      }
      categoryElement.innerText = category.name;
      categoriesContainer.append(categoryElement);
    });
    postContainer.append(categoriesContainer);
    
    }