let score = parseInt(localStorage.getItem('score')) || 0;

const scoreElement = document.getElementById("score");

// Tableau pour stocker les informations sur les fenêtres
let fenetres = [];

// Compteur de clics sur le bouton rouge
let clicsSurBoutonRouge = 0;

// Variable pour suivre si le bouton rouge est actif
let boutonRougeActif = true;

// Fonction pour gérer le clic sur le bouton principal (bouton rouge)
function clicSurBoutonRouge() {
    // Vérifie si le bouton rouge est actif
    if (!boutonRougeActif) {
        return;
    }

    // Incrémente le compteur de clics sur le bouton rouge
    clicsSurBoutonRouge++;

    // Créez une nouvelle div rouge lorsque vous cliquez sur le bouton
    let nouvelleDivRouge = document.querySelector('.fenetre').cloneNode(true);



    // Positionnez la nouvelle division rouge de manière aléatoire
    const windowWidth = window.innerWidth * 0.8; // 80% de la largeur de la fenêtre
    const windowHeight = window.innerHeight * 0.8; // 80% de la hauteur de la fenêtre

    let positionX = Math.floor(Math.random() * (windowWidth - 100));
    let positionY = Math.floor(Math.random() * (windowHeight - 200));

    // Définir les limites right et bottom
    const limiteRight = windowWidth - 100;
    const limiteBottom = windowHeight - 200;

    // Appliquer les limites
    positionX = Math.min(positionX, limiteRight);
    positionY = Math.min(positionY, limiteBottom);

    nouvelleDivRouge.style.position = 'absolute';
    nouvelleDivRouge.style.left = positionX + 'px';
    nouvelleDivRouge.style.top = positionY + 'px';


    // Ajoutez la nouvelle division rouge à la page
    document.body.appendChild(nouvelleDivRouge);

    // Ajoutez un gestionnaire d'événements de clic à la nouvelle fenêtre pour permettre l'ouverture de nouvelles fenêtres
    nouvelleDivRouge.addEventListener('click', function () {
        clicSurBoutonRouge();
    });

    if (clicsSurBoutonRouge >= 20) {
        // Si le nombre de clics atteint 20, redirige vers la page d'erreur
        score -= 5;
        if (score < 0) {
            score = 0;
        }
        localStorage.setItem('score', score);
        window.location.href = "game_over.php";
        scoreElement.innerText = "Score : " + score;
    }

    // Ajoutez un nouveau bouton après 5 clics sur le bouton rouge
    if (clicsSurBoutonRouge === 5) {
        let nouveauBouton = document.createElement('b');
        nouveauBouton.innerText = 'EXIT';

        // Ajoutez un gestionnaire d'événements de clic au bouton pour rediriger vers une nouvelle page
        nouveauBouton.addEventListener('click', function () {
            score += 5;
            localStorage.setItem('score', score);
            scoreElement.innerText = "Score : " + score;

            // Rediriger vers .php en cas de réponse correcte
            window.location.href = "game7.php";
        });

        nouvelleDivRouge.appendChild(nouveauBouton);
    }
}

// Ajoutez un gestionnaire d'événements de clic au bouton principal (bouton rouge)
let boutonRouge = document.getElementById('bouton-apparition');
boutonRouge.addEventListener('click', clicSurBoutonRouge);
