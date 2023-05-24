<?php 
    require 'connexion_bdd_config.php';
        
        $signalement = $conn->prepare('SELECT * FROM Template'.$_GET["ID_Etablissement"].'__Local');
        $json = "[";
        if(is_bool($signalement)){

        }
        else{
            $signalement->execute();
        $result_cat_1 = $signalement->get_result();

        $j=0;
        $nom_colonne = $conn->prepare("SHOW COLUMNS FROM Template".$_GET["ID_Etablissement"]."__Local ");
        $nom_colonne->execute();
        $result = $nom_colonne->get_result();
        
        //$json = "";
        while($row1 = $result->fetch_assoc()){
            if($j==2){
                $information_equipement = $conn->prepare("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                $information_equipement->execute();
                $temp = $information_equipement->get_result();
                $info = $temp->fetch_assoc();

                $json .= '{"ID_Equipement": "'.$info["ID_Equipement"].'","Nom_Equipement": "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'"}';
            }
            if($j>2){

                $information_equipement = $conn->prepare("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row1["Field"]."");
                $information_equipement->execute();
                $temp = $information_equipement->get_result();
                $info = $temp->fetch_assoc();

                $json .= ', {"ID_Equipement": "'.$info["ID_Equipement"].'" ,"Nom_Equipement": "'.$info["Nom_Equipement"].'" ,"Description_Equipement": "'.$info["Description_Equipement"].'"}';
            }
            $j++;
        }
        }
        
        
        $json .= "]";
        echo $json;

?>