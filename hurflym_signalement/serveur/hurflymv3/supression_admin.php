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

        $id_utilisateur = $conn->query("SELECT ID_Utilisateur FROM Professionnel__Local WHERE ID_Professionnel='".$_GET["ID_Professionnel"]."'");
        $id_utilisateur = $id_utilisateur->fetch_assoc();

        $conn->query("DELETE FROM Professionnel__Local WHERE ID_Professionnel='".$_GET["ID_Professionnel"]."'");


        $conn->query("DELETE FROM Utilisateur__Local WHERE ID_Utilisateur='".$id_utilisateur["ID_Utilisateur"]."'");

        echo "[".$id_utilisateur["ID_Utilisateur"]."]";
?>