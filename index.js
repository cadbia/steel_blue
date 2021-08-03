//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json

const weatherAPI = new WeatherAPI("939aef0ebf0cecd4d85905f7f983915d")
const city = document.querySelector(".location-city");
const temperatureSection = document.querySelector(".temperature");
const degreeType = document.querySelector(".temperature h1");
const degree = document.querySelector(".temperature h2");

window.addEventListener("load", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            weatherAPI.fetchDataByCoordinate(Coordinate.fromCoordinates(position.coords), data => {
                writeWeatherInfo(data)
            })
        });
    }
});

WEATHER_TYPES = {
    "Thunderstorm" : "icon",
    "Drizzle" : "icon",
    "Rain": "icon",
    "Snow": "icon",
    "Clear": "icon",
    "Clouds" : "icon",

    //These are the 7xx ones. They are for atmosphere weather, not sure if they can be grouped.
    "Mist" : "icon",
    "Smoke" : "icon",
    "Haze" : "icon",
    "Dust" : "icon",
    "Fog" : "icon",
    "Sand" : "icon",
    "Dust" : "icon",
    "Ash" : "icon",
    "Squall" : "icon",
    "Tornado" : "icon",

}

temperatureSection.addEventListener("click", ()=>{
    if(degreeType.textContent == "F"){
        degreeType.textContent = "C";
        degree.textContent =  ((degree.textContent-32) *(5/9)).toFixed(2);
    }
    else
    {
        degreeType.textContent = "F"
        degree.textContent =  ((degree.textContent*(9/5)) +32).toFixed(2);
    }
});

function writeWeatherInfo(data) {
    console.log(data)
    document.getElementById("degree").innerHTML = `${convertTempetureUnit(data.main.temp,TEMP.KELVIN,TEMP.FAHRENHEIT)}°`
    document.getElementById("weatherDescription").innerHTML = `Feels like ${convertTempetureUnit(data.main.feels_like,TEMP.KELVIN,TEMP.FAHRENHEIT)}°`
    document.getElementById("tempDescription").innerHTML = toTitleCase(data.weather[0].description)
    document.getElementById("locationCity").innerHTML = `${data.name}, ${data.sys.country}`
}