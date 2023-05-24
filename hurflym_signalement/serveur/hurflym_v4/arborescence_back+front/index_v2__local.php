
<?php
    // Souvent on identifie cet objet par la variable $conn ou $db
    require 'connexion_bdd_config.php';
    // mdp 2=nG!jR60
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

<?php
    setcookie('id_signalement_hurflym', $_GET['ID_Source'], time() + (3* 60 * 60), "/");
    if(isset($_COOKIE["mail_utilisateur_hurflym"]) && $_COOKIE['mail_utilisateur_hurflym'] != ''){
        //afficher page
        include 'script_signalement_1.php';
    }
    else{
        //redirection
        //pour la demo pitch entrepreneur
        /*header('Location: http://hurflym.fr/arborescence_back+front/login_signalement.php');
        exit();*/
        include 'script_signalement_1.php';
    }
?>
