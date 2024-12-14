let listSpots = [];
let cardWrapper = document.getElementById("cards-wrapper");

// The function that creates each card
const addDataToHTML = (filteredSpots) => {
    
    cardWrapper.replaceChildren(); // Delete the previous cards from the las filtering

    if(filteredSpots.length > 0) {
        filteredSpots.forEach(card => {

            // Creating the html for the card
            let newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.dataset.id = card.id;
            newCard.innerHTML = `
                <div class="card-img" style="background-image: url(resources/images/${card.image});"></div>
                <h2 class="card-title">${card.title}</h2>
                <div class="card-description-wrapper">
                    <p class="card-description">${card.description}</p>
                </div>
                <p class="card-popularity">Popularity - ${card.popularity}</p>
                <div class="card-icons">
                    <img src="resources/images/Fishing-icon.svg" alt="fishing" class="fishing-icon">
                    <img src="resources/images/Ducks-icon.svg" alt="duks" class="ducks-icon">
                    <img src="resources/images/Tables-icon.svg" alt="tables" class="tables-icon">
                    <img src="resources/images/Boats-icon.svg" alt="boats" class="boats-icon">
                    <img src="resources/images/Football-icon.svg" alt="football" class="football-icon">
                    <img src="resources/images/Bike-icon.svg" alt="bike" class="bike-icon">
                </div>
                <button class="green-btn card-see_more" onclick="openLink()">See more</button>
            `;
            
            cardWrapper.appendChild(newCard) // Ads the card to the wrapper
            // Get the button after adding the card
            let seeMoreButton = newCard.querySelector('.card-see_more');

            // Add an event listener to the button
            seeMoreButton.addEventListener('click', function() {
                window.location.href = card.link;
            });
            // Define icons and their corresponding JSON properties
            const iconMapping = [
                { iconClass: '.fishing-icon', property: card.fishing },
                { iconClass: '.ducks-icon', property: card.ducks },
                { iconClass: '.tables-icon', property: card.tables },
                { iconClass: '.boats-icon', property: card.boats },
                { iconClass: '.football-icon', property: card.football },
                { iconClass: '.bike-icon', property: card.bikes },
            ];

            // Loop through the mapping and hide icons where the property is false
            iconMapping.forEach(({ iconClass, property }) => {
                const icon = newCard.querySelector(iconClass);
                if (!property) icon.style.display = 'none';
            });
        })
      
      // Creates the text for No Results  
    } else {
        let noResult = document.createElement('h3');
        noResult.innerHTML = "No results for these filters";
        noResult.classList.add('no-results');
        cardWrapper.appendChild(noResult);

    }
}


// Function that removes the show class on reload
window.onload = function () {
    const filters = document.getElementById('filters-wrapper');
    filters.classList.remove('show');
};

// FUnction for closing the filter menu and clearing the form when Clear Filters button is pressed 
function clearFilters() {
    clearForm(); // Function in filtering.js
    const filters = document.getElementById('filters-wrapper');
    filters.classList.remove('show'); // Toggle the 'show' class
}

// Function for openning and cloing the filter menu
function toggleFilters() {
    const filters = document.getElementById('filters-wrapper');
    filters.classList.toggle('show'); // Toggle the 'show' class
}






// Fetching the JSON file
const initApp = () => {
    fetch('card-info.json')
    .then(response => response.json())
    .then(data => {
        listSpots = data;
        submitForm(); // Sends the list to filtering.js 
    })
}
initApp()


const navBar = document.querySelector('.navbar');
let lastScrollTop = 0;
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

navBar.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
