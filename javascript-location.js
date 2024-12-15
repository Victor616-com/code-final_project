const slideshow = document.querySelector('.slideshow');
const navBar = document.querySelector('.navbar');
const currentFile = window.location.pathname.split("/").pop();
let lastScrollTop = 0;


function changeSlideshow() {
    slideshow.classList.toggle('second');
}

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
        let locationData = data.find(location => location.link === currentFile);

        if (!locationData) {
            alert('Something went wrong: No matching location data found');
        } else {
            mapLocation(locationData);
        }
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
        alert('There was an error fetching the location data');
    });
}
initApp()
