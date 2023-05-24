<?php
    // Souvent on identifie cet objet par la variable $conn ou $db
    try
    {
        $dsn = 'mysql:host=54.37.31.19;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
	    die('Erreur : ' . $e->getMessage());
    }
?>

<?php
    // Souvent on identifie cet objet par la variable $conn ou $db
    //try
    //{
    //    $dsn = 'mysql:host=localhost;dbname=hurflym';
    //    $bdd = new PDO($dsn,'root','');
    //}
    //catch (Exception $e)
    //{
	//    die('Erreur : ' . $e->getMessage());
    //}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signalement Salle</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/index_css_49.css">
</head>
<body>
    <div class="header">
        <a><img src="image/Hurflym_logo_colore_2.png" width="100" height="50"></a>
        <button class="responsable" onclick="ouvre_longlet_connexion_responsable()">Responsable</button>
    </div>
    
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

            if(isset($_POST['username_responsable']) && isset($_POST['mot_de_passe_responsable'])){
                $username = $_POST['username_responsable'];
                $mot_de_passe = $_POST['mot_de_passe_responsable'];
                $result = $conn->query('SELECT ID_Responsable, Proprete_Responsable, Technique_Responsable FROM Responsable WHERE Username_Responsable="'.$username.'" AND Mot_de_passe_Responsable="'.$mot_de_passe.'"');
                $date = date('d-m-y h:i:s');
                $row = $result->fetch_assoc();
                if($row != null){
                    if($row['Proprete_Responsable'] == 1){
                        $sql = $conn->query('UPDATE Signalement_Salle SET effectue_prepreté="1" WHERE ID_Salle="'.$_GET['Salle'].'"');
                        $sql = $conn->query("UPDATE Signalement_Salle SET heure_du_nettoyage='$date' WHERE ID_Salle='".$_GET['Salle']."'");
                    }
                    if($row['Technique_Responsable'] == 1){
                        $sql = $conn->query('UPDATE Signalement_Salle SET effectue_technique="1" WHERE ID_Salle="'.$_GET['Salle'].'"');
                        $sql = $conn->query("UPDATE Signalement_Salle SET heure_de_la_reparation='$date' WHERE ID_Salle='".$_GET['Salle']."'");
                    }
                }
                $conn->close();
            }
        ?>

    <div class="introduction">
        <div class="a_supp">
        <h3>Un problème ?<br> Signalez-le nous !</h3>
        <div class="trait"></div>
        
        </div>
    </div>
    <main>
        <form action="" method="POST">
            <div class="page" id="page1">
                <div>
                    <?php 
                    if(isset($_GET['Projecteur_en_panne']) || isset($_GET['Micro_casse']) || isset($_GET['Manque_de_feutre']) || isset($_GET['Chaise_casse']) || isset($_GET['Manque_cable_HDMI']) || isset($_GET['Objet_oublie']) || isset($_GET['Liquide_renverse']) || isset($_GET['Tache']) || isset($_GET['Pc_casse'])){
                        ?>
                        <h3 id="remerciement">Merci de votre signalement !</h3>
                        <?php
                    }
                    else{
                        ?>
                        <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
                        <br>
                        <button class="next" type="button"><img class="center" src="image/informatique.png" width="150" height="150"><br><bold>Informatique</bold></button><br>
                        <button class="next_3" type="button"><img class="center" src="image/proprete.png" width="150" height="150"><br><bold>Propreté</bold></button><br>
                        <button class="next_4" type="button"><img class="center" src="image/materiel.png" width="150" height="150"><br><bold>Matériel</bold></button><br>
                        <?php
                    }
                ?>
                </div>

            </div>
            <div class="page" id="page2">

            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
                
                <div class="blob_8_invalide" id="Projecteur_en_panne" onclick="Projecteur_en_panne_f()"><img class="center" src="image/projecteur.png" width="150" height="150"><br>Projecteur<br> en panne</div><br>
                <div class="blob_2_invalide" id="Micro_casse" onclick="Micro_casse_f()"><img class="center"  src="image/micro.png" width="150" height="150"><br>Micro cassé</div><br>
                <div class="blob_3_invalide" id="Manque_cable_HDMI" onclick="Manque_cable_HDMI_f()"><img class="center"  src="image/cable-hdmi.png" width="150" height="150"><br>Câble HDMI</div><br>
                <div class="blob_4_invalide" id="Pc_casse" onclick="Pc_casse_f()"><img class="center"  src="image/pc_casse.png" width="150" height="150"><br>Pc cassé </div><br>
                <br>
                <div class="bouton">
                    <button class="prev" type="button">Précédent</button>
                    <button type="button" class="next_4_2" id="envoi">Suivant !</button>
                </div>
                
            </div>
            <div class="page" id="page3">

            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
                <div class="blob_5_invalide" id="Liquide_renverse" onclick="Liquide_renverse_f()"><img class="center" src="image/sol_sale.png" width="150" height="150"><br>Liquide renversé</div><br>
                <div class="blob_6_invalide" id="Tache" onclick="Tache_f()"><img class="center"  src="image/tache.png" width="150" height="150"><br>Tâche</div><br>
                <br>
                <div class="bouton">
                    <button class="prev_3" type="button">Précédent</button>
                    <button type="button" class="next_3_2" id="envoi">Suivant !</button>
                </div>
            </div>
            <div class="page" id="page4">

            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
            
                <div class="blob_7_invalide" id="Manque_de_feutre" onclick="Manque_de_feutre_f()"><img class="center" src="image/feutres.png" width="150" height="150"><br>Manque de feutre</div><br>
                <div class="blob_8_invalide" id="Objet_oublie" onclick="Objet_oublie_f()"><img class="center"  src="image/objet.png" width="150" height="150"><br>Objet oublié</div><br>
                <div class="blob_9_invalide" id="Chaise_casse" onclick="Chaise_casse_f()"><img class="center"  src="image/fauteuil.png" width="150" height="150"><br>Chaise cassée</div><br>

                <br>
                <div class="bouton">
                    <button class="prev_4" type="button">Précédent</button>
                    <button type="button" class="next_2" id="envoi">Suivant !</button>
                </div>
            </div>
            <div class="page" id="page5">
            <h4>N'hésitez pas à préciser le problème rencontré !</h4>
                <br>
                <label>Commentaire (facultatif):</label>
                <input type="text" id="commentaire" name="commentaire">
                <br>
                <br>
                <div class="bouton">
                    <button class="prev_4" type="button">Précédent</button>
                    <button type="button" class="envoi" id="envoi" onclick="mise_en_URL_salle()">Envoyer !</button>
                </div>
                <br>
            </div>
        </form>

        <br>
    </main>
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

      
        if(isset($_GET['Projecteur_en_panne']) || isset($_GET['Micro_casse']) || isset($_GET['Manque_de_feutre']) || isset($_GET['Chaise_casse']) || isset($_GET['Manque_cable_HDMI']) || isset($_GET['Objet_oublie']) || isset($_GET['Liquide_renverse']) || isset($_GET['Tache']) || isset($_GET['Pc_casse'])){
            $date = date('d-m-y h:i:s');
            $index_salle = htmlspecialchars($_GET['Salle']);

            $sql = 'SELECT ID_Salle FROM Signalement_Salle';
            //$req2 = $bdd->query($sql);
            //$data2 = $req2->rowCount();
            //$id = $data2 +1;
            
            if(htmlspecialchars($_GET['Projecteur_en_panne']) == 1){
                $Projecteur_en_panne = 1;
            }
            else{
                $Projecteur_en_panne = 0;
            }
            if(htmlspecialchars($_GET['Micro_casse']) == 1){
                $Micro_casse = 1;
            }
            else{
                $Micro_casse = 0;
            }
            if(htmlspecialchars($_GET['Manque_cable_HDMI']) == 1){
                $Manque_cable_HDMI = 1;
            }
            else{
                $Manque_cable_HDMI = 0;
            }
            if(htmlspecialchars($_GET['Pc_casse']) == 1){
                $Pc_casse = 1;
            }
            else{
                $Pc_casse = 0;
            }

            //$Projecteur_en_panne = htmlspecialchars($_GET['Projecteur_en_panne']); 
            //$Micro_casse = $_GET['Micro_casse'];
            //$Manque_cable_HDMI = $_GET['Manque_cable_HDMI'];
            //$Pc_casse = $_GET['Pc_casse'];

            if(htmlspecialchars($_GET['Liquide_renverse']) == 1){
                $Liquide_renverse = 1;
            }
            else{
                $Liquide_renverse = 0;
            }
            if(htmlspecialchars($_GET['Tache']) == 1){
                $Tache = 1;
            }
            else{
                $Tache = 0;
            }

            //$Liquide_renverse = $_GET['Liquide_renverse'];
            //$Tache = $_GET['Tache'];


            if(htmlspecialchars($_GET['Manque_de_feutre']) == 1){
                $Manque_de_feutre = 1;
            }
            else{
                $Manque_de_feutre = 0;
            }
            if(htmlspecialchars($_GET['Objet_oublie']) == 1){
                $Objet_oublie = 1;
            }
            else{
                $Objet_oublie = 0;
            }
            if(htmlspecialchars($_GET['Chaise_casse']) == 1){
                $Chaise_casse = 1;
            }
            else{
                $Chaise_casse = 0;
            }
            //$Manque_de_feutre = $_GET['Manque_de_feutre'];
            //$Objet_oublie = $_GET['Objet_oublie'];
            //$Chaise_casse = $_GET['Chaise_casse'];

            $sql = "INSERT INTO Signalement_Salle(ID_Signalement_Salle,Projecteur_en_panne, Micro_casse,Manque_cable_HDMI,Pc_casse,Liquide_renverse,Tache,Manque_de_feutre,Objet_oublie,Chaise_casse,heure_du_signalement,ID_Salle,effectue_proprete,effectue_technique)
		    VALUES('0','$Projecteur_en_panne','$Micro_casse','$Manque_cable_HDMI','$Pc_casse','$Liquide_renverse','$Tache','$Manque_de_feutre','$Objet_oublie','$Chaise_casse','$date','$index_salle','0','0')
		    ";
            $conn->query($sql);



            $req ='SELECT * FROM Responsable WHERE Proprete_Responsable="1" AND ID_Responsable IN (SELECT ID_Responsable FROM Salle_Responsable WHERE ID_Salle = "'.$index_salle.'")';
            $mail = $bdd->prepare($req);
            $mail->execute();
            $result_proprete = $mail->fetch(PDO::FETCH_ASSOC);

            $req_2 ='SELECT * FROM Responsable WHERE Technique_Responsable="1" AND ID_Responsable IN (SELECT ID_Responsable FROM Salle_Responsable WHERE ID_Salle = "'.$index_salle.'")';
            $mail_2 = $bdd->prepare($req_2);
            $mail_2->execute();
            $result_technique = $mail_2->fetch(PDO::FETCH_ASSOC);


            if($result_proprete['Mail_Responsable'] != null && ( $Projecteur_en_panne== 1 || $Micro_casse == 1 || $Manque_cable_HDMI== 1 || $Pc_casse == 1 || $Liquide_renverse == 1 || $Tache == 1 || $Manque_de_feutre==1 || $Objet_oublie==1 || $Chaise_casse==1)){
                $from = "hurflym@gmail.com";
                $to = $result_proprete['Mail_Responsable'];
                $subject = "nouveau signalement proprete";
                
                $Liquide_renverse_message = '';
                $Tache_message = '';

                if($Liquide_renverse== 1){
                    $Liquide_renverse_message = 'Du liquide à été renversé dans la salle. ';
                }
                if($Tache == 1){
                    $Tache_message = 'Une tâche est à signaler dans la salle. ';
                }
                $commentaire_message = $_GET['commentaire'];

                $message = "La salle rencontrent de nouvaux problèmes :".$Liquide_renverse_message."".$Tache_message." l'usager a egalement commenté : ".$commentaire_message ;
                $headers = "From:".$from;

                mail($to,$subject,$message,$headers);
            }
            
            if($result_technique['Mail_Responsable'] != null && ( $Projecteur_en_panne== 1 || $Micro_casse == 1 || $Manque_cable_HDMI== 1 || $Pc_casse == 1 || $Liquide_renverse == 1 || $Tache == 1 || $Manque_de_feutre==1 || $Objet_oublie==1 || $Chaise_casse==1)){
                $from = "hurflym@gmail.com";
                $to = $result_technique['Mail_Responsable'];
                $subject = "nouveau signalement technique";
                $message = "La salle rencontre de nouveaux problèmes comme :";
                if($Projecteur_en_panne == 1){
                    $message = $message."Le projecteur est tombé en panne.";
                }
                if($Micro_casse == 1){
                    $message = $message.'Le micro ne réponds plus. ';
                }
                if($Manque_cable_HDMI == 1){
                    $message = $message."Il manque un cable HDMI dans la salle. ";
                }
                if($Pc_casse == 1){
                    $message = $message."L'ordinateur est cassé.";
                }
                if($Manque_de_feutre == 1){
                    $message = $message.'il manque des feutres dans la salle. ';
                }
                if($Objet_oublie == 1){
                    $message = $message.'un objet à été oublié dans la salle ';
                }
                if($Chaise_casse == 1){
                    $message = $message.'Une chaise de la salle est cassé. ';
                }
                $message = $message."l'usager a rajouter comme commentaire :".$_GET['commentaire'];
                $headers = "From:".$from;

                mail($to,$subject,$message,$headers);
            }
            

            /*if ($conn->query($sql) === TRUE) {
                echo "les nouveaux enregistrements ajoutés avec succés";
              } else {
                echo "Erreur: " . $sql . "" . $conn->error;
              }*/
              $conn->close();
        }
            

            

            
            

		    

		
	?>
    <?php
		/*
        
        */
		
		?> 
    <div class="foter">
        <div class="spacer"></div>
        <img src="image/Hurflym_logo_colore_2.png" width="150" height="75">
    </div>
    <script src="../script_signalement_13.js"></script>
</body>
</html>
