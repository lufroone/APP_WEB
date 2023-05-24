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

<html>
    <head>
        <meta charset="UTF-8">
        <title>Vos statistiques</title>
        <link rel="stylesheet" href="css/st_9.css">
    </head>

    <body>
        <div class="bordure_haut_de_page">
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

            if(isset($_POST['username']) && isset($_POST['mot_de_passe'])){
                $username = $_POST['username'];
                $mot_de_passe = $_POST['mot_de_passe'];
                $result = $conn->query('SELECT ID_Etablissement FROM Etablissement WHERE Username_Etablissement="'.$username.'" AND Mot_de_Passe_Etablissement="'.$mot_de_passe.'"');

                $row = $result->fetch_assoc();

                $id_etablissement = $row['ID_Etablissement'];

                
                $results = mysqli_query($conn,'SELECT * FROM Signalement_Sanitaire WHERE ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")',$result_mode = MYSQLI_STORE_RESULT);
                $numrows=mysqli_num_rows($results);
                ?>
                <section class="bleu">
                <div class="center">
                <div class="header">
                    <a id="logo"><img src="image/Hurflym_logo_colore_2.png" width="200" height="100"></a>
                </div>
                <h1>Bienvenue, vous trouverez ici toutes les statistiques concernant vos signalements</h1>
                
                <br>
                <br>
                <h2>Voici les informations concernant vos sanitaires :</h2>
                <br>
                <h4>Vous avez <?php echo $numrows ?> signalement pour toutes vos sanitaires</h4>
                <br>
                <div class="trait"></div>

                <?php
                    $sql2 = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_proprete=0 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req2 = $bdd->query($sql2);
                    $data2 = $req2->rowCount();
                ?>
                <h4>Vous avez <?php echo $data2 ?> signalements proprete en attente</h4>
                <br>
                <div class="trait"></div>

                <?php
                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_proprete=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                ?>
                <h4>Vous avez <?php echo $data ?> signalements proprete traités</h4>

                <div class="trait"></div>

                <?php
                    $sql2 = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_technique=0 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req2 = $bdd->query($sql2);
                    $data2 = $req2->rowCount();
                ?>
                <h4>Vous avez <?php echo $data2 ?> signalements technique en attente</h4>
                <br>
                <div class="trait"></div>

                <?php
                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_technique=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                ?>
                <h4>Vous avez <?php echo $data ?> signalements technique traités</h4>

                <br>
                <div class="trait"></div>

                <?php
                    $date = 0;
                    $max = array();
                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[0] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=2 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[1] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=3 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[2] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=4 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[3] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=5 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[4] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=6 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[5] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=7 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[6] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=8 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[7] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=9 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[8] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=10 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[9] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=11 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[10] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=12 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[11] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=13 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[12] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=14 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[13] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=15 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[14] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=16 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data_ = $req->rowCount();
                    $max[15] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=17 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[16] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=18 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[17] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=19 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[18] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=20 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[19] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=21 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[20] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=22 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[21] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=23 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[22] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE DATE_FORMAT(heure_du_signalement, "%H")=0 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[23] = $data;
                    if($date<$data){
                        $date = $data;
                    }
                    
                ?>
                <h4>L'heure moyenne des signalements est <?php echo $date ?> h</h4>
                <br>
                <div class="trait"></div>
                <br>
                <h3>Voici tout les signalements enregistres pour toutes vos sanitaires</h3>
                <br>
                <br>
                <br>

                <div  class="all">
                <table>
                    <tr>
                        <td>ID_Signalement</td>
                        <td>toilette_sale</td>
                        <td>papier_toilette</td>
                        <td>chasse_deau</td>
                        <td>lampe_toilette</td>
                        <td>sol_sale</td>
                        <td>porte_casse</td>
                        <td>lampe_espace_deau</td>
                        <td>lavabo_sale</td>
                        <td>plus_de_savon</td>
                        <td>miroir_sale</td>
                        <td>robinet_casse</td>
                        <td>seche_main</td>
                        <td>sopalin</td>
                        <td>heure_du_signalement</td>
                        <td>effectue_proprete</td>
                        <td>effectue_technique</td>
                        <td>heure_du_nettoyage</td>
                        <td>ID_Sanitaire</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE toilette_sale =1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total: <?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE papier_toilette=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE chasse_deau=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE lampe_toilette=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE sol_sale=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE porte_casse=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE lampe_espace_deau=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE lavabo_sale=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE plus_de_savon=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE miroir_sale=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE robinet_casse=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE seche_main=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE sopalin=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <td>...</td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_proprete=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Sanitaire FROM Signalement_Sanitaire WHERE effectue_technique=1 and ID_Sanitaire IN (SELECT ID_Sanitaire FROM Sanitaire WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                <?php
                 while($row = mysqli_fetch_assoc($results)) {
                ?>
                    <tr>
                        <td><?php echo $row['ID_Signalement_Sanitaire']?></td>
                        <td><?php echo $row['toilette_sale']?></td>
                        <td><?php echo $row['papier_toilette']?></td>
                        <td><?php echo $row['chasse_deau']?></td>
                        <td><?php echo $row['lampe_toilette']?></td>
                        <td><?php echo $row['sol_sale']?></td>
                        <td><?php echo $row['porte_casse']?></td>
                        <td><?php echo $row['lampe_espace_deau']?></td>
                        <td><?php echo $row['lavabo_sale']?></td>
                        <td><?php echo $row['plus_de_savon']?></td>
                        <td><?php echo $row['miroir_sale']?></td>
                        <td><?php echo $row['robinet_casse']?></td>
                        <td><?php echo $row['seche_main']?></td>
                        <td><?php echo $row['sopalin']?></td>
                        <td><?php echo $row['heure_du_signalement']?></td>
                        <td><?php echo $row['effectue_proprete']?></td>
                        <td><?php echo $row['effectue_technique']?></td>
                        <td><?php echo $row['heure_du_nettoyage']?></td>
                        <td><?php echo $row['ID_Sanitaire']?></td>
                    </tr>

                <?php
            }
            ?>
            </table>
        </div>
        </div>
        </section>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="entre_deux"></div>
        <section class="rose">
        <div class="center">

            <br>
            <br>
            <br>
            <br>
            <br>
            <h2>Voici les informations concernant vos salles :</h2>
                <br>

                    <?php
                        $results = mysqli_query($conn,'SELECT * FROM Signalement_Salle WHERE ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")',$result_mode = MYSQLI_STORE_RESULT);
                        $numrows=mysqli_num_rows($results);
                    ?>
                <h4>Vous avez <?php echo $numrows ?> signalement pour toutes vos salles</h4>
                <br>
                <div class="trait_bas"></div>

                <?php
                    $sql2 = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_proprete=0 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req2 = $bdd->query($sql2);
                    $data2 = $req2->rowCount();
                ?>
                <h4>Vous avez <?php echo $data2 ?> signalements proprete en attente</h4>
                <br>
                <div class="trait_bas"></div>

                <?php
                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_proprete=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                ?>
                <h4>Vous avez <?php echo $data ?> signalements proprete traités</h4>

                <div class="trait_bas"></div>

                <?php
                    $sql2 = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_technique=0 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req2 = $bdd->query($sql2);
                    $data2 = $req2->rowCount();
                ?>
                <h4>Vous avez <?php echo $data2 ?> signalements technique en attente</h4>
                <br>
                <div class="trait_bas"></div>

                <?php
                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_technique=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                ?>
                <h4>Vous avez <?php echo $data ?> signalements technique traités</h4>

                <br>
                <div class="trait_bas"></div>

                <?php
                    $date = 0;
                    $max = array();
                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[0] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=2 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[1] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=3 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[2] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=4 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[3] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=5 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[4] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=6 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[5] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=7 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[6] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=8 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[7] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=9 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[8] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=10 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[9] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=11 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[10] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=12 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[11] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=13 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[12] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=14 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[13] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=15 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[14] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=16 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data_ = $req->rowCount();
                    $max[15] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=17 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[16] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=18 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[17] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=19 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[18] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=20 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[19] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=21 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[20] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=22 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[21] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=23 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[22] = $data;
                    if($date<$data){
                        $date = $data;
                    }

                    $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE DATE_FORMAT(heure_du_signalement, "%H")=0 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                    $req = $bdd->query($sql);
                    $data = $req->rowCount();
                    $max[23] = $data;
                    if($date<$data){
                        $date = $data;
                    }
                    
                ?>
                <h4>L'heure moyenne des signalements est <?php echo $date ?></h4>
                <br>
                <div class="trait_bas"></div>
                <br>
                <h3>Voici tout les signalements enregistres pour toutes vos salles</h3>
                <br>
                <br>
                <br>

                <div  class="all">
                <table>
                    <tr>
                        <td>ID_Signalement</td>
                        <td>Projecteur_en_panne</td>
                        <td>Micro_casse</td>
                        <td>Manque_cable_HDMI</td>
                        <td>Pc_casse</td>
                        <td>Liquide_renverse</td>
                        <td>Tache</td>
                        <td>Manque_de_feutre</td>
                        <td>Objet_oublie</td>
                        <td>Chaise_casse</td>
                        <td>heure_du_signalement</td>
                        <td>effectue_proprete</td>
                        <td>effectue_technique</td>
                        <td>heure_du_nettoyage</td>
                        <td>ID_Sanitaire</td>
                    </tr>
                    <tr>
                        <td>...</td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Projecteur_en_panne =1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total: <?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Micro_casse=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Manque_cable_HDMI=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Pc_casse=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Liquide_renverse=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Tache=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Manque_de_feutre=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Objet_oublie=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE Chaise_casse=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <td>...</td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_proprete=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <?php
                            $sql = 'SELECT ID_Signalement_Salle FROM Signalement_Salle WHERE effectue_technique=1 and ID_Salle IN (SELECT ID_Salle FROM Salle WHERE ID_Etablissement="'.$id_etablissement.'")';
                            $req = $bdd->query($sql);
                            $data = $req->rowCount();
                        ?>
                        <td>total:<?php echo $data ?></td>
                        <td>...</td>
                        <td>...</td>
                    </tr>

                <?php
                 while($row = mysqli_fetch_assoc($results)) {
                ?>
                    <tr>
                        <td><?php echo $row['ID_Signalement_Salle']?></td>
                        <td><?php echo $row['Projecteur_en_panne']?></td>
                        <td><?php echo $row['Micro_casse']?></td>
                        <td><?php echo $row['Manque_cable_HDMI']?></td>
                        <td><?php echo $row['Pc_casse']?></td>
                        <td><?php echo $row['Liquide_renverse']?></td>
                        <td><?php echo $row['Tache']?></td>
                        <td><?php echo $row['Manque_de_feutre']?></td>
                        <td><?php echo $row['Objet_oublie']?></td>
                        <td><?php echo $row['Chaise_casse']?></td>
                        <td><?php echo $row['heure_du_signalement']?></td>
                        <td><?php echo $row['effectue_proprete']?></td>
                        <td><?php echo $row['effectue_technique']?></td>
                        <td><?php echo $row['heure_du_nettoyage']?></td>
                        <td><?php echo $row['ID_Salle']?></td>
                    </tr>

                <?php
            }
            ?>
            </table>


        </div>
        </div>
        <br>
            <br>
            <br>
            <br>
            <br>
        </section>
        

            <?php
                //printf("id =  %s (%s)\n", $row['ID_Etablissement'], gettype($row['ID_Etablissement']));
                $conn->close();
            }
        ?>

            
            <div class="bas_de_page"></div>
        </body>
</html>