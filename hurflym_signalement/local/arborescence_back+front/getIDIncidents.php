<?php
require 'connexion_bdd_config.php';

$input = json_decode(file_get_contents('php://input'), true);
$idNoeuds = $input['ID_Noeuds'];

$placeholders = str_repeat('?,', count($idNoeuds) - 1) . '?';
$query = "SELECT i.ID_Incidence FROM Incidence1__Local AS i
          JOIN Signalement1__Local AS s ON i.ID_Signalement = s.ID_Signalement
          WHERE s.ID_Noeud IN ($placeholders) AND
          i.Heure_du_signalement >= DATE_SUB(NOW(), INTERVAL 15 DAY)";
$stmt = $conn->prepare($query);
$stmt->bind_param(str_repeat("i", count($idNoeuds)), ...$idNoeuds);
$stmt->execute();
$result = $stmt->get_result();

$idIncidences = [];
while ($row = $result->fetch_assoc()) {
  array_push($idIncidences, $row['ID_Incidence']);
}

echo json_encode(array('ID_Incidences' => $idIncidences));

?>