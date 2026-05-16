// ========= PAGE ACCUEIL -> PAGE VALIDATION =========

document.getElementById("btnJouer")
.addEventListener("click", function(){

document.getElementById("accueil")
.style.display = "none";

document.getElementById("pageNumero")
.style.display = "block";

document.querySelector(".zoneBoutons")
.style.opacity = "1";

document.querySelector(".zoneBoutons")
.style.pointerEvents = "auto";

});



// ========= VERIFICATION GOOGLE SHEET =========

document.getElementById("btnContinuer")
.addEventListener("click", function(){

let code =
document.getElementById("code").value.trim();

if(code === ""){

alert("Ampidiro aloha ny code");

return;

}


// LIEN APPS SCRIPT
let url =
"https://script.google.com/macros/s/AKfycbxHURiFXFagInAF8GI8MN6GY8ZtHZy9LfU48XimLrtHxd4JOEFpJVxuYbB9g7eOp_qAkQ/exec?code="
+ code;


fetch(url)

.then(response => response.text())

.then(data => {

data = data.trim();


// RAHA VALIDE
if(data === "valide"){

document.getElementById("pageNumero")
.style.display = "none";

document.getElementById("tableau")
.style.display = "block";

}


// RAHA TSY VALIDE
else{

alert("Code tsy hita ao anaty Google Sheet");

}

})

.catch(error => {

alert("Erreur connexion Google Sheet");

console.log(error);

});

});



// ========= SYSTEME AUTOMATIQUE =========

// LISTE CREDITS
let credits = [

"45879632145678",

"96325874125874",

"74185296325874",

"85214796325874",

"15935725845612"

];


// POSITION CREDIT ACTUEL
let currentCredit = 0;


// CAGE GAGNANT ACTUEL
let currentWinner = 1;


// BLOQUER DOUBLE CLICK
let dejaChoisi = false;



// ========= FONCTION CHOIX =========

function choisirCage(numeroCage){

if(dejaChoisi){

return;

}

dejaChoisi = true;


// SI CREDIT FINI
if(currentCredit >= credits.length){

document.getElementById("resultat")
.innerHTML =
"Tsy misy crédit intsony";

return;

}


// SI GAGNANT
if(numeroCage === currentWinner){

// CREDIT ACTUEL
let codeCredit =
credits[currentCredit];


// AFFICHAGE GAIN
document.getElementById("resultat")
.innerHTML =

"CRÉDIT 1000 AR";


// AFFICHER BOUTON
document.getElementById("btnRecuperer")
.style.display = "block";


// STOCKER CREDIT
window.creditActuel =
codeCredit;

}


// SI PERDANT
else{

document.getElementById("resultat")
.innerHTML =

"Mbola ho avy ny anjaranao";


// CACHER BOUTON
document.getElementById("btnRecuperer")
.style.display = "none";


// SUPPRIMER CREDIT
window.creditActuel = "";

}


// CREDIT SUIVANT
currentCredit++;


// ROTATION CAGE
currentWinner++;

if(currentWinner > 3){

currentWinner = 1;

}

}



// ========= CAGE 1 =========

document.getElementById("credit1")
.addEventListener("click", function(){

choisirCage(1);

});



// ========= CAGE 2 =========

document.getElementById("credit2")
.addEventListener("click", function(){

choisirCage(2);

});



// ========= CAGE 3 =========

document.getElementById("credit3")
.addEventListener("click", function(){

choisirCage(3);

});



// ========= BOUTON RETOUR =========

document.getElementById("btnRetour")
.addEventListener("click", function(){

dejaChoisi = false;

document.getElementById("resultat")
.innerHTML = "";

document.getElementById("btnRecuperer")
.style.display = "none";

document.getElementById("tableau")
.style.display = "none";

document.getElementById("pageNumero")
.style.display = "block";

});



// ========= BOUTON ACCUEIL =========

document.getElementById("btnAccueil")
.addEventListener("click", function(){

dejaChoisi = false;

document.getElementById("resultat")
.innerHTML = "";

document.getElementById("btnRecuperer")
.style.display = "none";

document.getElementById("tableau")
.style.display = "none";

document.getElementById("pageNumero")
.style.display = "none";

document.getElementById("accueil")
.style.display = "block";

document.querySelector(".zoneBoutons")
.style.opacity = "0";

document.querySelector(".zoneBoutons")
.style.pointerEvents = "none";

});



// ========= RECUPERER CREDIT =========

document.getElementById("btnRecuperer")
.addEventListener("click", function(){

// CODE TELMA
let ussd =

"#321*" +
window.creditActuel +
"#";


// AFFICHAGE CODE
prompt(

"Copiez votre code Telma :",

ussd

);

});



// ========= ENTER KEY =========

document.getElementById("code")
.addEventListener("keypress", function(event){

if(event.key === "Enter"){

document.getElementById("btnContinuer")
.click();

}

});