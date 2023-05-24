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

        $test = $conn->query("SELECT ID_Categorie FROM Categorie__Local WHERE Nom_Categorie='".$_GET["ID_Categorie_Equipement"]."'");

        $result = $test->fetch_assoc();

        $conn->query('INSERT INTO Equipement_Particulier__Local VALUES("0","'.$_GET["Nom_Ep"].'","'.$_GET["Description_Ep"].'","'.$result["ID_Categorie"].'","'.$_GET["Image_Equipement"].'","0","'.$_GET["ID_Etablissement"].'")');
        
        $test_1 = $conn->query("SELECT ID_Ep FROM Equipement_Particulier__Local WHERE ID_Ep = (SELECT MAX(ID_Ep) FROM Equipement_Particulier__Local)");

        $ID_Equipement_Particulier = $test_1->fetch_assoc();
        
        echo '['.$ID_Equipement_Particulier["ID_Ep"].']';
?>