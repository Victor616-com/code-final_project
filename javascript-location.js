const slideshow = document.querySelector('.slideshow');
const navBar = document.querySelector('.navbar');
const currentFile = window.location.pathname.split("/").pop(); // Gets the current HTML name
let lastScrollTop = 0;

// Function that changes the class for the img
function changeSlideshow() {
    slideshow.classList.toggle('second');
}


// Function for hiding the navbar on scroll down
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Check if we are scrolling down
    if (currentScroll > lastScrollTop) {
        navBar.classList.add("scroll"); // Add class when scrolling down
    } else {
        navBar.classList.remove("scroll"); // Remove class when scrolling up
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});

// Function for having a small offset when scroling with the navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        
        const targetPosition =  targetElement.offsetTop - 80;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
    });
});


// Fetching the JSON file
const initApp = () => {
    fetch('card-info.json')
    .then(response => response.json())
    .then(data => {
        let locationData = data.find(location => location.link === currentFile); // Finds the location from the HTML file title

        if (!locationData) {
            alert('Oh no! Something went wrong: No matching location data found :( Try reloading the page.');
        } else {
            mapLocation(locationData); // Sends the location data to the map-JS file
        }
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
        alert('Oh no! There was an error fetching the location data :( Try reloading the page.');
    });
}
initApp()
