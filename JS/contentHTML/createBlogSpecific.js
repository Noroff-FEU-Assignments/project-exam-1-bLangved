import { formatDate } from "../formatting/date.js";
import { modalImage } from "../components/modal.js";
import { categoryIdCheck} from "../validation/categoryIdCheck.js";

const pageTitle = document.querySelector(".pageTitle_blogSpecific");


/* Creating HTML for blog posts containers */
export function createBlogPost(result){

  pageTitle.innerText = `Guitar Haven | ${result.title.rendered}`;


    const postContainer = document.querySelector(".blogContainer_blogSpecific");
    postContainer.id = result.id;
    
    /* Title */
    const title = document.createElement("h1");
    title.classList.add("postTitle_blogSpecific", "large-header");
    title.innerText = result.title.rendered;
    postContainer.append(title);
    
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
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph_blogSpecific");

    const content = result.content.rendered
    .replace(/<figure.*?<\/figure>/gs, "")
    .replace(/<\/?p>/g, "")
    .replace(/(<br\s*\/?>){4,}/g, "<br>");

    /* When <br>-tags are "detected" in the content-text from wordpress, create <br>-tags in between the textNode created below */
    const contentArray = content.split("<br>");

    for (let i = 0; i < contentArray.length; i++) {
      const contentNode = document.createTextNode(contentArray[i]);
      paragraph.append(contentNode);
    
      if (i < contentArray.length - 1) {
        const brElement = document.createElement("br");
        paragraph.append(brElement);
      }
    }
    postContainer.append(paragraph);    


    /* Last Modified Time */
    const lastModifiedDate = document.createElement("div");
    lastModifiedDate.classList.add("postLastModifiedDate_blogSpecific");
    
    if(result.modified !== result.date){
    const modifiedDate = new Date(result.modified);
    const formattedModifiedDate = formatDate(modifiedDate);
    lastModifiedDate.innerText = "This blog post was updated at: " + formattedModifiedDate;
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

        const categoryRef = category.link.split('/category/');
        if (categoryRef.length > 1) {
          const categoryString = categoryRef[1];
          categoryElement.href = `categories.html?id=${categoryIdCheck(categoryString)}`;
        }
        
        categoryElement.innerText = category.name;
        categoriesContainer.append(categoryElement);
    });
    postContainer.append(categoriesContainer);
    
    }