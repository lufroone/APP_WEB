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

    header("Content-Type: text/javascript");

    


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

        $requete = $conn->query('SELECT * FROM Etablissement__Local WHERE ID_Etablissement='.$_GET["ID_Etablissement"].'');
        $info_etablissement = $requete->fetch_assoc();

        $requete_2 = $conn->query('SELECT * FROM Personnalisation__Local WHERE ID_Personnalisation='.$info_etablissement["ID_Personnalisation"].'');
        $info_personalisation = $requete_2->fetch_assoc();



        //echo '["'.base64_encode($info_personalisation["Logo"]).'"]';
        
        echo '["'.$info_personalisation["Logo"].'"]';

?>