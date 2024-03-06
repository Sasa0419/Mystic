<?php
// Inclure le fichier de connexion à la base de données
include('connect_database.php');

// Vérifiez si l'utilisateur est connecté
session_start();

if (!isset($_SESSION['user_email'])) {
    // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
    header('Location: login.php'); // Remplacez 'login.php' par le chemin de votre page de connexion
    exit;
}

$userEmail = $_SESSION['user_email'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Traitement de la mise à jour
    $lastname = $_POST['lastname'];
    $firstname = $_POST['firstname'];
    $birthdate = $_POST['birthdate'];
    $email = $_POST['email'];
    $plainPassword = $_POST['password']; // Mot de passe en texte brut

    // Hacher le mot de passe en utilisant l'algorithme SHA-256 (SHA-2)
    $hashedPassword = hash('sha256', $plainPassword);

    $pseudo = $_POST['pseudo'];

    // Gestion de l'avatar
   $currentAvatar = $_POST['current_avatar'];

// Gestion de l'avatar
$avatar = $currentAvatar; // Initialisez la variable avec l'avatar actuel

if ($_FILES['avatar_file']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = './avatars/'; // Répertoire où vous souhaitez enregistrer les avatars
    $avatarName = $_FILES['avatar_file']['name'];
    $avatarPath = $uploadDir . $avatarName;

    if (move_uploaded_file($_FILES['avatar_file']['tmp_name'], $avatarPath)) {
        $avatar = $avatarPath; // Utilisez le nouveau chemin de l'avatar si un nouvel avatar a été téléchargé
    } else {
        echo "Erreur lors du téléchargement de l'avatar.";
    }
}


    try {
        // Mettez à jour les données de l'utilisateur dans la base de données en utilisant PDO
        $query = "UPDATE joueur SET lastname = :lastname, firstname = :firstname, birthdate = :birthdate, email = :email, password = :password, pseudo = :pseudo, avatar = :avatar WHERE email = :userEmail";
        $stmt = $database->prepare($query);
        $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $stmt->bindParam(':birthdate', $birthdate, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR); // Utilisation du mot de passe haché
        $stmt->bindParam(':pseudo', $pseudo, PDO::PARAM_STR);
        $stmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
        $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);

        if ($stmt->execute()) {
            // Mise à jour réussie
           {
                header('Location: profil.php?updated=true'); // Si l'URL précédente n'a pas été enregistrée, redirigez vers la page de profil avec un paramètre GET "updated"
                exit;
            }
        } else {
            echo "Erreur lors de la mise à jour du profil.";
        }
    } catch (PDOException $e) {
        echo "Erreur lors de la mise à jour du profil : " . $e->getMessage();
    }
}
?>
