<?php 
    require 'connexion_bdd_config.php';

    header("Content-Type: text/javascript");


        if($_POST["section"] == '0'){
            $conn->query("UPDATE Utilisateur__Local SET `Nom_Utilisateur`='".$_POST["nouveau_nom"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }
        if($_POST["section"] == '1'){
            $conn->query("UPDATE Utilisateur__Local SET `Prenom_Utilisateur`='".$_POST["nouveau_prenom"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }
        if($_POST["section"] == '2'){
            $conn->query("UPDATE Utilisateur__Local SET `Username_Utilisateur`='".$_POST["nouveau_username"]."' WHERE ID_Utilisateur='".$_POST["ID_Utilisateur"]."'");
        }

        echo '[]';

?>