<?php 
    require 'connexion_bdd_config.php';

        $categorie_premiere = $conn->prepare('SELECT * FROM Equipement_Particulier__Local WHERE ID_Etablissement="'.$_GET["ID_Etablissement"].'"');
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $json .= '{ "ID_Ep" : "'.$row["ID_Ep"].'","Nom_Ep" : "'.$row["Nom_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Equipement" : "'.$row["Image_Equipement"].'","ID_Noeud" : "'.$row["ID_Noeud"].'", "Ep_Actif" : "'.$row['Ep_Actif'].'"}';
                
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Ep" : "'.$row["ID_Ep"].'","Nom_Ep" : "'.$row["Nom_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Equipement" : "'.$row["Image_Equipement"].'","ID_Noeud" : "'.$row["ID_Noeud"].'", "Ep_Actif" : "'.$row['Ep_Actif'].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        echo $json;

?>