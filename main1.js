const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItem = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForecast = document.getElementById('weather-forecast');
const currentTemp = document.getElementById('current-temp');

const api_Key = 'd07100db02f6146ec3c58678e2c66765';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//secondary function a function dat can be called after intervals
//so first we create a function dat wil be called every 1 sec(a sec function), dis func is for the time nd date
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    //in order to be in 12hour format
    const hoursIn12hrsFormat = hour >= 12 ? hour %12: hour
    const minutes = time.getMinutes();
    //in order to check if its am or pm
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12hrsFormat < 10? '0'+hoursIn12hrsFormat : hoursIn12hrsFormat) + ':' 
    + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

//to get the wether api datas
getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        //dis will get de latitude nd longitude values
        let { latitude, longitude } = success.coords;

        //call the fetch api to get de weather data
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_Key}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data) {
    let { pressure, humidity, temp} = data.list[0].main
    let { description } = data.list[0].weather[0]
    let { speed } = data.list[0].wind

    country.innerHTML = data.lat + 'N ' + data.lon + 'E'

    // let { humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItem.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Temperature</div>
        <div>${temp}&#176; C</div>
    </div>
    <div class="weather-item">
        <div>Description: </div>
        <div> ${description}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${speed}km/h</div>
    </div>`;



    // let otherDayForecast = ''
    // data.list[0].array.forEach((day, idx) => {
    //     if (idx === 0) {
    //         currentTemp = 
    //         `<div class="today" id="current-temp">
    //             <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
    //             <div class="other">
    //                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    //                 <div class="temp">Night - ${day.main.temp_min}&#176; C</div>
    //                 <div class="temp">Day - ${day.main.temp_max}&#176; C</div>
    //             </div>
    //         </div>`
    //     } else {
    //         otherDayForecast += 
    //         `<div class="weather-forecast-item">
    //             <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    //             <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
    //             <div class="temp">Night - ${day.main.temp_min}&#176; C</div>
    //             <div class="temp">Day - ${day.main.temp_max}&#176; C</div>
    //         </div>`
    //     }
    // });

    // weatherForecast.innerHTML = otherDayForecast;
}


//rapidapi extension