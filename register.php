<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/styles/styles.css">
    <title> MC © </title>
    <link rel="icon" type="image/x-icon" href="./assets/img/ordi.jpg">
</head>

<body>
<h1 class="titre"> Mystic Conundrums </h1>
    <div class="container">
        <h2>S'inscrire</h2>
        <div class="align">
        <form action="registration.php" method="POST">
            <label for="firstname">Nom:</label>
            <input type="text" id="firstname" name="firstname" required>
            <br>
            <label for="lastname">Prénom:</label>
            <input type="text" id="lastname" name="lastname" required>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <?php
             if (isset($_GET["error"]) && $_GET["error"] == "email_exists") {
              echo "L'adresse e-mail que vous avez entrée existe déjà.";}
            ?>
            <br>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <label for="birthdate">Date de naissance:</label>
            <input type="date" id="birthdate" name="birthdate" required>
            <br>
            <br>
            <div class="btn align">
            <button type="submit" class="connexion">Inscription</button>
            </div>
        </form>
    </div>
</body>

</html>