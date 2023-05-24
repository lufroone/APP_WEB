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

        $id_personnalisation = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement='".$_GET["ID_Etablissement"]."'");
        $id_personnalisation = $id_personnalisation->fetch_assoc();

        $personnalisation = $conn->query("SELECT * FROM Personnalisation__Local WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        $personnalisation = $personnalisation->fetch_assoc();


        echo '[{"ID_Personnalisation" : "'.$personnalisation["ID_Personnalisation"].'","Logo" : "'.$personnalisation["Logo"].'","Couleur_1" : "'.$personnalisation["couleur_1"].'","Couleur_2" : "'.$personnalisation["couleur_2"].'","Couleur_3" : "'.$personnalisation["couleur_3"].'"}]';
?>