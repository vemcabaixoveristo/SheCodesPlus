
// dates
let date = new Date();

let day = date.getDay();
let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

day = daysWeek[day]

let hour = date.getHours();
let minuts = date.getMinutes();

if (minuts < 10 ){
    minuts = "0" + minuts;
}

let dateDisplay = document.querySelector(".day-hour");
dateDisplay.innerHTML = `${day}, ${hour}h${minuts}`;


function getForecast(city) {

  let apiKey = "e2317030oda851f3c404ba4a7326tedf";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`

  axios.get(apiURL).then(showForecast);
}



function showWeather(response) {
  
    let city = response.data.city;
    let temperature = Math.round(response.data.temperature.current);
    
    let iconTemp = response.data.condition.icon_url;
    let weather = response.data.condition.description;
    let wind = response.data.wind.speed;
    let humidity = response.data.temperature.humidity;

    let cityName = document.querySelector(".city");
    let temp = document.querySelector("#temp");
    let weatherDescription = document.querySelector("#weather-description");
    let windDescription = document.querySelector("#wind");
    let humidityDescription = document.querySelector("#humidity");
    let iconTemperature = document.querySelector("#iconTemp");
    
    cityName.innerText = city;
    temp.innerText = temperature
    weatherDescription.innerHTML = weather;
    windDescription.innerHTML = `Wind : ${wind}%`;
    humidityDescription.innerHTML = `Humidity : ${humidity}%`;
    iconTemperature.innerHTML = ` <span> <img class="icon-weather icon-temperature" src="${iconTemp}"/> </span>`;

    console.log(iconTemperature)
  
  getForecast(response.data.city)
  console.log("Resp", response)
}


function formatDay (timestamp) {
  let date = new Date( timestamp * 1000)
  let day = date.getDay();
  let daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = daysWeek[day]
  
  return day
}

function showForecast(response) {

  console.log("forecast ", response)
  let forecast = response.data.daily;

  let forcastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 4 ) {
      forecastHTML = forecastHTML + `
        
                <div class="col-3">     
                  <div class="card weather-card">
                    <p class="text-weather">${formatDay(forecastDay.time)}</p> 
                     <img class="icon-weather" src="${forecastDay.condition.icon_url}"/>
                    <span class="text-weather">${Math.round(forecastDay.temperature.maximum)}º  ${Math.round(forecastDay.temperature.minimum)}º</span>
                  </div>
                </div> `
    }    
  })

  forcastElement.innerHTML = forecastHTML;
}


function search(city) {
    let apiKey = "e2317030oda851f3c404ba4a7326tedf";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
 
    axios.get(apiURL).then(showWeather);
}



function handlerSubmit(event) {

    event.preventDefault();

    let cityInput = document.querySelector(".search-input");
    let city = document.querySelector(".city");

    city.innerHTML = cityInput.value;
    city = city.innerHTML

    search(city)
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handlerSubmit);


//inicial city
search("Porto");




//current location
function showPosition(position) {

  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "e2317030oda851f3c404ba4a7326tedf";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);
  // console.log("geoposition" , position)

}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition)
}

let buttonLocation = document.querySelector("#location");
buttonLocation.addEventListener("click", currentLocation);