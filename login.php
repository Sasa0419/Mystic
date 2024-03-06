<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/styles/styles.css">
    <title> MC © </title>
    <link rel="icon" type="image/x-icon" href="./assets/img/ordi.jpg">
</head>

<body>
    <h1 class="titre"> Mystic Conundrums </h1>
    <div class="container">
        <h2>Se connecter</h2>
        <div class="align">
            <form action="authenticate.php" method="POST">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <br>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required>
                <br>
        </div>
        <div class="align btn">
            <button class="connexion">Connexion</button>
        </div>
        </form>
        <p class="align">Pas encore inscrit? <a id="space" href="register.php"> Inscription</a></p>
        <a class="align" id="space" href="oublier.php">Mot de passe oublié ? </a>
    </div>
</body>

</html>