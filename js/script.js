const link1 = document.getElementById("link1ID");
const link2 = document.getElementById("link2ID");
const link3 = document.getElementById("link3ID");
let searchedPokemonIDs = [];
var currentPokemonObject;
var currentCheck = "";
var audio = document.getElementById("audioControlID");
audio.volume = 0.1;
audio.load();

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
    console.log("in show function");

    document.getElementById(shown).style.display = 'flex';
    document.getElementById(hidden).style.display = 'none';

    return false;

}


async function clickFunctionText(e) {
    e.preventDefault();
    let text = document.getElementById("getText").value;
    var table = document.getElementById("myTable");
    var table2 = document.getElementById("spriteOptionsSelect");
    var source = document.getElementById('audioSource');
    let intervalID = window.setInterval(searchDotsAdd, 1000);
    document.getElementById("searchText").innerHTML = "Searching";
    let SpriteOptions = document.getElementById("spriteOptionsSelect");
    searchedPokemonIDs.forEach((element) => {
        if (element == text) {
            console.log("pokemon on haettu");
            alert(text + " haetaan uudestaan");
        }
    })
    searchedPokemonIDs.push(text);
    let date = new Date();
    console.log(text);
    document.getElementById("getText").value = "";
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + text).then(response => {
        if (!response.ok) {
            if (response.status == 404) {
                alert("Didn't find the pokemon");
                window.clearInterval(intervalID);
                document.getElementById("searchText").innerHTML = "didn't find pokemon with " + text;
            }
            else {
                document.getElementById("searchText").innerHTML = "";
                window.clearInterval(intervalID);
                throw new Error('Network response was not ok');
            }

        }
        else {
            document.getElementById("searchText").innerHTML = "";
            window.clearInterval(intervalID);
            return response.json();
        }

    });
    console.log(response);
    currentPokemonObject = response;
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
    while (table2.firstChild) {
        table2.removeChild(table2.lastChild);
    }
    if (response.sprites.hasOwnProperty("front_default")) {
        var row2 = table2.insertRow(0);
        var SpriteCell1 = row2.insertCell(0);
        var SpriteCell2 = row2.insertCell(1);
        let checkmark = document.createElement("input");
        checkmark.type = "checkbox";
        checkmark.id = "front_default";
        checkmark.checked = true;
        currentCheck = "front_default";
        checkmark.onclick = function () { document.getElementById("pokemonPicID").src = currentPokemonObject.sprites[this.id] };
        let node = document.createTextNode("default:");
        SpriteCell1.appendChild(node);
        SpriteCell2.appendChild(checkmark);
    }
    if (response.sprites.hasOwnProperty("front_shiny")) {
        var row2 = table2.insertRow(0);
        var SpriteCell1 = row2.insertCell(0);
        var SpriteCell2 = row2.insertCell(1);
        let checkmark = document.createElement("input");
        checkmark.type = "checkbox";
        checkmark.id = "front_shiny";
        checkmark.onclick = function () {
            document.getElementById(currentCheck).checked = false;
            document.getElementById("pokemonPicID").src = currentPokemonObject.sprites[this.id]
            currentCheck = this.id;
        };
        let node = document.createTextNode("shiny:");
        SpriteCell1.appendChild(node);
        SpriteCell2.appendChild(checkmark);
    }
    for (const [key, value] of Object.entries(response.sprites.versions)) {
        console.log(`${key}: ${value}`);
        var row2 = table2.insertRow(1);
        var SpriteCell1 = row2.insertCell(0);
        var SpriteCell2 = row2.insertCell(1);
        let checkmark = document.createElement("input");
        checkmark.type = "checkbox";
        checkmark.id = key;
        checkmark.onclick = function () {
            document.getElementById(currentCheck).checked = false;
            console.log(Object.values(currentPokemonObject.sprites.versions[this.id])[0]["front_default"]);
            document.getElementById("pokemonPicID").src = Object.values(currentPokemonObject.sprites.versions[this.id])[0]["front_default"];
            currentCheck = this.id;
        };
        let node = document.createTextNode(key + ":");
        SpriteCell1.appendChild(node);
        SpriteCell2.appendChild(checkmark);

    }
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

function switchSprite() {
    console.log("no");
}