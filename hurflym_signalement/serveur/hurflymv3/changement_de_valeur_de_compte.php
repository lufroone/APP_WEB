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

        if($_POST["section"] == '0'){
            $conn->query("UPDATE Utilisateur__Local SET `Nom_Utilisateur`='".$_POST["nouveau_nom"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }
        if($_POST["section"] == '1'){
            $conn->query("UPDATE Utilisateur__Local SET `Prenom_Utilisateur`='".$_POST["nouveau_prenom"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }
        if($_POST["section"] == '2'){
            $conn->query("UPDATE Utilisateur__Local SET `Username_Utilisateur`='".$_POST["nouveau_username"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }

        echo '[]';

?>