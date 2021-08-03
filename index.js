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

    let dropdown = document.getElementById("city-dropdown");

    let defaultOption = document.createElement('option');
    defaultOption.textContent = 'Choose City';

    dropdown.appendChild(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'city.list.json';

    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            let option;
            for (let i = 0; i < data.length; i++) {
                option = document.createElement('option');
                option.textContent = data[i].name;
                option.value = data[i].id;
                dropdown.appendChild(option);
            }
        } else {
            // Reached the server, but it returned an error
        }
    }

    request.onerror = function () {
        console.error('An error occurred fetching the JSON from ' + url);
    };

    request.send();
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