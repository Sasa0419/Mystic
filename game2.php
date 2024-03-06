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
    <title></title>
    <link rel="stylesheet" href="assets/styles/jeux.css">
    <script src="assets/script/calculatrice.js" defer></script>
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
<div class="guess-contenair">
<h1 class="guess"> Guess de number start 1 end 100 </h1>
</div>
<div id="main">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"
            integrity="sha512-SttpKhJqONuBVxbRcuH0wezjuX+BoFoli0yPsnrAADcHsQMW8rkR84ItFHGIkPvhnlRnE2FaifDOUw+EltbuHg=="
            crossorigin="anonymous"></script>
        <script type="text/javascript">
            VanillaTilt.init(document.querySelector("#main"), {
                max: 80,
                speed: 400,
                glare: true
            });
        </script>



        <div id="display">
            <p id="result"></p>
        </div>
        <div id="number">
            <div id="content">
                <div>
                    <button id="valeur-1" class="btn-chiffre">1</button>
                    <button id="valeur-2" class="btn-chiffre">2</button>
                    <button id="valeur-3" class="btn-chiffre">3</button>
                </div>
                <div>
                    <button id="valeur-4" class="btn-chiffre">4</button>
                    <button id="valeur-5" class="btn-chiffre">5</button>
                    <button id="valeur-6" class="btn-chiffre">6</button>
                </div>
                <div>
                    <button id="valeur-7" class="btn-chiffre">7</button>
                    <button id="valeur-8" class="btn-chiffre">8</button>
                    <button id="valeur-9" class="btn-chiffre">9</button>
                </div>
                <div>
                    <button id="valeur-0" class="btn-chiffre-0">0</button>
                </div>
            </div>
        </div>
        <div id="operator">
            <div id="content-bis">
                <button id="valeur-egal" class="btn-op">=</button>
                <button id="valeur-delete" class="btn-op">C</button>
            </div>
        </div>
    </div>
</body>

</html>