<?php 
    require 'connexion_bdd_config.php';
        
        //$signalement = $conn->prepare('SELECT * FROM Signalement'.$_GET["ID_Etablissement"].'__Local');
        //$signalement->execute();
        //$result_cat_1 = $signalement->get_result();

        $j=0;
        $nom_colonne = $conn->query("SHOW COLUMNS FROM Signalement".$_GET["ID_Etablissement"]."__Local ");
        $json = "[ ";
        if(is_bool($nom_colonne)){

        }
        else{
            while($row1 = $nom_colonne->fetch_assoc()){
                    
                if($j==5){
    
                    $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                    $info = $information_equipement->fetch_assoc();
    
                    $json .= '{ "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
                }
                if($j>5){
    
                    $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                    $info = $information_equipement->fetch_assoc();
    
                    $json .= ', { "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
                }
                $j++;
            }
        }
        
        $json .= " ]";
        echo $json;

?>