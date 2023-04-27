

/* Creating HTML for blog posts containers */
export function createBlogPost(result){
    const postContainer = document.querySelector(".blogContainer_blogSpecific");
    postContainer.id = result.id;
    
    /* Title */
    const title = document.createElement("h1");
    title.classList.add("postTitle_blogSpecific");
    title.innerText = result.title.rendered;
    postContainer.append(title);
    
    /* sub header / author and date */
    const subHeader = document.createElement("div");
    subHeader.classList.add("postSubheader_blogSpecific")
    
    const author = document.createElement("h3")
    author.classList.add("postAuthor_blogSpecific");
    author.innerText = result.author
    ? result._embedded["author"][0].name
    : "";
    subHeader.append(author);
    
    
    /* Date posted */
    const postDate = document.createElement("h3");
    postDate.classList.add("postDate_blogSpecific");
    postDate.innerText = result.date;
    subHeader.append(postDate);
    
    postContainer.append(subHeader);
    
    
    /* Main image */
    const topImage = document.createElement("img");
    topImage.classList.add("postImage_blogSpecific");
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
    


    /* Content summary / excerpt */
    // const contentSummary = document.createElement("p");
    // contentSummary.classList.add("postContentSummary__blogSpecific");
    // contentSummary.innerText = result.excerpt.rendered.replace(/<\/?p>/g, "");
    // postContainer.append(contentSummary);
    


    /* Description / paragraph */
    const paragraph = document.createElement("p");
    paragraph.classList.add("paragraph_blogSpecific");

    const content = result.content.rendered.replace(/<figure.*?<\/figure>/gs, "")
    .replace(/<\/?p>/g, "").replace(/(<br\s*\/?>){4,}/g, "<br>");
    
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

    
    /* Categories */
    const categoriesContainer = document.createElement("div");
      categoriesContainer.classList.add("postCategories_blogSpecific");
    
      const categoriesTitle = document.createElement("h4");
      categoriesTitle.classList.add("postCategoriesTitle_blogSpecific");
      categoriesTitle.innerText = "Categories:";
      categoriesContainer.append(categoriesTitle);
    
    
      const categories = result._embedded["wp:term"][0];
      categories.forEach(category => {
        const categoryElement = document.createElement("a");
        categoryElement.classList.add("postCategory_blogSpecific");
        categoryElement.href = category.link;
        categoryElement.innerText = category.name;
        categoriesContainer.append(categoryElement);
    });
    postContainer.append(categoriesContainer);
    
    }