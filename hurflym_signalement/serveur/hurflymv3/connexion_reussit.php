<?php        
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
?>

<?php
    // Récupération des informations utilisateurs
    $ID_Utilisateur = $conn->query("SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur = '".$_COOKIE["mail_utilisateur_hurflym"]."'");
    $ID_Utilisateur = $ID_Utilisateur->fetch_assoc();
    // est maintenant utilisable -> $ID_Utilisateur['ID_Utilisateur'];
?>

    <div class="header">
        <div id="logo">
            <a src="http://hurflym.fr/arborescence_back+front/index.php"><img src="../image/Hurflym_logo_colore_2.png" height="100" width="200"></a>
        </div>

        <div class="menu_connexion">
            <div class="identification" onclick="section(1)">Signalement en cours</div>
            <div class="identification" onclick="section(2)">Signalement terminés</div>
            <div class="identification" onclick="visionnage_des_parametres()">Parametre du compte</div>
            <div class="identification" onclick="deconnexion()">Deconnexion</div>
        </div>

    </div>

    <div class="section" id="section1">
        <h1>Vos signalements en cours de traitement</h1>
        <div class="signalement_termine">
        <?php
        $i = 1;
            // Recuperation du nombre d'etablissement dans la base de donnée
            $nb_etablissement = $conn->prepare("SELECT * FROM Etablissement__Local");
            $nb_etablissement->execute();
            $nb_etablissement = $nb_etablissement->get_result();

            // recherche parmi les incidence classiques
            while($row1 = $nb_etablissement->fetch_assoc()){
                $incident_signalement = $conn->prepare("SELECT * FROM Incidence".$i."__Local WHERE ID_Utilisateur = ".$ID_Utilisateur['ID_Utilisateur']." AND Etat_incident != '4'");
                $incident_signalement->execute();
                $result = $incident_signalement->get_result();
                $j=0;
                while($row2 = $result->fetch_assoc()){
                    ?> <div class="signalement_en_cours" id=<?php echo "signalement_en_cours".$i ?>> <?php
                    // Informations etablissement -> NOM 
                    $informations_etablissement = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement = ".$i."");
                    $informations_etablissement = $informations_etablissement->fetch_assoc();
                    ?> <br><div class="nom_etablissement">  <?php
                    echo $informations_etablissement["Nom_Etablissement"];
                    ?>  </div> <br> <div class="etat_Incident"> <?php
                    // Informations etat incident -> etat_incident/heure_de_signalement
                    echo $row2["Etat_Incident"];
                    ?>  </div> <br> <div class="heure_du_signalement"> <?php
                    echo $row2["Heure_du_signalement"];
                    ?>  </div> <br> <div class="localisation"> <?php
                    // Informations sur le noeud -> adresse et endroit
                    $ID_Signalement = $row2["ID_Signalement"];
                    $ID_Noeud = $conn->query("SELECT ID_Noeud FROM Signalement".$i."__Local WHERE ID_Signalement = ".$ID_Signalement."");
                    $ID_Noeud = $ID_Noeud->fetch_assoc();
                    
                    $information_noeud = $conn->query("SELECT * FROM Noeud__Local WHERE ID_Noeud = ".$ID_Noeud["ID_Noeud"]."");
                    $information_noeud = $information_noeud->fetch_assoc();
                    echo $information_noeud["Localisation"];
                    ?>  </div> <br> <div class="contenu_du_signalement"> <?php
                    // Infromations sur le signalement -> qu'est ce qui a ete signalé / etc...

                    $k=0;
                    $nom_colonne = $conn->query("SHOW COLUMNS FROM Incidence".$i."__Local ");
        
                    while($row3 = $nom_colonne->fetch_assoc()){
                        if($k>=10){
                            if($row2[$row3["Field"]] == '0'){
                                $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row3["Field"]."");
                                $info = $information_equipement->fetch_assoc();

                                ?> <br> <div class=<?php echo "nom_equipement".$k ?>> <?php
                                echo $info["Nom_Equipement"];
                                ?> </div> <br> <?php
                            }
                            //$json .= ', { "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
                        }
                        $k++;
                    }
        
                }

                $i++;
            }

            // recherche parmi les incidents particuliers
        ?>
        </div>
    </div>
        </div>
        </div>

    <div class="section" id="section2">
    <h1>Vos signalements terminés</h1>
        <div class="signalement_termine">
        <?php
        $i = 1;
            // Recuperation du nombre d'etablissement dans la base de donnée
            $nb_etablissement = $conn->prepare("SELECT * FROM Etablissement__Local");
            $nb_etablissement->execute();
            $nb_etablissement = $nb_etablissement->get_result();

            // recherche parmi les incidence classiques
            while($row1 = $nb_etablissement->fetch_assoc()){
                $incident_signalement = $conn->prepare("SELECT * FROM Incidence".$i."__Local WHERE ID_Utilisateur = ".$ID_Utilisateur['ID_Utilisateur']." AND Etat_Incident = '4'");
                $incident_signalement->execute();
                $result = $incident_signalement->get_result();
                $j=0;
                while($row2 = $result->fetch_assoc()){
                    ?> <div class="signalement_termine" id=<?php echo "signalement_termine".$i ?>> <?php
                    // Informations etablissement -> NOM 
                    $informations_etablissement = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement = ".$i."");
                    $informations_etablissement = $informations_etablissement->fetch_assoc();
                    ?> <br><div class="nom_etablissement">  <?php
                    echo $informations_etablissement["Nom_Etablissement"];
                    ?>  </div> <br> <div class="etat_Incident"> <?php
                    // Informations etat incident -> etat_incident/heure_de_signalement
                    echo $row2["Etat_Incident"];
                    ?>  </div> <br> <div class="heure_du_signalement"> <?php
                    echo $row2["Heure_du_signalement"];
                    ?>  </div> <br> <div class="localisation"> <?php
                    // Informations sur le noeud -> adresse et endroit
                    $ID_Signalement = $row2["ID_Signalement"];
                    $ID_Noeud = $conn->query("SELECT ID_Noeud FROM Signalement".$i."__Local WHERE ID_Signalement = ".$ID_Signalement."");
                    $ID_Noeud = $ID_Noeud->fetch_assoc();
                    
                    $information_noeud = $conn->query("SELECT * FROM Noeud__Local WHERE ID_Noeud = ".$ID_Noeud["ID_Noeud"]."");
                    $information_noeud = $information_noeud->fetch_assoc();
                    echo $information_noeud["Localisation"];
                    ?>  </div> <br> <div class="contenu_du_signalement"> <?php
                    // Infromations sur le signalement -> qu'est ce qui a ete signalé / etc...

                    $k=0;
                    $nom_colonne = $conn->query("SHOW COLUMNS FROM Incidence".$i."__Local ");
        
                    while($row3 = $nom_colonne->fetch_assoc()){
                        if($k>=10){
                            if($row2[$row3["Field"]] == '0'){
                                $information_equipement = $conn->query("SELECT ID_Equipement,Nom_Equipement,Description_Equipement FROM Equipement__Local WHERE ID_Equipement=".$row3["Field"]."");
                                $info = $information_equipement->fetch_assoc();

                                ?> <br> <div class=<?php echo "nom_equipement".$k ?>> <?php
                                echo $info["Nom_Equipement"];
                                ?> </div> <br> <?php
                            }
                            //$json .= ', { "ID_Equipement" : "'.$info["ID_Equipement"].'", "Nom_Equipement" : "'.$info["Nom_Equipement"].'","Description_Equipement" : "'.$info["Description_Equipement"].'" } ';
                        }
                        $k++;
                    }
        
                }

                $i++;
            }

            // recherche parmi les incidents particuliers
        ?>
        </div>
    </div>
        </div>
        </div>

    <div class="section" id="section3">
        <h1>Voici vos informations de compte</h1>
        <div class="formulaire_des_informations_de_lutilisateur">
            <div class="container" id="C_Nom_Utilisateur">
                <div id="V_Nom_Utlisateur" class="valeur"></div>
                <div clas="bouton_modification" id="B_Nom_Utilisateur" onclick="modification_informations(0)"><img src="../image/crayon.png" width="40px" height="40px"></div>
            </div>
            <div class="container" id="C_Prenom_Utilisateur">
                <div id="V_Prenom_Utlisateur" class="valeur"></div>
                <div clas="bouton_modification" id="B_Prenom_Utilisateur" onclick="modification_informations(1)"><img src="../image/crayon.png" width="40px" height="40px"></div>
            </div>
            <div class="container" id="C_Username_Utilisateur">
                <div id="V_Username_Utlisateur" class="valeur"></div>
                <div clas="bouton_modification" id="B_Username_Utilisateur" onclick="modification_informations(2)"><img src="../image/crayon.png" width="40px" height="40px"></div>
            </div>
            <div class="container" id="C_Mail_Utilisateur">
                <div id="V_Mail_Utlisateur" class="valeur"></div>
                <div clas="bouton_modification" id="B_Mail_Utilisateur">Immuable</div>
            </div>
            <div class="container" id="C_Mot_de_passe_Utilisateur">
                <input type="password" name="V_Mot_de_Passe_Utlisateur" id="V_Mot_de_Passe_Utlisateur" class="valeur">
                <input type="password" name="V2_Mot_de_Passe_Utlisateur" id="V2_Mot_de_Passe_Utlisateur" class="valeur">
                <div clas="bouton_modification" id="B_Mot_de_Passe_Utilisateur" onclick="Changer_le_mot_de_passe_utilisateur()">Changer le mot de passe</div>
            </div>
            <div id="modification_de_mot_de_passe"></div>
        </div>
    </div>

    <div id="connexion">
        <p>Veuillez rentrer vos identifiants pour aller plus loin :</p>
        <label>adresse mail :</label><br>
        <input type="text" name="adresse_mail_utilisateur" id="adresse_mail_utilisateur"><br>
        <label>mot de passe :</label><br>
        <input type="password" name="mot_de_passe_utilisateur" id="mot_de_passe_utilisateur"><br>
        <div id="bouton_de_connexion" onclick="connexion()">Connexion</div>
    </div>

