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
        <link rel="stylesheet" href="css/arborescence_146.css">
    </head>
    <body>
    <div class="a_gauche">
        <a><img src="../image/Hurflym_logo_colore_2.png" width="200" height="100"></a>
    </div>
    <div class="page_principal">
        
            <div id="partie0" class=" partie">
                <div class="en-tete">Nouveaux signalements</div>
                <div class="gestion_signalement">
                    <div class="nouveau_signalement">
                        <div class="probleme"><div class="affichage">Probleme</div></div>
                        <div class="nom_lieu"><div class="affichage">Lieu</div></div>
                        <div class="date_nouveau_signalement"><div class="affichage">Date complete</div></div>
                        <div class="contenu"><div onclick="popup(contact,1)" class="bouton_contact bouton_incident">Choix des actions</div></div>
                    </div>
                </div>
            </div>
            <div id="partie1" class=" partie">
                <div class="en-tete">Incidents</div>
                <div class="gestion_incident">
                    <div class="lieu">
                        <div class="Nom_Lieu_incident">Nom lieu</div><br>
                        <div class="incident">
                            <div class="probleme"><div class="affichage">Probleme</div></div>
                            <div class="date"><div class="affichage">Date</div></div>
                            <div class="Statut"><div class="affichage">Statut actuel</div></div>
                            <div class="date_de_la_derniere_modif"><div class="affichage">Date de la dernière modification</div></div>
                            
                            <div class="contenu"><button onclick="Validation()" class="bouton_incident">Choix des actions</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>









        <div id="partie2" class="partie">
            <div id="arborescence">
                <div class="outil_arborescence">
                    <div class="outil_" onclick="popup('demande_support',1)">Contactez_support</div>
                    
                </div>
                <div class="element" id="element0">
                    <div class="gestion_element first-child">
                        <div class="nom_element">Efrei</div>
                        <div class="bouton_signalement_menu">
                            <div class="bouton_modifier_element" onclick="mise_a_jour_profondeur(0);popup('modifier_element',1)"><img class="decalage" src="../image/crayon.png" width="40" height="40"></div>
                            <div class="bouton_ajouter" onclick="mise_a_jour_profondeur(0);popup('ajouter',1)"><img class="decalage" src="../image/plus.png" width="40" height="40"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="partie3" class="partie">
            <div class="acceuil_des_sections">
                <div id="bouton_signalement" onclick="section(1)">Signalement</div>
                <div id="bouton_equipement" onclick="section(2)">Equipement</div>
                <div id="bouton_equipement_particulier" onclick="section(3)">Equipement particulier</div>
            </div>
            <div id="section1" class="section">
                <div class="outil_" onclick="popup('creation',1)">Créer un nouveau signalement</div>
                <div id="gestion_creation_signalement" class="gestion_creation_signalement">
                    <div class="annonce">Signalement</div>

                </div>
            </div>
            <div id="section2" class="section">
                <div class="outil_" onclick="popup('creation_equipement',1)">Créer un nouvel equipement</div>
            
                <div id="gestion_creation_equipement" class="gestion_creation_equipement">
                    <div class="annonce">Equipement</div>
                </div>
            </div>
            <div id="section3" class="section">
                <div class="outil_" onclick="popup('creation_equipement_particulier',1)">Créer un nouvel equipement particulier</div>
                <div id="gestion_creation_equipement_particulier" class="gestion_creation_equipement_particulier">
                    <div class="annonce">Equipement particulier</div>
                </div>
            </div>
            
        </div>

    </div>  


            <div id="ajouter" class="popup_ajouter">
                <div class="formulaire_ajouter">
                    <div class="page" id="page1">
                        <div class="gestion_element">
                            <h1 class="text_haut_popup">Que voulez-vous ajoutez ?</h1>
                            <div class="cross" onclick="popup('ajouter',0)" >&times;</div>
                        </div>
                        <div class="liste_des_choix">
                            <button class="next2 choix" type="button" ><bold>Lieu</bold></button><br>
                            <button class="next3 choix" type="button" ><bold>Signalement</bold></button><br>
                        </div>
                    </div>
                    <div class="page" id="page2">
                        <div class="gestion_element">
                            <h1>Quel nom voulez-vous lui donner ?</h1>
                            <div class="cross" onclick="previous_page();popup('ajouter',0)">&times;</div>
                        </div>
                        <div class="liste_des_choix">
                            <input type="text" id="nom" name="nom"><br>
                            <div class="choix" onclick="creation_element();popup('ajouter',0)"> Valider</div>
                        </div>
                    </div>
                    <div class="page" id="page3">
                        <div class="gestion_element">
                            <h1>Quel Signalement Voulez-vous mettre ?</h1>
                            <div class="cross" onclick="previous_page();popup('ajouter',0)">&times;</div>
                        </div>
                        <div id="liste_signalement" class="liste_des_choix">
                            
                        </div>
                    </div>

                </div>
            </div>

            <div id="supprimer" class="popup_supprimer">
                <div class="formulaire_supprimer">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer ce Lieu ?</h1>
                        <div class="cross" onclick="popup('supprimer',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Tout vos signalements encore présents a l'intérieur seront supprimés!)</p>
                        <div class="choix" onclick="supprimer_element();popup('supprimer',0)"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="modifier_element" class="popup_modifier_element">
                <div class="formulaire_modifier_element">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Par quel nom voulez-vous le changer ?</h1>
                        <div class="cross" onclick="popup('modifier_element',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <input type="text" id="nouveau_nom_element" name="nouveau_nom_element">
                        <div class="choix" onclick="modifier_element();popup('modifier_element',0)"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="modifier_signalement" class="popup_modifier_signalement">
                <div class="formulaire_modifier_signalement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Quel type de signalement voulez-vous mettre ?</h1>
                        <div class="cross" onclick="popup('modifier_signalement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix" id="liste_des_signalements">
                        
                        
                    </div>
                </div>
            </div>

            <div id="deplacer_signalement" class="popup_deplacer_signalement">
                <div class="formulaire_deplacer_signalement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Ou voulez-vous mettre votre signalement?</h1>
                        <div class="cross" onclick="popup('deplacer_signalement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix" id="liste_des_elements">
                        
                        <div class="choix" onclick="popup('deplacer_signalement',0)"> Efrei</div>
                    </div>
                </div>
            </div>

            <div id="deplacer_element" class="popup_deplacer_element">
                <div class="formulaire_deplacer_element">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Ou voulez-vous mettre votre lieu?</h1>
                        <div class="cross" onclick="popup('deplacer_element',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix" id="liste_des_elements_pour_element">
                        
                    </div>
                </div>
            </div>

            <div id="creation" class="popup_creation">
                <div class="formulaire_creation">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup">Veuillez remplir les informations suivantes pour la création de votre formaulaire</h3>
                        <div class="cross" onclick="popup('creation',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        
                        <div class="choix" onclick="creation_signalement();popup('creation',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="creation_equipement" class="popup_creation_equipement">
                <div class="formulaire_creation_equipement">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup">Veuillez remplir les informations suivantes pour la création de votre equipement</h3>
                        <div class="cross" onclick="popup('creation_equipement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <label>Nom_de_lequipement</label>
                        <input type="text" id="nom_equipement" name="nom_equipement"><br>
                        <label>Catégorie_de_lequipement</label>
                            <select name="categorie_equipement_creation" id="categorie_equipement_creation">
                                <option valeur="proprete">Proprete</option>
                                <option valeur="informatique">Informatique</option>
                                <option valeur="manutention">Manutention</option>
                                <option valeur="appareil">Appareil</option>
                            </select>
                        <label>Description</label>
                        <input type="text" id="description_equipement" name="description_equipement"><br>
                        <label>Image</label>
                            <select name="image_equipement_creation" id="image_equipement_creation">
                                <option valeur="image_1">Image_1</option>
                                <option valeur="image_2">image_2</option>
                                <option valeur="image_3">Image_3</option>
                                <option valeur="image_4">Image_4</option>
                            </select>
                        <div class="choix" onclick="creer_equipement();popup('creation_equipement',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="creation_equipement_particulier" class="popup_creation_equipement_particulier">
                <div class="formulaire_creation_equipement_particulier">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup">Veuillez remplir les informations suivantes pour la création de votre equipement particulier</h3>
                        <div class="cross" onclick="popup('creation_equipement_particulier',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <input type="texte" id="nom_creation_equipement_particulier" name="nom_creation_equipement_particulier"><br>
                        <input type="file" id="image_equipement_particulier" name="image_equipement_particulier" accept="image/png, image/jpeg"><br>
                        <div class="choix" onclick="creation_equipement_particulier();popup('creation_equipement_particulier',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="contact" class="popup_contact">
                <div class="formulaire_contact">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">A qui voulez-vous rediriger le signalement</h1>
                        <div class="cross" onclick="popup('contact',0)">&times;</div>
                    </div>
                    <div class="contenu"><select class="statut" name="statut" id="statut">
                                <option valeur="signaler">Signaler</option>
                                <option valeur="en_reparation">En reparation</option>
                                <option valeur="en_cours_de_commande">En cours de commande</option>
                                <option valeur="livrer">Livrer</option>
                                <option valeur="termine">Terminé</option>
                            </select></div>
                    <div class="liste_des_responsable" id="liste_des_responsable">
                        <div class="choix" onclick="popup('contact',0)" >Responsable 1</div>
                        <div class="choix" onclick="popup('contact',0)">Responsable 2</div>
                        <div class="choix" onclick="popup('contact',0)">Responsable 3</div>
                    </div>
                </div>
            </div>

            <div id="demande_support" class="popup_demande_support">
                <div class="formulaire_demande_support">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">A qui voulez-vous rediriger le signalement</h1>
                        <div class="cross" onclick="popup('demande_support',0)">&times;</div>
                    </div>
                    <div class="demande_support" id="demande_support">
                        <input type="text" name="demande_support" id="demande_spport">
                        <div class="choix" onclick="envoyer_demande_support();popup('demande_support',0)">Envoyer demande</div>
                    </div>
                </div>
            </div>


            <div class="menu-a-gauche">
                <div class="menu_arborescence">
                    <div class="widget" onclick="changement_de_partie('2')"><img class="image_widget" src="../image/diagramme.png" width="60px" height="60px"></div>
                    <div class="widget" onclick="changement_de_partie('3')"><img class="image_widget" src="../image/rapport-dactivite.png" width="60px" height="60px"></div>
                </div>
                <div class="menu_ticketing">
                    <div class="widget" onclick="changement_de_partie('0')"><img class="image_widget" src="../image/list.png" width="60px" height="60px"></div>
                    <div class="widget" onclick="changement_de_partie('1')"><img class="image_widget" src="../image/warning.png" width="60px" height="60px"></div>
                </div>
                <div class="menu_informations">
                    <div class="widget" onclick="changement_de_partie('4')"><img class="image_widget" src="../image/bar-chart.png" width="60px" height="60px"></div>
                </div>
                <div class="menu_parametre">
                    <div class="widget" onclick="changement_de_partie('5')"><img class="image_widget" src="../image/icone_engrenage.png" width="60px" height="60px"></div>
                </div>

            </div>

            
    </body>

    <script type="text/javascript" src="../local/script_arborescence_v2_65.js"></script>

    <!-- <script type="text/javascript" src="../local/script_arborescence_v2_56.js"></script> -->
</html>