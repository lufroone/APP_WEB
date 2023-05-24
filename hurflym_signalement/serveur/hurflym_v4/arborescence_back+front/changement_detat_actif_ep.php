<?php 
    require 'connexion_bdd_config.php';

        $etat = $conn->query("SELECT * FROM Equipement_Particulier__Local WHERE ID_Ep='".$_GET["ID_Ep"]."'");
        $etat = $etat->fetch_assoc();

        if($etat["Ep_Actif"] == 1){
            $conn->query("UPDATE `Equipement_Particulier__Local` SET `Ep_Actif`='0' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");
            echo"[0]";
        }
        if($etat["Ep_Actif"] == 0){
            $conn->query("UPDATE `Equipement_Particulier__Local` SET `Ep_Actif`='1' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");
            echo"[1]";
        }
?>