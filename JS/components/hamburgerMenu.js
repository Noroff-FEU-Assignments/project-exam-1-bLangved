const menuIcon = document.querySelector('.menu-icon');
const mobileNav = document.querySelector('.nav_header_mobile');


/* Toggles nav_header_mobile "on/off" by showing nav or not*/ 
menuIcon.addEventListener('click', function () {
  mobileNav.classList.toggle('nav-open');
  menuIcon.classList.toggle('nav-collapsed');
  });