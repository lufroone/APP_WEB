<?php 
    require 'connexion_bdd_config.php';

        $requete = $conn->query('SELECT * FROM Etablissement__Local WHERE ID_Etablissement='.$_GET["ID_Etablissement"].'');
        $info_etablissement = $requete->fetch_assoc();

        $requete_2 = $conn->query('SELECT * FROM Personnalisation__Local WHERE ID_Personnalisation='.$info_etablissement["ID_Personnalisation"].'');
        $info_personalisation = $requete_2->fetch_assoc();



        //echo '["'.base64_encode($info_personalisation["Logo"]).'"]';
        
        echo '[{"ID_Personnalisation" : "'.$info_personalisation["ID_Personnalisation"].'", "Couleur_de_fond" : "'.$info_personalisation["couleur_de_fond"].'", "Couleur_de_case" : "'.$info_personalisation["couleur_de_case"].'", "Couleur_dombre_de_case" : "'.$info_personalisation["couleur_dombre_de_case"].'", "Couleur_ecriture" : "'.$info_personalisation["couleur_ecriture"].'", "Couleur_bouton" : "'.$info_personalisation["couleur_bouton"].'", "Couleur_bouton_ecriture" : "'.$info_personalisation["couleur_bouton_ecriture"].'", "Couleur_de_lombre_du_bouton" : "'.$info_personalisation["couleur_de_lombre_du_bouton"].'", "Police_de_caractere" : "'.$info_personalisation["police_de_caractere"].'"}]';

?>