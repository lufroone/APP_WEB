<?php 
    require 'connexion_bdd_config.php';


        $categorie_premiere = $conn->query('SELECT * FROM Noeud__Local WHERE ID_Noeud='.$_GET["ID_Noeud"].'');
        $result_cat_1 = $categorie_premiere->fetch_assoc();

        echo '["'.$result_cat_1["Precedent"].'"]';

?>