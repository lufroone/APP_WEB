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

    //header("Content-Type: text/plain");

    $nick = (isset($_GET["Pseudo"])) ? $_GET["Pseudo"] : NULL;
    $name = (isset($_GET["Mot_de_passe"])) ? $_GET["Mot_de_passe"] : NULL;

    

    if ($nick && $name) {
    	//echo "Bonjour " . $name . " ! Je vois que votre pseudo est " . $nick;

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

        /*
        $sql = "INSERT INTO Sanitaire_Responsable(ID_Sanitaire,ID_Responsable)
	    VALUES('2','1')
	    ";
        $conn->query($sql);
        */

        /*
        $result_nom_sanitaire = $conn->query('SELECT Nom_Sanitaire FROM Sanitaire WHERE ID_Sanitaire="2"');

        $row = $result_nom_sanitaire->fetch_assoc();

        $nom_sanitaire = $row['Nom_Sanitaire'];

        echo $nom_sanitaire;
        */

        $result = $conn->query('SELECT ID_Etablissement FROM Etablissement__Local WHERE Username_Etablissement="'.$_GET["Pseudo"].'" AND Mot_de_Passe_Etablissement="'.$_GET["Mot_de_passe"].'"');

        $row = $result->fetch_assoc();

        $id_etablissement = $row['ID_Etablissement'];

        echo $id_etablissement;



    } else {
    	echo "FAIL";
    }

?>