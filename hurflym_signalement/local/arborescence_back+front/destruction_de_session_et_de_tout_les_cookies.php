<?php 
    require 'connexion_bdd_config.php';

        if(isset($_POST["session_initialise"]) && $_POST["session_initialise"] == "true"){
            session_destroy();
        }
        
        session_unset();
        setcookie('mail_utilisateur_hurflym', '', time()-(3*60*60), "/");
        setcookie('csrf_token_hurflym', '', time()-(3*60*60), "/");

        echo '[]';

?>