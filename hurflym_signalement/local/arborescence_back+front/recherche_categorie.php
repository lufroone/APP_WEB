<?php 
    require 'connexion_bdd_config.php';

        $categorie_premiere = $conn->query("SELECT Nom_Categorie FROM Categorie__Local WHERE ID_Categorie='".$_GET["ID_Categorie"]."'");

        $result_cat_1 = $categorie_premiere->fetch_assoc();

        echo '["'.$result_cat_1["Nom_Categorie"].'"]';
?>