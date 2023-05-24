<?php 
    require 'connexion_bdd_config.php';



        $req = $conn->prepare('DELETE FROM Signalement'.$_GET["ID_Etablissement"].'__Local WHERE ID_Signalement='.$_GET["ID_Signalement"].'');
        $req->execute();

        $req = $conn->prepare('DELETE FROM Source__Local WHERE ID_Signalement='.$_GET["ID_Signalement"].' AND ID_Etablissement='.$_GET["ID_Etablissement"].'');
        $req->execute();

        echo "[]";
?>