
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



// api 
let apiKey = "a867e25f2d83db579421a57fd8e937ec";
let city = "Lisboa";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


function search(event) {

    event.preventDefault();

    let cityInput = document.querySelector(".search-input");
    let city = document.querySelector(".city");

    city.innerHTML = cityInput.value;
    city = city.innerHTML

    let apiKey = "a867e25f2d83db579421a57fd8e937ec";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiURL).then(showWeather);
}


function getForecast(coordinates) {
  console.log(coordinates);

  let lat = coordinates.lat
  let long = coordinates.lon

  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  console.log(apiURL)
  axios.get(apiURL).then(showForecast);
}

function showWeather(response) {
  
    let city = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let weather = response.data.weather[0].description;
    let wind = response.data.wind.speed;
    let humidity = response.data.main.humidity;

    let cityName = document.querySelector(".city");
    let temp = document.querySelector("#temp");
    let weatherDescription = document.querySelector("#weather-description");
    let windDescription = document.querySelector("#wind");
    let humidityDescription = document.querySelector("#humidity");
    
    cityName.innerText = city;
    temp.innerText = temperature
    weatherDescription.innerHTML = weather;
    windDescription.innerHTML = `Wind : ${wind}%`;
    humidityDescription.innerHTML = `Humidity : ${humidity}%`;

  console.log("response", response.data);
  console.log(city);
  // console.log(response);

  getForecast(response.data.coord)
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

axios.get(apiURL).then(showWeather);


// current location
function showPosition(position) {

  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showWeather);

  console.log("geoposition" , position)

}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition)
}


let buttonLocation = document.querySelector("#location");
buttonLocation.addEventListener("click", currentLocation);


function formatDay (timestamp) {

  let date = new Date( timestamp * 1000)
  let day = date.getDay();

  let daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = daysWeek[day]
  
  return day
}


function showForecast(response) {

  let forecast = response.data.daily;
  // console.log(forecast)

  let forecastHTML = document.querySelector("#forecast")

  forecast.forEach(function (forecastDay, index) {

  if (index > 0 && index < 5 ) {
    forecastHTML.innerHTML = forecastHTML.innerHTML + `
      
              <div class="col-3">     
                <div class="card weather-card">
                  <p class="text-weather">${formatDay(forecastDay.dt)}</p> 
                   <img class="icon-weather" src="https://img.icons8.com/ios/100/000000/sun--v1.png"/>
                  <span class="text-weather">${Math.round(forecastDay.temp.max)}º  ${Math.round(forecastDay.temp.min)}º</span>
                </div>
              </div> `
      }    
    }
  )
}






// function showCelsiusTemp() {

//     let temp = document.querySelector("#temp");
//     temp.innerText = 22;
// }

// function showFarTemp() {

//     let temp = document.querySelector("#temp");
//     temp.innerText = 72; 
// }


// let celsiusBtn = document.querySelector("#celsius-btn")
// celsiusBtn.addEventListener("click", showCelsiusTemp)


// let farBtn = document.querySelector("#far-btn")
// farBtn.addEventListener("click", showFarTemp)



