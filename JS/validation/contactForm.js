import { showLoadingAnimation, hideLoadingAnimation } from "../components/loadingAnimation.js";
import { checkLength, validateEmail} from "./inputCheck.js";

const formSection = document.querySelector("#formSection")
const form = document.querySelector("#contactForm");

const name = document.querySelector("#nameForm");
const nameError = document.querySelector("#nameError");
const nameSucsess = document.querySelector("#nameSucsess")
const email = document.querySelector("#emailForm");
const emailError = document.querySelector("#emailError");
const emailSucsess = document.querySelector("#emailSucsess")
const subject = document.querySelector("#subjectForm");
const subjectError = document.querySelector("#subjectError");
const subjectSucsess = document.querySelector("#subjectSucsess")
const message = document.querySelector("#messageForm");
const messageError = document.querySelector("#messageError");
const messageSucsess = document.querySelector("#messageSucsess")

const topSection = document.querySelector(".topSection_contact");
const processText = document.querySelector(".processingText_contact")
const successSection = document.querySelector(".formSucsess_contact");
const submitButton = document.querySelector(".submitBtn-form_contact");



const outlineStylesSucsess = {
    outlineColor: "green",
    outlineStyle: "solid",
    outlineWidth: "2px"
};
  const outlineStylesError = {
    outlineColor: "red",
    outlineStyle: "solid",
    outlineWidth: "2px"
};


const requiredFields = [name, email, subject, message];

function validateForm() {
    console.clear();
    
    // Validation: Makes else-statements invalid for enabling submit-button
    let validationPassed = true;

    // Name
    if(checkLength(name.value, 5) === true) {
        nameError.style.display = "none";
        nameSucsess.style.display = "block";
        Object.assign(name.style, outlineStylesSucsess);
    }
    else{
        if(name.targeted){
            nameError.style.display = "block";
        }
        nameSucsess.style.display = "none";
        Object.assign(name.style, outlineStylesError);
        validationPassed = false;
        console.log("Name does not meet validation")
    }
    // Email
    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
        emailSucsess.style.display = "block";
        Object.assign(email.style, outlineStylesSucsess);
    } 
    else {
        if(email.targeted){
            emailError.style.display = "block";
        }
        emailSucsess.style.display = "none";
        Object.assign(email.style, outlineStylesError);
        validationPassed = false;
        console.log("Email does not meet validation")
    }
    // Subject
    if(checkLength(subject.value, 15) === true) {
        subjectError.style.display = "none";
        subjectSucsess.style.display = "block";
        Object.assign(subject.style, outlineStylesSucsess);
    }
    else{
        if(subject.targeted){
            subjectError.style.display = "block";
        }
        subjectSucsess.style.display = "none";
        Object.assign(subject.style, outlineStylesError);
        validationPassed = false;
        console.log("Subject does not meet validation")
    }
      // Message
      if(checkLength(message.value, 25) === true) {
        messageError.style.display = "none";
        messageSucsess.style.display = "block";
        Object.assign(message.style, outlineStylesSucsess);
    }
    else{
        if(message.targeted){
            messageError.style.display = "block";
        }
        messageSucsess.style.display = "none";
        Object.assign(message.style, outlineStylesError);
        validationPassed = false;
        console.log("Message does not meet validation")
    }

    return validationPassed;

    
}

requiredFields.forEach((field) => {

    // Does not show error message if input-field is not targeted
    field.targeted = false;

    field.addEventListener("input", () => {
        field.targeted = true;
        const isValidationPassed = validateForm();
        submitButton.disabled = !isValidationPassed;

        if (isValidationPassed) {
            submitButton.classList.add("buttonEnabled");
        } else {
            submitButton.classList.remove("buttonEnabled");
        }
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValidationPassed = validateForm(event);
    if (isValidationPassed) {
        window.scrollTo(0, 0);
        processText.style.display = "block";
        formSection.style.display = "none";
        topSection.style.display = "none";
        showLoadingAnimation();
        // Since there is no data sent, this happens instantaneous. In a real world scenario, this would probably take a small amount of time. Therefor a loading animation.  
        setTimeout(() => {
            processText.style.display = "none";
            successSection.style.display = "flex";
            hideLoadingAnimation();
            
            // Redirection to index.html after 5 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 5000);
        }, 2500);
    }
});


