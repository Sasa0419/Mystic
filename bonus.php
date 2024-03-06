<?php
session_start();
include('connect_database.php');

if (!isset($_SESSION['user_email'])) {
    header("Location: login.php"); 
    exit;
}

// Récupérer les informations de l'utilisateur connecté
$email = $_SESSION['user_email'];
$query = "SELECT * FROM joueur WHERE email = :email";
$stmt = $database->prepare($query);
$stmt->bindParam(":email", $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    header("Location: login.php");
    exit;
}

// Récupérer le score depuis le paramètre GET
if (isset($_GET['score'])) {
    $score = intval($_GET['score']);
} else {
    // Gérez le cas où le score n'est pas défini.
    $score = 0; // Vous pouvez définir une valeur par défaut ou afficher un message d'erreur.
}

// Créez un tableau pour stocker les données de l'utilisateur connecté
$userData = [
    'pseudo' => $user['pseudo'],
    'avatar' => $user['avatar'],
    'score' => $score,
];

// Sélectionnez les données de tous les utilisateurs de la table joueur, y compris l'utilisateur connecté
$query = "SELECT pseudo, avatar, score FROM joueur";
$stmt = $database->prepare($query);
$stmt->execute();

// Récupérez les données sous forme de tableau associatif
$joueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Supprimez l'utilisateur connecté du tableau
$joueurs = array_filter($joueurs, function($joueur) use ($user) {
    return $joueur['pseudo'] !== $user['pseudo'];
});

// Ajoutez les données de l'utilisateur à la fin du tableau
$joueurs[] = $userData;

// Tri des joueurs par score en ordre décroissant
usort($joueurs, function ($a, $b) {
    return $b['score'] - $a['score'];
});
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/styles/bonus.css">
    <script src="assets/script/deconnexion.js" defer></script>
    <title>Votre Titre</title>
    <link rel="icon" type="image/x-icon" href="ordi.jpg">
</head>

<body>
    <nav class="nav">
        <div class="ensemble"></div>
        <div class="nav-items">
            <a href="logout.php" class="button btn" id="deconnexion">Déconnexion</a>
            <a href="profil.php">
                <img class="avatar" id="avatar-preview" src="<?php echo $userData['avatar']; ?>" alt="➕">
            </a>
        </div>
    </nav>

<main>
    <div class="ligne">
        <div class="fenetre">
            <div class="display">
                <button class="btn1 test-event"> x </button>
                <button class="btn1 test-eventt"> □ </button>
                <button class="btn1 test-eventt"> _ </button>
            </div>
            <p class="mystery-text">
                <h1 class="titre">FELICITATIONS</h1>
                <br>vous êtes arrivé au bout !!!
                Attention <?php echo $user['firstname']; ?> <?php echo $user['lastname']; ?> vous êtes sous haute surveillance.
                <br>
                Nous connaissons tous vos secrets les plus sombres. Vous êtes né le <?php echo $user['birthdate']; ?>
                et vous vous trouvez actuellement à Interface3.
                Les ombres vous entourent et il n'y a pas d'échappatoire...
            </p>
        </div>
    </div>

    <div id="top">
        <h2>Classement des Joueurs</h2>
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Avatar</th>
                    <th>Pseudo</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Limitez l'affichage aux 5 premiers joueurs
                foreach (array_slice($joueurs, 0, 5) as $key => $joueur) :
                ?>
                    <tr>
                        <td><?php echo $key + 1; ?></td>
                        <td><img src="<?php echo $joueur['avatar']; ?>" alt=""></td>
                        <td><?php echo $joueur['pseudo']; ?></td>
                        <td><?php echo $joueur['score']; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
                </main>

</body>

</html>