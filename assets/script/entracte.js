// Récupérez l'URL précédente
const previousUrl = document.referrer;

// Récupérez tous les boutons
const buttons = document.querySelectorAll(".vert button");

// Obtenez le nombre total de boutons
const totalButtons = buttons.length;

// Générez deux indices aléatoires pour les boutons "game6.php"
const index1 = Math.floor(Math.random() * totalButtons);
let index2;
do {
    index2 = Math.floor(Math.random() * totalButtons);
} while (index2 === index1); // Assurez-vous que les deux indices sont différents

// Ajoutez un gestionnaire d'événements pour chaque bouton
buttons.forEach(function (button, index) {
    button.addEventListener("click", function () {
        // Vérifiez si l'indice du bouton cliqué correspond à l'un des indices générés aléatoirement
        if (index === index1 || index === index2) {
            // Redirigez vers "game + 1.php" si le bouton fait partie des boutons corrects
            const currentUrl = new URL(previousUrl);
            const currentPath = currentUrl.pathname;
            const parts = currentPath.split('/');
            const currentGameNumber = parseInt(parts[parts.length - 1].replace("game", ""));
            const newGameNumber = currentGameNumber + 1;
            const newUrl = currentPath.replace(currentGameNumber, newGameNumber);

            window.location.href = newUrl;
        } else {
            // Redirigez vers "game - 2.php" si le bouton est incorrect
            const currentUrl = new URL(previousUrl);
            const currentPath = currentUrl.pathname;
            const parts = currentPath.split('/');
            const currentGameNumber = parseInt(parts[parts.length - 1].replace("game", ""));
            const newGameNumber = currentGameNumber - 2;
            const newUrl = currentPath.replace(currentGameNumber, newGameNumber);

            window.location.href = newUrl;
        }
    });
});
