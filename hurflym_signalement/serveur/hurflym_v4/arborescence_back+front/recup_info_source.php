<?php 
    require 'connexion_bdd_config.php';


        $result = $conn->query('SELECT * FROM Source__Local WHERE ID_Source="'.$_GET["ID_Source"].'"');
        //$result->execute();
        //$row = $result->get_result();
        $row = $result->fetch_assoc();

        echo '[{ "ID_Signalement" : "'.$row["ID_Signalement"].'", "ID_Ep" : "'.$row["ID_Ep"].'","ID_Etablissement" : "'.$row["ID_Etablissement"].'"}]';

        //echo json_encode($id_noeud);
?>