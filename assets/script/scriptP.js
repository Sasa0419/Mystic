// Références initiales
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let score = parseInt(localStorage.getItem('score')) || 0;

const scoreElement = document.getElementById("score");

// Options de jeu
let options = {
    ordinateur: [
        "modem",
        "scanner",
        "clavier",
        "ecran",
        "souris",
    ],
    jeux: ["snake", "solitaire", "maze", "pinball", "minesweeper"],
    languages: [
        "python",
        "php",
        "lua",
        "limbo",
        "ruby",
        "haskell",
    ],
};

// Comptage des victoires
let winCount = 0;
let count = 0;

let chosenWord = "";

// Affichage des boutons d'options
const displayOptions = () => {
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

// Blocage de tous les boutons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    // Désactiver toutes les options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    // Désactiver toutes les lettres
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

// Générateur de mots
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    // Si optionValue correspond au texte du bouton, alors mettez en surbrillance le bouton
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    // Cacher initialement les lettres et effacer le mot précédent
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    // Choisissez un mot au hasard
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    // Remplacez chaque lettre par une span contenant un tiret
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    // Afficher chaque élément en tant que span
    userInputSection.innerHTML = displayItem;
};

// Fonction initiale (appelée lorsque la page se charge / l'utilisateur appuie sur Nouvelle partie)
const initializer = () => {
    winCount = 0;
    count = 0;

    // Effacez initialement tout le contenu et masquez les lettres et le bouton Nouvelle partie
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    // Pour créer des boutons de lettres
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        // Nombre en ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        // Écouteur d'événements pour les boutons de caractères
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            // Si le tableau contient la valeur cliquée, remplacez le tiret correspondant par la lettre, sinon dessinez sur le canevas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    // Si le caractère dans le tableau est identique au bouton cliqué
                    if (char === button.innerText) {
                        // Remplacez le tiret par la lettre
                        dashes[index].innerText = char;
                        // Incrémenter le compteur de victoires
                        winCount += 1;
                        // Si winCount est égal à la longueur du mot
                        if (winCount == charArray.length) {
                            score += 5;
                            localStorage.setItem('score', score);
                            scoreElement.innerText = "Score : " + score;
                            window.location.href = "entracte.php";
                            // Bloquez tous les boutons
                            blocker();
                        }
                    }
                });
            } else {
                // Incrémenter le compteur de pertes
                count += 1;
                // Pour dessiner le bonhomme
                drawMan(count);
                // Compteur == 6 car tête, corps, bras gauche, bras droit, jambe gauche, jambe droite
                if (count == 6) {
                    score -= 5;
                    if (score < 0) {
                        score = 0;
                    }
                    localStorage.setItem('score', score);
                    window.location.href = "game_over.php";
                    scoreElement.innerText = "Score : " + score;
                    blocker();
                }
            }
            // Désactivez le bouton cliqué
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    // Appel à canvasCreator (pour effacer le canevas précédent et créer un canevas initial)
    let { initialDrawing } = canvasCreator();
    // initialDrawing dessinera le cadre
    initialDrawing();
};

// Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    // Pour dessiner des lignes
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    // Cadre initial
    const initialDrawing = () => {
        // Effacez le canevas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // Ligne du bas
        drawLine(10, 130, 130, 130);
        // Ligne de gauche
        drawLine(10, 10, 10, 131);
        // Ligne du haut
        drawLine(10, 10, 70, 10);
        // Petite ligne supérieure
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// Dessinez le bonhomme
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

// Nouvelle partie
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
