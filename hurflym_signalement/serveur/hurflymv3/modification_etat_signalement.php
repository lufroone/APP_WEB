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


        if($_GET["Nouvel_Etat"] != ""){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Etat_Incident='".$_GET["Nouvel_Etat"]."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "2"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Commande='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "3"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Livraison='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "4"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Reparation='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        if($_GET["Nouvel_Etat"] == "5"){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Heure_de_la_Classification='".date('d-m-y h:i:s')."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");
        }

        echo '["'.$_GET["Nouvel_Etat"].'"]';
?>