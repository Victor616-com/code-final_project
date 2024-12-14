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
                <button class="green-btn card-see_more">See more</button>
            `;
            
            cardWrapper.appendChild(newCard) // Ads the card to the wrapper

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

// Fetching the JSON file
const initApp = () => {
    fetch('card-info.json')
    .then(response => response.json())
    .then(data => {
        listSpots = data;
        submitForm(); // Seds the list to filtering.js 
    })
}
initApp()

