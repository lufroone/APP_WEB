<?php 
    require 'connexion_bdd_config.php';

        $id_personnalisation = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement='".$_GET["ID_Etablissement"]."'");
        $id_personnalisation = $id_personnalisation->fetch_assoc();

        $personnalisation = $conn->query("SELECT * FROM Personnalisation__Local WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        $personnalisation = $personnalisation->fetch_assoc();


        echo '[{"ID_Personnalisation" : "'.$personnalisation["ID_Personnalisation"].'","Couleur_de_fond" : "'.$personnalisation["couleur_de_fond"].'","Couleur_de_case" : "'.$personnalisation["couleur_de_case"].'","Couleur_dombre_de_case" : "'.$personnalisation["couleur_dombre_de_case"].'", "Couleur_ecriture" : "'.$personnalisation["couleur_ecriture"].'", "Couleur_bouton" : "'.$personnalisation["couleur_bouton"].'", "Couleur_bouton_ecriture" : "'.$personnalisation["couleur_bouton_ecriture"].'", "Couleur_de_lombre_du_bouton" : "'.$personnalisation["couleur_de_lombre_du_bouton"].'", "Police_de_charactere" : "'.$personnalisation["police_de_caractere"].'"}]';
?>