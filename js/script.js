const link1 = document.getElementById("link1ID");
const link2 = document.getElementById("link2ID");
const link3 = document.getElementById("link3ID");
const pictureArray = [{ kuvaPath: "assets/pictures/profiilikuva24-7.png", kuvaus: "24h kortti kuva", nimi: "profiilikuva24-7" }, { kuvaPath: "assets/pictures/severipng.png", kuvaus: "Lapsuus kuva", nimi: "severipng" }, { kuvaPath: "assets/pictures/lefPic.png", kuvaus: "led projekti kuva", nimi: "ledPic" }, { kuvaPath: "assets/pictures/feelinsealy.png", kuvaus: "hassu hylje kuva", nimi: "feelinsealy" }];
let UsedPicArray = [];
let imageNum = 0;
var audio = document.getElementById("audioControlID");
audio.volume = 0.1;
//window.setInterval(switchProfilePic, 1000);

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


function show(shown, hidden) {

    document.getElementById(shown).style.display = 'flex';
    document.getElementById(hidden).style.display = 'none';

    return false;

}

function clickFunctionTextSend() {
    window.alert("text was send to table")
    var table = document.getElementById("myTable");
    let text = document.getElementById("getText").value;
    let date = new Date();
    textArray.push(text)
    document.getElementById("getText").value = "";
    console.log(text);
    document.getElementById("tableText").innerHTML = text;
    document.getElementById("tableTime").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

async function clickFunctionText() {
    //const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + text + '&limit=1&appid=' + geoApiKey);
    let text = document.getElementById("getText").value;
    var table = document.getElementById("myTable");
    var source = document.getElementById('audioSource');
    var audio = document.getElementById("audioControlID");
    let intervalID = window.setInterval(searchDotsAdd, 1000);
    document.getElementById("searchText").innerHTML = "Searching";


    let date = new Date();
    console.log(text);
    document.getElementById("getText").value = "";
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + text).then(response => {
        if (!response.ok) {
            if (response.status == 404) {
                alert("Didn't find the pokemon");
            }
            document.getElementById("searchText").innerHTML = "";
            window.clearInterval(intervalID);
            throw new Error('Network response was not ok');
        }
        document.getElementById("searchText").innerHTML = "";
        window.clearInterval(intervalID);
        return response.json();
    });
    console.log(response);
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = response.id;
    cell2.innerHTML = response.name;
    cell3.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    document.getElementById("pokemonPicID").src = response.sprites.front_default;
    document.getElementById("pokemonName").innerHTML = response.name;
    console.log(response.cries.latest);
    source.src = response.cries.latest;
    audio.load();



}
function searchDotsAdd() {
    let searchText = document.getElementById("searchText").innerHTML;
    console.log(searchText);
    if (searchText.length <= 11) {
        document.getElementById("searchText").innerHTML = searchText + ".";
    }
    else {
        document.getElementById("searchText").innerHTML = "Searching";
    }
}
function switchProfilePic() {

    console.log("tässä kuvat käytetty" + UsedPicArray);
    for (let i = 0; i < pictureArray.length; i++) {
        console.log(pictureArray[i].kuvaus);
        if (UsedPicArray.includes(pictureArray[i].nimi)) {
            console.log("picture used")
            UsedPicArray.push(pictureArray[i].nimi);
        }
        else {
            document.getElementById("profilePicID").src = pictureArray[i].kuvaPath;
            console.log(pictureArray[i].nimi)

            console.log("ei käytetty");
        }
    }
}