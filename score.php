<?php

session_start();

$userEmail = $_SESSION['user_email'];

 

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["score"])) {

    // Assurez-vous d'inclure la connexion à votre base de données ici.

    include('connect_database.php'); // Incluez votre fichier de connexion à la base de données.

 

    $score = intval($_POST["score"]);

 

    // Obtenez l'ID de l'utilisateur à partir de la session en utilisant son email.

    $query = "SELECT id FROM joueur WHERE email = :email";

    $stmt = $database->prepare($query); // Utilisez la variable $database pour la préparation de la requête.

    $stmt->bindParam(':email', $userEmail, PDO::PARAM_STR);

    $stmt->execute();

 

    // Vérifiez si un utilisateur avec cet email existe dans la base de données.

    if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $idUser = $row["id"];

 

        // Enregistrez le score dans la base de données pour l'utilisateur donné.

        $query = "UPDATE joueur SET score = :score WHERE id = :id";

        $stmt = $database->prepare($query); // Utilisez la variable $database pour la préparation de la requête.

        $stmt->bindParam(':score', $score, PDO::PARAM_INT);

        $stmt->bindParam(':id', $idUser, PDO::PARAM_INT);

 

        if ($stmt->execute()) {

            // Le score a été enregistré avec succès.

            echo "Score enregistré avec succès.";

 

            // Réinitialisez le score dans localStorage

            echo '<script>localStorage.setItem("score", 0);</script>';

        } else {

            // Une erreur s'est produite lors de l'enregistrement du score.

            echo "Erreur lors de l'enregistrement du score : " . print_r($stmt->errorInfo(), true);

        }

    } else {

        // L'utilisateur n'a pas été trouvé dans la base de données (erreur de correspondance email).

        echo "Erreur : Utilisateur non trouvé.";

    }

} else {

    echo "Erreur : Le score n'a pas été transmis correctement.";

}

$score = intval($_POST["score"]);

error_log("Score reçu : " . $score);

?>

 