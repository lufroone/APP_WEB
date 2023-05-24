<?php 
    require 'connexion_bdd_config.php';


        if($_GET["Nouvel_Etat"] != ""){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Etat_Incident='".$_GET["Nouvel_Etat"]."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "2"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Commande='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "3"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Livraison='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "4"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Reparation='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "5"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Classification='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        echo '["'.$_GET["Nouvel_Etat"].'"]';
?>