<?php 
    require 'connexion_bdd_config.php';
        
        $categorie_premiere = $conn->prepare('SELECT ID_Source,Type_dincidence,ID_Noeud FROM Source__Local WHERE ID_Etablissement="'.$_GET["ID_Etablissement"].'"');
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $json .= '{ "ID_Source" : "'.$row["ID_Source"].'","Type_dincidence" : "'.$row["Type_dincidence"].'","ID_Noeud" : "'.$row["ID_Noeud"].'"}';
                
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Source" : "'.$row["ID_Source"].'","Type_dincidence" : "'.$row["Type_dincidence"].'","ID_Noeud" : "'.$row["ID_Noeud"].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        echo $json;

?>