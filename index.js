//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json

var weatherAPI = new WeatherAPI("939aef0ebf0cecd4d85905f7f983915d")

window.addEventListener("load", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            weatherAPI.fetchDataByCoordinate(Coordinate.fromCoordinates(position.coords), data => {
                writeWeatherInfo(data)
            })
        });
    }
});

function writeWeatherInfo(data) {
    console.log(data)
    document.getElementById("degree").innerHTML = `${convertTempetureUnit(data.main.temp,TEMP.KELVIN,TEMP.FAHRENHEIT)}°`
    document.getElementById("weatherDescription").innerHTML = `Feels like ${convertTempetureUnit(data.main.feels_like,TEMP.KELVIN,TEMP.FAHRENHEIT)}°`
    document.getElementById("tempDescription").innerHTML = data.weather[0].main
    document.getElementById("locationCity").innerHTML = `${data.name}, ${data.sys.country}`


}
