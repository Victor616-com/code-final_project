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
    const tempCard = document.querySelector('.temperature-card .title-weather-card');
    const precipCard = document.querySelector('.precipitation-card .content-weather-card');
    const windSpeedCard = document.querySelector('.wind-card .content-weather-card');
    const windArrow = document.querySelector('.wind-card img');
    const humidCard = document.querySelector('.humidity-card .content-weather-card');
    
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
}


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
    })

    

}


function formatDateToDayAndDate(date) {
    const options = { weekday: 'short', day: 'numeric' }; // Format: short weekday + day
    return new Intl.DateTimeFormat('en-US', options).format(date); // Example: "Fri 6"
}


// Function to initialize weather data
const initAppWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=56.1780766&lon=10.0995751&appid=6ebfd60a5b1102ddc142d22e6bef0b8b&units=metric")
    .then(response => response.json())
    .then(data => {
        let forecast = [];
        let dailyForecast = {};
        // Loop through forecast data and process items at 13:00
        data.list.forEach(item => {
            let timeStamp = item.dt;
            let dateAndTime = new Date(timeStamp * 1000);
            let dateKey = dateAndTime.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format
            
            let targetHour = 13;
            let hourDifference = Math.abs(dateAndTime.getHours() - targetHour);

            
            if (!dailyForecast[dateKey] || hourDifference < dailyForecast[dateKey].hourDifference) {
               
                dailyForecast[dateKey] = {
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
                };
            }
        });
        forecast = Object.values(dailyForecast);
        forecast.sort((a, b) => a.time - b.time);
    
        // Debugging: Verify forecast array
        console.log("Forecast Array:", forecast);
    
        let weatherThreeDays = [];
        for (let i = 0; i <= 2; i++) {
            if (forecast[i]) {
                weatherThreeDays.push(forecast[i]);
            } else {
                console.error(`Forecast data missing for index ${i}`);
            }
        }
    
        // Call the function to display the current weather on the page
        addCureentWeatherToHTML(data.list[0]); 
        addThreeDaysWeatherToHTML(weatherThreeDays);
    })
    
    .catch(error => console.error('Error fetching weather data:', error));
}

// Initialize the weather app
initAppWeather();
