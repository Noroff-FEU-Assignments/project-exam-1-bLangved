import { validateEmail } from "./inputCheck.js";

const email = document.querySelector("#email");
const submitButton = document.querySelector(".submitBtn-form_footer");

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

email.addEventListener('input', validateForm);