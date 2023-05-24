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

        $etat = $conn->query("SELECT * FROM Equipement_Particulier__Local WHERE ID_Ep='".$_GET["ID_Ep"]."'");
        $etat = $etat->fetch_assoc();

        if($etat["Ep_Actif"] == 1){
            $conn->query("UPDATE `Equipement_Particulier__Local` SET `Ep_Actif`='0' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");
            echo"[0]";
        }
        if($etat["Ep_Actif"] == 0){
            $conn->query("UPDATE `Equipement_Particulier__Local` SET `Ep_Actif`='1' WHERE `ID_Ep`='".$_GET["ID_Ep"]."'");
            echo"[1]";
        }
?>