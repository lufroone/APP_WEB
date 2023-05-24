<?php 
        require 'connexion_bdd_config.php';

        session_start();
        $_SESSION["mail"] = $_POST["email"];
        $_SESSION["csrf_token"] = $_POST["csrf_token"];
        $_SESSION["temp_token"] = bin2hex(random_bytes(32));
        $_SESSION["connection"] = true;

        echo '[]';
        
?>