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
        <title>Connexion_Responsable</title>
        <link rel="stylesheet" href="css/st.css">
    </head>
    <body>
    <div class="header">
        <a><img src="/image/Hurflym_logo_colore_2.png" width="200" height="100"></a>
    </div>
        <div class="middle">
            <h1>Connectez-vous ici !</h1>
            <form action="/Vos_statistiques.php" method="POST">
                <label>username :</label>
                <input type="text" id="username" name="username"><br>
                <label>mot_de_passe :</label>
                <input type="password" id="mot_de_passe" name="mot_de_passe"><br>
                <button>Connexion</button>
            </form>
        </div>
        
    </body>
</html>