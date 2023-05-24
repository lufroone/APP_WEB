<?php 
        require 'connexion_bdd_config.php';

        setcookie('mail_utilisateur_hurflym', $_POST["email"], time() + (3* 60 * 60), "/");
        setcookie('csrf_token_hurflym', $_POST["token"], time() + (3* 60 * 60), "/");

        echo '[]';
        
?>