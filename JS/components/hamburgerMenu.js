const menuIcon = document.querySelector(".menu-icon");
const navContainer = document.querySelector(".navContainer-header_mobile")


const navPrimary = document.querySelector(".nav_primary_mobile");
const navCategories = document.querySelector(".nav_categories_mobile");
const navSubCategories = document.querySelector(".nav_subCategories_mobile")

const ulPrimary = document.querySelector(".ul_primary_mobile");
const ulCategories = document.querySelector(".ul_categories_mobile");
const ulSubCategories = document.querySelector(".ul_subCategories_mobile");

const showCategoriesBtn = document.querySelector(".show-categories-btn");
const hideCategoriesBtn = document.querySelector(".hide-categories-btn");
const showSubCategoriesBtn = document.querySelector(".show-subCategories-btn");
const hideSubCategoriesBtn = document.querySelector(".hide-subCategories-btn");


/* Toggles nav_header_mobile "on/off" by showing nav or not*/ 
menuIcon.addEventListener('click', function () {
  navContainer.classList.toggle("nav-open");
  menuIcon.classList.toggle("nav-collapsed");
  });


/* Show categories in header */
showCategoriesBtn.addEventListener('click', function () {
  navPrimary.style.display = "none";
  navCategories.style.display = "block"
  ulCategories.classList.add("fade-in-left");
});


/* Hide categories from header */
hideCategoriesBtn.addEventListener('click', function () {
  navCategories.style.display = "none";
  navPrimary.style.display = "block"
  ulPrimary.classList.add("fade-in-right");
});


/* Show sub categories in header */
showSubCategoriesBtn.addEventListener('click', function () {
  navCategories.style.display = "none";
  navSubCategories.style.display = "block";
  ulSubCategories.classList.add("fade-in-left");
});


/* Hide sub categories from header */
hideSubCategoriesBtn.addEventListener('click', function () {
  navSubCategories.style.display = "none";
  navCategories.style.display = "block";
  ulCategories.classList.add("fade-in-right");
});