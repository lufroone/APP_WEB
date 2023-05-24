<?php
require 'connexion_bdd_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$lieu = $input['lieu'];

$query = "SELECT ID_Noeud FROM Noeud__Local WHERE Nom_Element = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $lieu);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode(array('ID_Noeud' => $row['ID_Noeud']));
?>