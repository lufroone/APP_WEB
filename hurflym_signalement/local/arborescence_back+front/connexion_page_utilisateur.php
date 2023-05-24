<?php 
    require 'connexion_bdd_config.php';

        $json = '[';
        try{
            $categorie_premiere = $conn->query('SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur="'.$_POST["email"].'" AND Mot_de_Passe_Utilisateur="'.$_POST["mdp"].'"');
            $result_cat_1 = $categorie_premiere->fetch_assoc();
            $json .= ' {"Validation" : "valide"} , {"ID_Utilisateur" : "'.$result_cat_1["ID_Utilisateur"].'", "Mail_Utilisateur" : "'.$result_cat_1["Mail_Utilisateur"].'", "Nom_Utilisateur" : "'.$result_cat_1["Nom_Utilisateur"].'", "Prenom_Utilisateur" : "'.$result_cat_1["Prenom_Utilisateur"].'", "Username_Utilisateur" : "'.$result_cat_1["Username_Utilisateur"].'", "Mot_de_Passe_Utilisateur" : "'.$result_cat_1["Mot_de_Passe_Utilisateur"].'"}]';
            session_start();
            $_SESSION["mail"] = $result_cat_1["Mail_Utilisateur"];
            $_SESSION["token"] = $result_cat_1["token_crypte"];
        }
        catch(Exception $e){
            $json .= '{"Validation" : "erreur"} ]';
        }
        
        echo $json;

?>