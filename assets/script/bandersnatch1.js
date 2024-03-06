// Liste des niveaux
const niveaux = [
  {
    question: "En JavaScript, quelle méthode est utilisée pour supprimer le dernier élément d'un tableau ?",
    choix: [
      { texte: "pop()", correct: true },
      { texte: "remove()", correct: false },
      { texte: "delete()", correct: false }
    ]
  }
  // Ajoutez ici les autres niveaux avec leurs questions et choix
];

// Récupérez le score à partir de localStorage ou initialisez-le à zéro
let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez l'élément score par son ID
const scoreElement = document.getElementById("score");

// Initialisez le niveau actuel à zéro
let niveauActuel = 0;

function afficherNiveau() {
  const niveau = niveaux[niveauActuel];
  document.getElementById("question").innerText = niveau.question;

  const choixContainer = document.getElementById("choix");
  choixContainer.innerHTML = "";

  niveau.choix.forEach((choix, index) => {
    const bouton = document.createElement("button");
    bouton.innerText = choix.texte;
    bouton.addEventListener("click", () => verifierReponse(index));
    choixContainer.appendChild(bouton);
  });
}

function verifierReponse(index) {
  const niveau = niveaux[niveauActuel];

  if (niveau.choix[index].correct) {

    if (niveauActuel < niveaux.length) {
      setTimeout(afficherNiveau, 2000);


      score += 5;
      localStorage.setItem('score', score);
      scoreElement.innerText = "Score : " + score;
      window.location.href = "game4.php";
    }
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
afficherNiveau();