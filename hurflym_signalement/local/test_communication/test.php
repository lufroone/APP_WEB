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


<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
    <?php $variableAPasser = "test";?>

    <form>
	<p>
		<label for="pseudo">Pseudo :</label>
		<input type="text" id="pseudo" /><br />
		<label for="mot_de_passe">Mot de passe :</label>
		<input type="password" id="mot_de_passe" />
	</p>
	<p>
		<input type="button" onclick="Connexion();" value="Connexion"/>
        <input type="button" onclick="ajout_equipement_particulier(1,'imprimante','cest limprimante du salon',2,1);" value="Test"/>
        <input type="button" onclick="supression_equipement_particulier(4);" value="Supression"/>
	</p>
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


        $result_nom_sanitaire = $conn->query('SELECT Nom_Sanitaire FROM Sanitaire WHERE ID_Sanitaire="2"');

        $row = $result_nom_sanitaire->fetch_assoc();

        $nom_sanitaire = $row['Nom_Sanitaire'];
        $json = "[ {'name':'luc'}, {'name':'thomas'}]";


    ?>





        <script type="text/javascript" src="../test_communication/test_9.js"></script>
    </body>
</html>

