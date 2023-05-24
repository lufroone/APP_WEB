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

        $cpt =0;
        $condition_de_la_requete = "";

        if($_GET["Nom_Equipement"] != ""){
            if($cpt==0){
                $condition_de_la_requete .= "Nom_Ep='".$_GET["Nom_Equipement"]."'";
                $cpt++;
            }
            else{
                $condition_de_la_requete .= "AND Nom_Ep='".$_GET["Nom_Equipement"]."'";
            }
        }
        if($_GET["Description_Equipement"] != ""){
            if($cpt==0){
                $condition_de_la_requete .= "Description_Ep='".$_GET["Description_Equipement"]."'";
                $cpt++;
            }
            else{
                $condition_de_la_requete .= "AND Description_Ep='".$_GET["Description_Equipement"]."'";
            }
        }
        if($_GET["ID_Categorie_Equipement"] != ""){

            $test = $conn->query("SELECT ID_Categorie FROM Categorie__Local WHERE Nom_Categorie='".$_GET["ID_Categorie_Equipement"]."'");

            $result = $test->fetch_assoc();

            if($cpt==0){
                $condition_de_la_requete .= "ID_Categorie_Equipement='".$result["ID_Categorie"]."'";
                $cpt++;
            }
            else{
                $condition_de_la_requete .= "AND ID_Categorie_Equipement='".$result["ID_Categorie"]."'";
            }
        }
        if($_GET["Image_Equipement"] != ""){
            if($cpt==0){
                $condition_de_la_requete .= "Image_Equipement='".$_GET["Image_Equipement"]."'";
                $cpt++;
            }
            else{
                $condition_de_la_requete .= "AND Image_Equipement='".$_GET["Image_Equipement"]."'";
            }
        }
        if($_GET["ID_Etablissement"] != ""){
            if($cpt==0){
                $condition_de_la_requete .= "ID_Etablissement='".$_GET["ID_Etablissement"]."'";
                $cpt++;
            }
            else{
                $condition_de_la_requete .= "AND ID_Etablissement='".$_GET["ID_Etablissement"]."'";
            }
        }


        $categorie_premiere = $conn->prepare("SELECT ID_Ep,Nom_Ep,Description_Ep,ID_Categorie_Equipement,Image_Equipement FROM Equipement_Particulier__Local WHERE ".$condition_de_la_requete);
        $categorie_premiere->execute();
        $result_cat_1 = $categorie_premiere->get_result();


        $json = "["; //Ajouter le crochet au début.
        $i=0; // Index pour gérer les virgules.
        $j=0; // Index pour gerer les deuxieme virgules
        while ($row = $result_cat_1->fetch_assoc()) {
            if ($i == 0) // Exécuter ceci si le 1er bloc.
            {

                $test_2 = $conn->query("SELECT Nom_Categorie FROM Categorie__Local WHERE ID_Categorie='".$row["ID_Categorie_Equipement"]."'");

                $result_2 = $test_2->fetch_assoc();

                $json .= '{ "ID_Ep" : "'.$row["ID_Ep"].'","Nom_Ep" : "'.$row["Nom_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$result_2["Nom_Categorie"].'","Image_Equipement" : "'.$row["Image_Equipement"].'"}';
                
            }
            else
            {

                $test_2 = $conn->query("SELECT Nom_Categorie FROM Categorie__Local WHERE ID_Categorie='".$row["ID_Categorie_Equipement"]."'");

                $result_2 = $test_2->fetch_assoc();

                // préfixez le JSON avec une virgule pour chaque itération.
                $json .= ', { "ID_Ep" : "'.$row["ID_Ep"].'","Nom_Ep" : "'.$row["Nom_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$result_2["Nom_Categorie"].'","Image_Equipement" : "'.$row["Image_Equipement"].'"}';
                
            }
            $i++; 
        }
        $json .= "]"; // fermer le JSON
        echo $json;
?>