<?php 
    require 'connexion_bdd_config.php';


        if($_GET["Nouveau_Nom"] != ""){
            $conn->query("UPDATE Equipement__Local SET Nom_Equipement='".$_GET["Nouveau_Nom"]."' WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Description"] != ""){
            $conn->query("UPDATE Equipement__Local SET Description_Equipement='".$_GET["Nouvelle_Description"]."' WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Image"] != ""){
            $conn->query("UPDATE Equipement__Local SET Image_Equipement='".$_GET["Nouvelle_Image"]."' WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Categorie_Secondaire"] != ""){
            $req = $conn->query("SELECT ID_Categorie FROM Categorie__Local WHERE Nom_Categorie='".$_GET["Nouvelle_Categorie_Secondaire"]."'");
            $ID_Categorie = $req->fetch_assoc();

            $conn->query("UPDATE Equipement__Local SET ID_Categorie_Equipement='".$ID_Categorie["ID_Categorie"]."' WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");
        }

        echo '["'.$_GET["ID_Equipement"].'"]';
?>