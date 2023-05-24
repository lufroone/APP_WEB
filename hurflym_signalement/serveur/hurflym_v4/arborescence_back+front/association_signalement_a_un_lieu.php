<?php 
    require 'connexion_bdd_config.php';

        
        $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `ID_Noeud`='".$_GET["ID_Lieu"]."' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");

        echo "[]";
?>