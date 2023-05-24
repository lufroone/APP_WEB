<?php 
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

        setcookie('mail_utilisateur_hurflym', $_POST["email"], time() + (3* 60 * 60), "/");
        setcookie('csrf_token_hurflym', $_POST["token"], time() + (3* 60 * 60), "/");

        echo '[]';
        
?>