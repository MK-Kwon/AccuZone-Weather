// City name put in input field
let city = "",
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

    localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
}

// Create buttons for each searched cities from array
function renderButton() {

    let citiesDiv = document.getElementById(prevously-searched-cities);

    if(citiesArray === null) {
        return;
    }
    let uniqueCities = [...new Set(citiesArray)];
    for (let i = 0; i < uniqueCities.length; i++) {

        let buttonEl = document.createElement("button");
        buttonEl.textContent = uniqueCities[i];
        buttonEl.setAttribute("class", "btnSearch btn-outline-secondary");
        citiesDiv.appendChild(buttonEl);
        listClicker();
    }
}

// On click event for previously searched city buttons
function listClicker() {

    $("#prevously-searched-cities").on("click", function(event){
        event.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    });
}

// On Click event for search button
function searchClicker() {

    $("#search-btn").on("click", function(event){
        event.preventDefault();
        city = $(this).prev().val().trim();
        // Push the newly entered city name into the array
        cities.push(city);
        // Remove the oldest item from the array if the total item number in the array exceeds 10
        if (cities.length > 11) {
            cities.shift();
        }
        if (city === "") {
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
    });    
}

// Run 2 API calls, one for current forecast and one for five day forecast
function APIcalls() {
    
    
    
}

init();
listClicker();
searchClicker();
