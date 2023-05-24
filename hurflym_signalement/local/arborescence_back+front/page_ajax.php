<?php 
    require 'connexion_bdd_config.php';

    //header("Content-Type: text/plain");

    $nick = (isset($_GET["Pseudo"])) ? $_GET["Pseudo"] : NULL;
    $name = (isset($_GET["Mot_de_passe"])) ? $_GET["Mot_de_passe"] : NULL;

    
    echo '[';
    if ($nick && $name) {
    	//echo "Bonjour " . $name . " ! Je vois que votre pseudo est " . $nick;

        require 'connexion_bdd_config.php';

        /*
        $sql = "INSERT INTO Sanitaire_Responsable(ID_Sanitaire,ID_Responsable)
	    VALUES('2','1')
	    ";
        $conn->query($sql);
        */

        /*
        $result_nom_sanitaire = $conn->query('SELECT Nom_Sanitaire FROM Sanitaire WHERE ID_Sanitaire="2"');

        $row = $result_nom_sanitaire->fetch_assoc();

        $nom_sanitaire = $row['Nom_Sanitaire'];

        echo $nom_sanitaire;
        */

        $result = $conn->query('SELECT ID_Etablissement FROM etablissement__Local WHERE Username_Etablissement="'.$_GET["Pseudo"].'" AND Mot_de_Passe_Etablissement="'.$_GET["Mot_de_passe"].'"');

        $row = $result->fetch_assoc();

        $id_etablissement = $row['ID_Etablissement'];

        echo $id_etablissement;



    } else {
    	echo "FAIL";
    }
    echo ']';

?>