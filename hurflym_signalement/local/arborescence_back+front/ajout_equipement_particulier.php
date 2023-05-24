<?php 
    require 'connexion_bdd_config.php';

        $test = $conn->query("SELECT ID_Categorie FROM Categorie__Local WHERE Nom_Categorie='".$_GET["ID_Categorie_Equipement"]."'");

        $result = $test->fetch_assoc();

        $conn->query("INSERT INTO Equipement_Particulier__Local VALUES('0','".$_GET["Nom_Ep"]."','".$_GET["Description_Ep"]."','".$result["ID_Categorie"]."','".$_GET["Image_Equipement"]."','0','".$_GET["ID_Etablissement"]."','0','0')");
        
        $test_1 = $conn->query("SELECT ID_Ep FROM Equipement_Particulier__Local WHERE ID_Ep = (SELECT MAX(ID_Ep) FROM Equipement_Particulier__Local)");

        $ID_Equipement_Particulier = $test_1->fetch_assoc();

        $req = "INSERT INTO Source__Local(ID_Source,ID_Signalement,ID_Ep,ID_Etablissement) VALUES ('0','0','".$ID_Equipement_Particulier["ID_Ep"]."','".$_GET["ID_Etablissement"]."')";

        $conn->query($req);
        
        echo '['.$ID_Equipement_Particulier["ID_Ep"].']';
?>