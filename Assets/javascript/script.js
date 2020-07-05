// City name put in input field
let city = "",
    // Empty array for saving searched cities
    citiesArray = [];
    
// Retreive previously saved search cities then create buttons of the data
function init() {

    let savedCities = JSON.parse(localStorage.getItem("citiesArray"));
    if (savedCities !== null) {
        citiesArray = savedCities;
    }
    renderButton();
}
// Save searched cities to an array in local storage
function storeCities() {

    localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
}

// Create buttons for each searched cities from array
function renderButton() {

    let citiesDiv = document.getElementById("prevously-searched-cities");
    
    citiesDiv.innerHTML = "";

    if (citiesArray === null) {
        return;
    }
    let uniqueCities = [...new Set(citiesArray)];
    for (let i = 0; i < uniqueCities.length; i++) {

        let buttonEl = document.createElement("button");
        buttonEl.textContent = uniqueCities[i];
        buttonEl.setAttribute("class", "listBtn");
        citiesDiv.appendChild(buttonEl);
        listClicker();
    }
}

// On click event for previously searched city buttons
function listClicker() {

    $(".listBtn").on("click", function (e) {
        e.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    });
}

// On Click event for search button
function searchClicker() {

    $("#search-btn").on("click", function (e) {
        e.preventDefault();
        city = $(this).prev().val().trim();
        // Push the newly entered city name into the array
        citiesArray.push(city);
        // Remove the oldest item from the array if the total item number in the array exceeds 10
        if (citiesArray.length > 9) {
            citiesArray.shift();
        }
        if (city === "") {
            return;
        }
        APIcalls();
        storeCities();
        renderButton();
    });
}

// Run 2 API calls, one for current forecast and one for five day forecast
function APIcalls() {

    // URL to make API calls for current forecast
    let currentForeCastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + 
                                city + "&appid=0fb779217270dc1943ca287687bf9395",
        // URL to make API calls for five day forecast
        fiveDayForeCastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + 
                                city + "&appid=0fb779217270dc1943ca287687bf9395";
    $.ajax({
        url: currentForeCastUrl,
        method: "GET",
    }).then(function(response) {
        
        let temp = Math.round(response.main.temp - 273.15);
        $("#icon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $("#city-title").text(city);
        $("#temperature").text("Temperature " + temp + String.fromCharCode(176));
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
    });

    $.ajax({
        url: fiveDayForeCastUrl,
        method: "GET",
    }).then(function(response){

        let dayNumber = 1;

        for (let i = 0; i < response.list.length; i++) {
            if(response.list[i].dt_txt.split(" ")[1] === "12:00:00") {
                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let month = response.list[i].dt_txt.split("-")[1];
                $("#" + "date" + dayNumber).text(day + "/" + month);
                let temp = Math.round(response.list[i].main.temp - 273.15);
                $("#" + "five-day-temp" + dayNumber).text("Temp: " + temp + String.fromCharCode(176));
                $("#" + "five-day-humidity" + dayNumber).text("Humidity: " + response.list[i].main.humidity);
                $("#" + "five-day-icon" + dayNumber).attr({"src": "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png",
                "height": "50px", "width":"50px"});
                dayNumber++
            }
        }

    });

}

init();
listClicker();
searchClicker();