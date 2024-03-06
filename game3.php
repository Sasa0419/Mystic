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
    <link rel="stylesheet" href="assets/styles/jeux.css">
    <script src="assets/script/bandersnatch1.js"defer></script>
    <link rel="stylesheet" href="assets/styles/navbar.css">
    <script src="assets/script/deconnexion.js" defer></script>
    <script src="assets/script/btn.js" defer></script>
    <title> MC © </title>
    <link rel="icon" type="image/x-icon" href="./assets/img/ordi.jpg">
</head>
<body>
<nav class="nav">
<div class="ensemble">

</div>
        <div class="nav-items">
    <a href="logout.php" class="button btn" id="deconnexion">Déconnexion</a>
    <a href="profil.php">
        <img class="avatar" id="avatar-preview" src="<?php echo $userData['avatar']; ?>" alt="➕">
    </a>
</div>
</nav>
</div>

<div id="score" class="score">Score : 0</div> 

<div class="ligne">
        <div class=" fenetre">
        <div class="display">
            <p class="p">Niveau 3</p>
            <button class="btn1 test-event"> x </button>
            <button class="btn1 test-eventt"> □ </button>
            <button class="btn1 test-eventt"> _ </button>
        </div>
        <div>
    <div class="reponse">
        
    <p class="question p" id="question"></p>
    
    <div id="choix"></div>
        
    </div>
    </div>
</div>
</body>
</html>
