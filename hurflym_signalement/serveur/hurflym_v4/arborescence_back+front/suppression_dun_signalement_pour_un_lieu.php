<?php 
    require 'connexion_bdd_config.php';

            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `Signalement_Actif`='0' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");

            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `ID_Noeud`='0' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");
        
        echo"[]";

?>