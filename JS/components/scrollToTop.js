const backToTopBlog = document.querySelector("#backToTopBtn");


backToTopBlog.addEventListener("click", scrollToTop());

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
