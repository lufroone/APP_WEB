<?php 
    require 'connexion_bdd_config.php';

        if($_GET["Nom"] != ""){
            $conn->query("UPDATE Noeud__Local SET Nom_Element='".$_GET["Nom"]."' WHERE ID_Noeud='".$_GET["ID_Noeud"]."'");
        }
        

        if($_GET["Localisation"] != ""){
            $conn->query("UPDATE Noeud__Local SET Localisation='".$_GET["Localisation"]."' WHERE ID_Noeud='".$_GET["ID_Noeud"]."'");
        }

        echo '[]';
?>