<?php
require 'connexion_bdd_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$ID_Noeud = $input['ID_Noeud'];

$query = "SELECT ID_Noeud FROM Noeud__Local WHERE Precedent = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $ID_Noeud);
$stmt->execute();
$result = $stmt->get_result();

$idNoeuds = [];
while ($row = $result->fetch_assoc()) {
    $idNoeuds[] = $row['ID_Noeud'];
}

echo json_encode(array('ID_Noeuds' => $idNoeuds));


?>