//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json
const feelsLike = document.querySelector("#weatherDescription");
const weatherAPI = new WeatherAPI()
const city = document.querySelector(".location-city");
const temperatureSection = document.querySelector(".temperature");
const degreeType = document.querySelector(".temperature h1");
const h2degree = document.querySelector(".temperature h2");
const clock = document.getElementById("clock")

var tz = 0
var localTz = 0
window.addEventListener("load", () => {
    document.all["layer1"].style.visibility = "visible";
    document.all["layer2"].style.visibility = "hidden";

    navigator.geolocation.getCurrentPosition(position => {
        window.localCoords = Coordinate.fromCoordinates(position.coords)
        getLocalData()
    }, (err) => {
        weatherAPI.fetchDataByCityName("New York City", data => {
            localTz = data.timezone
            writeWeatherInfo(data)
            document.getElementById("noGeoAccess").animate([
                { opacity: 100 },
                { opacity: 0 }
            ]
                , {
                    duration: 7000,
                    iterations: 1,
                    easing: 'ease-in'
                }
            )
        })



    });
});

function getLocalData() {
    weatherAPI.fetchDataByCoordinate(window.localCoords, data => {
        localTz = data.timezone
        writeWeatherInfo(data)
    })
}

function searchBar(event,searchBar){
    if (event.keyCode == 13){
        let text = searchBar.value
        weatherAPI.fetchDataByCityName(text, data => {
            if (data.cod == 404){
                document.getElementById("invalidCity").animate([
                    { opacity: 100 },
                    { opacity: 0 }
                ]
                , {duration: 1700,
                iterations: 1,
                easing: 'ease-in'} 
                )

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

var currentDegreeType = "°F"
temperatureSection.addEventListener("click", () => {
    if (degreeType.textContent == "°F") {
        degreeType.textContent = "°C";
        currentDegreeType = "°C";
        h2degree.textContent = ((h2degree.textContent - 32) * (5 / 9)).toFixed(2);
        let feelNum = numberExtract(feelsLike.textContent);

        feelsLike.textContent = "Feels like " + ((feelNum - 32) * (5 / 9)).toFixed(2);
    }
    else {
        degreeType.textContent = "°F"
        currentDegreeType = "°F";
        h2degree.textContent = ((h2degree.textContent * (9 / 5)) + 32).toFixed(2);
        let feelNum = numberExtract(feelsLike.textContent);
        feelsLike.textContent = "Feels like " + ((feelNum * (9 / 5)) + 32).toFixed(2);
    }
});

var skycons = new Skycons({ "color": "white" });
function writeWeatherInfo(data) {
    tz = data.timezone
    setClock()

    node = document.getElementById("layer1").style.visibility = 'hidden';
    node = document.getElementById("layer2").style.visibility = 'visible';
    var degreeTypeToConvert
    if (currentDegreeType[1] == "F") {
        degreeTypeToConvert = TEMP.FAHRENHEIT;
    }
    else if (currentDegreeType[1] == "C") {
        degreeTypeToConvert = TEMP.CELSIUS;
    }
    else {
        degreeTypeToConvert = TEMP.KELVIN;
    }

    document.getElementById("degree").innerHTML = `${convertTempetureUnit(data.main.temp, TEMP.KELVIN, degreeTypeToConvert)}`
    document.getElementById("weatherDescription").innerHTML = `Feels like ${convertTempetureUnit(data.main.feels_like, TEMP.KELVIN, degreeTypeToConvert)}`
    document.getElementById("tempDescription").innerHTML = toTitleCase(data.weather[0].description)
    document.getElementById("humidity").innerHTML = `<b>Humidity:</b> ${data.main.humidity}%`
    document.getElementById("windSpeed").innerHTML = `<b>Wind speed:</b> ${data.wind.speed} meters/sec`
    document.getElementById("locationCity").innerHTML = `${data.name},${data.sys.state !== null? " "+data.sys.state+",": ""} ${data.sys.country}`

    sunriseTime = new Date(data.sys.sunrise*1000 + tz * 1000).toLocaleTimeString('en-US',{timeZone:'UTC'});
    sunsetTime = new Date(data.sys.sunset*1000 + tz * 1000).toLocaleTimeString('en-US',{timeZone:'UTC'});
    console.log(sunriseTime)
    console.log(sunsetTime)

    var skyconElement = document.getElementsByClassName("icon")[0]
    var weatherIconName = WEATHER_TYPES[data.weather[0].main]
    skycons.set(skycon, weatherIconName)
    skycons.play()
}

//Update the clock evert second
setInterval(() => {
    setClock()
}, 1000);
function setClock() {
    var currentTime = new Date().getTime();
    var newTime = new Date(tz * 1000 + currentTime);
    clock.innerHTML = `${newTime.toLocaleTimeString('en-US',{timeZone:'UTC'})}`;
}