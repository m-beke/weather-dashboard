var getCurrent = async(lat,lon)=>{
    console.log(`In current ${
        lat,
        lon
    }`);
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e88ce663b1df873686a4254bb12fef6f`);
    //get the body out of the response
    var weather = await response.json();  
    //log the data
    console.log(weather);
}

var getCoordinates = async(city)=>{
console.log(city);
    var response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=e88ce663b1df873686a4254bb12fef6f`);
    var data = await response.json();
    // get our values
    var lat = (data[0].lat);
    var lon = (data[0].lon);

    getCurrent(lat, lon);
}

//listen for a click
$(".weather_btn").on("click",()=>{
    // get the value from the form
    $(".current").append($(".city").val());
    //get the coordinates
    getCoordinates($(".city").val());
    //pass the coordinates to the current weather
    
    //get the weather on the page
});