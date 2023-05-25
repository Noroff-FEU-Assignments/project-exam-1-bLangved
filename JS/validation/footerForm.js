import { validateEmail } from "./inputCheck.js";

const footer = document.querySelector("#footer");
const email = document.querySelector("#email");
const submitButton = document.querySelector(".submitBtn-form_footer");
const initialSection = document.querySelector(".initial-section_footer");
const confirmationSection = document.querySelector(".confirmation-section_footer");
const formFooter = document.querySelector(".form_footer");
const soMeSection = document.querySelector(".soMe-section_footer")

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
        footer.style.minHeight = "30em";
        soMeSection.style.marginLeft = "initial";
    }
}


email.addEventListener("input", validateForm);
submitButton.addEventListener("click", handleButtonClick);