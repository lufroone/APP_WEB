<?php 
    require 'connexion_bdd_config.php';

        
        $conn->query("UPDATE `Equipement_Particulier__Local` SET `ID_Noeud`='".$_GET["ID_Lieu"]."' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");

        echo "[]";
?>