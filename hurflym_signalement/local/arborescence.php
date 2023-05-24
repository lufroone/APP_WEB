<?php
    // Souvent on identifie cet objet par la variable $conn ou $db
    try
    {
        $dsn = 'mysql:host=54.37.31.19;dbname=u118526083_Hurflym;charset=utf8';
        $bdd = new PDO($dsn,'u118526083_Lufroone','2=nG!jR60');
    }
    catch (Exception $e)
    {
	    die('Erreur : ' . $e->getMessage());
    }
?>

<html>
    <head>
        <meta charset="utf-8">
        <title>Arborescence</title>
        <link rel="stylesheet" href="css/arborescence_48.css">
    </head>
    <body>
        <div class="bordure_haut_de_page">
        </div>
        <div class="center">
            <div class="header">
                <a id="logo"><img src="../image/Hurflym_logo_colore_2.png" width="200" height="100"></a>
            </div>
        </div>
            <div class="gestion_bouton">
                <a href="#ajouter" class="bouton_ajouter bouton"><img class="decalage" src="../image/plus.png" width="20" height="20">Ajouter un element</a>
                <a href="#supprimer" class="bouton_supprimer bouton"><img class="decalage" src="../image/croix-sombre-brute.png" width="20" height="20">Retirer un element</a>
            </div>
            <div class="element" id="source">
                <div class="gestion_element">
                    <div class="nom_element">Nom</div>
                    <div class="id" id='0'>id=0</div>
                </div>
            </div>


            <div id="ajouter" class="popup_ajouter">
                <div class="formulaire_ajouter">
                    <div class="page" id="page1">
                        <div class="gestion_element">
                            <h1 class="text_haut_popup">Que voulez-vous ajoutez ?</h1>
                            <a href="#" class="cross">&times;</a>
                        </div>
                        <div class="liste_des_choix">
                            <button class="next2 choix" type="button" ><bold>Lieu</bold></button><br>
                            <button class="next3 choix" type="button" ><bold>Signalement</bold></button><br>
                        </div>
                    </div>
                    <div class="page" id="page2">
                        <div class="gestion_element">
                            <h1>Quel nom voulez-vous lui donner ?</h1>
                            <a href="#" class="cross">&times;</a>
                        </div>
                        <div class="liste_des_choix">
                            <input type="text" id="nom" name="nom"><br>
                            <input type="number" id="id" name="id"><br>
                            <a href="#" class="choix" onclick="creation_element()"> Valider</a>
                        </div>
                    </div>
                    <div class="page" id="page3">
                        <div class="gestion_element">
                            <h1>Quel Signalement Voulez-vous mettre ?</h1>
                            <a href="#" class="cross">&times;</a>
                        </div>
                        <div class="liste_des_choix">
                            
                        </div>
                    </div>

                </div>
            </div>

            <div id="supprimer" class="popup_supprimer">
                <div class="formulaire_supprimer">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer ce Lieu ?</h1>
                        <a href="#" class="cross">&times;</a>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Tout vos signalements encore présents a l'intérieur seront supprimés!)</p>
                        <input type="number" id="id_supp" name="id_supp"><br>
                        <a href="#" class="choix" onclick="supprimer_element()"> Valider</a>
                    </div>
                </div>
            </div>
    </body>

    <script type="text/javascript" src="../script_arborescence_60.js"></script>
</html>