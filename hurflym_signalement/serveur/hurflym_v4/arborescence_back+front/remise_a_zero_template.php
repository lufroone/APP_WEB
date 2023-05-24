<?php 
    require 'connexion_bdd_config.php';

        $j=0;
        $nom_colonne = $conn->query("SHOW COLUMNS FROM Template".$_GET["ID_Etablissement"]."__Local ");
        $json = '[';
        while($row1 = $nom_colonne->fetch_assoc()){
                    
            if($j>=3){

                $conn->query("UPDATE `Template".$_GET["ID_Etablissement"]."__Local` SET `".$row1["Field"]."`='0'  WHERE `ID_Template`='".$_GET["ID_Template"]."'");
            }
            $j++;
        }

        echo "[]";
?>