<?php
// Connexion à la base de données
require 'connexion_bdd_config.php';

$activation = $conn->query("SELECT * FROM Signalement".$_GET["ID_Etablissement"]."__Local WHERE ID_Signalement='".$_GET["ID_Signalement"]."'");
$activation = $activation->fetch_assoc();

echo '[{"activation" : "'.$activation["Signalement_Actif"].'"}]';

?>