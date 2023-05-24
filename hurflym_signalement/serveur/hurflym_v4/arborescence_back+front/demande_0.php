<?php 
    require 'connexion_bdd_config.php';

        $categorie_premiere = $conn->prepare('SELECT * FROM Noeud__Local WHERE ID_Etablissement = "'.$_GET["ID_Etablissement"].'" AND Profondeur=0 ');
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();
?>