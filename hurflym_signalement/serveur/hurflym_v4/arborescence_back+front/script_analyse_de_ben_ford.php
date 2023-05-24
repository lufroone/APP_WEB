<?php

function creer_csv($filename, $data) {
    $file = fopen($filename, 'w');

    if ($file) {
        // Écrire les en-têtes de colonnes
        $entetes = array();
        for ($i = 1; $i <= 9; $i++) {
            array_push($entetes, "Chiffre_$i", "Pourcentage_$i", "Ecart_$i");
        }
        fputcsv($file, $entetes);

        // Écrire les données
        foreach ($data as $row) {
            fputcsv($file, $row);
        }

        fclose($file);
        echo "Le fichier CSV a été créé avec succès.";
    } else {
        echo "Erreur lors de la création du fichier CSV.";
    }
}

$filename = "donnees_benford.csv";
$data = array(
    array(1, 30.1, 2, 1, 17.6, 1.5, 1, 12.5, 0.8, 1, 9.7, 0.7, 1, 7.9, 0.6, 1, 6.7, 0.5, 1, 5.8, 0.4, 1, 5.1, 0.4, 1, 4.6, 0.3)
    // Ajoutez d'autres lignes de données si nécessaire
);

//creer_csv($filename, $data);

?>

<?php

function lire_csv($filename) {
    $data = array();

    if (($file = fopen($filename, 'r')) !== false) {
        // Lire les en-têtes de colonnes
        $entetes = fgetcsv($file);

        // Lire et organiser les données
        while (($row = fgetcsv($file)) !== false) {
            $assoc_row = array();
            for ($i = 0; $i < count($entetes); $i++) {
                $assoc_row[$entetes[$i]] = $row[$i];
            }
            $data[] = $assoc_row;
        }

        fclose($file);
    } else {
        echo "Erreur lors de l'ouverture du fichier.";
    }

    return $data;
}

$filename = "donnees_benford.csv";
$data = lire_csv($filename);

// Afficher les données
//print_r($data);

?>

<?php

function ecrire_csv($filename, $data) {
    $file = fopen($filename, 'w');

    if ($file) {
        // Écrire les en-têtes de colonnes
        $entetes = array();
        for ($i = 1; $i <= 9; $i++) {
            array_push($entetes, "Chiffre_$i", "Pourcentage_$i", "Ecart_$i");
        }
        fputcsv($file, $entetes);

        // Écrire les données
        foreach ($data as $row) {
            fputcsv($file, $row);
        }

        fclose($file);
        //echo "Le fichier CSV a été mis à jour avec succès.";
    } else {
        //echo "Erreur lors de l'ouverture du fichier.";
    }
}

?>


<?php

function incrementer_colonne_chiffre($filename, $chiffre) {
    $data = lire_csv($filename);
    $row = $data[0];

    $chiffre_key = "Chiffre_$chiffre";
    $pourcentage_key = "Pourcentage_$chiffre";
    $ecart_key = "Ecart_$chiffre";

    if (!array_key_exists($chiffre_key, $row) || !array_key_exists($pourcentage_key, $row) || !array_key_exists($ecart_key, $row)) {
        echo '[{"validation" : "false"}]';
        return;
    }

    $total = 0;
    for ($i = 1; $i <= 9; $i++) {
        $total += $row["Chiffre_$i"];
    }

    $pourcentage_actuel = ($row[$chiffre_key] / $total) * 100;
    $pourcentage_cible = $row[$pourcentage_key];
    $ecart_autorise = $row[$ecart_key];

    if (abs($pourcentage_actuel - $pourcentage_cible) <= $ecart_autorise) {
        $row[$chiffre_key]++;
        ecrire_csv($filename, array($row));
        echo '[{"validation" : "true"}]';
    } else {
        echo '[{"validation" : "false"}]';
    }
}

$filename = "donnees_benford.csv";
$chiffre = $_GET["nombre_dequipement"];
incrementer_colonne_chiffre($filename, $chiffre);

?>

<?php

function generer_chiffre_benford() {
    $rand = mt_rand() / mt_getrandmax();
    return (int) floor(pow(10, $rand));
}

function incrementer_chiffre_n_fois($filename, $n) {
    $data = lire_csv($filename);
    $row = $data[0];

    for ($i = 0; $i < $n; $i++) {
        $chiffre = generer_chiffre_benford();
        $row["Chiffre_$chiffre"]++;
    }

    ecrire_csv($filename, array($row));
    echo "Les données ont été incrémentées $n fois.";
}

//$filename = "donnees_benford.csv";
//$nombre_increments = 10000;

//incrementer_chiffre_n_fois($filename, $nombre_increments);

?>




