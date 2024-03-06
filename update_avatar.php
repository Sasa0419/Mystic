<?php
// Inclure le fichier de connexion à la base de données
include('connect_database.php');

// Vérifiez si l'utilisateur est connecté
session_start();

if (!isset($_SESSION['user_email'])) {
    // Gérez l'erreur ici si l'utilisateur n'est pas connecté
    echo json_encode(array('success' => false, 'message' => 'Utilisateur non connecté'));
    exit;
}

$userEmail = $_SESSION['user_email'];

// Gestion de l'avatar
$avatar = null;

if ($_FILES['avatar_file']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = './avatars/'; // Répertoire où vous souhaitez enregistrer les avatars
    $avatarName = $_FILES['avatar_file']['name'];
    $avatarPath = $uploadDir . $avatarName;

    if (move_uploaded_file($_FILES['avatar_file']['tmp_name'], $avatarPath)) {
        $avatar = $avatarPath; // Utilisez le nouveau chemin de l'avatar si un nouvel avatar a été téléchargé

        // Mettez à jour l'avatar dans la base de données
        try {
            $query = "UPDATE joueur SET avatar = :avatar WHERE email = :userEmail";
            $stmt = $database->prepare($query);
            $stmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
            $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);

            if ($stmt->execute()) {
                // Mise à jour réussie
                echo json_encode(array('success' => true));
                exit;
            } else {
                echo json_encode(array('success' => false, 'message' => 'Erreur lors de la mise à jour de l\'avatar'));
            }
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'message' => 'Erreur lors de la mise à jour de l\'avatar : ' . $e->getMessage()));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => 'Erreur lors du téléchargement de l\'avatar.'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Aucun fichier d\'avatar sélectionné.'));
}
?>
