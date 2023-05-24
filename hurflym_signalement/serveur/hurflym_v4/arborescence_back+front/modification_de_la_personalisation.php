<?php 
    require 'connexion_bdd_config.php';

        $id_personnalisation = $conn->query("SELECT * FROM Etablissement__Local WHERE ID_Etablissement='".$_POST["ID_Etablissement"]."'");
        $id_personnalisation = $id_personnalisation->fetch_assoc();

        if($_POST["image"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `Logo`='".$_POST["image"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_de_fond"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_de_fond`='".$_POST["couleur_de_fond"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_de_cadre"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_de_case`='".$_POST["couleur_de_cadre"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_exceptionnel"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_dombre_de_case`='".$_POST["couleur_exceptionnel"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_ecriture"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_ecriture`='".$_POST["couleur_ecriture"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_bouton_ecriture"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_bouton_ecriture`='".$_POST["couleur_bouton_ecriture"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_de_lombre_du_bouton"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_de_lombre_du_bouton`='".$_POST["couleur_de_lombre_du_bouton"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        if($_POST["couleur_bouton"] != ""){
            $conn->query("UPDATE `Personnalisation__Local` SET `couleur_bouton`='".$_POST["couleur_bouton"]."' WHERE ID_Personnalisation='".$id_personnalisation["ID_Personnalisation"]."'");
        }
        echo '[]';
?>