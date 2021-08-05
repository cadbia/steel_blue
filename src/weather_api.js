class WeatherAPI{
    constructor(){
        
    }

    fetchDataByCityId(cityId,callback){
        fetch(`https://steelblueweatherapp.duckdns.org:4682/api/weather?id=${cityId}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchDataByCityName(city,callback){
        fetch(`https://steelblueweatherapp.duckdns.org:4682/api/weather?q=${city}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchDataByCoordinate(coordinate,callback){
        fetch(`https://steelblueweatherapp.duckdns.org:4682/api/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchWeeklyForcastByCityName(city,callback){
        fetch(`https://steelblueweatherapp.duckdns.org:4682/api/forecast/daily?q=${city}&cnt=7`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchWeeklyForcastByCoordinate(coordinate,callback){
        fetch(`https://steelblueweatherapp.duckdns.org:4682/api/forecast/daily?lat=${coordinate.latitude}&lon=${coordinate.longitude}&cnt=7}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

}