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
    <title>Formulaire</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    
    
</head>
<body>
    <div class="header">
        <a><img src="../image/Hurflym_logo_colore_2.png" width="100" height="50"></a>
        <button class="responsable" onclick="ouvre_longlet_connexion_responsable()">Responsable</button>
    </div>
    <?php
        if(isset($_POST['id'])){
            echo($_POST['id']);
        }
    ?>
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
                $username = htmlspecialchars($_POST['username_responsable']);
                $mot_de_passe = htmlspecialchars($_POST['mot_de_passe_responsable']);
                $result = $conn->query('SELECT ID_Responsable, Proprete_Responsable, Technique_Responsable FROM responsable WHERE username_Responsable="'.$username.'" AND mot_de_passe_Responsable="'.$mot_de_passe.'"');
                $date = date('d-m-y h:i:s');
                $row = $result->fetch_assoc();
                if($row != null){
                    if($row['Proprete_Responsable'] == 1){
                        $sql = $conn->query('UPDATE signalement_sanitaire SET effectue_prepreté="1" WHERE ID_Sanitaire="'.$_GET['Sanitaire'].'"');
                        $sql = $conn->query("UPDATE signalement_sanitaire SET heure_du_nettoyage='$date' WHERE ID_Sanitaire='".$_GET['Sanitaire']."'");
                    }
                    if($row['Technique_Responsable'] == 1){
                        $sql = $conn->query('UPDATE signalement_sanitaire SET effectue_technique="1" WHERE ID_Sanitaire="'.$_GET['Sanitaire'].'"');
                        $sql = $conn->query("UPDATE signalement_sanitaire SET heure_de_la_reparation='$date' WHERE ID_Sanitaire='".$_GET['Sanitaire']."'");
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
        <form action="" method="POST" id="formulaire">
            <div class="page" id="page1">
                <div>

                    <?php
                        if(isset($_GET["ID_Source"])){

                        }
                    ?>
                    <?php 
                    if(isset($_POST['toilette_sale']) || isset($_POST['papier_toilette']) || isset($_POST['chasse_deau']) || isset($_POST['sol_sale']) || isset($_POST['seche_main']) || isset($_POST['porte_casse']) || isset($_POST['plus_de_savon']) || isset($_POST['lavabo_sale']) || isset($_POST['robinet_casse'])){
                        ?>
                        <h3 id="remerciement">Votre signalement est en cours de traitement !</h3>
                        <?php
                    }
                    else{
                        ?>
                        <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
                        <br>
                        <?php
                    }
                ?>
                </div>

            </div>
            <div class="page" id="page2">
                
            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
                
            </div>
            <div class="page" id="page3">
            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
            </div>
            <div class="page" id="page4">
            <p id="consigne">Cliquez sur la catégorie souhaitée et cochez le problème en question pour le signaler. A vous d'agir ! </p>
            <br>
                <div class="blob_8_invalide" id="lavabo_sale" onclick="lavabo_sale_f()"><img class="center" src="../image/eclaboussure.png" width="150" height="150"><br>Lavabo sale</div><br>
                <div class="blob_9_invalide" id="plus_de_savon" onclick="plus_de_savon_f()"><img class="center"  src="../image/savon.png" width="150" height="150"><br>Plus de savon</div><br>
                <div class="blob_10_invalide" id="robinet_casse" onclick="robinet_casse_f()"><img class="center"  src="../image/tuyau.png" width="150" height="150"><br>Robinet cassé</div><br>
                <div class="blob_11_invalide" id="miroir_sale" onclick="miroir_sale_f()"><img class="center"  src="../image/miroir.png" width="150" height="150"><br>Miroir sale</div><br>








                <br>
                <div class="bouton">
                    <button class="prev_4" type="button">Précédent</button>
                    <button type="button" class="next_2" id="envoi"> Suivant ! </button>
                </div>
            </div>
            <div class="page" id="page26">
                <h4>N'hésitez pas à préciser le problème rencontré !</h4>
                <br>
                <label>Commentaire (facultatif):</label>
                <input type="text" id="commentaire" name="commentaire">
                <br>
                <br>
                <div class="bouton">
                    <button class="prev_4" type="button" onclick="page('1')">Précédent</button>
                    <button type="button" class="envoi" id="envoi" onclick="gestion_de_lincidence()">Envoyer !</button>
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
 
            
        /*isset($_POST['toilette_sale']) or isset($_POST['papier_toilette']) or isset($_POST['chasse_deau']) or isset($_POST['sol_sale']) or isset($_POST['seche_main']) or isset($_POST['porte_casse']) or isset($_POST['lavabo_sale']) or isset($_POST['plus_de_savon']) or isset($_POST['robinet_casse'])*/
            
        if(isset($_POST['toilette_sale']) || isset($_POST['papier_toilette']) || isset($_POST['chasse_deau']) || isset($_POST['sol_sale']) || isset($_POST['seche_main']) || isset($_POST['porte_casse']) || isset($_POST['plus_de_savon']) || isset($_POST['lavabo_sale']) || isset($_POST['robinet_casse'])){
            echo("y'a des valeurs");
            $date = date('d-m-y h:i:s');
            $index_sanitaire = htmlspecialchars($_POST['Sanitaire']);
            

            if(htmlspecialchars($_POST['toilette_sale']) == 1){
                $toilette_sale = 1;
            }
            else{
                $toilette_sale = 0;
            }
            if(htmlspecialchars($_POST['papier_toilette']) == 1){
                $papier_toilette = 1;
            }
            else{
                $papier_toilette = 0;
            }
            if(htmlspecialchars($_POST['chasse_deau']) == 1){
                $chasse_deau = 1;
            }
            else{
                $chasse_deau = 0;
            }
            if(htmlspecialchars($_POST['lampe_toilette']) == 1){
                $lampe_toilette = 1;
            }
            else{
                $lampe_toilette = 0;
            }
            //$toilette_sale = htmlspecialchars($_POST['toilette_sale']);
            //$papier_toilette = htmlspecialchars($_POST['papier_toilette']);
            //$chasse_deau = htmlspecialchars($_POST['chasse_deau']);
            //$lampe_toilette = htmlspecialchars($_POST['lampe_toilette']);


            if(htmlspecialchars($_POST['sol_sale']) == 1){
                $sol_sale = 1;
            }
            else{
                $sol_sale = 0;
            }
            if(htmlspecialchars($_POST['porte_casse']) == 1){
                $porte_casse = 1;
            }
            else{
                $porte_casse = 0;
            }
            if(htmlspecialchars($_POST['lampe_espace_deau']) == 1){
                $lampe_espace_deau = 1;
            }
            else{
                $lampe_espace_deau = 0;
            }
            //$sol_sale = htmlspecialchars($_POST['sol_sale']);
            //$porte_casse = htmlspecialchars($_POST['porte_casse']);
            //$lampe_espace_deau = htmlspecialchars($_POST['lampe_espace_deau']);

            if(htmlspecialchars($_POST['plus_de_savon']) == 1){
                $plus_de_savon = 1;
            }
            else{
                $plus_de_savon = 0;
            }
            if(htmlspecialchars($_POST['lavabo_sale']) == 1){
                $lavabo_sale = 1;
            }
            else{
                $lavabo_sale = 0;
            }
            if(htmlspecialchars($_POST['miroir_sale']) == 1){
                $miroir_sale = 1;
            }
            else{
                $miroir_sale = 0;
            }
            if(htmlspecialchars($_POST['robinet_casse']) == 1){
                $robinet_casse = 1;
            }
            else{
                $robinet_casse = 0;
            }
            if(htmlspecialchars($_POST['seche_main']) == 1){
                $seche_main = 1;
            }
            else{
                $seche_main = 0;
            }
            if(htmlspecialchars($_POST['sopalin']) == 1){
                $sopalin = 1;
            }
            else{
                $sopalin = 0;
            }
            //$plus_de_savon = htmlspecialchars($_POST['plus_de_savon']);
            //$lavabo_sale = htmlspecialchars($_POST['lavabo_sale']);
            //$miroir_sale = htmlspecialchars($_POST['miroir_sale']);
            //$robinet_casse = htmlspecialchars($_POST['robinet_casse']);
            //$seche_main = htmlspecialchars($_POST['seche_main']);
            //$sopalin = htmlspecialchars($_POST['sopalin']);

            $sql = "INSERT INTO Signalement_Sanitaire(ID_Signalement_Sanitaire,toilette_sale, papier_toilette,chasse_deau,lampe_toilette,sol_sale,porte_casse,lampe_espace_deau,lavabo_sale,plus_de_savon,miroir_sale,robinet_casse,seche_main,sopalin,heure_du_signalement,ID_Sanitaire,effectue_proprete,effectue_technique)
		    VALUES('0','$toilette_sale','$papier_toilette','$chasse_deau','$lampe_toilette','$sol_sale','$porte_casse','$lampe_espace_deau','$lavabo_sale','$plus_de_savon','$miroir_sale','$robinet_casse','$seche_main','$sopalin','$date','$index_sanitaire','0','0')
		    ";
            $conn->query($sql);



            $req ='SELECT * FROM Responsable WHERE Proprete_Responsable="1" AND ID_Responsable IN (SELECT ID_Responsable FROM Sanitaire_Responsable WHERE ID_Sanitaire = "'.$index_sanitaire.'")';
            $mail = $bdd->prepare($req);
            $mail->execute();
            $result_proprete = $mail->fetch(PDO::FETCH_ASSOC);

            $req_2 ='SELECT * FROM Responsable WHERE Technique_Responsable="1" AND ID_Responsable IN (SELECT ID_Responsable FROM Sanitaire_Responsable WHERE ID_Sanitaire = "'.$index_sanitaire.'")';
            $mail_2 = $bdd->prepare($req_2);
            $mail_2->execute();
            $result_technique = $mail_2->fetch(PDO::FETCH_ASSOC);

            /*$req_3 ='SELECT * FROM Sanitaire WHERE ID_Sanitaire="'.$index_sanitaire.'")';
            $mail_3 = $bdd->prepare($req_3);
            $mail_3->execute();
            $result_sanitaire = $mail_3->fetch(PDO::FETCH_ASSOC);
            echo("coucou".$result_sanitaire['Nom_Sanitaire']);*/

            $result_nom_sanitaire = $conn->query('SELECT Nom_Sanitaire FROM Sanitaire WHERE ID_Sanitaire="'.$index_sanitaire.'"');

            $row = $result_nom_sanitaire->fetch_assoc();

            $nom_sanitaire = $row['Nom_Sanitaire'];


            if($result_proprete['Mail_Responsable'] != null && ( $toilette_sale== 1 || $papier_toilette == 1 || $lavabo_sale== 1 || $plus_de_savon == 1 || $miroir_sale == 1 || $sopalin == 1)){
                $from = "hurflym@gmail.com";
                $to = $result_proprete['Mail_Responsable'];
                $subject = "Nouveau Signalement Proprete";

                
                $toilette_sale_message = '';
                $papier_toilette_message = '';
                $sol_sale_message = '';
                $lavabo_sale_message = '';
                $plus_de_savon_message = '';
                $miroir_sale_message = '';
                $sopalin_message = '';


                if($toilette_sale== 1){
                    $toilette_sale_message = 'Les toilettes sont sales. 
';
                }
                if($papier_toilette == 1){
                    $papier_toilette_message = 'Il manque du papier toilette. 
';
                }
                if($sol_sale == 1){
                    $sol_sale_message = 'Le sol des toilettes est sale.
';
                }
                if($lavabo_sale== 1){
                    $lavabo_sale_message = 'Le lavabo est sale.
';
                }
                if($plus_de_savon == 1){
                    $plus_de_savon_message = "Il n'y a plus de savon.
";
                }
                if($miroir_sale == 1){
                    $miroir_sale_message = 'Le miroir est sale. 
';
                }
                if($sopalin == 1){
                    $sopalin_message = 'Il manque du sopalin.
';
                }
                $commentaire_message = $_POST['commentaire'];
                $message = "Hey!
Les toillettes ".$nom_sanitaire." rencontrent de nouveaux problèmes :
".$toilette_sale_message."".$papier_toilette_message."".$sol_sale_message."".$plus_de_savon_message."".$miroir_sale_message."".$sopalin_message."L'usager a egalement commenté : ".$commentaire_message ;
                $headers = "From:".$from;

                mail($to,$subject,$message,$headers);
            }
            
            if($result_technique['Mail_Responsable'] != null && ($chasse_deau == 1 || $lampe_toilette == 1 || $porte_casse == 1 || $lampe_espace_deau == 1 || $seche_main == 1 || $robinet_casse == 1)){
                $from = "hurflym@gmail.com";
                $to = $result_technique['Mail_Responsable'];
                $subject = "Nouveau Signalement technique";
                $message = "Hey!
Les toillettes ".$nom_sanitaire." rencontrent de nouveaux problèmes :
";
                if($chasse_deau == 1){
                    $message = $message."La chasse d'eau est cassée.
";
                }
                if($lampe_toilette == 1){
                    $message = $message.'La lampe des toilettes ne marchent plus.
';
                }
                if($porte_casse == 1){
                    $message = $message."La porte des toilettes est cassé.
";
                }
                if($lampe_espace_deau == 1){
                    $message = $message.'La lampe des sanitaires est cassé.
';
                }
                if($seche_main == 1){
                    $message = $message.'Le sèche-main ne fonctionnent plus.
';
                }
                if($robinet_casse == 1){
                    $message = $message.'Le robinet est cassé.
';
                }
                $message = $message."L'usager a rajouter comme commentaire :".$_POST['commentaire'];
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
        <img src="../image/Hurflym_logo_colore_2.png" width="150" height="75">
    </div>
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="../index_v2_2.js"></script>
    
</body>
</html>
