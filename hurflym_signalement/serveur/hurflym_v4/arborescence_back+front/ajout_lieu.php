<?php 
    require 'connexion_bdd_config.php';

        $profondeur_precedent = $conn->query("SELECT Profondeur FROM Noeud__Local WHERE ID_Noeud='".$_GET["Precedent"]."'");

        $profondeur_prec = $profondeur_precedent->fetch_assoc();

        $profondeur_actuel = $profondeur_prec["Profondeur"] + 1;

        $conn->query('INSERT INTO Noeud__Local VALUES("0","'.$_GET["Precedent"].'","'.$_GET["Nom_Element"].'","'.$_GET["Localisation"].'","'.$profondeur_actuel.'", "0", "'.$_GET["ID_Etablissement"].'")');

        $test_1 = $conn->query("SELECT ID_Noeud FROM Noeud__Local WHERE ID_Noeud = (SELECT MAX(ID_Noeud) FROM Noeud__Local WHERE ID_Etablissement='".$_GET["ID_Etablissement"]."')");

        $ID_Equipement_Particulier = $test_1->fetch_assoc();
        
        echo '['.$ID_Equipement_Particulier["ID_Noeud"].']';//json_encode($array);
?>