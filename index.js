//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json

function fetchCity(cityID,callback){
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=939aef0ebf0cecd4d85905f7f983915d`)
    .then(response => response.json())
    .then(data => callback(data));
}

const TEMP = {
    KELVIN : 0,
    FAHRENHEIT : 1,
    CELSIUS : 2,
}

function writeWeatherInfo(data) {
    document.getElementById("degree").innerHTML = convert(data.main.temp,TEMP.KELVIN,TEMP.FAHRENHEIT)
    document.getElementById("weatherDescription").innerHTML = data.weather[0].main
}

function convert(degree,inType,outType,decimal = 2) {
    //Convert temp to Kelvin
    switch (inType){
        case TEMP.KELVIN:
            
        break
        case TEMP.FAHRENHEIT:
            degree = (degree-32) * 5/9 + 273.15
        break
        case TEMP.CELSIUS:
            degree = (degree+273.15)
        break
        default:
            throw "Tempature type is not valid"
    }

    switch (outType){
        case TEMP.KELVIN:
            
        case TEMP.FAHRENHEIT:
            degree = (degree - 273.15) * 9/5 + 32
            break
        case TEMP.CELSIUS:
            degree = (degree-273.15)
            break
        default:
            throw "Tempature type is not valid"
    }

    return Number((degree).toFixed(decimal));

}

let cityId = 5128581
fetchCity(cityId,data => {
    writeWeatherInfo(data)
})