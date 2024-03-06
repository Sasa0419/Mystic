
// Récupérez le score à partir de localStorage ou initialisez-le à zéro
let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez l'élément score par son ID
const scoreElement = document.getElementById("score");

// Récupérer le bouton et ajouter un gestionnaire d'événement au clic
document.getElementById("verifierButton").addEventListener("click", function () {
    // Récupérer la réponse de l'utilisateur
    let reponse = document.getElementById("reponseUtilisateur").value;

    // Comparer la réponse avec la réponse attendue ("WEB12")
    if (reponse.toLowerCase() === "web12") {

        score += 5;
        localStorage.setItem('score', score);
        scoreElement.innerText = "Score : " + score;
        window.location.href = "game5.php";
    } else {
        score -= 5;
        if (score < 0) {
            score = 0;
        }
        localStorage.setItem('score', score);
        window.location.href = "game_over.php";
        scoreElement.innerText = "Score : " + score;
    }
});