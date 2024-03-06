// Liste des énigmes
const enigmes = [

    { question: "Méthode pour supprimer un élément HTML du DOM ?", reponse: "remove" }
];

// Niveau actuel
let niveauActuel = 0;

// Récupérez le score à partir de localStorage ou initialisez-le à zéro
let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez le bouton "Vérifier" par son ID
const boutonVerifier = document.getElementById('verifier');

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton "Vérifier"
boutonVerifier.addEventListener('click', verifierReponse);

// Fonction pour vérifier la réponse
function verifierReponse() {
    const reponseUtilisateur = document.getElementById("reponse").value.toLowerCase();
    const enigmeCourante = enigmes[0];
    const scoreElement = document.getElementById("score");

    if (reponseUtilisateur === enigmeCourante.reponse) {


        score += 5;
        localStorage.setItem('score', score);
        scoreElement.innerText = "Score : " + score;

        // Rediriger vers .php en cas de réponse correcte
        setTimeout(function () {
            window.location.href = "game20.php";
        }, 1000);
    } else {
        score -= 5;
        if (score < 0) {
            score = 0;
        }
        localStorage.setItem('score', score);

        window.location.href = "game_over.php";
        scoreElement.innerText = "Score : " + score;
    }
}