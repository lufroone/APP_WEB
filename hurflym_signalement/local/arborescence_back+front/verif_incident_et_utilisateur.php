<?php
// Connexion à la base de données
require 'connexion_bdd_config.php';

// Récupérer les variables $_GET
$id_utilisateur = intval($_GET["ID_Utilisateur"]);
$id_etablissement = intval($_GET["ID_Etablissement"]);
$id_equipement = intval($_GET["ID_Equipement"]);

$Info_pepin = $conn->query("SELECT ID_Signalement, Commentaire_signalement
FROM Pepin".$id_etablissement."__Local
WHERE ID_Pepin = (SELECT MAX(ID_Pepin) FROM Pepin1__Local WHERE ID_Utilisateur='".$id_utilisateur."')");

$Info_pepin = $Info_pepin->fetch_assoc();

$id_signalement = $Info_pepin["ID_Signalement"];
$commentaire_signalement = $Info_pepin["Commentaire_signalement"];

// Vérifier si un incident existe avec les mêmes valeurs que le pépin

$result = $conn->query("SELECT ID_Incidence FROM Incidence".$id_etablissement."__Local WHERE ID_Equipement='".$id_equipement."' AND Etat_Incident!='5'");

// Créer un incident si aucun incident correspondant n'a été trouvé
if ($result && $result->num_rows == 0) {
    echo $result->num_rows;
    // Récupérer l'indice de confiance de l'utilisateur
    $query = "SELECT indice_de_confiance FROM Utilisateur__Local WHERE ID_Utilisateur='".$id_utilisateur."'";
    $indice_result = $conn->query($query);
    $indice_row = $indice_result->fetch_assoc();
    $indice_de_confiance = intval($indice_row["indice_de_confiance"]);

    // Générer un nombre aléatoire entre 0 et 100
    $random_number = rand(0, 100);

    // Créer un incident si le nombre aléatoire est inférieur à l'indice de confiance
    if ($random_number < $indice_de_confiance) {
        
        $query = "INSERT INTO `incidence".$id_etablissement."__Local`(`ID_Incidence`, `ID_Signalement`, `Commentaire_Signalement`, `Etat_Incident`, `Heure_du_signalement`, `Heure_de_la_Commande`, `Heure_de_la_Livraison`, `Heure_de_la_Reparation`, `Heure_de_la_Classification`, `ID_Utilisateur`, `ID_Equipement`) 
        VALUES ('0','".$id_signalement."','".$commentaire_signalement."', '0','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".$id_utilisateur."','".$id_equipement."')";

        

        if ($conn->query($query) === TRUE) {
            $id_incidence_result = $conn->query("SELECT MAX(ID_Incidence) as max_id FROM Incidence".$id_etablissement."__Local WHERE ID_Equipement='".$id_equipement."' AND ID_Utilisateur='".$id_utilisateur."' AND Etat_Incident='0'");
            $id_incidence_row = $id_incidence_result->fetch_assoc();
            $max_id_incidence = $id_incidence_row["max_id"];
            $result = $conn->query("SELECT * FROM Pepin".$id_etablissement."__Local WHERE Etat='1' AND ID_Equipement='".$id_equipement."'");
            while ($row = $result->fetch_assoc()) {
                $pepin_id = $row["ID_Pepin"];
            
                // Mettre à jour la colonne ID_Incidence dans la table pepin1__local
                $query_pepin = "UPDATE Pepin".$id_etablissement."__Local SET ID_Incident = '".$max_id_incidence."' WHERE ID_Pepin = '".$pepin_id."'";
                if($conn->query($query_pepin) === TRUE){
                    // rien
                }
                else{
                    '[{"validation" : "false"}, {"erreur" : "erreur des mises a jour des pepins"}]';
                }
            }
            echo '[{"validation" : "true"},{"ID_Incidence" :"'.$max_id_incidence.'"}]';

        }else{
            echo "Erreur : ".$conn->error;
        }
    } else {
        echo '[{"validation" : "false"}, {"erreur" : "indice de confiance insuffisant"}]';
        
    }
    
}
else{

    $row = $result->fetch_assoc();
    $incident_id = $row["ID_Incidence"];
    // Mettre à jour la colonne ID_Incidence dans la table pepin1__local
    $result = $conn->query("SELECT * FROM Pepin".$id_etablissement."__Local WHERE Etat='1' AND ID_Equipement='".$id_equipement."'");
    while ($row = $result->fetch_assoc()) {
        $pepin_id = $row["ID_Pepin"];
            
        // Mettre à jour la colonne ID_Incidence dans la table pepin1__local
        $query = "UPDATE Pepin".$id_etablissement."__Local SET ID_Incident ='".$incident_id."' WHERE ID_Pepin='".$pepin_id."'";
        if ($conn->query($query) === TRUE) {
            //rien
        } else {
            echo '[{"validation" : "false"}, {"erreur" : "erreur de mise a jour de la table"}]';
        }
        
    }
    echo '[{"validation" : "true"},{"ID_Incident" :"'.$incident_id.'"}]';
}
    // Fermer la connexion à la base de données
    $conn->close();
    ?>