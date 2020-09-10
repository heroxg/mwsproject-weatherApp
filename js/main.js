const api = {
    key: "2f00e8acdd0b3d3b9bd7426d89d9608d",
    base : "https://api.openweathermap.org/data/2.5/"
}

let searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', setQuery); 

const searchbox = document.querySelector('.search-box');

function setQuery(evt) {
    getResults(searchbox.value)
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let currentUpdate = document.querySelector('.location .current-update');
    currentUpdate.innerHTML = `<p>it is ${weather.weather[0].main} in ${weather.name} ${weather.sys.country} now.</p>`

    // let city = document.querySelector('.location .city');
    // city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `<p>Temperature</p> <span class="temp-degree"> ${Math.round(weather.main.temp)}<span>°C</span> </span>`;

    // let weather_el = document.querySelector('.current .weather');
    // weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `<p>Hi-Low</p> <span class="weather-degree"> ${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C  </span>` ;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
                 "September", "October", "November", "December"
                ];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year};`
}