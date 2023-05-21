

export function modalImage (topImage) {

// create a new div that will be used as overlay for the image
const imageOverlay = document.createElement("div");
imageOverlay.classList.add("imageOverlay_blogspecific");

// create a new image that will be shown in the overlay
const bigImage = document.createElement("img");
bigImage.classList.add("modalImage_blogSpecific");


const closeBtn = document.createElement("button");
closeBtn.classList.add("modalImageBtn_blogSpecific");
closeBtn.innerText = "Close image"

imageOverlay.append(bigImage);
imageOverlay.append(closeBtn);
document.body.append(imageOverlay);


topImage.addEventListener("click", function() {
    bigImage.src = this.src;
    imageOverlay.style.display = "block";
});

// hiding image
imageOverlay.addEventListener("click", function() {
    imageOverlay.style.display = "none";
});
}