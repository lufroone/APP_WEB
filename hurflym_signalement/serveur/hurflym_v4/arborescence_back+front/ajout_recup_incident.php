<?php 
    require 'connexion_bdd_config.php';

        $sql = "INSERT INTO Recup_Signalement".$_GET["ID_Etablissement"]."__Local(ID_Recup,ID_Signalement,Commentaire_Signalement,ID_Utilisateur,heure_de_creation,".$_GET["Parametre"].")
		VALUES('0','".$_GET["ID_Signalement"]."','".$_GET["Commentaire_Signalement"]."','".$_GET["ID_Utilisateur"]."','".date('d-m-y h:i:s')."',".$_GET["Arguments"].")
		";
        $conn->query($sql);

        $ID_Recup = $conn->query("SELECT MAX(ID_Recup) FROM Recup_signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Utilisateur='".$_GET["ID_Utilisateur"]."'");

        echo '[{"ID_Recup" : "'.$ID_Recup.'"}]';

    
?>