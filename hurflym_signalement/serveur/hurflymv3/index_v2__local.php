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

<?php
    setcookie('id_signalement_hurflym', $_GET['ID_Source'], time() + (3* 60 * 60), "/");
    if(isset($_COOKIE["mail_utilisateur_hurflym"]) && $_COOKIE['mail_utilisateur_hurflym'] != ''){
        //afficher page
        include 'script_signalement.php';
    }
    else{
        //redirection
        header('Location: http://hurflym.fr/arborescence_back+front/login_signalement.php');
        exit();
    }
?>
