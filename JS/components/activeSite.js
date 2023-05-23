
    // Get current page based on body"s id
    const currentPage = document.body.id;
    console.log("Active site: " + currentPage + ".html");

    // Find corresponding link for desktop navigation
    const desktopLinks = document.querySelectorAll(".li_header_desktop ");
    desktopLinks.forEach(function(link) {
        if (link.querySelector("a").getAttribute("href") === currentPage + ".html") {
            link.classList.add("active");
        }
    });

    // Find corresponding link for mobile navigation
    const mobileLinks = document.querySelectorAll(".li_header_mobile");
    mobileLinks.forEach(function (link) {
      
     // Needs to check if there is an a-tag in the mobile nav (since there is a li wihtout a-tag, with a nested button that shows the other nav. 
     // If not, it will return "null" in console)
      const anchor = link.querySelector("a");
      if (anchor && anchor.getAttribute("href") === currentPage + ".html") {
        link.classList.add("active");
      }
    });