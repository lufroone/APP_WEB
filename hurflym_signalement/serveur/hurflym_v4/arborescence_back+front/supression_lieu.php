<?php 
    require 'connexion_bdd_config.php';

        $req = $conn->prepare('DELETE FROM Noeud__Local WHERE ID_Noeud='.$_GET["ID_Noeud"].'');
        $req->execute();
        echo '[]';
?>