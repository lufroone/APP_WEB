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

        $sql = "INSERT INTO Incidence".$_GET["ID_Etablissement"]."__Local(ID_Incidence,ID_Signalement,Commentaire_Signalement,Etat_Incident,Heure_du_signalement,Heure_de_la_Commande,Heure_de_la_Livraison,Heure_de_la_Reparation,Heure_de_la_Classification,ID_Utilisateur,".$_GET["Parametre"].")
		VALUES('0','".$_GET["ID_Signalement"]."','".$_GET["Commentaire_Signalement"]."','1','".date('d-m-y h:i:s')."','0','0','0','0','".$_GET["ID_Utilisateur"]."',".$_GET["Arguments"].")
		";
        $conn->query($sql);

        echo "[]";

    
?>