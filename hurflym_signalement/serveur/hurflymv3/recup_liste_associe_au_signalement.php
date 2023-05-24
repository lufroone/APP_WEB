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
        
        //$signalement = $conn->prepare('SELECT * FROM Signalement'.$_GET["ID_Etablissement"].'__Local');
        //$signalement->execute();
        //$result_cat_1 = $signalement->get_result();

        $j=0;
        $nom_colonne = $conn->query("SHOW COLUMNS FROM Signalement".$_GET["ID_Etablissement"]."__Local ");
        $json = "[ ";
        while($row1 = $nom_colonne->fetch_assoc()){
                    
            if($j==5){

                $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                $info = $information_equipement->fetch_assoc();

                $json .= '{ "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
            }
            if($j>5){

                $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                $info = $information_equipement->fetch_assoc();

                $json .= ', { "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
            }
            $j++;
        }
        $json .= " ]";
        echo $json;

?>