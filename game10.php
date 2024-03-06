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
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Niveau 10</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <!-- Stylesheet -->
    <link rel="stylesheet" href="assets/styles/pendu.css" />
    <script src="assets/script/deconnexion.js" defer></script>
    <script src="assets/script/scriptP.js" defer ></script>
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

    <div class="container">

    
        <div class="display">
            <p class="p">Niveau 10</p>
            <button class="btn1 test-event"> x </button>
            <button class="btn1 test-eventt"> □ </button>
            <button class="btn1 test-eventt"> _ </button>
        </div>
        <div id="options-container"></div>
        <div id="letter-container" class="letter-container hide"></div>
        <div id="user-input-section"></div>
        <canvas id="canvas"></canvas>
        <div id="new-game-container" class="new-game-popup hide">
            <div id="result-text"></div>
            <button id="new-game-button"></button>
        </div>
    </div>
</body>

</html>