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

        try{
            $result = $conn->query('SELECT * FROM Administrateur__Local WHERE Mail_Administrateur="'.$_POST["email"].'" AND Mot_de_Passe_Administrateur="'.$_POST["mdp"].'"');
            $row = $result->fetch_assoc();

            echo '[{"validation" : "true"},{ "ID_Administrateur" : "'.$row["ID_Administrateur"].'" ,"Email_Administrateur" : "'.$row["Mail_Administrateur"].'","Nom_Administrateur" : "'.$row["Nom_Administrateur"].'","Prenom_Administrateur" : "'.$row["Prenom_Administrateur"].'", "Username_Administrateur" : "'.$row["Username_Administrateur"].'", "Mot_de_Passe_Administrateur" : "'.$row["Mot_de_Passe_Administrateur"].'", "token_crypte" : "'.$row["token_crypte"].'", "date_de_creation" : "'.$row["date_de_creation"].'", "ID_Etablissement" : "'.$row["ID_Etablissement"].'", "Lieu_de_travail" : "'.$row["Lieu_de_travail"].'"}]';
        }
        catch(Exception $e){
            echo '[{"validation" : "false"},{"erreur" : "erreur"}]';
        }
        

        //echo json_encode($id_noeud);
?>