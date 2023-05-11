document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtns = document.querySelectorAll('.readMore-btn');
  
    readMoreBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const section = btn.closest('.section_about');
        const paragraph = section.querySelector('p');
  
        paragraph.classList.toggle('show-more');
  
        // Update button text based on toggle-state
        if (paragraph.classList.contains('show-more')) {
          btn.textContent = 'Read less';
        } else {
          btn.textContent = 'Read more';
        }
      });
    });
  });