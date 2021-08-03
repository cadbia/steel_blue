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
    document.getElementById("degree").innerHTML = convertTempetureUnit(data.main.temp,TEMP.KELVIN,TEMP.FAHRENHEIT)
    document.getElementById("weatherDescription").innerHTML = data.weather[0].main
}