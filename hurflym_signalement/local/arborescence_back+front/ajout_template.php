<?php 
    require 'connexion_bdd_config.php';

        $req = "INSERT INTO Template".$_GET["ID_Etablissement"]."__Local".$_GET["Parametre"]." VALUES".$_GET["Values"]."";

        $conn->query($req);

        $test_1 = $conn->query("SELECT ID_Template FROM Template".$_GET["ID_Etablissement"]."__Local WHERE ID_Template = (SELECT MAX(ID_Template) FROM Template".$_GET["ID_Etablissement"]."__Local)");

        $ID_Template = $test_1->fetch_assoc();

        
        echo '['.$ID_Template["ID_Template"].']';
?>