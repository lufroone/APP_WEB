<?php 
    require 'connexion_bdd_config.php';

        $conn->query("UPDATE Noeud__Local SET Precedent='".$_GET["Precedent"]."' WHERE ID_Noeud='".$_GET["ID_Noeud"]."'");

        echo '[]';
?>