const textArray = [
    "Software Engineer",
    "Front-End Developer",
    "Web Scraping Engineer",
    "Full Stack Developer"
];
const typingSpeed = 100;  // Speed of typing each letter (in milliseconds)
const pauseTime = 3000;   // Time each role is displayed (3 seconds)

let textIndex = 0;
let charIndex = 0;
let currentText = "";
const typingText = document.querySelector(".typing-text");
let hasStartedTyping = false; // Flag to check if typing has already started

function type() {
    if (charIndex < textArray[textIndex].length) {
        currentText += textArray[textIndex].charAt(charIndex);
        typingText.textContent = currentText;
        charIndex++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(erase, pauseTime);
    }
}

function erase() {
    if (charIndex > 0) {
        currentText = currentText.slice(0, --charIndex);
        typingText.textContent = currentText;
        setTimeout(erase, typingSpeed);
    } else {
        textIndex = (textIndex + 1) % textArray.length;  // Loop through textArray
        setTimeout(type, typingSpeed);
    }
}

// Intersection Observer to detect when the text is visible on scroll
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasStartedTyping) {
            hasStartedTyping = true;  // Ensure typing starts only once
            setTimeout(type, pauseTime);  // Start typing effect
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when at least 50% of the element is visible
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const typingTextElement = document.querySelector(".typing-text");
    observer.observe(typingTextElement);  // Start observing the typing-text element
});
