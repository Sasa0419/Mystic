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
    <link rel="stylesheet" href="assets/styles/dark.css">
    <script src="assets/script/deconnexion.js" defer></script>
    <script src="assets/script/scriptD.js" defer></script>
    <title> MC © </title>
    <link rel="icon" type="image/x-icon" href="./assets/img/ordi.jpg">
</head>
<body>

<div class="container">
<div id="score" class="score">Score : 0</div> 
    <button id="a">I</button>
    <button id="b">N</button>
    <button id="c">T</button>
    <button id="d">E</button>
    <button id="e">R</button>
    <button id="f">F</button>
    <button id="g">A</button>
    <button id="h">C</button>
    <button id="i">E</button>
    <button id="j">3</button>
</div>
</body>
</html>
