<?php 
    require 'connexion_bdd_config.php';


        $conn->query('INSERT INTO Utilisateur__Local VALUES("0","'.$_GET["Nom_Administrateur"].'","'.$_GET["Prenom_Administrateur"].'","'.$_GET["Mail_Administrateur"].'","'.$_GET["Username_Administrateur"].'","'.$_GET["Mot_de_passe_Administrateur"].'")');

        $test_1 = $conn->query("SELECT ID_Utilisateur FROM Utilisateur__Local WHERE ID_Utilisateur = (SELECT MAX(ID_Utilisateur) FROM Utilisateur__Local)");

        $ID_Utilisateur = $test_1->fetch_assoc();

        $req = "INSERT INTO Professionnel__Local VALUES ('0','".$ID_Utilisateur["ID_Utilisateur"]."','2','0','0','".$_GET["ID_Etablissement"]."')";

        $conn->query($req);
        
        echo '[]';
?>