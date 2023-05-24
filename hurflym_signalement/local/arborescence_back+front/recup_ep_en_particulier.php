<?php 
    require 'connexion_bdd_config.php';

        $categorie_premiere = $conn->query('SELECT * FROM Equipement_Particulier__Local WHERE ID_Ep="'.$_GET["ID_Ep"].'"');
        $row = $categorie_premiere->fetch_assoc();


        $json = "["; //Ajouter le crochet au début.

        $json .= '{ "ID_Ep" : "'.$row["ID_Ep"].'","Nom_Ep" : "'.$row["Nom_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Equipement" : "'.$row["Image_Equipement"].'","ID_Noeud" : "'.$row["ID_Noeud"].'", "Ep_Actif" : "'.$row['Ep_Actif'].'"}';
                

        $json .= "]"; // fermer le JSON
        echo $json;

?>