//Query by City ID instead of City name to avoid funky stuff with URL encoding.
//City ID can be found in city.list.json
cityId = 5128581

fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=939aef0ebf0cecd4d85905f7f983915d`)
  .then(response => response.json())
  .then(data => console.log(data));
