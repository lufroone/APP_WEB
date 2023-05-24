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

        $j=0;
        $nom_colonne = $conn->query("SHOW COLUMNS FROM Template".$_GET["ID_Etablissement"]."__Local ");
        $json = '[';
        while($row1 = $nom_colonne->fetch_assoc()){
                    
            if($j>=3){

                $conn->query("UPDATE `Template".$_GET["ID_Etablissement"]."__Local` SET `".$row1["Field"]."`='0'  WHERE `ID_Template`='".$_GET["ID_Template"]."'");
            }
            $j++;
        }

        echo "[]";
?>