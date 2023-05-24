<?php 
    require 'connexion_bdd_config.php';


        $categorie_premiere = $conn->prepare('SELECT * FROM Categorie__Local WHERE ID_Categorie = ID_Categorie_Prec');
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $json .= '{"Nom_Categorie" : "'.$row["Nom_Categorie"].'", "Fils" : [';
                $j=0;
                $categorie_seconde = $conn->prepare('SELECT * FROM Categorie__Local WHERE ID_Categorie != ID_Categorie_Prec');
                $categorie_seconde->execute();
                $result_cat_2 = $categorie_seconde->get_result();
                while($suite = $result_cat_2->fetch_assoc()){
                    if($row["ID_Categorie"] == $suite["ID_Categorie_Prec"]){
                        if($j == 0){
                            $json .= '{"Nom_Categorie" : "'.$suite["Nom_Categorie"].'", "ID_Image_Max" : "'.$suite["ID_Image_Max"].'", "ID_Categorie" : "'.$suite["ID_Categorie"].'", "ID_Categorie_Prec" : "'.$suite["ID_Categorie_Prec"].'"}';
                        }
                        else{
                            $json .= ',{"Nom_Categorie" : "'.$suite["Nom_Categorie"].'", "ID_Image_Max" : "'.$suite["ID_Image_Max"].'", "ID_Categorie" : "'.$suite["ID_Categorie"].'", "ID_Categorie_Prec" : "'.$suite["ID_Categorie_Prec"].'"}';
                        }
                        $j++;
                    }
                }
                $json .= "]}";
            }
            else
            {
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', {"Nom_Categorie" : "'.$row["Nom_Categorie"].'", "Fils" : [';
                $j=0;
                $categorie_seconde = $conn->prepare('SELECT * FROM Categorie__Local WHERE ID_Categorie != ID_Categorie_Prec');
                $categorie_seconde->execute();
                $result_cat_2 = $categorie_seconde->get_result();
                while($suite2 = $result_cat_2->fetch_assoc()){
                    if($row["ID_Categorie"] == $suite2["ID_Categorie_Prec"]){
                        if($j == 0){
                            $json .= '{"Nom_Categorie" : "'.$suite2["Nom_Categorie"].'", "ID_Image_Max" : "'.$suite2["ID_Image_Max"].'", "ID_Categorie" : "'.$suite2["ID_Categorie"].'", "ID_Categorie_Prec" : "'.$suite2["ID_Categorie_Prec"].'"}';
                        }
                        else{
                            $json .= ',{"Nom_Categorie" : "'.$suite2["Nom_Categorie"].'", "ID_Image_Max" : "'.$suite2["ID_Image_Max"].'", "ID_Categorie" : "'.$suite2["ID_Categorie"].'", "ID_Categorie_Prec" : "'.$suite2["ID_Categorie_Prec"].'"}';
                        }
                        $j++;
                    }
                }
                $json .= "]}";
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
            
        echo $json;

?>