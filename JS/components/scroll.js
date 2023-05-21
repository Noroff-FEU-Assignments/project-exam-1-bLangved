
document.querySelector("#backToTopBtn").addEventListener("click", scrollToTop);


function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



/* Going to be implemented a little different */
// Index recent 
document.querySelector("prevButtonContainer_index").addEventListener("click", scrollToTop)
document.querySelector("nextButtonContainer_index").addEventListener("click", scrollToTop)