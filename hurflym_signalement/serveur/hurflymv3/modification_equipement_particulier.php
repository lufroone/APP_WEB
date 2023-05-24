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


        if($_GET["Nouveau_Nom"] != ""){
            $conn->query("UPDATE Equipement_Particulier__Local SET Nom_Ep='".$_GET["Nouveau_Nom"]."' WHERE ID_Ep='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Description"] != ""){
            $conn->query("UPDATE Equipement_Particulier__Local SET Description_Ep='".$_GET["Nouvelle_Description"]."' WHERE ID_Ep='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Image"] != ""){
            $conn->query("UPDATE Equipement_Particulier__Local SET Image_Equipement='".$_GET["Nouvelle_Image"]."' WHERE ID_Ep='".$_GET["ID_Equipement"]."'");
        }

        if($_GET["Nouvelle_Categorie_Secondaire"] != ""){
            $req = $conn->query("SELECT ID_Categorie FROM Categorie__Local WHERE Nom_Categorie='".$_GET["Nouvelle_Categorie_Secondaire"]."'");
            $ID_Categorie = $req->fetch_assoc();

            $conn->query("UPDATE Equipement_Particulier__Local SET ID_Categorie_Equipement='".$ID_Categorie["ID_Categorie"]."' WHERE ID_Ep='".$_GET["ID_Equipement"]."'");
        }

        echo '["'.$_GET["ID_Equipement"].'"]';
?>