//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json
const feelsLike = document.querySelector("#weatherDescription");
const weatherAPI = new WeatherAPI()
const city = document.querySelector(".location-city");
const temperatureSection = document.querySelector(".temperature");
const degreeType = document.querySelector(".temperature h1");
const h2degree = document.querySelector(".temperature h2");
document.getElementById("citySelector").addEventListener("change", getWeatherForCity, false);
function getWeatherForCity() {
    var cityCode = document.getElementById("citySelector").value;
    weatherAPI.fetchDataByCityId(cityCode, data => {
        writeWeatherInfo(data);
        window.localData = data;
    })
}
window.addEventListener("load", () => {
    document.all["layer1"].style.visibility = "visible";
    document.all["layer2"].style.visibility = "hidden";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            window.localCoords = Coordinate.fromCoordinates(position.coords)
            weatherAPI.fetchDataByCoordinate(window.localCoords, data => {
                writeWeatherInfo(data);
                window.localData = data;
            })
        });
    }
});

function getLocalData() {
    weatherAPI.fetchDataByCoordinate(window.localCoords, data => {
        writeWeatherInfo(data)
    })
}

function searchBar(event,searchBar){
    if (event.keyCode == 13){
        let text = searchBar.value
        weatherAPI.fetchDataByCityName(text, data => {
            if (data.cod == 404){
                throw "City not found"
            }
            writeWeatherInfo(data)
        })
    }
}

WEATHER_TYPES = {
    "Thunderstorm": "FOG",
    "Drizzle": "RAIN",
    "Rain": "SLEET",
    "Snow": "SNOW",
    "Clear": "CLEAR-DAY",
    "Clouds": "PARTLY_CLOUDY_DAY",

    //These are the 7xx ones. They are for atmosphere weather, not sure if they can be grouped.
    "Mist": "PARTLY_CLOUDY_DAY",
    "Smoke": "CLOUDY",
    "Haze": "PARTLY_CLOUDY_DAY",
    "Dust": "PARTLY_CLOUDY_DAY",
    "Fog": "CLOUDY",
    "Sand": "PARTLY_CLOUDY_DAY",
    "Dust": "CLPARTLY_CLOUDY_DAYOUDY",
    "Ash": "PARTLY_CLOUDY_DAY",
    "Squall": "PARTLY_CLOUDY_DAY",
    "Tornado": "PARTLY_CLOUDY_DAY",

}
function numberExtract(str) {

    var matches = str.match(/[\d\.]+/);
    if (matches) {
        return matches[0];
    }
}

temperatureSection.addEventListener("click", () => {
    if (degreeType.textContent == "°F") {
        degreeType.textContent = "°C";
        h2degree.textContent = ((h2degree.textContent - 32) * (5 / 9)).toFixed(2);
        let feelNum = numberExtract(feelsLike.textContent);

        feelsLike.textContent = "Feels like " + ((feelNum - 32) * (5 / 9)).toFixed(2);
    }
    else {
        degreeType.textContent = "°F"
        h2degree.textContent = ((h2degree.textContent * (9 / 5)) + 32).toFixed(2);
        let feelNum = numberExtract(feelsLike.textContent);
        feelsLike.textContent = "Feels like " + ((feelNum * (9 / 5)) + 32).toFixed(2);
    }
});

var skycons = new Skycons({ "color": "white" });
function writeWeatherInfo(data) {
    node = document.getElementById("layer1").style.visibility = 'hidden';
    node = document.getElementById("layer2").style.visibility = 'visible';
    document.getElementById("degree").innerHTML = `${convertTempetureUnit(data.main.temp, TEMP.KELVIN, TEMP.FAHRENHEIT)}`
    document.getElementById("weatherDescription").innerHTML = `Feels like ${convertTempetureUnit(data.main.feels_like, TEMP.KELVIN, TEMP.FAHRENHEIT)}`
    document.getElementById("tempDescription").innerHTML = toTitleCase(data.weather[0].description)
    document.getElementById("locationCity").innerHTML = `${data.name}, ${data.sys.country}`
    var skyconElement = document.getElementsByClassName("icon")[0]
    var weatherIconName = WEATHER_TYPES[data.weather[0].main]
    skycons.set(skycon, weatherIconName)
    skycons.play()
}
