<?php 
    require 'connexion_bdd_config.php';

        $etat = $conn->query("SELECT * FROM Signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Signalement='".$_GET["ID_Signalement"]."'");
        $etat = $etat->fetch_assoc();

        if($etat["Signalement_Actif"] == 1){
            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `Signalement_Actif`='0' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");
            $conn->query("INSERT INTO Historique_des_activations_signalements__Local VALUES('0','".$_GET["ID_Etablissement"]."', '".$_GET["ID_Signalement"]."', '0', '".date('d-m-y h:i:s')."')");
            echo"[0]";
        }
        if($etat["Signalement_Actif"] == 0){
            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `Signalement_Actif`='1' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");
            $conn->query("INSERT INTO Historique_des_activations_signalements__Local VALUES('0','".$_GET["ID_Etablissement"]."', '".$_GET["ID_Signalement"]."', '1', '".date('d-m-y h:i:s')."')");
            echo"[1]";
        }

        
?>