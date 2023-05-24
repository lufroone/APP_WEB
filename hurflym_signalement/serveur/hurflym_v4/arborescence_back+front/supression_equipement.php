<?php 
    require 'connexion_bdd_config.php';

        

        $conn->query("DELETE FROM Equipement__Local WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");

        // Trouve la table de signalement de l'etablissement puis supprimé la colonne de l'équipement dedans

        $req = $conn->query("SELECT ID_Etablissement FROM Equipement__Local WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");

        $ID_Etablissement = $req->fetch_assoc();

        $conn->query("ALTER TABLE `Incidence".$ID_Etablissement["ID_Etablissement"]."__Local` DROP COLUMN `".$_GET["Nom_Equipement"]."`");

        $conn->query("ALTER TABLE `Signalement".$ID_Etablissement["ID_Etablissement"]."__Local` DROP COLUMN `".$_GET["Nom_Equipement"]."`");

        echo "[]";
?>