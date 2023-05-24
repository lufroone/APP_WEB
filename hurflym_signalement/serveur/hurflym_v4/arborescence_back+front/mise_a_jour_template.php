<?php 
    require 'connexion_bdd_config.php';

        
        $conn->query("UPDATE `Template".$_GET["ID_Etablissement"]."__Local` SET `".$_GET["ID_Equipement"]."`='1' WHERE `ID_Template`='".$_GET["ID_Template"]."'");

        echo "[]";
?>