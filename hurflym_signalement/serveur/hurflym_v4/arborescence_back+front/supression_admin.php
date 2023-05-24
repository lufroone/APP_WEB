<?php 
    require 'connexion_bdd_config.php';

        $id_utilisateur = $conn->query("SELECT ID_Utilisateur FROM Professionnel__Local WHERE ID_Professionnel='".$_GET["ID_Professionnel"]."'");
        $id_utilisateur = $id_utilisateur->fetch_assoc();

        $conn->query("DELETE FROM Professionnel__Local WHERE ID_Professionnel='".$_GET["ID_Professionnel"]."'");


        $conn->query("DELETE FROM Utilisateur__Local WHERE ID_Utilisateur='".$id_utilisateur["ID_Utilisateur"]."'");

        echo "[".$id_utilisateur["ID_Utilisateur"]."]";
?>