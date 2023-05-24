<?php 
    require 'connexion_bdd_config.php';

        $sql = "INSERT INTO Pepin".$_GET["ID_Etablissement"]."__Local(ID_Pepin,ID_Signalement,Commentaire_Signalement,ID_Utilisateur,heure_de_creation,Etat,ID_Incident,ID_Equipement)
		VALUES('0','".$_GET["ID_Signalement"]."','".$_GET["Commentaire_Signalement"]."','".$_GET["ID_Utilisateur"]."','".date('d-m-y h:i:s')."','1','0','".$_GET["ID_Equipement"]."')
		";
        $conn->query($sql);

        //$ID_Pepin = $conn->query("SELECT MAX(ID_Pepin) FROM Pepin".$_GET["ID_Etablissement"]."__Local WHERE ID_Utilisateur='".$_GET["ID_Utilisateur"]."'");


        echo '[]'; // {"ID_Pepin": "'.$ID_Pepin.'"}

    
?>