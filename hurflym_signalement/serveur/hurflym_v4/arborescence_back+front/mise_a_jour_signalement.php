<?php 
    require 'connexion_bdd_config.php';

        
        $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `".$_GET["ID_Equipement"]."`='1' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");

        echo "[]";
?>