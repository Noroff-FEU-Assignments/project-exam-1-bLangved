const processingForm = document.querySelector(".loadingContainer");

// Function to show the loading animation
export function showLoadingAnimation() {
    processingForm.style.display = "flex";
}
// Function to hide the loading animation
export function hideLoadingAnimation() {
    processingForm.style.display = "none";
}


// Function to update loading text with dots
function updateLoadingText(loadingText, dotCount) {
    loadingText.innerText = `Processing${".".repeat(dotCount)}`;
}

// Attach event listener to each loading animation element
const loadingAnimations = document.querySelectorAll(".loadingContainer .loadingAnimation");
loadingAnimations.forEach((animation) => {
    let dotCount = 0;
    const loadingText = animation.previousElementSibling;
    updateLoadingText(loadingText, dotCount);

    animation.addEventListener("animationiteration", () => {
        dotCount = (dotCount + 1) % 4;
        updateLoadingText(loadingText, dotCount);
    });
});
