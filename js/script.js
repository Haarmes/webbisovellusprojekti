const link1 = document.getElementById("link1ID");
const link2 = document.getElementById("link2ID");
const link3 = document.getElementById("link3ID");
const pictureArray = [{ kuvaPath: "assets/pictures/profiilikuva24-7.png", kuvaus: "24h kortti kuva", nimi: "profiilikuva24-7" }, { kuvaPath: "assets/pictures/severipng.png", kuvaus: "Lapsuus kuva", nimi: "severipng" }, { kuvaPath: "assets/pictures/lefPic.png", kuvaus: "led projekti kuva", nimi: "ledPic" }, { kuvaPath: "assets/pictures/feelinsealy.png", kuvaus: "hassu hylje kuva", nimi: "feelinsealy" }];
let UsedPicArray = [];
let imageNum = 0;
window.setInterval(switchProfilePic, 1000);

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
    const response = await fetch('https://randomfox.ca/floof/').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
    console.log(response.image);
    document.getElementById("foxImage").src = response.image;
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