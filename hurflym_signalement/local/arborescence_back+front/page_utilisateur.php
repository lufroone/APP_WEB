<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Page Utilisateur</title>
        <link rel="stylesheet" href="../arborescence_back+front/page_utilisateur_1.css">
    </head>

    <body>

    <?php
        if(isset($_COOKIE["mail_utilisateur_hurflym"])){
            include 'connexion_reussit.php';
        }
        else{
            header('Location: http://localhost/hurflym_signalement/local/arborescence_back+front/login.php');
            exit();
        }
    ?>

    </body>


    <script type="text/javascript" src="../arborescence_back+front/page_utilisateur_4.js"></script>

</html>



