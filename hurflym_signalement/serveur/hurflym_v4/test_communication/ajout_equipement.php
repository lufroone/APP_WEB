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


        $conn->query("INSERT INTO Equipement__Local VALUES('0','".$_GET["Nom_Equipement"]."','".$_GET["ID_Categorie_Equipement"]."','".$_GET["Image_Equipement"]."','".$_GET["Description_Equipement"]."', '".$_GET["ID_Etablissement"]."')");

        $test_1 = $conn->query("SELECT ID_Equipement FROM Equipement__Local WHERE ID_Equipement = (SELECT MAX(ID_Equipement) FROM Equipement__Local)");

        $ID_Equipement_Particulier = $test_1->fetch_assoc();
        
        echo '[ {"nombre_id" : "'.$ID_Equipement_Particulier["ID_Equipement"].'"} ]';
?>