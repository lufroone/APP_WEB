<?php 
    require 'connexion_bdd_config.php';

        $req = "INSERT INTO Signalement".$_GET["ID_Etablissement"]."__Local".$_GET["Parametre"]." VALUES".$_GET["Values"]."";

        $conn->query($req);

        $test_1 = $conn->query("SELECT ID_Signalement FROM Signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Signalement = (SELECT MAX(ID_Signalement) FROM Signalement".$_GET["ID_Etablissement"]."__Local)");

        $ID_Signalement = $test_1->fetch_assoc();

        $req = "INSERT INTO Source__Local(ID_Source,ID_Signalement,ID_Ep,ID_Etablissement) VALUES ('0','".$ID_Signalement["ID_Signalement"]."','0','".$_GET["ID_Etablissement"]."')";

        $conn->query($req);
        
        echo '['.$ID_Signalement["ID_Signalement"].']';
?>