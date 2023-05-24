<?php 
    require 'connexion_bdd_config.php';

        try{
            $result = $conn->query('SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur="'.$_GET["email"].'"');
            $row = $result->fetch_assoc();

            echo '[{"validation" : "true"},{ "ID_Utilisateur" : "'.$row["ID_Utilisateur"].'" ,"Email_Utilisateur" : "'.$row["Mail_Utilisateur"].'","Nom_Utilisateur" : "'.$row["Nom_Utilisateur"].'","Prenom_Utilisateur" : "'.$row["Prenom_Utilisateur"].'", "Username_Utilisateur" : "'.$row["Username_Utilisateur"].'"}]';
        }
        catch(Exception $e){
            echo '[{"validation" : "false"},{"erreur" : "erreur"}]';
        }
        

        //echo json_encode($id_noeud);
?>