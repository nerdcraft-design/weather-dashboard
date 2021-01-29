var userSearchEl = document.querySelector(".city-search");
var searchFormEl = document.querySelector(".search-bar");
var currentCityEl = document.querySelector(".city-info");
var currentWeatherEl = document.querySelector(".weather-info");

var getCityWeather = function(city) {
    // weather api
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=fc127e8ad0327bd54aa8b403959d0ff1";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayCurrentWeather(data, city);
        })
    })
};

var displayCurrentWeather = function(weather, city) {
    // erasing city name?
    currentCityEl.innerHTML = "";
    currentWeatherEl.innerHTML = "";

    // display city name
    var cityNameEl = document.createElement("h2");
    cityNameEl.classList = "city";
    cityNameEl.textContent = city;

    currentCityEl.appendChild(cityNameEl);

    // get current date
    var currentDateTime = weather.list[0].dt_txt;

    // split date and time
    var splitDateTime = currentDateTime.split(" ");
    
    // date format
    var dateFormat = ("MM/DD/YYYY");

    // reformatted date
    var currentDate = moment(splitDateTime[0]).format(dateFormat);

    // display current date
    var currentDateEl = document.createElement("h2");
    currentDateEl.classList = "date";
    currentDateEl.textContent = currentDate;

    currentCityEl.appendChild(currentDateEl);

    // display temperature
    var tempEl = document.createElement("div");
    tempEl.classList = "current-weather";
    tempEl.innerHTML = "<h2 class='temp'>" + Math.ceil(weather.list[0].main.temp) + "<sup class='current-degrees'>o</sup></h2>";

    currentWeatherEl.appendChild(tempEl);

    // display weather conditions
    var weatherConditionsEl = document.createElement("div");
    weatherConditionsEl.classList = "current-secondary-weather";
    weatherConditionsEl.innerHTML =
    "<h3>Humidity: <span class='humidity-perc'>" + weather.list[0].main.humidity + "%</span></h3><br />"
    + "<h3>Wind Speed: <span class='wind-speed'>" + weather.list[0].wind.speed + "%</span></h3><br />" ;
    + "<h3>Wind Speed: <span class='wind-speed'>" + weather.list[0].wind.speed + "%</span></h3><br />" ;

    currentWeatherEl.appendChild(weatherConditionsEl);

    // get uv index data
    var getDisplayUV = function(weather) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + weather.city.coord.lat + "&lon=" + weather.city.coord.lon + "&appid=fc127e8ad0327bd54aa8b403959d0ff1";

        fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
                // display uv index
                var uvIndex = data;    
                var uvIndexEl = document.createElement("h3");
                
                if (uvIndex.value < 3) {
                    uvIndexEl.innerHTML = "UV Index: <span class='uv-warning uv-favorable'>" + uvIndex.value + "</span>"
                }

                else if (uvIndex.value > 7) {
                    uvIndexEl.innerHTML = "UV Index: <span class='uv-warning uv-severe'>" + uvIndex.value + "</span>"
                }

                else {
                    uvIndexEl.innerHTML = "UV Index: <span class='uv-warning uv-moderate'>" + uvIndex.value + "</span>"
                }

                var weatherConditionsEl = document.querySelector(".current-secondary-weather");
                weatherConditionsEl.appendChild(uvIndexEl);
            })
        })
    }

    getDisplayUV(weather);
};

var searchSubmitHandler = function(event) {
    // prevents page from reloading
    event.preventDefault();

    // stores the name of city
    var cityName = userSearchEl.value.trim();
    
    // passes city name through getCityWeather function if there's an input value
    if (cityName) {
        getCityWeather(cityName);
        userSearchEl.value = "";
    }
};

searchFormEl.addEventListener("submit", searchSubmitHandler);