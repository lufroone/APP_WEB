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

        $json = '[';
        try{
            $categorie_premiere = $conn->query('UPDATE Utilisateur__Local SET Mot_de_Passe_Utilisateur="'.$_POST['mdp'].'" WHERE ID_Utilisateur="'.$_POST['id'].'"');
            $json .= '{"Validation" : "valide"}]';
        }
        catch(Exception $e){
            $json .= '{"Validation" : "erreur"} ]';
        }
        
        echo $json;

?>