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


        $conn->query("INSERT INTO Equipement__Local VALUES('0','".$_GET["Nom_Equipement"]."','".$result["ID_Categorie"]."','".$_GET["Image_Equipement"]."','".$_GET["Description_Equipement"]."', '".$_GET["ID_Etablissement"]."')");

        $test_1 = $conn->query("SELECT ID_Equipement FROM Equipement__Local WHERE ID_Equipement = (SELECT MAX(ID_Equipement) FROM Equipement__Local)");

        $ID_Equipement = $test_1->fetch_assoc();

        $req = $conn->query("SELECT ID_Etablissement FROM Equipement__Local WHERE ID_Equipement='".$ID_Equipement["ID_Equipement"]."'");

        $ID_Etablissement = $req->fetch_assoc();
        
        $conn->query("ALTER TABLE `Incidence".$ID_Etablissement["ID_Etablissement"]."__Local` ADD COLUMN `".$ID_Equipement["ID_Equipement"]."` TINYINT DEFAULT '0'");

        $conn->query("UPDATE `Incidence".$ID_Etablissement["ID_Etablissement"]."__Local` SET `".$ID_Equipement["ID_Equipement"]."`='0'");

        $conn->query("ALTER TABLE `Signalement".$ID_Etablissement["ID_Etablissement"]."__Local` ADD COLUMN `".$ID_Equipement["ID_Equipement"]."` TINYINT DEFAULT '0'");

        $conn->query("UPDATE `Signalement".$ID_Etablissement["ID_Etablissement"]."__Local` SET `".$ID_Equipement["ID_Equipement"]."`='0'");

        $conn->query("ALTER TABLE `Template".$ID_Etablissement["ID_Etablissement"]."__Local` ADD COLUMN `".$ID_Equipement["ID_Equipement"]."` TINYINT DEFAULT '0'");

        $conn->query("UPDATE `Template".$ID_Etablissement["ID_Etablissement"]."__Local` SET `".$ID_Equipement["ID_Equipement"]."`='0'");
        
        echo '['.$ID_Equipement["ID_Equipement"].']';
?>