<?php
session_start();

include('connect_database.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Authentification
    $query = "SELECT * FROM joueur WHERE email = :email AND password = SHA2(:password, 256)";
    $stmt = $database->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $_SESSION["user_email"] = $email;
        header("Location: game1.php"); // Redirection après une authentification réussie
        exit;
    } else {
        // L'utilisateur n'existe pas, redirigez-le vers la page d'inscription
        header("Location: register.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
    <h1>Connexion</h1>
    <form method="POST" action="login.php">
        <label for="email">Email :</label>
        <input type="email" name="email" required><br>

        <label for="password">Mot de passe :</label>
        <input type="password" name="password" required><br>

        <input type="submit" value="Se connecter">
    </form>
</body>
</html>
