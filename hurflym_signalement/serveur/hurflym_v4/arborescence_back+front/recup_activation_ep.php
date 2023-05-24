<?php
// Connexion à la base de données
require 'connexion_bdd_config.php';

$activation = $conn->query("SELECT Ep_Actif FROM Equipement_particulier__Local WHERE ID_Ep='".$_GET["ID_Ep"]."' AND ID_Etablissement=".$_GET["ID_Etablissement"]."");

echo '[{"activation" : "'.$activation.'"}]';

?>