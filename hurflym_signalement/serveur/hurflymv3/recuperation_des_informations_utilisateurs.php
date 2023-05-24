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
            $result = $conn->query('SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur="'.$_POST["email"].'" AND Mot_de_Passe_Utilisateur="'.$_POST["mdp"].'"');
            $row = $result->fetch_assoc();

            echo '[{"validation" : "true"},{ "ID_Utilisateur" : "'.$row["ID_Utilisateur"].'" ,"Email_Utilisateur" : "'.$row["Mail_Utilisateur"].'","Nom_Utilisateur" : "'.$row["Nom_Utilisateur"].'","Prenom_Utilisateur" : "'.$row["Prenom_Utilisateur"].'", "Username_Utilisateur" : "'.$row["Username_Utilisateur"].'", "Mot_de_Passe_Utilisateur" : "'.$row["Mot_de_Passe_Utilisateur"].'", "token_crypte" : "'.$row["token_crypte"].'", "date_de_creation" : "'.$row["date_de_creation"].'"}]';
        }
        catch(Exception $e){
            echo '[{"validation" : "false"},{"erreur" : "erreur"}]';
        }
        

        //echo json_encode($id_noeud);
?>