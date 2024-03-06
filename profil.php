<?php

include('connect_database.php');




session_start();

if (!isset($_SESSION['user_email'])) {
    header('Location: login.php'); 
    exit;
}

$userEmail = $_SESSION['user_email'];

try {
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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/styles/profil.css">
    <link rel="stylesheet" href="assets/styles/modal.css">
    <script src="assets/script/avatar.js" defer></script>
    <script src="assets/script/retour.js" defer></script>
    <script src="assets/script/deconnexion.js" defer></script>
    <title> MC © </title>
</head>

<body>

    <div class="container">
        <h2>Profil</h2>
        <div class="align">
        


        <form method="POST" action="update_profil.php" enctype="multipart/form-data">

    
        <div class="avatar-container">
            <!-- Affichage de l'avatar actuel -->
        <?php if (!empty($userData['avatar'])): ?>
            <img class="avatar" id="avatar-preview" src="<?php echo $userData['avatar']; ?>" alt="">
        <?php else: ?>
            <img class="avatar d-none" id="avatar-preview" src="" alt="">
        <?php endif; ?>

                    
            <label for="avatar-input" class="avatarPlus">➕</label>
            <!-- Ajoutez ce bouton pour ouvrir la modal de choix d'avatar -->


            
            <input type="file" id="avatar-input" name="avatar_file" accept="image/*" style="display: none;">
            
        <input type="hidden" name="current_avatar" value="<?php echo $userData['avatar']; ?>">

        </div>
        <label for="pseudo">Pseudo :</label>
        <input type="text" name="pseudo" value="<?php echo $userData['pseudo']; ?>" class="input-pseudo" >
        
        <label for="lastname">Nom :</label>
        <input type="text" name="lastname" value="<?php echo $userData['lastname']; ?>">

        <label for="firstname">Prénom :</label>
        <input type="text" name="firstname" value="<?php echo $userData['firstname']; ?>">

        <label for="birthdate">Date de naissance :</label>
        <input type="date" name="birthdate" value="<?php echo $userData['birthdate']; ?>" class="input-date">


        <label for="email">Email :</label>
        <input type="email" name="email" value="<?php echo $userData['email']; ?>">

        <label for="password">Nouveau mot de passe :</label>
        <input type="password" name="password">
</div>
        <input type="submit" id="Retour" class="connexion" value="Mettre à jour">

    </form>
</div>
</body>
</html>
