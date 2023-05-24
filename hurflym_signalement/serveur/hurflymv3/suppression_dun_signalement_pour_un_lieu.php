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

            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `Signalement_Actif`='0' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");

            $conn->query("UPDATE `Signalement".$_GET["ID_Etablissement"]."__Local` SET `ID_Noeud`='0' WHERE `ID_Signalement`='".$_GET["ID_Signalement"]."'");
        
        echo"[]";

?>