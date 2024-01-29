
//Remplir la page

var tableauExplication = [];

data.forEach(function (ligne) {
    var element = "<h2><div class='mot-cliquable'> Si j'étais " + ligne["analogie"] + ", je serais... <span class='cache'> " + ligne["valeur"] + '</span></h2>';
    document.querySelector(".liste-analogies").innerHTML += "<section class='block-img " + ligne['class-id'] + "' id='" + ligne['class-id'] + "'>" + element + "<p class='cache'>" + ligne['explication'] + "</p> </div></section>";
    tableauExplication.push(ligne['explication']);
})

//Afficher la popup 
var popup = document.querySelector(".popup");

document.querySelectorAll(".mot-cliquable").forEach(function (element) {
    element.addEventListener("click", function (event) {
        var urlImg = window.getComputedStyle(element.parentElement.parentElement).backgroundImage.replace('url("', '').replace('")', '');
        document.querySelector('.popup img').setAttribute('src', urlImg);
        document.querySelector('.textbox h3').innerHTML = element.firstChild.nextElementSibling.innerHTML + ' !';
        document.querySelector('.textbox p').innerHTML = element.parentElement.nextElementSibling.innerHTML;
        console.log(element.firstChild.nextElementSibling.innerHTML)
        popup.classList.remove("popup-invisible");
        popup.classList.add("popup-visible");

    })
})
popup.addEventListener("click", function (event) {

    popup.classList.remove("popup-visible");
    popup.classList.add("popup-invisible");
})


// Variables pour simplifier le code
const form = document.getElementById("myForm");
const formDataContainer = document.getElementById("formData");
const titleChange = document.getElementById("title");
const textChange = document.getElementById("text");
const explChange = document.getElementById("explication");
const imageChange = document.getElementById("link1");
//----------------
// Partie afficher les donnes rentrées dans le formulaire

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Pour que la page ne se reload pas

    // Récuperer les données
    const titleValue = document.getElementById("title").value;
    const textValue = document.getElementById("text").value;
    const explValue = document.getElementById("explication").value;
    const link1Value = document.getElementById("link1").value;

    // Réafficher les données dans le formulaire après un submit
    titleChange.textContent = titleValue;
    textChange.textContent = textValue;
    explChange.textContent = explValue
    imageChange.src = link1Value || "https://via.placeholder.com/150";

    // Stoque les données avant de les afficher
    const formData = `
    <section class='block-img' id="imageChange" style="background-image:url('${link1Value}')">

        <h2><div class="new-mot-cliquable">Si j'étais ${titleValue}, je serais...</div></h2>
        
    </section>
    <div class="new-popup new-popup-invisible">
        <img class="imgpopup" src="${link1Value}">
        <div class="textbox">
            <h3> ${textValue} !</h3>
            <p>${explValue}</p>
        </div>
    </div>
  `;
    fetch("https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=gael.grandval&courriel=gael.grandval@edu.univ-eiffel.fr&message=Si j'étais " + titleValue + ", je serais " + textValue + "Parce que " + explValue).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
            if (data.status == "success") {
                document.querySelector("#message").innerHTML = "Bien reçu! :)";
            } else {
                document.querySelector("#message").innerHTML = "Oops, erreur :(";
            }
        })
    })

    formDataContainer.innerHTML = formData;
    var Newpopup = document.querySelector('.new-popup')
    document.querySelectorAll(".new-mot-cliquable").forEach(function (element) {
        element.addEventListener("click", function (event) {
            Newpopup.classList.remove("new-popup-invisible");
            Newpopup.classList.add("new-popup-visible");
        })
    })
    Newpopup.addEventListener("click", function (event) {

        Newpopup.classList.remove("new-popup-visible");
        Newpopup.classList.add("new-popup-invisible");
    })
});

// Ouverture et fermeture du Menu burger
var sidenav = document.getElementById("SideNav");

document.querySelectorAll('a#Open').forEach(function (element) {
    element.addEventListener('mousedown', function (event) {
        sidenav.classList.add("menuOuvert");
        console.log(sidenav.classList);
    })
})
console.log(sidenav.classList)

document.querySelectorAll("a#rubrique").forEach(function (element) {
    element.addEventListener('click', function (event) {
        sidenav.classList.remove("menuOuvert");
    })
})


// mentions légales : volet déroulant
document.querySelector('.mentionsLegales').addEventListener('click', function (event) {
    document.querySelector('.mentions-invisible').classList.add('mentions-visible', 'box');
    document.querySelector('.mentions-invisible').classList.remove('mentions-invisible');
});