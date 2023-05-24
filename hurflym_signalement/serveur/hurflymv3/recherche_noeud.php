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