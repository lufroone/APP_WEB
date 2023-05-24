<?php 
    require 'connexion_bdd_config.php';

        $sql = "INSERT INTO Incidence_ep__Local(ID_Incidence_Ep,ID_Ep,Commentaire_Ep,Image_Incident,Etat_Incident_Ep,Heure_du_signalement,Heure_de_la_Commande,Heure_de_la_Livraison,Heure_de_la_Reparation,Heure_de_la_Classification,ID_Utilisateur)
		VALUES('0','".$_GET["ID_Ep"]."','".$_GET["Commentaire_Ep"]."',null,'1','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".$_GET["ID_Utilisateur"]."')
		";
        $conn->query($sql);

        echo "[]";

    
?>