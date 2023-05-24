<?php 
    require 'connexion_bdd_config.php';



        $req = $conn->prepare('DELETE FROM Template'.$_GET["ID_Etablissement"].'__Local WHERE ID_Template='.$_GET["ID_Template"].'');
        $req->execute();

        echo "[]";
?>