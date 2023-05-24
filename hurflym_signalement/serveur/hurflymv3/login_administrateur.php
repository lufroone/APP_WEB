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
    require("config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Connexion Admin</title>
        <link rel="stylesheet" href="../arborescence_back+front/login_administrateur_1.css">
    </head>
    <body>
        <div class="fond"></div>
        <div class="boite_du_milieu">
            <div class="logo">
                <a src="http://hurflym.fr/arborescence_back+front/index.php"><img src="../image/Hurflym_logo_colore_2.png" height="100" width="200"></a>
            </div>
            <div class="SSO">
                <div class="bouton_SSO">
                    <a class="link" href="https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=online&response_type=code&redirect_uri=http://localhost/connect_admin.php&client_id=<?= GOOGLE_ID?>">
                        <img class="logo_SSO" src="../image/logo_google.png">
                        <p class="text_SSO">Connexion par Google</p>
                    </a>
                </div>
            </div>


            <div class="trait_de_separation"></div>


            <div class="connexion">
                <div class="identifiant">
                    <label class="label_identifiant">Mail Administrateur :</label><br>
                    <input type="text" class="input_identifiant" id="mail_administrateur"><br>
                    <label class="label_identifiant">Mot de passe :</label><br>
                    <input type="password" class="input_identifiant" id="mot_de_passe_administrateur"><br>

                </div>
                <div class="bouton">
                    <div class="bouton_" onclick="connexion()">Connexion</div>
                </div>
            </div>

        </div>


    </body>

    <script type="text/javascript" src="../arborescence_back+front/connexion_administrateur.js"></script>


</html>