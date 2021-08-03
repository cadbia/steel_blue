//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json

const weatherAPI = new WeatherAPI("939aef0ebf0cecd4d85905f7f983915d")

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
    "Thunderstorm": "FOG",
    "Drizzle": "RAIN",
    "Rain": "SLEET",
    "Snow": "SNOW",
    "Clear": "CLEAR-DAY",
    "Clouds": "PARTLY_CLOUDY_DAY",

    //These are the 7xx ones. They are for atmosphere weather, not sure if they can be grouped.
    "Mist": "icon",
    "Smoke": "icon",
    "Haze": "icon",
    "Dust": "icon",
    "Fog": "CLOUDY",
    "Sand": "icon",
    "Dust": "icon",
    "Ash": "icon",
    "Squall": "icon",
    "Tornado": "icon",

}

var skycons = new Skycons({ "color": "white" });

function writeWeatherInfo(data) {
    document.getElementById("degree").innerHTML = convertTempetureUnit(data.main.temp,TEMP.KELVIN,TEMP.FAHRENHEIT)
    document.getElementById("weatherDescription").innerHTML = data.weather[0].main
    var skyconElement = document.getElementsByClassName("icon")[0]
    var weatherIconName = WEATHER_TYPES[data.weather[0].main]
    skycons.set(skycon, weatherIconName)
    skycons.play()
}