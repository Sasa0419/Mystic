function previewAvatar(event) {
    const avatarPreview = document.getElementById('avatar-preview');
    const avatarInput = event.target;

    if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            avatarPreview.src = e.target.result;
            avatarPreview.classList.remove('d-none');
        };

        reader.readAsDataURL(avatarInput.files[0]);

        // Envoi de l'avatar au serveur
        const formData = new FormData();
        formData.append('avatar_file', avatarInput.files[0]);

        // Utilisation de fetch pour envoyer l'avatar via une requête AJAX
        fetch('update_avatar.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mise à jour réussie
                console.log('Avatar mis à jour avec succès');
            } else {
                // Erreur lors de la mise à jour
                console.error('Erreur lors de la mise à jour de l\'avatar');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête AJAX : ' + error);
        });
    } else {
        avatarPreview.src = "<?php echo $userData['avatar']; ?>";
        avatarPreview.classList.add('d-none');
    }
}

// Lorsque l'utilisateur sélectionne un fichier, appelez la fonction de prévisualisation
document.getElementById('avatar-input').addEventListener('change', previewAvatar);

// Écouteur d'événement sur le bouton "Choisir une image"
document.getElementById('choose-avatar').addEventListener('click', function () {
    document.getElementById('avatar-input').click();
});



