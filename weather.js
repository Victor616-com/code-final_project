// Function to add current weather data to HTML
function addCureentWeatherToHTML(currentWeather) {
    // Variables for weather data
    let currentIcon = currentWeather.weather[0].icon;
    let currentDescription = currentWeather.weather[0].description;
    let currentTemperature = Math.round(currentWeather.main.temp);
    let currentPrecipitation = currentWeather.rain?.['3h'] || 0;
    let currentWindSpeed = currentWeather.wind.speed;
    let currentWindDirection = currentWeather.wind.deg;
    let currentHumidity = currentWeather.main.humidity;
    
    // Constants for selecting items in the DOM
    const iconCard = document.querySelector('.icon-card');
    const tempCard = document.querySelector('.temperature-card p2');
    const precipCard = document.querySelector('.precipitation-card p2');
    const windSpeedCard = document.querySelector('.wind-card p2');
    const windArrow = document.querySelector('.wind-card img');
    const humidCard = document.querySelector('.humidity-card p2');
    
    // Adding the data to the DOM
    let weatherIcon = document.createElement('div');
    weatherIcon.innerHTML = `<img src="resources/images/${currentIcon}.png" alt="${currentDescription}">`;  // Updated the image URL
    iconCard.appendChild(weatherIcon);

    tempCard.innerHTML = `${currentTemperature}°C`;
    precipCard.innerHTML = `${currentPrecipitation}mm`;
    windSpeedCard.innerHTML = `${currentWindSpeed}km/h`;
    windArrow.style.transform = `rotate(${currentWindDirection}deg)`;
    humidCard.innerHTML = `${currentHumidity}%`;

    // Icon at the top of the site
    const topIcon = document.querySelector('.weather-icon-top');
    topIcon.innerHTML = `<img src="resources/images/${currentIcon}.png" alt="${currentDescription}">`
};


// Function to add future weather data to HTML
function addThreeDaysWeatherToHTML(weatherThreeDays) {
    
    let futureWeather = document.querySelector('.future-weather');
    
    weatherThreeDays.forEach(dayForecast => {
        let futureWeatherCard = document.createElement('div');
        let formattedDate = formatDateToDayAndDate(dayForecast.time);

        futureWeatherCard.innerHTML = `
            <p class="date">${formattedDate}</p>
            <img src="resources/images/${dayForecast.icon}.png" alt="${dayForecast.description}">
            <p class="temp">${Math.round(dayForecast.temperature)}°C</p>
            <p class="wind">${dayForecast.wind.speed}km/h</p>
            `;
        futureWeatherCard.classList.add('future-weather-card');
        futureWeather.appendChild(futureWeatherCard); 
    });
};

// Format the date to Fri 6 format
function formatDateToDayAndDate(date) {
    const options = { weekday: 'short', day: 'numeric' }; 
    return new Intl.DateTimeFormat('en-US', options).format(date);
};


// Function to initialize weather data
const initAppWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=56.1780766&lon=10.0995751&appid=6ebfd60a5b1102ddc142d22e6bef0b8b&units=metric")
    .then(response => response.json())
    .then(data => {
        let forecast = [];
        let temperature = [];
        let precipitation = [];
        let wind = [];
        let humidity = [];
        let icon = [];
        let date = [];
        let description = [];
        let currentWeather = data.list[0];

        // Loop through forecast data and process items at 13:00
        data.list.forEach(item => {
            let timeStamp = item.dt;
            let dateAndTime = new Date(timeStamp * 1000);
        
            // Check if the time is 13:00 (1 PM)
            if (dateAndTime.getHours() === 13) {
                temperature.push(item.main.temp);
                precipitation.push(item.rain?.['3h'] || 0);
                wind.push({
                    speed: item.wind.speed,
                    deg: item.wind.deg
                });
                humidity.push(item.main.humidity);
                icon.push(item.weather[0].icon);
                date.push(item.dt);
                description.push(item.weather[0].description);

                // Create a forecast object with the next 5 days 
                forecast.push({
                    time: dateAndTime,
                    temperature: item.main.temp,
                    precipitation: item.rain?.['3h'] || 0,
                    wind: {
                        speed: item.wind.speed,
                        deg: item.wind.deg
                    },
                    humidity: item.main.humidity,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                });
            }
        });

        // Only select 3 days
        let weatherThreeDays = [];
        for(let i = 0; i <= 2; i++) {
            weatherThreeDays.push(forecast[i]);
        }

        // Calling the functions to display the current weather on the page
        addCureentWeatherToHTML(currentWeather); 
        addThreeDaysWeatherToHTML(weatherThreeDays)
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

// Initialize the weather app
initAppWeather();
