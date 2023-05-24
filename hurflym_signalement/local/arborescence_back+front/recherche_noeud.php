<?php 
    require 'connexion_bdd_config.php';

        $categorie_premiere = $conn->prepare("SELECT ID_Noeud,Nom_Element,Localisation FROM Noeud__Local WHERE Nom_Element='".$_GET["Nom_Element"]."'");
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $json .= '{ "ID_Noeud" : "'.$row["ID_Noeud"].'","Nom_Element" : "'.$row["Nom_Element"].'","Localisation" : "'.$row["Localisation"].'"}';
                
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Noeud" : "'.$row["ID_Noeud"].'","Nom_Element" : "'.$row["Nom_Element"].'","Localisation" : "'.$row["Localisation"].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        echo $json;
?>