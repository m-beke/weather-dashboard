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
    $(".current").append($(`<p>Temperature: ${weather.main.temp}</p>`));
    $(".current").append($(`<p>Wind: ${weather.wind.speed}</p>`));
    $(".current").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
    console.log(weather);
    console.log(weather.name);
    console.log(weather.main.temp);
    console.log(weather.wind.speed);
}

var getFuture = async(lat,lon)=>{
    console.log(`Forecast ${
        lat,
        lon
    }`);
    var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e88ce663b1df873686a4254bb12fef6f`);
    //get the body out of the response
    var weather = await response.json();  
    //log the data
    $(".forecast").append($(`<h1>${list.dt}</h1>`));
    var myImage = $(`<img>`);
    myImage.attr('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    $(".forecast").append(myImage);
    $(".forecast").append($(`<p>Temperature: ${weather.main.temp}</p>`));
    $(".forecast").append($(`<p>Wind: ${weather.wind.speed}</p>`));
    $(".forecast").append($(`<p>Humidity: ${weather.main.humidity}</p>`));
    console.log(weather);
    console.log(weather.name);
    console.log(weather.main.temp);
    console.log(weather.wind.speed);
}

var getCoordinates = async(city)=>{
console.log(city);
    var response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=e88ce663b1df873686a4254bb12fef6f`);
    var data = await response.json();
    // get our values
    var lat = (data[0].lat);
    var lon = (data[0].lon);

    getCurrent(lat, lon);
    getFuture(lat, lon);
}

//listen for a click
$(".weather_btn").on("click",()=>{
    // get the value from the form
    $(".current").empty();
    //get the coordinates
    getCoordinates($(".city").val());
    //pass the coordinates to the current weather
    
    //get the weather on the page
});