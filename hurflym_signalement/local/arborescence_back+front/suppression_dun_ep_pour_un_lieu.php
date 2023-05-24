<?php 
    require 'connexion_bdd_config.php';

            $conn->query("UPDATE `Equipement_Particulier__Local` SET `Ep_Actif`='0' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");

            $conn->query("UPDATE `Equipement_Particulier__Local` SET `ID_Noeud`='0' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");
        
        echo"[]";

?>