// Select the button element
const button = document.querySelector(".button.hover-animation[type='submit'][name='checkout']");

// Set the button to be enabled
button.disabled = false;

// Add an event listener to the button to keep it enabled
button.addEventListener("click", function() {
    button.disabled = false;
});