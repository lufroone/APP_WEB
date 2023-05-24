<?php 
        require 'connexion_bdd_config.php';

        session_start();
        $_SESSION["mail"] = $_POST["email"];
        $_SESSION["token"] = $_POST["csrf_token"];
        echo '[]';
        
?>