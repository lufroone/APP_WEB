<?php 
    require 'connexion_bdd_config.php';

        $source = $conn->query('SELECT * FROM Source__Local WHERE ID_Ep = "'.$_GET["ID_Ep"].'"');
        $source = $source->fetch_assoc();
        $id_source = $source["ID_Source"];
        $conn->query("INSERT INTO Demande_QRCODE__Local VALUES('0','$id_source')");

        echo "[]";
?>