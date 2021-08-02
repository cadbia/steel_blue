//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json

function fetchCity(cityID,callback){
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=939aef0ebf0cecd4d85905f7f983915d`)
    .then(response => response.json())
    .then(data => callback(data));
}

cityId = 5128581
fetchCity(cityId,data => {
    console.log(data)
})