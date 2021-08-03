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

    fetchDataByCoordinate(coordinate,callback){
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchWeeklyForcastByCityName(city,callback){
        fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

    fetchWeeklyForcastByCoordinate(coordinate,callback){
        fetch(`api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinate.latitude}&lon=${coordinate.longitude}&cnt=7&appid=${this.api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
    }

}