let errorButton = document.getElementById("Retour");

// Ajoutez un gestionnaire d'événements "click"
errorButton.addEventListener("click", function () {
    // Utilisez history.back() pour retourner à la page de jeu précédente
    history.back();
});





const button = document.querySelector('.button');
const originalText = 'Deconnexion';
const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let clearID

function survol (){

    let randomText = '';
    for (let i = 0; i < originalText.length; i++) {
        const randomIndex = Math.floor(Math.random() * randomLetters.length);
        randomText += randomLetters[randomIndex];
    }
    button.textContent = randomText;
}


button.addEventListener('mouseover', () => {
    clearID = setInterval(survol, 20)
    survol ()
    });

button.addEventListener('mouseout', () => {
    clearInterval(clearID)
    button.textContent = originalText;
});
