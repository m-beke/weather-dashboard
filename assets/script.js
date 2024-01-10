var getCoordinates = async(city)=>{
console.log(city);
    var response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=e88ce663b1df873686a4254bb12fef6f`);
    var data = await response.json();
        console.log(data[0].lat);
        console.log(data[0].lon);
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