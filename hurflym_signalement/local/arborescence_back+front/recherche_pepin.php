<?php 
    require 'connexion_bdd_config.php';

        $conn->query("SELECT * FROM Pepin".$_GET["ID_Etablissement"]."__Local WHERE ID_Utilisateur='".$_GET["ID_Utilisateur"]."' AND Etat='1' ");


        echo '[]';

    
?>