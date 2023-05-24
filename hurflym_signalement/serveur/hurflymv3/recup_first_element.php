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


        $result = $conn->query('SELECT * FROM Noeud__Local WHERE Precedent="'.$_GET["ID_Etablissement"].'" AND Profondeur = 0');
        //$result->execute();
        //$row = $result->get_result();
        $row = $result->fetch_assoc();

        echo '[{ "ID_Noeud" : "'.$row["ID_Noeud"].'","Precedent" : "'.$row["Precedent"].'","Nom_Element" : "'.$row["Nom_Element"].'","Localisation" : "'.$row["Localisation"].'","Profondeur" : "'.$row["Profondeur"].'","Nombre_de_QRCODE" : "'.$row["Nombre_de_QRCODE"].'", "Fils" : [] }]';

        //echo json_encode($id_noeud);
?>