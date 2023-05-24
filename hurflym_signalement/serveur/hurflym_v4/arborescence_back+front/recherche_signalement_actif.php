<?php 
    require 'connexion_bdd_config.php';

    $etat = $conn->query("SELECT * FROM Signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Signalement='".$_GET["ID_Signalement"]."'");
    $etat = $etat->fetch_assoc();

    echo '[{"activation" : "'.$etat["Signalement_Actif"].'"}]';
        
?>