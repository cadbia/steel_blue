class WeatherAPI{
    constructor(api_key){
        this.api_key = api_key
    }

    fetchDataByCityId(cityId,callback){
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchDataByCityName(city,callback){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchDataByCoordnate(coordnate,callback){
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordnate.latitude}&lon=${coordnate.longitude}&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }
}