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

        $req = "INSERT INTO Template".$_GET["ID_Etablissement"]."__Local".$_GET["Parametre"]." VALUES".$_GET["Values"]."";

        $conn->query($req);

        $test_1 = $conn->query("SELECT ID_Template FROM Template".$_GET["ID_Etablissement"]."__Local WHERE ID_Template = (SELECT MAX(ID_Template) FROM Template".$_GET["ID_Etablissement"]."__Local)");

        $ID_Template = $test_1->fetch_assoc();

        
        echo '['.$ID_Template["ID_Template"].']';
?>