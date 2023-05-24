<?php 
    require 'connexion_bdd_config.php';
        
        $signalement = $conn->prepare('SELECT * FROM Incidence'.$_GET["ID_Etablissement"].'__Local');
        $signalement->execute();
        $result_cat_1 = $signalement->get_result();

        



        $json = '['; //Ajouter le crochet au début.
        $test = array();
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $nom_colonne = $conn->query("SHOW COLUMNS FROM Incidence".$_GET["ID_Etablissement"]."__Local");
                $json .= '{';
                while($row1 = $nom_colonne->fetch_assoc()){
                    
                    if($j==0){
                        $json .= '"'.$row1["Field"].'": "'.$row[$row1["Field"]].'"';
                    }
                    else{
                        $json .= ', "'.$row1["Field"].'" : "'.$row[$row1["Field"]].'"';
                    }
                    $j++;
                }
                $json .= '}';

                //$json .= '{ "ID_Source" : "'.$row["ID_Source"].'","Type_dincidence" : "'.$row["Type_dincidence"].'","ID_Noeud" : "'.$row["ID_Noeud"].'"}';
                
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $j=0;
                $nom_colonne = $conn->query("SHOW COLUMNS FROM Incidence".$_GET["ID_Etablissement"]."__Local");
                $json .= ', {';
                while($row1 = $nom_colonne->fetch_assoc()){
                    if($j==0){
                        $json .= '"'.$row1["Field"].'": "'.$row[$row1["Field"]].'"';
                    }
                    else{
                        $json .= ', "'.$row1["Field"].'": "'.$row[$row1["Field"]].'"';
                    }
                    $j++;
                }
                $json .= '}';
                //$json .= ', { "ID_Source" : "'.$row["ID_Source"].'","Type_dincidence" : "'.$row["Type_dincidence"].'","ID_Noeud" : "'.$row["ID_Noeud"].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        //echo json_encode($test);
        echo $json;

?>