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

        $req = "INSERT INTO Signalement".$_GET["ID_Etablissement"]."__Local".$_GET["Parametre"]." VALUES".$_GET["Values"]."";

        $conn->query($req);

        $req = "INSERT INTO Source__Local(ID_Source,ID_Etablissement,ID_Signalement) VALUES('0','".$_GET["ID_Etablissement"]."','".$_GET["ID_Signalement"]."')";

        $conn->query($req);

        $test_1 = $conn->query("SELECT ID_Signalement FROM Signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Signalement = (SELECT MAX(ID_Signalement) FROM Signalement".$_GET["ID_Etablissement"]."__Local)");

        $ID_Signalement = $test_1->fetch_assoc();

        $req = "INSERT INTO Source__Local(ID_Source,ID_Signalement,ID_Etablissement) VALUES ('0','".$ID_Signalement["ID_Signalement"]."','".$_GET["ID_Etablissement"]."')";

        $conn->query($req);
        
        echo '['.$ID_Signalement["ID_Signalement"].']';
?>