<?php 
    require 'connexion_bdd_config.php';

        try{
            $sql = "SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur='".$_POST["Mail_Utilisateur"]."'";
            $conn->query($sql);
            echo '[{"validation" : "false"}]';
        }catch(Exception $e){
            echo '[{"validation" : "true"}]';
        }

    
?>