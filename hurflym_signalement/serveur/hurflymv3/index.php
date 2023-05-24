<?php
require("config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Acceuil</title>
        <link rel="stylesheet" href="../arborescence_back+front/index_4.css">
    </head>
    <body>

    <div class="header">
        <div id="logo">
            <a src="http://hurflym.fr/arborescence_back+front/index.php"><img src="../image/Hurflym_logo_colore_2.png" height="100" width="200"></a>
        </div>
        <div class="menu_connexion">
            <a class="identification" href="http://hurflym.fr/arborescence_back+front/page_utilisateur.php">Accès à son compte</a>
            <!-- <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=online&response_type=code&redirect_uri=http://localhost/connect.php&client_id=<?= GOOGLE_ID?>" class="identification" >Connexion</a> -->
            <a class="identification" href="http://hurflym.fr/arborescence_back+front/login_administrateur.php">Administration</a>
        </div>

    </div>

    <div class="Slogan">
        <div class='bloc_slogan'>
            <img src="../image/Hurflym_logo_colore_2.png" height="200" width="400">
            <p id="slogan"> Pour que les problèmes soient signalés !</p>
        </div>
    </div>
    <img class="transition_1" src="../../image/intersection_1b1f50_4328B7.png" height="200px" width="100%">
    <div class="Presentation">
        <div class="titre" >Nos Engagements</div>
        <div class="premiere_ligne">
            <div class="rectangle_de_presentation" id="rdp1">
                <img src="../../image/handshake.png" height="200" width="200">
                <h1>Un engagement personnel</h1>
                <p>Rendre responsable sa communauté</p>
            </div>

        </div>

        <div class="deuxieme_ligne">
            <div class="rectangle_de_presentation" id="rdp2">
                <img src="../../image/travail-a-domicile.png" height="200" width="200">
                <h1>Un confort de vie</h1>
                <p>Pour un lieu de vie sain</p>
            </div>
        </div>

        <div class="troisieme_ligne">
            <div class="rectangle_de_presentation" id="rdp3">
                <img src="../../image/la-securite-sur-internet.png" height="200" width="200">
                <h1>Une sécurité constante</h1>
                <p>Laissez-vous guider par nos services</p>
            </div>
            
        </div>

    </div>
    <img class="transtition_2" src="../../image/intersection_4328B7_1b1f50.png" height="200px" width="100%">
    <div class="Nos_services">
        <div class="titre">Nos services</div>
        <div class="ligne_de_presentation">
            <div class="bloc_de_presentation">
                <img src="../../image/application.png" height="100" width="100">
                <h1>Application Sécurisé</h1>
                <p>Le scan de Qr code n'a jamais été aussi simple</p>
            </div>
            <div class="bloc_de_presentation">
                <img src="../../image/working.png" height="100" width="100">
                <h1>Administration sur tout les postes</h1>
                <p>Application Web sécurisé pour tous</p>
            </div>
            <div class="bloc_de_presentation">
                <img src="../../image/ticket.png" height="100" width="100">
                <h1>Ticketing</h1>
                <p>Gestion des incidents</p>
            </div>
            <div class="bloc_de_presentation">
                <img src="../../image/options.png" height="100" width="100">
                <h1>Personalisation</h1>
                <p>Appliquez votre propre charte graphique</p>
            </div>
            <div class="bloc_de_presentation">
                <img src="../../image/statistiques.png" height="100" width="100">
                <h1>Statistique</h1>
                <p>Vérifiez vos résultats!</p>
            </div>
        </div>
    </div>

    <div class="footer">
        <div class="footer_gauche">
            <h3>Nous contacter : </h3>
            <p>hurflym@gmail.com</p>
        </div>
        <div class="footer_droit">
            <h3>Informations complémentaires : </h3>
            <a>Mention légale</a><br>
            <a>Application mobile</a>
        </div>
    </div>



    </body>



    <script type="text/javascript" src="../arborescence_back+front/index.js"></script>


</html>