<?php
    // Souvent on identifie cet objet par la variable $conn ou $db
    require 'connexion_bdd_config.php';
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
        $result_nom_sanitaire = $conn->query('SELECT Nom_Sanitaire FROM Sanitaire WHERE ID_Sanitaire="2"');

        $row = $result_nom_sanitaire->fetch_assoc();

        $nom_sanitaire = $row['Nom_Sanitaire'];
        $json = "[ {'name':'luc'}, {'name':'thomas'}]";


    ?>





        <script type="text/javascript" src="../test_communication/test_9.js"></script>
    </body>
</html>

