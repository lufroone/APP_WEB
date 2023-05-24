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

        

        $conn->query("DELETE FROM Equipement__Local WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");

        // Trouve la table de signalement de l'etablissement puis supprimé la colonne de l'équipement dedans

        $req = $conn->query("SELECT ID_Etablissement FROM Equipement__Local WHERE ID_Equipement='".$_GET["ID_Equipement"]."'");

        $ID_Etablissement = $req->fetch_assoc();

        $conn->query("ALTER TABLE `Incidence".$ID_Etablissement["ID_Etablissement"]."__Local` DROP COLUMN `".$_GET["Nom_Equipement"]."`");

        $conn->query("ALTER TABLE `Signalement".$ID_Etablissement["ID_Etablissement"]."__Local` DROP COLUMN `".$_GET["Nom_Equipement"]."`");

        echo "[]";
?>