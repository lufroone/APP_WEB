<?php 
    require 'connexion_bdd_config.php';

        $requete = $conn->prepare('SELECT * FROM Administrateur__Local WHERE ID_Etablissement='.$_GET["ID_Etablissement"].' AND Lieu_de_travail='.$_GET["ID_Noeud"].'');
        $requete->execute();
        $info_administrateur = $requete->get_result();

        while($row = $info_administrateur->fetch_assoc()){
            if(isset($row["Mail_Administrateur"])){
    
                $to = $row["Mail_Administrateur"];
                $subject = $_GET["titre_du_mail"];
                $message = $_GET["message"];
                $from = "hurflym@gmail.com";
                $headers = "From:".$from;
    
                mail($to,$subject,$message,$from);
                echo '["'.$row['Mail_Administrateur'].'"]';
            }
            else{
                echo '["le mail nexiste pas"]';
            }
        }
?>