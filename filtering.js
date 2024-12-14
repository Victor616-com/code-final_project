function submitForm() {
    // Create an object to store the form data
    let formData = {
        popularity: {
            low: false,
            medium: false,
            high: false
        },
        accessibility: {
            wheelchair: false,
            car: false,
            bikes: false,
            onFoot: false
        },
        activities: {
            fishing: false,
            ducks: false,
            tables: false,
            boats: false,
            football: false,
            hiking: false,
            volleyball: false
        },
        amenities: {
            toilets: false,
            firePit: false
        }
    };

    const form = document.getElementById('filterForm');

    // Collect selected values for popularity
    formData.popularity.low = form.querySelector('#low').checked;
    formData.popularity.medium = form.querySelector('#medium').checked;
    formData.popularity.high = form.querySelector('#high').checked;

    // Collect selected values for accessibility
    formData.accessibility.wheelchair = form.querySelector('#wheelchair-friendly').checked;
    formData.accessibility.car = form.querySelector('#by-car').checked;
    formData.accessibility.bikes = form.querySelector('#by-bike').checked;
    formData.accessibility.onFoot = form.querySelector('#on-foot').checked;

    // Collect selected values for activities
    formData.activities.fishing = form.querySelector('#fishing').checked;
    formData.activities.tables = form.querySelector('#tables').checked;
    formData.activities.boats = form.querySelector('#boat-watching').checked;
    formData.activities.football = form.querySelector('#football').checked;
    formData.activities.hiking = form.querySelector('#hiking').checked;
    formData.activities.volleyball = form.querySelector('#volleyball').checked;
    formData.activities.bikes = form.querySelector('#biking').checked;

    // Collect selected values for amenities
    formData.amenities.toilets = form.querySelector('#toilets').checked;
    formData.amenities.firePit = form.querySelector('#fire-pit').checked;

    // Function to filter locations based on form data
    function filterLocations(locations, formData) {
        return locations.filter(location => {
            // Check popularity
            if (Object.values(formData.popularity).includes(true)) {
                if (
                    !(formData.popularity.low && location.popularity === "low") &&
                    !(formData.popularity.medium && location.popularity === "medium") &&
                    !(formData.popularity.high && location.popularity === "high")
                ) {
                    return false; 
                }
            }
    
            // Check accessibility
            if (formData.accessibility.wheelchair && !location.wheelchair) return false;
            if (formData.accessibility.bikes && !location.bikes) return false;
            if (formData.accessibility.car && !location.car) return false;
            if (formData.accessibility.onFoot) {
                 return false;
            }
    
            // Check activities
            if (Object.values(formData.activities).includes(true)) {
                if (
                    !(formData.activities.fishing && location.fishing) &&
                    !(formData.activities.tables && location.tables) &&
                    !(formData.activities.boats && location.boats) &&
                    !(formData.activities.football && location.football) &&
                    !(formData.activities.hiking && location.hiking) &&
                    !(formData.activities.volleyball && location.volleyball) &&
                    !(formData.activities.bikes && location.bikes)
                ) {
                    return false;
                }
            }
    
            // Check amenities
            if (Object.values(formData.amenities).includes(true)) {
                if (
                    (formData.amenities.toilets && !location.toilets) ||
                    (formData.amenities.firePit && !location.firePit)
                ) {
                    return false; 
                }
            }
    
            // If all filters pass, include the location
            return true;
        });
    };

    // This is the object thet will pass to the list of cards and the map
    let filteredSpots = filterLocations(listSpots, formData);

    // Add the filtered spots to HTML and initialize the map
    addDataToHTML(filteredSpots);
    initMap(filteredSpots);
    toggleFilters();
}


// Function for reseting the filters
function clearForm() {
    
    // Get the form element
    const form = document.getElementById('filterForm');

    // Reset all input elements in the form
    const inputs = form.querySelectorAll('input[type="checkbox"]');
    inputs.forEach(input => {
        input.checked = false; // Uncheck all checkboxes
    });
    
    submitForm(); //Submit the form again with all boxes unchecked
}