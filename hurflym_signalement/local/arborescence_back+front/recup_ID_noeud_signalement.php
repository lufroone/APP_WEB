<?php 
    require 'connexion_bdd_config.php';


        $categorie_premiere = $conn->query('SELECT * FROM Signalement'.$_GET["ID_Etablissement"].'__Local');
        $result_cat_1 = $categorie_premiere->fetch_assoc();

        echo '["'.$result_cat_1["ID_Noeud"].'"]';

?>