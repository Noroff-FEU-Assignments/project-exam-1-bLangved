const backToTop = document.querySelector(".scrollToTop-btn");

backToTop.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


export function scrollToElement(elementId) {
  const element = document.querySelector(elementId);
  if (element) {
    window.scrollTo({
      // Offsets the vertical position by -100px (found that to be a decent offset across platforms)
      top: window.pageYOffset + element.getBoundingClientRect().top - 100,
      behavior: "smooth"

      // Previous solution took you to the end of the container for the header "Recent", so you could not see the text. 
      // Solution above shows the "Recent"-title as well. 
      
      // element.scrollIntoView({ behavior: 'smooth' });
    })
  }
}