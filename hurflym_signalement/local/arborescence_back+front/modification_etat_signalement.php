<?php 
   require 'connexion_bdd_config.php';


        if($_GET["Nouvel_Etat"] != ""){
            $conn->query("UPDATE Incidence".$_GET["ID_Etablissement"]."__Local SET Etat_Incident='".$_GET["Nouvel_Etat"]."' WHERE ID_Incidence='".$_GET["ID_Incidence"]."'");

            if($_GET["Nouvel_Etat"] == "2"){
                // augmenter l'indice de confiance de tout les utilisateurs qui l'ont signalés
                $result = $conn->query("SELECT * FROM Pepin".$_GET["ID_Etablissement"]."__Local WHERE ID_Incident='".$_GET["ID_Incidence"]."'");
                while($row = $result->fetch_assoc()){
                    $conn->query("UPDATE utilisateur__Local SET indice_de_confiance = LEAST(indice_de_confiance + (indice_de_confiance/8), 100) WHERE ID_Utilisateur ='".$row["ID_Utilisateur"]."'");
                }
            }
    
            if($_GET["Nouvel_Etat"] == "6"){
                // diminuer l'indice de confiance de tout les utilisateurs qui l'ont signalés
                $result = $conn->query("SELECT * FROM Pepin".$_GET["ID_Etablissement"]."__Local WHERE ID_Incident='".$_GET["ID_Incidence"]."'");
                while($row = $result->fetch_assoc()){
                    $conn->query("UPDATE utilisateur__Local SET indice_de_confiance = LEAST(indice_de_confiance - (indice_de_confiance/2), 100) WHERE ID_Utilisateur ='".$row["ID_Utilisateur"]."'");
                }
            }
        }

        

        echo '["'.$_GET["Nouvel_Etat"].'"]';
?>