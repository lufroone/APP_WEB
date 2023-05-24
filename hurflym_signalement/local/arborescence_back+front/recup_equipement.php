<?php 
    require 'connexion_bdd_config.php';


        $categorie_premiere = $conn->prepare('SELECT * FROM Equipement__Local');
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $json .= '{ "ID_Equipement" : "'.$row["ID_Equipement"].'","Nom_Equipement" : "'.$row["Nom_Equipement"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Equipement" : "'.$row["Image_Equipement"].'","Description_Equipement" : "'.$row["Description_Equipement"].'","ID_Etablissement" : "'.$row["ID_Etablissement"].'" }';
                
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Equipement" : "'.$row["ID_Equipement"].'","Nom_Equipement" : "'.$row["Nom_Equipement"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Equipement" : "'.$row["Image_Equipement"].'","Description_Equipement" : "'.$row["Description_Equipement"].'","ID_Etablissement" : "'.$row["ID_Etablissement"].'" }';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
            
        echo $json;

?>