<?php 
    require 'connexion_bdd_config.php';

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