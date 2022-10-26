
// Challenge 1
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



// Challenge 2

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




// Challenge 3


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



