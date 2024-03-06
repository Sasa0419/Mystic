<?php
include('connect_database.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $birthdate = $_POST["birthdate"];

    // Vérifier si l'e-mail existe déjà dans la base de données
    $check_query = "SELECT COUNT(*) FROM joueur WHERE email = :email";
    $check_stmt = $database->prepare($check_query);
    $check_stmt->bindParam(":email", $email);
    $check_stmt->execute();
    $email_exists = $check_stmt->fetchColumn();

    if ($email_exists) {
        // L'e-mail existe déjà, afficher un message d'erreur dans register.php
        header("Location: register.php?error=email_exists");
        exit;
    } else {
        // L'e-mail n'existe pas, effectuer l'insertion
        $insert_query = "INSERT INTO joueur (lastname, firstname, birthdate, email, password) 
              VALUES (:lastname, :firstname, :birthdate, :email, SHA2(:password, 256))";

        try {
            $stmt = $database->prepare($insert_query);
            $stmt->bindParam(":lastname", $lastname);
            $stmt->bindParam(":firstname", $firstname);
            $stmt->bindParam(":birthdate", $birthdate);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $password);
            $stmt->execute();
            echo "Insertion réussie !"; // Message de débogage
            header("Location: login.php");
            exit;
        } catch (PDOException $e) {
            echo "Erreur : " . $e->getMessage(); // Message d'erreur
        }
    }
}
?>
