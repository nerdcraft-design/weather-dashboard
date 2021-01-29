var userSearchEl = document.querySelector(".city-search");
var searchFormEl = document.querySelector(".search-bar");

var getCityWeather = function(city) {
    // weather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fc127e8ad0327bd54aa8b403959d0ff1";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
};

// var displayWeather = function(weather, city) {

// };

var searchSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = userSearchEl.value.trim();
    console.log(cityName);

    if (cityName) {
        getCityWeather(cityName);
        userSearchEl.value = "";
    }
};

searchFormEl.addEventListener("submit", searchSubmitHandler);