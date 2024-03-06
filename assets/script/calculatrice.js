let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez l'élément score par son ID
const scoreElement = document.getElementById("score");

// Déclarations
let calc = "";
let randomNumber; // Le nombre secret dans le jeu

// Générer un nombre aléatoire entre 1 et 100 (vous pouvez ajuster la plage selon vos préférences)
const minNumber = 1;
const maxNumber = 100;
randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

// Récupération des nombres
const valeur1 = document.getElementById("valeur-1");
const valeur2 = document.getElementById("valeur-2");
const valeur3 = document.getElementById("valeur-3");
const valeur4 = document.getElementById("valeur-4");
const valeur5 = document.getElementById("valeur-5");
const valeur6 = document.getElementById("valeur-6");
const valeur7 = document.getElementById("valeur-7");
const valeur8 = document.getElementById("valeur-8");
const valeur9 = document.getElementById("valeur-9");
const valeur0 = document.getElementById("valeur-0");

// Récupération des opérateurs
const valeurEgal = document.getElementById("valeur-egal");
const valeurDelete = document.getElementById("valeur-delete");

// Récupération du résultat HTML
const resultFinal = document.getElementById("result");

// Event Nombres
function addValueToCalc(value) {
    calc += value;
    resultFinal.innerText += value;
}

valeur1.addEventListener("click", () => addValueToCalc("1"));
valeur2.addEventListener("click", () => addValueToCalc("2"));
valeur3.addEventListener("click", () => addValueToCalc("3"));
valeur4.addEventListener("click", () => addValueToCalc("4"));
valeur5.addEventListener("click", () => addValueToCalc("5"));
valeur6.addEventListener("click", () => addValueToCalc("6"));
valeur7.addEventListener("click", () => addValueToCalc("7"));
valeur8.addEventListener("click", () => addValueToCalc("8"));
valeur9.addEventListener("click", () => addValueToCalc("9"));
valeur0.addEventListener("click", () => addValueToCalc("0"));

// Égal
valeurEgal.addEventListener("click", () => {
    const userGuess = parseInt(calc);
    if (isNaN(userGuess)) {
        alert("Veuillez entrer un nombre valide.");
    } else {
        if (userGuess === randomNumber) {
            resultFinal.innerText = "Bravo!";
            score += 5;
            localStorage.setItem('score', score);
            scoreElement.innerText = "Score : " + score;
            window.location.href = "game3.php";
        } else if (userGuess < randomNumber) {
            resultFinal.innerText = "trop petit";
        } else {
            resultFinal.innerText = "trop grand";
        }
    }
});

// Effacer
valeurDelete.addEventListener("click", () => {
    console.clear();
    calc = "";
    resultFinal.innerText = "";
});