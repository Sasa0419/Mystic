const button = document.querySelector('.button');
const originalText = 'Deconnexion';
const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let clearID

function survol() {

    let randomText = '';
    for (let i = 0; i < originalText.length; i++) {
        const randomIndex = Math.floor(Math.random() * randomLetters.length);
        randomText += randomLetters[randomIndex];
    }
    button.textContent = randomText;
}


button.addEventListener('mouseover', () => {
    clearID = setInterval(survol, 20)
    survol()
});

button.addEventListener('mouseout', () => {
    clearInterval(clearID)
    button.textContent = originalText;
});


// Restaurez le score depuis localStorage lorsque la page se charge
window.addEventListener('load', function () {
    const scoreElement = document.getElementById('score');
    const score = localStorage.getItem('score') || 0; // Récupérez le score depuis localStorage
    scoreElement.innerText = "Score : " + score;
});

// Récupérez le lien de déconnexion par son identifiant
const lienDeconnexion = document.getElementById('deconnexion');

// Ajoutez un gestionnaire d'événements pour le clic sur le lien de déconnexion
lienDeconnexion.addEventListener('click', function (event) {
    event.preventDefault();

    // Récupérez le score depuis localStorage
    const score = localStorage.getItem('score') || 0;

    // Créez un objet FormData pour envoyer les données POST
    const formData = new FormData();
    formData.append('score', score);

    // Configuration de la requête fetch
    const fetchOptions = {
        method: 'POST',
        body: formData,
    };

    // Envoyez le score au serveur en utilisant fetch
    fetch('score.php', fetchOptions)
        .then(response => {
            if (response.ok) {
                // Le score a été enregistré avec succès dans la base de données.
                console.log("Score enregistré avec succès dans la base de données.");

                // Supprimez le score de localStorage
                localStorage.removeItem('score');

                // Redirigez l'utilisateur vers la page de déconnexion
                window.location.href = "logout.php";
            } else {
                // Une erreur s'est produite lors de l'enregistrement du score.
                console.error("Erreur lors de l'enregistrement du score.");
            }
        })
        .catch(error => {
            // Une erreur s'est produite lors de la requête fetch.
            console.error("Erreur lors de la requête fetch : " + error);
        });
});
