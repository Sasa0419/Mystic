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
    <link rel="stylesheet" href="assets/styles/labyrinthe.css">
    <script src="assets/script/deconnexion.js" defer></script>
    <script src="assets/script/scriptL.js"defer></script>
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

<div id="score" class="score">Score : 0</div> 

<div class="ligne">
        <div class="fenetre">
        <div class="display">
            <p class="p">Niveau 14</p>
            <button class="btn1 test-event"> x </button>
            <button class="btn1 test-eventt"> □ </button>
            <button class="btn1 test-eventt"> _ </button>
        </div>

        <div id="laby">
        <div id="maze" >
            <div id="thingie">
                <div class="emo" id="emo">🐁</div>
            </div>
            <div id="home">
                <div class="emo">🦠</div>
            </div>
            <div class="barrier" id="top"></div>
            <div class="barrier" id="bottom"></div>
        </div></div>
       
        <div class="clavier">
            <div class="buttons">
                <button class="btnn" id="bu">
                    <div class="chevron">↑</div>
                </button>
                <button class="btnn" id="bd">
                    <div class="chevron">↓</div>
                </button>
                <button class="btnn" id="bl">
                    <div class="chevron">←</div>
                </button>
                <button class="btnn" id="br">
                    <div class="chevron">→</div>
                </button>
            </div>
        </div>
    </div>
    

</html>