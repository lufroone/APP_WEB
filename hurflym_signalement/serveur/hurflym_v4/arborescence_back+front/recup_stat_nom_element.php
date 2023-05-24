<?php
require 'connexion_bdd_config.php';

// Récupérer le nom_element depuis la requête GET
if (isset($_GET['nom_element'])) {
    $nom_element = $_GET['nom_element'];

    // Préparer la requête SQL pour récupérer les données des incidents liés à ce nom_element
    $sql = "SELECT COUNT(*) AS nombre_incidents, DATE(Heure_du_signalement) AS date_incident FROM Incidence1__Local JOIN Signalement1__Local ON Incidence1__Local.ID_Signalement = Signalement1__Local.ID_Signalement JOIN Noeud__Local ON Signalement1__Local.ID_Noeud = Noeud__Local.ID_Noeud WHERE Noeud__Local.Nom_Element = ? GROUP BY DATE(Heure_du_signalement)";

    // Préparer la requête SQL en utilisant des paramètres pour éviter les injections SQL
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nom_element);

    // Exécuter la requête SQL et récupérer les données dans un tableau associatif
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Fermer la connexion à la base de données
    $stmt->close();
    $conn->close();

    // Retourner les données au format JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "Nom_element non spécifié";
}
?>
