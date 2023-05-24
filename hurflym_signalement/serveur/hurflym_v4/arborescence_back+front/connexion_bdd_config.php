<?php

    try
    {
        $dsn = 'mysql:host=localhost;port=3306;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }
?>

<?php
    $servername = "localhost";
    $username = "u118526083_Lufroone";
    $password = "2=nG!jR60";
    $dbname = "u118526083_Hurflym";

    // Créer une conexion
    $conn = new mysqli($servername, $username, $password, $dbname);
    // verifier la connexion
    if ($conn->connect_error) {
    die("La connexion a échouée: " . $conn->connect_error);
    }

?>