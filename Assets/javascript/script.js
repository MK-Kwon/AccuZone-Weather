// City name put in input field
let city = "",
    // Base URL to make API calls
    urlAPI = "",
    // API key from openweathermap.org
    APIKey = "",
    // URL to make API calls for current forecast
    currentForeCastUrl = "",
    // URL to make API calls for five day forecast
    fiveDayForeCastUrl = "",
    // Empty array for saving searched cities
    citiesArray = [];

// Retreive previously saved search cities then create buttons of the data
function init() {
    let savedCities = JSON.parse(localStorage.getItem("citiesArray"));
    if(savedCities === null) {
        return;
    }
    renderButtons();
}
// Save searched cities to an array in local storage
function storeCities() {
    
}

// Create buttons for each searched cities from array
function renderButton() {
    
}

// On click event for previously searched city button(s)
function listClicker() {

}

// On Click event for search button
function searchClicker() {

}

// Run 2 API calls, one for current forecast and one for five day forecast
function APIcalls() {

}

init();
listClicker();
searchClicker();
