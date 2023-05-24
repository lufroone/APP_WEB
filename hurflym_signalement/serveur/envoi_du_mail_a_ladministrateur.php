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

        $requete = $conn->query('SELECT * FROM Professionnel__Local WHERE Administrateur='.$_GET["ID_Etablissement"].' AND Lieu_de_travail='.$_GET["ID_Noeud"].'');
        $info_administrateur = $requete->fetch_assoc();

        if(isset($info_administrateur["ID_Utilisateur"])){
            $requete_2 = $conn->query('SELECT * FROM Utilisateur__Local WHERE ID_Utilisateur='.$info_administrateur["ID_Utilisateur"].'');
            $mail_de_ladministrateur = $requete_2->fetch_assoc();
            $to = $mail_de_ladministrateur["Mail_Utilisateur"];

            $subject = $_GET["titre_du_mail"];
            $message = $_GET["message"];

            $from = "hurflym@gmail.com";

            $headers = "From:".$from;

            mail($to,$subject,$message,$from);
        }
        


        

        if(isset($info_administrateur["ID_Utilisateur"])){
            echo '["'.$to.'","'.$subject.'","'.$message.'","'.$from.'"]';
        }
        else{
            echo '["cest un bool"]';
        }
        

?>