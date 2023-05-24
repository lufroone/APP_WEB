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

        $id_personnalisation = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement='".$_POST["ID_Etablissement"]."'");
        $id_personnalisation = $id_personnalisation->fetch_assoc();

        if($_POST["image"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `Logo`='".$_POST["image"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_de_fond"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_1`='".$_POST["couleur_de_fond"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_de_cadre"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_2`='".$_POST["couleur_de_cadre"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_exceptionnel"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_3`='".$_POST["couleur_exceptionnel"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        echo '[]';
?>