<?php 
    require 'connexion_bdd_config.php';

        try{
            session_start();
            $_SESSION['email'] = $_GET["Mail_Utilisateur"];
            $_SESSION['nom'] = $_GET["Nom_Utilisateur"];
            $_SESSION['prenom'] = $_GET["Prenom_Utilisateur"];
            $_SESSION['username'] = $_GET["Username_Utilisateur"];
            $_SESSION['mot_de_passe'] = $_GET["Mot_de_Passe_Utilisateur"];

            // Génération d'un jeton de validation aléatoire
            $token = bin2hex(random_bytes(32));

            // Stockage du jeton dans la session pour vérification ultérieure
            $_SESSION['registration_token'] = $token;

            // Préparation de l'URL de validation
            $validation_url = 'http://localhost/hurflym_signalement/local/arborescence_back+front/validation_dinscription.php?token=' . $token;

            // Envoi de l'email de validation au nouveau membre
            /*$to = 'new_member@example.com';
            $subject = 'Validation de votre inscription';
            $message = 'Pour valider votre inscription, veuillez cliquer sur ce lien : ' . $validation_url;
            $headers = 'From: no-reply@example.com' . "\r\n";*/

            //mail($to, $subject, $message, $headers);

            $conn->query('INSERT INTO utilisateur__local VALUES("0","'.$_GET["Mail_Utilisateur"].'","'.$_GET["Nom_Utilisateur"].'","'.$_GET["Prenom_Utilisateur"].'","'.$_GET["Username_Utilisateur"].'", "'.$_GET["Mot_de_Passe_Utilisateur"].'")');

            echo '[{"validation" : "true"},';
        }catch(Exception $e){
            echo '[{"validation" : "false"},';
        }
    
?>