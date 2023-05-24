<?php 
    require 'connexion_bdd_config.php';
        
        $categorie_premiere = $conn->prepare("SELECT * FROM Professionnel__Local WHERE ID_Etablissement='".$_GET["ID_Etablissement"]."' AND Administrateur=2");
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {
                $temp_info_admin = $conn->query("SELECT * FROM Utilisateur__Local WHERE ID_Utilisateur='".$row["ID_Utilisateur"]."'");
                $temp_info_admin = $temp_info_admin->fetch_assoc();
                $json .= '{ "ID_Professionnel" : "'.$row["ID_Professionnel"].'","ID_Utilisateur" : "'.$row["ID_Utilisateur"].'","Lieu_de_travail" : "'.$row["Lieu_de_travail"].'","Username_Utilisateur" : "'.$temp_info_admin["Username_Utilisateur"].'"}';
                
            }
            else
            {
                $temp_info_admin = $conn->query("SELECT * FROM Utilisateur__Local WHERE ID_Utilisateur='".$row["ID_Utilisateur"]."'");
                $temp_info_admin = $temp_info_admin->fetch_assoc();
                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Professionnel" : "'.$row["ID_Professionnel"].'","ID_Utilisateur" : "'.$row["ID_Utilisateur"].'","Lieu_de_travail" : "'.$row["Lieu_de_travail"].'","Username_Utilisateur" : "'.$temp_info_admin["Username_Utilisateur"].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        echo $json;

?>