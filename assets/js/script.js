document.addEventListener("DOMContentLoaded", () => {
    // Triggers the CSS transition immediately when the elements load
    document.body.classList.add("fade-in-active");
});

// Replace the script inside index.html with this optimization:
window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper"); // Using your original ID!
    
    // Gives the progress bar time to animate, ensuring a fully rendered background
    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1600); 
});