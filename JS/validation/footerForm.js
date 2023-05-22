import { validateEmail } from "./inputCheck.js";

const footer = document.querySelector("#footer");
const email = document.querySelector("#email");
const submitButton = document.querySelector(".submitBtn-form_footer");
const initialSection = document.querySelector(".initial-section_footer");
const confirmationSection = document.querySelector(".confirmation-section_footer");
const formFooter = document.querySelector(".form_footer");
const backToTopBtn = document.querySelector(".backToTop-btn_footer");

function validateForm() {
    
    // Enables the button if email passes validation (happens in inputCheck.js)
    submitButton.disabled = !validateEmail(email.value);
    
    if (!submitButton.disabled) {
        submitButton.classList.add("buttonEnabled");
    } else {
        submitButton.classList.remove("buttonEnabled");
    }
    return !submitButton.disabled;
}

function handleButtonClick(event){
    event.preventDefault();

    if(validateForm){
        initialSection.style.display = "none";
        confirmationSection.style.display = "block";
        formFooter.style.display = "none";
        backToTopBtn.style.display = "block"
        footer.style.minHeight = "30em";
    }
}

document.querySelector("#backToTopBtnFooter").addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


email.addEventListener("input", validateForm);
submitButton.addEventListener("click", handleButtonClick);