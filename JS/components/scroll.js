
document.querySelector("#backToTopBtn").addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}