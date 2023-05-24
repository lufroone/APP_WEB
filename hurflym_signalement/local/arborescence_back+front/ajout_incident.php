<?php 
    require 'connexion_bdd_config.php';

        $sql = "INSERT INTO Incidence".$_GET["ID_Etablissement"]."__Local(ID_Incidence,ID_Signalement,Commentaire_Signalement,Etat_Incident,Heure_du_signalement,Heure_de_la_Commande,Heure_de_la_Livraison,Heure_de_la_Reparation,Heure_de_la_Classification,ID_Utilisateur,".$_GET["Parametre"].")
		VALUES('0','".$_GET["ID_Signalement"]."','".$_GET["Commentaire_Signalement"]."','1','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".date('d-m-y h:i:s')."','".$_GET["ID_Utilisateur"]."',".$_GET["Arguments"].")
		";
        $conn->query($sql);

        echo "[]";

    
?>