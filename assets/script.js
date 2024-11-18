var getCurrent = async(lat,lon)=>{
    console.log(`In current ${
        lat,
        lon
    }`);
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e88ce663b1df873686a4254bb12fef6f`);
    //get the body out of the response
    var weather = await response.json();  
    //log the data
    $(".current").append($(`<h1>${weather.name}</h1>`));
    var myImage = $(`<img>`);
    myImage.attr('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    $(".current").append(myImage);
    $(".current").append($(`<h1>${weather.main.temp}°F</h1>`));
    $(".current").append($(`<p>Wind: ${weather.wind.speed}</p>`));
    $(".current").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
    console.log(weather);
    console.log(weather.name);
    console.log(weather.main.temp);
    console.log(weather.wind.speed);
}

// Function to get weekly forecast based on latitude and longitude
var getWeeklyForecast = async(lat, lon) => {
    console.log(`In weekly forecast for ${lat}, ${lon}`);
    // Fetch 5-day weather forecast (data is provided in 3-hour intervals)
    var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e88ce663b1df873686a4254bb12fef6f`);
    var weatherData = await response.json();
    // Get today's date to filter it out from the forecast
    let today = new Date().toLocaleDateString();
    // We need to process the forecast data for daily forecast (e.g., get a daily forecast at noon)
    $(".forecast").empty();  // Clear previous forecast display
    
    let forecastDays = {};  // To group forecast data by date

    // Loop through the forecast data and group by date (we'll assume noon as the forecast point)
    weatherData.list.forEach((forecast) => {
        // Extract the date (we're using only the day of the forecast)
        let date = new Date(forecast.dt * 1000).toLocaleDateString();  // Convert timestamp to date string
        // Skip the current date (today)
        if (date === today) {
            return;  // Skip this forecast entry
        }
        // Initialize if it's the first forecast for this date
        if (!forecastDays[date]) {
            forecastDays[date] = [];
        }
        
        // Push forecast data (temperature, wind speed, description, etc.)
        forecastDays[date].push({
            temp: forecast.main.temp,
            wind: forecast.wind.speed,
            description: forecast.weather[0].description,
            icon: forecast.weather[0].icon
        });
    });

    // Iterate over the grouped forecast days and display them
    Object.keys(forecastDays).forEach((date) => {
        const dayForecasts = forecastDays[date];
        
        let dayContainer = $("<div>").addClass("day-forecast");
        dayContainer.append($(`<h2>${date}</h2>`));

        // Display forecast for the day (average or first entry for simplicity)
        let avgTemp = dayForecasts[0].temp;  // Use the first temperature for now
        let avgWind = dayForecasts[0].wind;
        let description = dayForecasts[0].description;
        let iconUrl = `https://openweathermap.org/img/wn/${dayForecasts[0].icon}@2x.png`;

        dayContainer.append($(`<img src="${iconUrl}" alt="${description}">`));
        dayContainer.append($(`<h2>${avgTemp}°F</h2>`));
        dayContainer.append($(`<h3>${description}</h3>`));
        dayContainer.append($(`<p>Wind: ${avgWind} mph</p>`));
        
        
        $(".forecast").append(dayContainer);
    });
};


var getCoordinates = async(city)=>{
console.log(city);
    var response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=e88ce663b1df873686a4254bb12fef6f`);
    var data = await response.json();
    // get our values
    var lat = (data[0].lat);
    var lon = (data[0].lon);

    getCurrent(lat, lon); // Fetch and display the current forecast
    getWeeklyForecast(lat, lon);  // Fetch and display the weekly forecast
}

//listen for a click
$(".weather_btn").on("click",()=>{
    // get the value from the form
    $(".current").empty();
    //get the coordinates
    getCoordinates($(".city").val());
});