// City name put in input field
let city = "",
    // Empty array for saving searched cities
    citiesArray = [];
    
// Retreive previously saved search cities then create buttons of the data
function init() {
    // Convert a string of previously saved cities to object so we can use and manipulate 
    let savedCities = JSON.parse(localStorage.getItem("citiesArray"));
    // Unless converted data doesn't exist, all items in cities array will be replaced with converted data (If it's not replaced by converted version first, 'renderButton' funtion will not run properly)
    if (savedCities !== null) {
        citiesArray = savedCities;
    }
    renderButton();
}
// Save searched cities to an array in local storage
function storeCities() {
    // When saved in local storage the data must be in string
    localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
}

// Create buttons for each searched cities from array
function renderButton() {

    let citiesDiv = document.getElementById("prevously-searched-cities");
    // Clears the old button and only display the new button 
    citiesDiv.innerHTML = "";
    // Function will not run if the array is empty
    if (citiesArray === null) {
        return;
    }
    // Remove duplicated items in the array
    let uniqueCities = [...new Set(citiesArray)];
    // Loop through the array and create buttons
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
        // Upon clicking on the button, the sibling from the same parent element (In this case, city name typed in input field) will be chosen then the value will be set
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
        // Convert temperature measurement from Kelvin to Celsius
        let temp = Math.round(response.main.temp - 273.15);
        $("#icon").attr({"src": "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png", "height": "65px", "width":"65px"});
        $("#city-title").text(city);
        // String.fromCharCode - Used for fetching special characters
        $("#temperature").text("Temperature " + temp + String.fromCharCode(176));
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
    });

    $.ajax({
        url: fiveDayForeCastUrl,
        method: "GET",
    }).then(function(response){
        // Counter starting from 1 and will finish when it reaches the last day (In this case, it will be 5th day)
        let dayNumber = 1;
        // Looping through all 40 items on the list
        for (let i = 0; i < response.list.length; i++) {
            // Split and fetch "Time" from the list and we will only use weather info for 12:00:00 o'clock
            if(response.list[i].dt_txt.split(" ")[1] === "12:00:00") {
                // Split and fetch "Day" from the list
                let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                // Split and fetch "Month" from the list
                let month = response.list[i].dt_txt.split("-")[1];
                // Day counter starts counting up until 5th day of the list and displaying selected weather information 
                $("#" + "date" + dayNumber).text(day + "/" + month);
                let temp = Math.round(response.list[i].main.temp - 273.15);
                $("#" + "five-day-temp" + dayNumber).text("Temp: " + temp + String.fromCharCode(176));
                $("#" + "five-day-humidity" + dayNumber).text("Humidity: " + response.list[i].main.humidity);
                $("#" + "five-day-icon" + dayNumber).attr({"src": "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png",
                "height": "50px", "width":"50px"});
                dayNumber++
            }
        }

    });

}

init();
listClicker();
searchClicker();