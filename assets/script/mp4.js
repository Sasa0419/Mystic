let score = parseInt(localStorage.getItem('score')) || 0;

const scoreElement = document.getElementById("score");


const enigmes = [
    { question: "Question : M'as tu trouvé ?", reponse: "windows95" },
];

// Récupérez le bouton "Vérifier" par son ID
const boutonVerifier = document.getElementById('verifier');

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton "Vérifier"
boutonVerifier.addEventListener('click', verifierReponse);

// Fonction pour vérifier la réponse
function verifierReponse() {
    const reponseUtilisateur = document.getElementById("reponse").value;
    const enigmeCourante = enigmes[0];
    const scoreElement = document.getElementById("score");

    if (reponseUtilisateur === enigmeCourante.reponse) {

        score += 5;
        localStorage.setItem('score', score);
        scoreElement.innerText = "Score : " + score;

        // Rediriger vers .php en cas de réponse correcte
        setTimeout(function () {
            window.location.href = "game13.php";
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
