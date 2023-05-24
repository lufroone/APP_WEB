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


        $conn->query('INSERT INTO Utilisateur__Local VALUES("0","'.$_GET["Nom_Administrateur"].'","'.$_GET["Prenom_Administrateur"].'","'.$_GET["Mail_Administrateur"].'","'.$_GET["Username_Administrateur"].'","'.$_GET["Mot_de_passe_Administrateur"].'")');

        $test_1 = $conn->query("SELECT ID_Utilisateur FROM Utilisateur__Local WHERE ID_Utilisateur = (SELECT MAX(ID_Utilisateur) FROM Utilisateur__Local)");

        $ID_Utilisateur = $test_1->fetch_assoc();

        $req = "INSERT INTO Professionnel__Local VALUES ('0','".$ID_Utilisateur["ID_Utilisateur"]."','2','0','0','".$_GET["ID_Etablissement"]."')";

        $conn->query($req);
        
        echo '[]';
?>