const niveaux = [
    {
      titre: "Niveau 6",
      histoire: "Félicitations pour avoir terminé le niveau 5 !",
      question: "Quel est le langage de balisage utilisé pour structurer le contenu d'une page web ?",
      choix: [
        { texte: "HTML", resultat: "Bravo ! Vous avez choisi la bonne réponse." },
        { texte: "CSS", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "JavaScript", resultat: "Dommage ! Ce n'est pas la bonne réponse." }
      ]
    },
    {
      titre: "Niveau 7",
      histoire: "Félicitations pour avoir terminé le niveau 7 !",
      question: "Quel langage est utilisé pour styliser le contenu d'une page web ?",
      choix: [
        { texte: "HTML", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "CSS", resultat: "Bravo ! Vous avez choisi la bonne réponse." },
        { texte: "JavaScript", resultat: "Dommage ! Ce n'est pas la bonne réponse." }
      ]
    },
    {
      titre: "Niveau 8",
      histoire: "Félicitations pour avoir terminé le niveau 8 !",
      question: "Quel langage est utilisé pour rendre une page web interactive ?",
      choix: [
        { texte: "HTML", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "CSS", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "JavaScript", resultat: "Bravo ! Vous avez choisi la bonne réponse." }
      ]
    },
    {
      titre: "Niveau 9",
      histoire: "Félicitations pour avoir terminé le niveau 9 !",
      question: "Quel langage de programmation est utilisé pour la logique et le traitement des données côté client dans les pages web ?",
      choix: [
        { texte: "HTML", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "CSS", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "JavaScript", resultat: "Bravo ! Vous avez choisi la bonne réponse." }
      ]
    },
    {
      titre: "Niveau 10",
      histoire: "Félicitations pour avoir terminé le niveau 10 !",
      question: "Quelle est la méthode utilisée pour sélectionner un élément HTML par son ID en JavaScript ?",
      choix: [
        { texte: "getElementByTag", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "getElementByClass", resultat: "Dommage ! Ce n'est pas la bonne réponse." },
        { texte: "getElementById", resultat: "Bravo ! Vous avez choisi la bonne réponse." }
      ]
    },
    // Ajoutez ici les autres niveaux avec leurs questions et choix
  ];
  
  let niveauActuel = 0;
  
  function afficherNiveau() {
    const niveau = niveaux[niveauActuel];
    document.getElementById("niveau-titre").innerText = niveau.titre;
    document.getElementById("histoire").innerText = niveau.histoire;
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
    const resultat = document.getElementById("resultat");
  
    if (index === niveau.choix.findIndex(choix => choix.resultat.includes("Bravo"))) {
      resultat.innerText = niveau.choix[index].resultat;
  
      niveauActuel++;
      if (niveauActuel < niveaux.length) {
        setTimeout(afficherNiveau, 2000);
      } else {
        window.location.href = "game7.php";
      }
    } else {
    window.location.href = "game_over.php";
    }
  }
  
  afficherNiveau();
  
