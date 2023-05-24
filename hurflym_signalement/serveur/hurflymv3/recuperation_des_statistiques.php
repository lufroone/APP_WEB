<?php 
    try
    {
        $dsn = 'mysql:host=54.37.31.19;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
	    die('Erreur : ' . $e->getMessage());
    }

    header("Content-Type: text/javascript");

    


        $servername = "54.37.31.19";
        $username = "u118526083_Lufroone";
        $password = "2=nG!jR60";
        $dbname = "u118526083_Hurflym";

        // Créer une conexion
        $conn = new mysqli($servername, $username, $password, $dbname);
        // verifier la connexion
        if ($conn->connect_error) {
        die("La connexion a échouée: " . $conn->connect_error);
        }


        

        $json = '[';


        // Information concernant les signalements

        $requete = $conn->query('SELECT * FROM Incidence'.$_GET['ID_Etablissement'].'__Local');
        
        $i=0;
        while($row = $requete->fetch_assoc()){
            if($i==0){
                $json .= '{"Signalement" : [ {"ID_Incidence" : "'.$row['ID_Incidence'].'", "ID_Signalement" : "'.$row["ID_Signalement"].'", "Commentaire" : "'.$row["Commentaire_Signalement"].'", "Etat_Incident" : "'.$row['Etat_Incident'].'", "Heure_du_signalement" : "'.$row["Heure_du_signalement"].'", "Heure_de_la_Commande" : "'.$row["Heure_de_la_Commande"].'", "Heure_de_la_Livraison" : "'.$row["Heure_de_la_Livraison"].'", "Heure_de_la_Reparation" : "'.$row["Heure_de_la_Reparation"].'", "Heure_de_la_Classification" : "'.$row["Heure_de_la_Classification"].'", "ID_Utilisateur" : "'.$row["ID_Utilisateur"].'", "Equipement" : ';
                $j=0;
                $json .= '[';
                $nom_colonne = $conn->query("SHOW COLUMNS FROM Incidence".$_GET["ID_Etablissement"]."__Local ");
                while($row1 = $nom_colonne->fetch_assoc()){
                    if($j==9){
                        $json .= '"'.$row[$row1["Field"]].'"'; 
                    }
                    if($j>9){
                        $json .= ', "'.$row[$row1["Field"]].'"';
                    }
                    $j++;
                }
                $json .= ']}';
            }
            else{
                $json .= ', {"ID_Incidence" : "'.$row['ID_Incidence'].'", "ID_Signalement" : "'.$row["ID_Signalement"].'", "Commentaire" : "'.$row["Commentaire_Signalement"].'", "Etat_Incident" : "'.$row['Etat_Incident'].'", "Heure_du_signalement" : "'.$row["Heure_du_signalement"].'", "Heure_de_la_Commande" : "'.$row["Heure_de_la_Commande"].'", "Heure_de_la_Livraison" : "'.$row["Heure_de_la_Livraison"].'", "Heure_de_la_Reparation" : "'.$row["Heure_de_la_Reparation"].'", "Heure_de_la_Classification" : "'.$row["Heure_de_la_Classification"].'", "ID_Utilisateur" : "'.$row["ID_Utilisateur"].'", "Equipement" : ';
                    $j=0;
                    $json .= '[';
                    $nom_colonne_1 = $conn->query("SHOW COLUMNS FROM Incidence".$_GET["ID_Etablissement"]."__Local ");
                    while($row1 = $nom_colonne_1->fetch_assoc()){
                        if($j==9){
                            $json .= '"'.$row[$row1["Field"]].'"'; 
                        }
                        if($j>9){
                            $json .= ', "'.$row[$row1["Field"]].'"';
                        }
                        $j++;
                    }
                    $json .= ']}';
            }
            $i++;
        }
        $json .= ']}';



        // Informations concernant les Equipements particuliers

        $requete = $conn->query('SELECT * FROM Equipement_Particulier__Local WHERE ID_Etablissement='.$_GET["ID_Etablissement"].'');

        $i=0;
        while($row = $requete->fetch_assoc()){

            $requete2 = $conn->query('SELECT * FROM Incidence_Ep__Local WHERE ID_Ep='.$row["ID_Ep"].'');
            $j=0;
            while($row2 = $requete2->fetch_assoc()){
                if($j==0){
                    $json .= ', {"Equipement" : [ {"ID_Incidence_Ep" : "'.$row2["ID_Incidence_Ep"].'","ID_Ep" : "'.$row2["ID_Ep"].'", "Nom_Ep" : "'.$row["Nom_Ep"].'","Commentaire_Ep" : "'.$row2["Commentaire_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Incident" : "'.base64_encode($row2["Image_Incident"]).'","ID_Noeud" : "'.$row["ID_Noeud"].'","Demande_QRCODE" : "'.$row["Demande_QRCODE"].'","Ep_Actif" : "'.$row["Ep_Actif"].'", "Etat_Incident_Ep" : "'.$row2["Etat_Incident_Ep"].'","Heure_du_signalement" : "'.$row2["Heure_du_signalement"].'","Heure_de_la_Commande" : "'.$row2["Heure_de_la_Commande"].'","Heure_de_la_Livraison" : "'.$row2["Heure_de_la_Livraison"].'","Heure_de_la_Reparation" : "'.$row2["Heure_de_la_Reparation"].'","Heure_de_la_Classification" : "'.$row2["Heure_de_la_Classification"].'","ID_Utilisateur" : "'.$row2["ID_Utilisateur"].'"}';
                }
                else{
                    $json .= ', {"ID_Incidence_Ep" : "'.$row2["ID_Incidence_Ep"].'","ID_Ep" : "'.$row2["ID_Ep"].'", "Nom_Ep" : "'.$row["Nom_Ep"].'","Commentaire_Ep" : "'.$row2["Commentaire_Ep"].'","Description_Ep" : "'.$row["Description_Ep"].'","ID_Categorie_Equipement" : "'.$row["ID_Categorie_Equipement"].'","Image_Incident" : "'.base64_encode($row2["Image_Incident"]).'","ID_Noeud" : "'.$row["ID_Noeud"].'","Demande_QRCODE" : "'.$row["Demande_QRCODE"].'","Ep_Actif" : "'.$row["Ep_Actif"].'", "Etat_Incident_Ep" : "'.$row2["Etat_Incident_Ep"].'","Heure_du_signalement" : "'.$row2["Heure_du_signalement"].'","Heure_de_la_Commande" : "'.$row2["Heure_de_la_Commande"].'","Heure_de_la_Livraison" : "'.$row2["Heure_de_la_Livraison"].'","Heure_de_la_Reparation" : "'.$row2["Heure_de_la_Reparation"].'","Heure_de_la_Classification" : "'.$row2["Heure_de_la_Classification"].'","ID_Utilisateur" : "'.$row2["ID_Utilisateur"].'"}';
                }
                $j++;
            }
            $i++;
        }
        if($i!=0){
            $json .= ']}';
        }
        
        






        $json .= ']';
        echo $json;
?>