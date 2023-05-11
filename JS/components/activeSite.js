
    // Get current page based on body's id
    var currentPage = document.body.id;
    console.log(currentPage);

    // Find corresponding link for desktop navigation
    var desktopLinks = document.querySelectorAll(".li_header_desktop ");
    desktopLinks.forEach(function(link) {
        if (link.querySelector('a').getAttribute('href') === currentPage + '.html') {
            link.classList.add('active');
        }
    });

    // Find corresponding link for mobile navigation
    var mobileLinks = document.querySelectorAll(".li_header_mobile");
    mobileLinks.forEach(function(link) {
        if (link.querySelector('a').getAttribute('href') === currentPage + '.html') {
            link.classList.add('active');
        }
    });

