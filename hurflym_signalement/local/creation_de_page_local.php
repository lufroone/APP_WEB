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
        <meta charset="utf-8">
        <title>Creation_de_page</title>
        <link rel="stylesheet" href="css/st.css">
    </head>
    <body>

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
            /*$result = $conn->query('SELECT ID_Etablissement FROM etablissement WHERE username_Etablissement="'.$username.'" AND mot_de_passe_Etablissement="'.$mot_de_passe.'"');

            $row = $result->fetch_assoc();

            $id_etablissement = $row['ID_Etablissement'];

            
            $results = mysqli_query($conn,'SELECT * FROM signalement_sanitaire WHERE ID_Sanitaire_Sanitaire IN (SELECT ID_Sanitaire FROM sanitaire WHERE ID_etablissement="'.$id_etablissement.'")',$result_mode = MYSQLI_STORE_RESULT);
            $numrows=mysqli_num_rows($results);*/
        ?>


        <form action="index.php" method="get">
            <label>Veuillez choisir l'ID des sanitaires pour générer le formulaire</label>
            <input class="text" list="sanitaire" name="Sanitaire">
            <button>Envoyer !</button>
        </form>
        <br>
        <form action="signalement_page.php" method="get">
            <label>Veuillez choisir l'ID de la salle pour générer le formulaire</label>
            <input class="text" list="salle" name="Salle">
            <button>Envoyer !</button>
        </form>
        <br>
        <br>
        <h1>Creation d'etablissement</h1>
        <form action="" method="POST">
            <label>Veuillez rentre le nom de l'établissement</label>
            <input type="text" id="nom_etablissement" name="nom_etablissement"><br>
            <label>Veuillez rentrer le nombre de sanitaire que vous voulez lui donner</label>
            <input type="text" id="nombre_sanitaire" name="nombre_sanitaire"><br>
            <label>Veuillez rentrer l'username de l'etablissement</label>
            <input type="text" id="username_etablissement" name="username_etablissement"><br>
            <label>Veuillez rentrer le mot de passe de l'etablissement</label>
            <input type="password" id="mot_de_passe_etablissement" name="mot_de_passe_etablissement"><br>
            <button> Créer ! </button>
            
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

                if(isset($_POST['nom_etablissement']) && isset($_POST['nombre_sanitaire']) && isset($_POST['username_etablissement']) && isset($_POST['mot_de_passe_etablissement'])){
                    $nom = $_POST['nom_etablissement'];
                    $nombre = $_POST['nombre_sanitaire'];
                    $username = $_POST['username_etablissement'];
                    $mot_de_passe = $_POST['mot_de_passe_etablissement'];
                    $sql = "INSERT INTO Etablissement(ID_Etablissement,Nom_Etablissement, Nombre_de_Sanitaire, username_Etablissement , mot_de_passe_Etablissement)
                    VALUES('0','$nom','$nombre', '$username', '$mot_de_passe')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                      } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                      }
                      $conn->close();
                }

            ?>

        </form>
        <br>
        <h1>Creation de sanitaire</h1>
        <form action="" method="POST">
            <label>Veuillez rentre le nom de la sanitaire</label>
            <input type="text" id="nom_sanitaire" name="nom_sanitaire"><br>
            <label>Veuillez rentre le nombre de toilettes </label>
            <input type="text" id="nombre_toilette" name="nombre_toilette"><br>
            <label>Veuillez rentre le nombre de lavabo </label>
            <input type="text" id="nombre_lavabo" name="nombre_lavabo"><br>
            <label>Veuillez renseigner par 1 s'il y a du sopalin ou 0 si non</label>
            <input type="text" id="sop" name="sop"><br>
            <label>Veuillez renseigner s'il y a un seche-main ou 0 sinon</label>
            <input type="text" id="sech" name="sech"><br>
            <label>Veuillez rentrer l'ID de l'établissement associé</label>
            <input type="text" id="nom_etablissement" name="nom_etablissement"><br>
            <label>Veuillez rentrer l'ID du responsable</label>
            <input type="text" id="nom_responsable" name="nom_responsable"><br>
            <button>Créer !</button>


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

                if(isset($_POST['nom_etablissement']) && isset($_POST['nom_sanitaire']) && isset($_POST['nom_responsable']) && isset($_POST['nombre_toilette']) && isset($_POST['nombre_lavabo']) && isset(['sop']) && isset(['sech'])){
                    $nom_et = $_POST['nom_etablissement'];
                    //$index_nom_etablissement = $conn->query('SELECT ID_Etablissement FROM Etablissement WHERE Nom_Etablissement LIKE "%'.$nom_et.'%"');
                    $nom_res = $_POST['nom_responsable'];
                    //$index_nom_responsable = $conn->query('SELECT ID_Responsable FROM Responsable WHERE Nom_Responsable LIKE "%'.$nom_res.'%"');
                    $nom = $_POST['nom_sanitaire'];
                    $nombre_toilette = $_POST['nombre_toilette'];
                    $nombre_lavabo = $_POST['nombre_lavabo'];
                    $sop = $_POST['sop'];
                    $sech = $_POST['sech'];
                    $sql = "INSERT INTO Sanitaire(ID_Sanitaire,Nom_Sanitaire, ID_Responsable, ID_Etablissement, Nombre_de_Toilette, Nombre_de_Lavabo, sop, sech)
                    VALUES('0','$nom','$nom_res', '$nom_et', '$nombre_toilette', '$nombre_lavabo', '$sop', '$sech')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                      } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                      }
                      $conn->close();
                }

            ?>

        </form>
        <br>

        <h1>Creation de salle</h1>
        <form action="" method="POST">
            <label>Veuillez rentre le nom de la salle</label>
            <input type="text" id="nom_salle" name="nom_salle"><br>
            <label>Veuillez rentrer l'ID de l'établissement associé</label>
            <input type="text" id="ID_Etablissement" name="ID_Etablissement"><br>
            <label>Veuillez rentrer l'ID du responsable</label>
            <input type="text" id="ID_Responsable" name="ID_Responsable"><br>
            <button>Créer !</button>


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

                if(isset($_POST['ID_Etablissement']) && isset($_POST['nom_salle']) && isset($_POST['ID_Responsable'])){
                    $nom_et = $_POST['ID_Etablissement'];
                    //$index_nom_etablissement = $conn->query('SELECT ID_Etablissement FROM Etablissement WHERE Nom_Etablissement LIKE "%'.$nom_et.'%"');
                    $nom_res = $_POST['ID_Responsable'];
                    //$index_nom_responsable = $conn->query('SELECT ID_Responsable FROM Responsable WHERE Nom_Responsable LIKE "%'.$nom_res.'%"');
                    $nom = $_POST['nom_salle'];
                    $sql = "INSERT INTO Sanitaire(ID_Salle,Nom_de_la_Salle, ID_Responsable, ID_Etablissement)
                    VALUES('0','$nom','$nom_res', '$nom_et')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                      } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                      }
                      $conn->close();
                }

            ?>

        </form>

        <h1>Creation de Responsable</h1>
        <form action="" method="POST">
            <label>Veuillez rentre le nom du responsable</label>
            <input type="text" id="nom_responsable" name="nom_responsable"><br>
            <label>Veuillez rentrer le prenom du responsable</label>
            <input type="text" id="prenom_responsable" name="prenom_responsable"><br>
            <label>Veuillez rentrer le mail du responsable</label>
            <input type="text" id="mail_responsable" name="mail_responsable"><br>
            <label>Renseigner par 1 si le responsable est proprete ou 0 s'il ne l'est pas</label>
            <input type="text" id="Proprete_Responsable" name="Proprete_Responsable"><br>
            <label>Renseigner par 1 si le responsable est technique ou 0 s'il ne l'est pas</label>
            <input type="text" id="Technique_Responsable" name="Technique_Responsable"><br>
            <label>Veuillez rentrer le mail du responsable</label>
            <input type="text" id="mail_responsable" name="mail_responsable"><br>
            <label>Veuillez rentrer son username</label>
            <input type="text" id="username_responsable" name="username_responsable"><br>
            <label>Veuillez rentrer son mot_de_passe</label>
            <input type="password" id="mot_de_passe_responsable" name="mot_de_passe_responsable"><br>
            <button>Créer !</button>


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

                if(isset($_POST['nom_responsable']) && isset($_POST['prenom_responsable']) && isset($_POST['mail_responsable']) && isset($_POST['username_responsable']) && isset($_POST['mot_de_passe_responsable'])){
                    $nom = $_POST['nom_responsable'];
                    $prenom = $_POST['prenom_responsable'];
                    $mail = $_POST['mail_responsable'];
                    $Proprete_Responsable = $_POST['Proprete_Responsable'];
                    $Technique_Responsable = $_POST['Technique_Responsable'];
                    $username = $_POST['username_responsable'];
                    $mot_de_passe = $_POST['mot_de_passe_responsable'];
                    $sql = "INSERT INTO responsable(ID_Responsable,Nom_Responsable, Prenom_Responsable, Mail_Responsable, username_Responsable, mot_de_passe_Responsable, Proprete_Responsable, Technique_Responsable)
                    VALUES('0','$nom','$prenom', '$mail','$username', '$mot_de_passe', '$Proprete_Responsable', '$Technique_Responsable')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                    } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                    }
                    
                    //ini_set("SMTP", "ssl://smtp.gmail.com");
                    //ini_set("smtp_port", "465");

                    $from = "hurflym@gmail.com";
                    $to = $mail;
                    $subject = "nouveau signalement";
                    $message = "vous avez ete ajoute a la base de donnée de hurflym";
                    $headers = "From:".$from;

                    mail($to,$subject,$message,$headers);

                    $conn->close();
                }

            ?>

            <h1>Creation des relations responsables/sanitaires et responsable/salle</h1>
            <br>
            <h2>Creation relation Responsable/Sanitaire</h2>
            <form action="" method="POST">
                <label>Veuillez rentre l'ID du Responsable</label>
                <input type="text" id="ID_Responsable" name="ID_Responsable"><br>
                <label>Veuillez rentre l'ID des sanitaires</label>
                <input type="text" id="ID_Sanitaire" name="ID_Sanitaire"><br>
                <button>Créer !</button>
            </form>

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

                if(isset($_POST['ID_Responsable']) && isset($_POST['ID_Sanitaire'])){
                    $ID_Sanitaire = $_POST['ID_Sanitaire'];
                    $ID_Responsable = $_POST['ID_Responsable'];
                    $sql = "INSERT INTO sanitaire_responsable(ID_Sanitaire,ID_Responsable)
                    VALUES('$ID_Sanitaire','$ID_Responsable')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                    } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                    }


                    $conn->close();
                }

            ?>

<br>
            <h2>Creation relation Responsable/Salle</h2>
            <form action="" method="POST">
                <label>Veuillez rentre l'ID du Responsable</label>
                <input type="text" id="ID_Responsable" name="ID_Responsable"><br>
                <label>Veuillez rentre l'ID de la Salle</label>
                <input type="text" id="ID_Salle" name="ID_Salle"><br>
                <button>Créer !</button>
            </form>

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

                if(isset($_POST['ID_Responsable']) && isset($_POST['ID_Salle'])){
                    $ID_Sanitaire = $_POST['ID_Salle'];
                    $ID_Responsable = $_POST['ID_Responsable'];
                    $sql = "INSERT INTO salle_responsable(ID_Salle,ID_Responsable)
                    VALUES('$ID_Salle','$ID_Responsable')
                    ";
        
                    if ($conn->query($sql) === TRUE) {
                        echo "les nouveaux enregistrements ajoutés avec succés";
                    } else {
                        echo "Erreur: " . $sql . "" . $conn->error;
                    }


                    $conn->close();
                }

            ?>

            <?php
        }
        ?>

        </form>
    </body>
</html>