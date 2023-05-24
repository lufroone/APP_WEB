<?php 
    require 'connexion_bdd_config.php';


        $result = $conn->query('SELECT * FROM Noeud__Local WHERE Precedent="'.$_GET["ID_Etablissement"].'" AND Profondeur = 0');
        //$result->execute();
        //$row = $result->get_result();
        $row = $result->fetch_assoc();

        echo '[{ "ID_Noeud" : "'.$row["ID_Noeud"].'","Precedent" : "'.$row["Precedent"].'","Nom_Element" : "'.$row["Nom_Element"].'","Localisation" : "'.$row["Localisation"].'","Profondeur" : "'.$row["Profondeur"].'","Nombre_de_QRCODE" : "'.$row["Nombre_de_QRCODE"].'", "Fils" : [] }]';

        //echo json_encode($id_noeud);
?>