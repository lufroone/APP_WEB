<?php 
    try
    {
        $dsn = 'mysql:host=54.37.31.19;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
	    die('Erreur : ' . $e->getMessage());
    }

    header("Content-Type: text/javascript");

    


        $servername = "54.37.31.19";
        $username = "u118526083_Lufroone";
        $password = "2=nG!jR60";
        $dbname = "u118526083_Hurflym";

        // Créer une conexion
        $conn = new mysqli($servername, $username, $password, $dbname);
        // verifier la connexion
        if ($conn->connect_error) {
        die("La connexion a échouée: " . $conn->connect_error);
        }

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