<?php 
    try
    {
        $dsn = 'mysql:host=54.37.31.19;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
	    die('Erreur : ' . $e->getMessage());
    }


        $servername = "54.37.31.19";
        $username = "u118526083_Lufroone";
        $password = "2=nG!jR60";
        $dbname = "u118526083_Hurflym";

        // Créer une conexion
        $conn = new mysqli($servername, $username, $password, $dbname);
        // verifier la connexion
        if ($conn->connect_error) {
        die("La connexion a échouée: " . $conn->connect_error);
        }

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
            $to = 'new_member@example.com';
            $subject = 'Validation de votre inscription';
            $message = 'Pour valider votre inscription, veuillez cliquer sur ce lien : ' . $validation_url;
            $headers = 'From: no-reply@example.com' . "\r\n";

            mail($to, $subject, $message, $headers);

            echo '[{"validation" : "true"},';
        }catch(Exception $e){
            echo '[{"validation" : "false"},';
        }
    
?>