let geoLatitude, geoLongitude;
let geoApiKey = "d594093470b3d6bc2814a1178318feec";
let kelvinTransfer = 273.15;
const link1 = document.getElementById("link1ID");
const link2 = document.getElementById("link2ID");
const link3 = document.getElementById("link3ID");

link1.addEventListener("click", function () {
    //alert("link1");
    window.open("https://github.com/haarmes", '_blank').focus();
})
link2.addEventListener("click", function () {
    //alert("link1");
    window.open("https://www.youtube.com/Haarmes", '_blank').focus();
})
link3.addEventListener("click", function () {
    //alert("link1");
    window.open("https://www.twitch.tv/haarmes", '_blank').focus();
})

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        geoLatitude = position.coords.latitude;
        geoLongitude = position.coords.longitude;
        console.log(`Latitude: ${geoLatitude}, Longitude: ${geoLongitude}`);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}

function getWeatherInfo() {
    // Define the API URL
    //const apiU = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    const apiUrl2 = 'https://api.openweathermap.org/data/2.5/weather?lat=' + geoLatitude + "&lon=" + geoLongitude + "&appid=" + geoApiKey;

    console.log(apiUrl2);
    // Make a GET request
    fetch(apiUrl2)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let tempCels = Number(data.main.temp) - kelvinTransfer;
            console.log("tempcels = " + tempCels);
            console.log(data.main.temp);
            document.getElementById("weatherTemp").innerHTML = "Current temperature is: " + parseInt(tempCels) + "°C";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function show(shown, hidden) {

    document.getElementById(shown).style.display = 'flex';
    document.getElementById(hidden).style.display = 'none';

    return false;

}

function clickFunctionTextSend() {
    let text = document.getElementById("getText").value;
    document.getElementById("getText").value = "";
    console.log(text);
    document.getElementById("textInput").innerHTML = text;
}

async function clickFunctionText() {
    //const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + text + '&limit=1&appid=' + geoApiKey);
    const response = await fetch('https://randomfox.ca/floof/').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
    console.log(response.image);
    document.getElementById("foxImage").src = response.image;
}