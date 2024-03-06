<?php
session_start();

// Inclure le fichier de connexion à la base de données
include('connect_database.php');

if (!isset($_SESSION['user_email'])) {
    header('Location: login.php');
    exit;
}

$userEmail = $_SESSION['user_email'];

try {
    // Sélectionnez les données de l'utilisateur à partir de la base de données
    $query = "SELECT * FROM joueur WHERE email = :user_email";
    $stmt = $database->prepare($query);
    $stmt->bindParam(':user_email', $userEmail, PDO::PARAM_STR);
    $stmt->execute();

    $userData = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erreur lors de la récupération des données de l'utilisateur : " . $e->getMessage();
    exit;
}
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/styles/game_over.css">
    <script src="assets/script/retour.js" defer></script>
    <title> MC © </title>
    <link rel="icon" type="image/x-icon" href="./assets/img/ordi.jpg">
</head>
<div>
    <nav>
        <div class="ensemble">
        </div>    
<div class="nav-items">
    <a href="logout.php" class="button btn" id="deconnexion">Déconnexion</a>
    <a href="profil.php">
        <img class="avatar" id="avatar-preview" src="<?php echo $userData['avatar']; ?>" alt="Avatar de l'utilisateur">
    </a>
</div>
    </nav>
</div>

<div id="score" class="score" hidden>Score : 0</div>

<div class="container">
    <h1 class="center">Game Over</h1>
    <div class="clignotant">

        <!-- Erreurs -->
        <?php
        $sorti = rand(1,28); 
        for ($i = 1; $i <= 28; $i++) {
            if ($sorti == $i){
                echo '<p class="sorti error" id="Retour">Exit</p>';
            }
            else{
                echo '<p class="error">Exit</p>';
            }
        }
        ?>
    </div>
</div>

</body>
</html>