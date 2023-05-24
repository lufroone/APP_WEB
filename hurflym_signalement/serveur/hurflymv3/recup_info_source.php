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


        $result = $conn->query('SELECT * FROM Source__Local WHERE ID_Source="'.$_GET["ID_Source"].'"');
        //$result->execute();
        //$row = $result->get_result();
        $row = $result->fetch_assoc();

        echo '[{ "ID_Signalement" : "'.$row["ID_Signalement"].'","ID_Etablissement" : "'.$row["ID_Etablissement"].'"}]';

        //echo json_encode($id_noeud);
?>