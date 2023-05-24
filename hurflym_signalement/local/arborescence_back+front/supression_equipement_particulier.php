<?php 
    require 'connexion_bdd_config.php';


        $conn->query("DELETE FROM Equipement_Particulier__Local WHERE ID_Ep='".$_GET["ID_Ep"]."'");

        echo "[]";
?>