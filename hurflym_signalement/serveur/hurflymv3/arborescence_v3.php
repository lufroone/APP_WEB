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
        <link rel="stylesheet" href="css/arborescence_163.css">
    </head>
    <body>
    <div class="a_gauche">
        <a><img src="../image/Hurflym_logo_colore_2.png" width="200" height="100"></a>
    </div>
    <div class="page_principal">
        
            <div id="partie0" class=" partie">
                <div class="en-tete">Nouveaux signalements</div>
                <div class="gestion_signalement" id="gestion_nouveau_signalement">
                    <div class="nouveau_signalement">
                        <div class="probleme"><div class="affichage">Probleme</div></div>
                        <div class="nom_lieu"><div class="affichage">Lieu</div></div>
                        <div class="date_nouveau_signalement"><div class="affichage">Date complete</div></div>
                        <div class="contenu"><div onclick="popup(contact,1)" class="bouton_contact bouton_incident">Choix des actions</div></div>
                    </div>
                </div>
                <select class="nombre_par_page" name="nombre_signalement_par_page" id="nombre_signalement_par_page" onchange="mise_en_place_nouveau_signalement()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_signalement()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_signalement()">Precedent</div>
            </div>
            <div id="partie1" class=" partie">
                <div class="en-tete">Incidents</div>
                <div class="gestion_incident" id="gestion_incident">
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
                <select class="nombre_par_page" name="nombre_incident_par_page" id="nombre_dincident_par_page" onchange="mise_en_place_incident()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_incident()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_incident()">Precedent</div>
            </div>
            <br><br><br>









        <div id="partie2" class="partie">
            <div id="arborescence">
                <div class="outil_arborescence">
                    <div class="outil_" onclick="popup('demande_support',1)">Contactez_support</div>
                    <div class="outil_" onclick="Connexion();" value="Connexion"></div>
                </div>
                
            </div>
        </div>

        <div id="partie3" class="partie">
            <div class="acceuil_des_sections">
                <div id="bouton_signalement" onclick="section(1)">Signalement</div>
                <div id="bouton_equipement" onclick="section(2)">Equipement</div>
                <div id="bouton_equipement_particulier" onclick="section(3)">Equipement particulier</div>
                <div id="bouton_signalement" onclick="section(4)">Template</div>
            </div>
            <div id="section1" class="section">
                <div class="outil_" onclick="popup('creation_signalement',1)">Créer un nouveau signalement</div>
                <div class="outil_" onclick="popup('recherche_signalement',1)">Recherche Signalement</div>

                <input type="text" name="parametre_de_recherche_signalement_nom_signalement" id="parametre_de_recherche_signalement_nom_signalement" onchange="mise_en_place_gestion_signalement()">
                <input type="text" name="parametre_de_recherche_signalement_nom_equipement" id="parametre_de_recherche_signalement_nom_equipement" onchange="mise_en_place_gestion_signalement()">

                <div id="resultat_recherche_signalement" class="gestion_creation_signalement">
                    <div class="annonce">Resultat Recherche Signalement</div>
                </div>
                <div id="gestion_creation_signalement" class="gestion_creation_signalement">
                    <div class="annonce">Liste des Signalements</div>
                </div>
                <select class="nombre_par_page" name="nombre_gestion_signalement_par_page" id="nombre_gestion_signalement_par_page" onchange="mise_en_place_gestion_signalement()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_gestion_signalement()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_gestion_signalement()">Precedent</div>



            </div>
            <div id="section2" class="section">
                <div class="outil_" onclick="popup('creation_equipement',1)">Créer un nouvel Equipement</div>
                <div class="outil_" onclick="popup('recherche_equipement',1)">Rechercher un Equipement</div>

                <input type="text" name="parametre_de_recherche_equipement_nom_equipement" id="parametre_de_recherche_equipement_nom_equipement" onchange="mise_en_place_gestion_equipement()">
                <input type="text" name="parametre_de_recherche_equipement_nom_categorie" id="parametre_de_recherche_equipement_nom_categorie" onchange="mise_en_place_gestion_equipement()">

                <div id="resultat_de_recherche_equipement" class="gestion_creation_equipement">
                    <div class="annonce">Resultat de Recherche</div>
                </div>
                <div id="gestion_creation_equipement" class="gestion_creation_equipement">
                    <div class="annonce">Equipement</div>
                </div>
                <select class="nombre_par_page" name="nombre_gestion_equipement_par_page" id="nombre_gestion_equipement_par_page" onchange="mise_en_place_gestion_equipement()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_gestion_equipement()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_gestion_equipement()">Precedent</div>


            </div>
            <div id="section3" class="section">
                <div class="outil_" onclick="popup('creation_equipement_particulier',1)">Créer un nouvel equipement particulier</div>
                <div class="outil_" onclick="popup('recherche_equipement_particulier',1)">Rechercher un Equipement particulier</div>

                <input type="text" name="parametre_de_recherche_equipement_particulier_nom_equipement_particulier" id="parametre_de_recherche_equipement_particulier_nom_equipement_particulier" onchange="mise_en_place_gestion_equipement_particulier()">
                <input type="text" name="parametre_de_recherche_equipement_particulier_nom_categorie" id="parametre_de_recherche_equipement_particulier_nom_categorie" onchange="mise_en_place_gestion_equipement_particulier()">


                <div id="resultat_de_recherche_equipement_particulier" class="gestion_creation_equipement_particulier">
                    <div class="annonce">Resultat de Recherche</div>
                </div>
                <div id="gestion_creation_equipement_particulier" class="gestion_creation_equipement_particulier">
                    <div class="annonce">Equipement particulier</div>
                </div>
                <select class="nombre_par_page" name="nombre_gestion_equipement_particulier_par_page" id="nombre_gestion_equipement_particulier_par_page" onchange="mise_en_place_gestion_equipement_particulier()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_gestion_equipement_particulier()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_gestion_equipement_particulier()">Precedent</div>



            </div>
            <div id="section4" class="section">
                <div class="outil_" onclick="popup('creation_template',1)">Créer un nouveau template</div>
                <div class="outil_" onclick="popup('recherche_template',1)">Rechercher un Template</div>

                <input type="text" name="parametre_de_recherche_template_nom_template" id="parametre_de_recherche_template_nom_template" onchange="mise_en_place_gestion_template()">
                <input type="text" name="parametre_de_recherche_template_nom_equipement" id="parametre_de_recherche_template_nom_equipement" onchange="mise_en_place_gestion_template()">

                <div id="resultat_recherche_template" class="gestion_creation_template">
                    <div class="annonce">Resultat de Recherche</div>
                </div>
                <div id="gestion_creation_template" class="gestion_creation_template">
                    <div class="annonce">Template</div>
                </div>
                <select class="nombre_par_page" name="nombre_gestion_template_par_page" id="nombre_gestion_template_par_page" onchange="mise_en_place_gestion_template()">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option vlaue="30">30</option>
                </select>
                <div class="choix" onclick="avancer_dans_la_liste_gestion_template()">Suivant</div>
                <div class="choix" onclick="reculer_dans_la_liste_gestion_template()">Precedent</div>



            </div>
            
        </div>

        <div id="partie4" class="partie">
            
            <h1> Voici toutes les informations concernant tout vos signalements !</h1>

            <div id="statistique_signalement">

            </div>
            <div id="statistique_ep">
                
            </div>
            
        </div>

        <div id="partie5" class="partie">
            <div class='centre'>
                <div class='partie_gauche'>
                    <form action="" method="post" id="formulaire_denvoi_personalisation">
                    <h1>Voici les différentes données que vous pouvez personalisées !</h1>
                    <label>Logo de votre Etablissement/Marque</label><br>
                    <input type="file" id="logo" name="logo" accept="image/png, image/jpeg" onchange="modifier_faux_logo(this)"><br><br><br>
                    <h3>Merci de remplir en code hexadecimal</h3>
                    <label>Couleur de fond de la page</label><br>
                    <input type="color" id="couleur_de_fond" name="couleur_de_fond" onchange="modifier_couleur_de_fond()"><br>
                    <label>Couleur de cadre</label><br>
                    <input type="color" id="couleur_de_cadre" name='couleur_de_cadre' onchange="modifier_couleur_de_cadre()"><br>
                    <label>Couleur exceptionnel</label><br>
                    <input type="color" id="couleur_exceptionnel" name="couleur_exceptionnel" onchange="modifier_couleur_exceptionnel()"><br>
                    <div class="choix" onclick="valider_le_choix_des_propriétés()"> Valider les propriétées</div>  
                </form>
                </div>
                <div class="partie_droite">
                    <h1>Exemple de vos propriétées</h1>
                    <div id="fausse_page">
                        <div id="faux_bandeau">
                            <img src="" id="faux_logo" width="100px" height="50px">
                        </div>
                        <div id="faux_body">
                            <div id="faux_cadre">
                                <img class="fausse_image" src="../image/bar-chart.png" width="200px" height="200px">
                                <h3>Ceci est un exemple</h3>
                            </div>
                            <div id="faux_trait"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="partie6" class="partie">
            
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
                            <button class="next4 choix" type="button" ><bold>Equipement_particulier</bold></button><br>
                        </div>
                    </div>
                    <div class="page" id="page2">
                        <div class="gestion_element">
                            <h1>Quel nom voulez-vous lui donner ?</h1>
                            <div class="cross" onclick="previous_page();popup('ajouter',0)">&times;</div>

                        </div>
                        <div class="liste_des_choix">
                            <input type="text" id="nom_element" name="nom_element"><br>
                            <h3>Qu'elle est sa localisation ?</h3>
                            <input type="text" id="localisation_element" name="localisation_element">
                            <div class="choix" onclick="ajout_element();popup('ajouter',0)"> Valider</div>
                        </div>
                    </div>
                    <div class="page" id="page3">
                        <div class="gestion_element">
                            <h1>Quel Signalement Voulez-vous mettre ?</h1>
                            <div class="cross" onclick="previous_page();popup('ajouter',0)">&times;</div>
                            <input type="text" name="parametre_de_recherche_signalement_nom_signalement_recherche" id="parametre_de_recherche_signalement_nom_signalement_recherche" onchange="mise_en_place_recherche_signalement()">
                            <input type="text" name="parametre_de_recherche_signalement_nom_equipement_recherche" id="parametre_de_recherche_signalement_nom_equipement_recherche" onchange="mise_en_place_recherche_signalement()">
                            <div id="recherche_mise_en_place_signalement">
                                <div></div>
                            </div>
                            <select class="nombre_par_page" name="nombre_recherche_signalement_par_page" id="nombre_recherche_signalement_par_page" onchange="mise_en_place_recherche_signalement()">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option vlaue="30">30</option>
                            </select>
                            <div class="choix" onclick="avancer_dans_la_liste_mise_en_place_signalement()">Suivant</div>
                            <div class="choix" onclick="reculer_dans_la_liste_mise_en_place_signalement()">Precedent</div>
                        </div>
                        <div id="liste_signalement" class="liste_des_choix">
                            
                        </div>
                    </div>

                    <div class="page" id="page4">
                        <div class="gestion_element">
                            <h1>Quel Equipement_particulier Voulez-vous mettre ?</h1>
                            <div class="cross" onclick="previous_page();popup('ajouter',0)">&times;</div>
                            <input type="text" name="parametre_de_recherche_ep_nom_ep_recherche" id="parametre_de_recherche_ep_nom_ep_recherche" onchange="mise_en_place_recherche_ep()">
                            <input type="text" name="parametre_de_recherche_ep_nom_categorie_recherche" id="parametre_de_recherche_ep_nom_categorie_recherche" onchange="mise_en_place_recherche_ep()">
                            <div id="recherche_mise_en_place_ep">
                                <div></div>
                            </div>
                            <select class="nombre_par_page" name="nombre_recherche_ep_par_page" id="nombre_recherche_ep_par_page" onchange="mise_en_place_recherche_ep()">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option vlaue="30">30</option>
                            </select>
                            <div class="choix" onclick="avancer_dans_la_liste_mise_en_place_ep()">Suivant</div>
                            <div class="choix" onclick="reculer_dans_la_liste_mise_en_place_ep()">Precedent</div>
                        </div>
                        <div id="liste_ep" class="liste_des_choix">
                            
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

            <div id="supprimer_equipement" class="popup_supprimer_equipement">
                <div class="formulaire_supprimer_equipement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer cet equipement?</h1>
                        <div class="cross" onclick="popup('supprimer_equipement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Il sera supprimés de tout les signalements vous perderez toutes ces informations relatives !)</p>
                        <div class="choix" onclick="supprimer_equipement();popup('supprimer_equipement',0)"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="supprimer_equipement_particulier" class="popup_supprimer_equipement_particulier">
                <div class="formulaire_supprimer_equipement_particulier">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer cet equipement particulier?</h1>
                        <div class="cross" onclick="popup('supprimer_equipement_particulier',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Il sera supprimés de tout les signalements, vous perderez toutes ces informations relatives !)</p>
                        <div class="choix" onclick="supprimer_equipement_particulier();popup('supprimer_equipement_particulier',0)"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="supprimer_signalement" class="popup_supprimer_signalement">
                <div class="formulaire_supprimer_signalement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer ce signalement?</h1>
                        <div class="cross" onclick="popup('supprimer_signalement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Il sera supprimés de tout les signalements vous perderez toutes ces informations relatives !)</p>
                        <div class="choix" onclick="supprimer_signalement();popup('supprimer_signalement',0)"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="supprimer_template" class="popup_supprimer_template">
                <div class="formulaire_supprimer_template">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Etes-vous sur de vouloir supprimer ce template?</h1>
                        <div class="cross" onclick="popup('supprimer_template',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <p>(Aucune repercusion sera faites sur les signalements qui l'utilise)</p>
                        <div class="choix" onclick="supprimer_template();popup('supprimer_template',0)"> Valider</div>
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
                        <h3>Qu'elle localisation voulez-vous lui donner ?(si vous ne voulez pas modifier sa localisation laissé cet espace vide)</h3>
                        <input type="text" id="nouvelle_localisation_element" name="nouvelle_localisation_element">
                        <div class="choix" onclick="popup('modifier_element',0);modifier_element();"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="modifier_equipement" class="popup_modifier_equipement">
                <div class="formulaire_modifier_equipement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Quelles informations voulez-vous modifier ?</h1>
                        <div class="cross" onclick="remise_a_null_de_modification_equipement();popup('modifier_equipement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <h3>Si vous ne soihaitez pas modifier certaines informations laissé la case vide aucune modification ne sera effectué dessus</h3>
                        <h3>Quel nom voulez-vous lui donner ?</h3>
                        <input type="text" id="nouveau_nom_equipement" name="nouveau_nom_equipement">
                        <h3>Quel description voulez-vous lui donner ?</h3>
                        <input type="text" id="nouvelle_description_equipement" name="nouvelle_description_equipement">
                        <h3>Qu'elle categorie voulez-vous lui attribuer ?</h3>
                        <label>Catégorie principal de lequipement</label><br>
                        <select class="categorie_primaire" name="nouvelle_categorie_equipement_primaire_creation" id="nouvelle_categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("nouvelle_");' value="">   
                        </select><br>
                        <label>Catégorie secondaire de lequipement</label><br>
                        <select name="nouvelle_categorie_equipement_secondaire_creation" id="nouvelle_categorie_equipement_secondaire_creation" onchange='charger_image("nouvelle_");' value="">
                        <option value="">Choisissez une categorie secondaire</option>     
                        </select><br>
                        <label>Image</label><br>
                        <select name="nouvelle_image_equipement_creation" id="nouvelle_image_equipement_creation" value="">
                        <option value="">Choisissez une image</option>
                        </select><br>
                        <div class="choix" onclick="popup('modifier_equipement',0);modification_equipement();"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="modifier_equipement_particulier" class="popup_modifier_equipement_particulier">
                <div class="formulaire_modifier_equipement_particulier">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Quelles informations voulez-vous modifier ?</h1>
                        <div class="cross" onclick="remise_a_null_de_modification_equipement_particulier();popup('modifier_equipement_particulier',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <h3>Si vous ne soihaitez pas modifier certaines informations laissé la case vide aucune modification ne sera effectué dessus</h3>
                        <h3>Quel nom voulez-vous lui donner ?</h3>
                        <input type="text" id="nouveau_nom_equipement_particulier" name="nouveau_nom_equipement_particulier">
                        <h3>Quel description voulez-vous lui donner ?</h3>
                        <input type="text" id="nouvelle_description_equipement_particulier" name="nouvelle_description_equipement_particulier">
                        <h3>Qu'elle categorie voulez-vous lui attribuer ?</h3>
                        <label>Catégorie principal de lequipement particulier</label><br>
                        <select class="categorie_primaire" name="nouvelle_particulier_categorie_equipement_primaire_creation" id="nouvelle_particulier_categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("nouvelle_particulier_");' value="">   
                        </select><br>
                        <label>Catégorie secondaire de lequipement particulier</label><br>
                        <select name="nouvelle_particulier_categorie_equipement_secondaire_creation" id="nouvelle_particulier_categorie_equipement_secondaire_creation" onchange='charger_image("nouvelle_particulier_");' value="">
                        <option value="">Choisissez une categorie secondaire</option>     
                        </select><br>
                        <label>Image</label><br>
                        <select name="nouvelle_particulier_image_equipement_creation" id="nouvelle_particulier_image_equipement_creation" value="">
                        <option value="">Choisissez une image</option>
                        </select><br>
                        <div class="choix" onclick="popup('modifier_equipement_particulier',0);modification_equipement_particulier();"> Valider</div>
                    </div>
                </div>
            </div>

            <div id="modifier_signalement" class="popup_modifier_signalement">
                <div class="formulaire_modifier_signalement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Quelles informations voulez-vous modifier ?</h1>
                        <div class="cross" onclick="popup('modifier_signalement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <h3>Quel nouveau nom souhaitez-vous lui donner ?</h3>
                        <input type="text" id="nouveau_nom_signalement" name="nouveau_nom_signalement">
                        <h3 id="liste_des_equipements_du_signalement_en_cours_de_modification" >Voici la liste d'equipement qu'il possede : </h3>

                        <h3>Rentrer le nom d'un equipement a ajouter :</h3>
                        <input text="text" id="nom_equipement_pour_recherche_signalement" name="nom_equipement_pour_recherche_signalement">
                        <div id="resultat_recherche_nom_equipement_pour_modification_signalement">

                        </div>
                        <div class="choix" onclick="rechercher_equipement_pour_ajout_signalement('nom_equipement_pour_recherche_signalement')"> Rechercher</div>
                        <div class="choix" onclick="popup('modifier_signalement',0);modification_signalement();"> Modifier</div>
                    </div>
                </div>
            </div>

            <div id="modifier_template" class="popup_modifier_template">
                <div class="formulaire_modifier_template">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Quelles informations voulez-vous modifier ?</h1>
                        <div class="cross" onclick="popup('modifier_template',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <h3>Quel nouveau nom souhaitez-vous lui donner ?</h3>
                        <input type="text" id="nouveau_nom_template" name="nouveau_nom_template">
                        <div class="double_colonne">
                            <div class="colonne_1">
                                <h3 id="liste_des_equipements_du_template_en_cours_de_modification" >Voici la liste d'equipement qu'il possede : </h3>

                            </div>
                            <div class="colonne_2">
                                <h3>Rentrer le nom d'un equipement a ajouter :</h3>
                                <input text="text" id="nom_equipement_pour_modification_template" name="nom_equipement_pour_modification_template">
                                    <div id="resultat_recherche_nom_equipement_pour_modification_template">

                                    </div>
                            </div>
                        </div>
                        <div class="petit_choix" onclick="rechercher_equipement_pour_ajout_template('nom_equipement_pour_modification_template')"> Rechercher</div>
                        <div class="petit_choix" onclick="popup('modifier_template',0);modification_template();"> Modifier</div>
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
                        <input type="text" id="nom_de_lelement_recherche" name="nom_de_lelement_recherche">
                        <div class="choix" onclick="rechercher_element();"> Rechercher</div>
                        <div id="resultat_recherche_element">

                        </div>
                        
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
                        <label>Nom_de_lequipement</label><br>
                        <input type="text" id="nom_equipement" name="nom_equipement"><br>
                        <label>Description</label><br>
                        <input type="text" id="description_equipement" name="description_equipement"><br>
                        <label>Catégorie principal de lequipement</label><br>
                            <select class="categorie_primaire" name="categorie_equipement_primaire_creation" id="categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("");'>
                                
                            </select><br>
                        <label>Catégorie secondaire de lequipement</label><br>
                            <select name="categorie_equipement_secondaire_creation" id="categorie_equipement_secondaire_creation" onchange='charger_image("");'>
                                
                            </select><br>
                        <label>Image</label><br>
                            <select name="image_equipement_creation" id="image_equipement_creation">
                            </select><br>
                        <div class="choix" onclick="creation_equipement();popup('creation_equipement',0)">Valider</div>
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
                        <label>Nom Equipement particulier</label>
                        <input type="texte" id="nom_creation_equipement_particulier" name="nom_creation_equipement_particulier"><br>
                        <label>Descriptio Equipement particulier</label>
                        <input type="texte" id="description_creation_equipement_particulier" name="description_creation_equipement_particulier"><br>
                        <label>Catégorie principal de lequipement</label><br>
                            <select class="categorie_primaire" name="particulier_categorie_equipement_primaire_creation" id="particulier_categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("particulier_");'>
                                
                            </select><br>
                        <label>Catégorie secondaire de lequipement</label><br>
                            <select name="particulier_categorie_equipement_secondaire_creation" id="particulier_categorie_equipement_secondaire_creation" onchange='charger_image("particulier_");'>
                                
                            </select><br>
                        <label>Image</label><br>
                            <select name="particulier_image_equipement_creation" id="particulier_image_equipement_creation">
                            </select><br>
                        <div class="choix" onclick="creation_equipement_particulier();popup('creation_equipement_particulier',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="creation_signalement" class="popup_creation_signalement">
                <div class="formulaire_creation_signalement">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup">Veuillez remplir les informations suivantes pour la création de votre signalement</h3>
                        <div class="cross" onclick="popup('creation_signalement',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <label>Nom du signalement</label><br>
                        <input type="text" id="nom_signalement" name="nom_signalement"><br>
                        <label>Souhaitez-vous utiliser un temaplte pour créer cotre signalement ?</label>
                        <input type="text" id="nom_template_pour_signalement" name="nom_template_pour_signalement">
                        <div class="petit_choix" onclick="appliquer_le_template()">Appliquer</div>
                        <div id="resultat_recherche_template_pour_creation_signalement"></div>
                        <div class="double_colonne">
                            <div class="colonne_1">
                                <h3 id="liste_equipement_pour_creation_signalement" >Voici la liste d'equipement qu'il possede : </h3>
                            </div>
                            <div class="colonne_2">
                                <label>Quel equipement voulez-vous lui mettre ?</label>
                                <input type="text" id="equipement_pour_creation_signalement" name="equipement_pour_creation_signalement">
                                <div id="resultat_recherche_equipement_pour_creation_signalement">
                            </div>
                        </div>
                        

                        </div>
                        <div class="petit_choix" onclick="rechercher_equipement_pour_ajout_signalement('equipement_pour_creation_signalement')">Lancer la recherche</div>
                        <div class="petit_choix" onclick="creation_signalement();popup('creation_signalement',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="creation_template" class="popup_creation_template">
                <div class="formulaire_creation_template">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup">Veuillez remplir les informations suivantes pour la création de votre template</h3>
                        <div class="cross" onclick="popup('creation_template',0)">&times;</div>
                    </div> 
                    <div class="liste_des_choix">
                        <label>Nom du template</label><br>
                        <input type="text" id="nom_template" name="nom_template"><br>
                        <label>Quel equipement voulez-vous lui mettre ?</label>
                        <h3 id="liste_equipement_pour_creation_template" >Voici la liste d'equipement qu'il possede : </h3>

                        <input type="text" id="equipement_pour_creation_template" name="equipement_pour_creation_template">
                        <div id="resultat_recherche_equipement_pour_creation_template">

                        </div>
                        <div class="choix" onclick="rechercher_equipement_pour_ajout_template('equipement_pour_creation_template')">Lancer la recherche</div>
                        <div class="choix" onclick="creation_template();popup('creation_template',0)">Valider</div>
                    </div>
                </div>
            </div>

            <div id="recherche_equipement" class="popup_recherche_equipement">
                <div class="formulaire_recherche_equipement">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup"> Recherche Equipement</h3>
                        <div class="cross" onclick="popup('recherche_equipement',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <label>Nom de l'equipement rechercher</label>
                        <input type="text" name="recherche_nom_equipement" id="recherche_nom_equipement">
                        <label>Description</label><br>
                        <input type="text" id="recherche_description_equipement" name="recherche_description_equipement"><br>
                        <label>Catégorie principal de lequipement</label><br>
                            <select class ="categorie_primaire" name="recherche_categorie_equipement_primaire_creation" id="recherche_categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("recherche_");'>
                                
                            </select><br>
                        <label>Catégorie secondaire de lequipement</label><br>
                            <select name="recherche_categorie_equipement_secondaire_creation" id="recherche_categorie_equipement_secondaire_creation" onchange='charger_image("recherche_");'>
                                
                            </select><br>
                        <label>Image</label><br>
                            <select name="recherche_image_equipement_creation" id="recherche_image_equipement_creation">
                            </select><br>
                        <div class="choix" onclick="recherche_equipement();popup('recherche_equipement',0)">Lancer la recherche</div>
                    </div>
                </div>
            </div>

            <div id="recherche_equipement_particulier" class="popup_recherche_equipement_particulier">
                <div class="formulaire_recherche_equipement_particulier">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup"> Recherche Equipement Particulier</h3>
                        <div class="cross" onclick="popup('recherche_equipement_particulier',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <label>Nom de l'equipement particulier rechercher</label>
                        <input type="text" name="recherche_nom_equipement_particulier" id="recherche_nom_equipement_particulier">
                        <label>Description</label><br>
                        <input type="text" id="recherche_description_equipement_particulier" name="recherche_description_equipement_particulier"><br>
                        <label>Catégorie principal de lequipement</label><br>
                            <select class="categorie_primaire" name="recherche_particulier_categorie_equipement_primaire_creation" id="recherche_particulier_categorie_equipement_primaire_creation" onchange='charger_categorie_secondaire("recherche_particulier_");'>
                                
                            </select><br>
                        <label>Catégorie secondaire de lequipement</label><br>
                            <select name="recherche_particulier_categorie_equipement_secondaire_creation" id="recherche_particulier_categorie_equipement_secondaire_creation" onchange='charger_image("recherche_particulier_");'>
                                
                            </select><br>
                        <label>Image</label><br>
                            <select name="recherche_particulier_image_equipement_creation" id="recherche_particulier_image_equipement_creation">
                            </select><br>
                        <div class="choix" onclick="recherche_equipement_particulier();popup('recherche_equipement_particulier',0)">Lancer la recherche</div>
                    </div>
                </div>
            </div>

            <div id="recherche_signalement" class="popup_recherche_signalement">
                <div class="formulaire_recherche_signalement">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup"> Recherche Signalement</h3>
                        <div class="cross" onclick="popup('recherche_signalement',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <label>Nom du signalement rechercher</label>
                        <input type="text" name="recherche_nom_signalement" id="recherche_nom_signalement">
                        <div class="choix" onclick="recherche_signalement();popup('recherche_signalement',0)">Lancer la recherche</div>
                    </div>
                </div>
            </div>

            <div id="recherche_template" class="popup_recherche_template">
                <div class="formulaire_recherche_template">
                    <div class="gestion_element">
                        <h3 class="text_haut_popup"> Recherche Template</h3>
                        <div class="cross" onclick="popup('recherche_template',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <label>Nom du template rechercher</label>
                        <input type="text" name="recherche_nom_template" id="recherche_nom_template">
                        <div class="choix" onclick="recherche_template();popup('recherche_template',0)">Lancer la recherche</div>
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

            <div id="demande_qrcode" class="popup_demande_qrcode">
                <div class="formulaire_demande_qrcode">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Votre demande à bien pris en compte, il vous sera livré le plus vite possible</h1>
                        <div class="cross" onclick="popup('demande_qrcode',0)">&times;</div>
                    </div>
                </div>
            </div>

            <div id="changement_detat_incident" class="popup_changement_detat_incident">
                <div class="formulaire_changement_detat_incident">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Que voulez-vous faire ?</h1>
                        <div class="cross" onclick="popup('changement_detat_incident',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <p>Modification de l'état de l'incident :</p>
                        <select class="etat_incident" name="etat_incident" id="etat_incident">
                            <option value="2">Commander</option>
                            <option value="3">Livrer</option>
                            <option value="4">Réparer</option>
                            <option value="5">Classer</option>
                        </select>

                        <div class="choix" onclick="changement_detat_incident();popup('changement_detat_incident',0)">Valider</div>
                    </div>
                </div>
            </div>
            
            <div id="changement_detat_signalement" class="popup_changement_detat_signalement">
                <div class="formulaire_changement_detat_signalement">
                    <div class="gestion_element">
                        <h1 class="text_haut_popup">Que voulez-vous faire ?</h1>
                        <div class="cross" onclick="popup('changement_detat_signalement',0)">&times;</div>
                    </div>
                    <div class="liste_des_choix">
                        <p>Modification de l'état du signalement :</p>
                        <select class="etat_signalement" name="etat_signalement" id="etat_signalement">
                            <option value="2">Commander</option>
                            <option value="3">Livrer</option>
                            <option value="4">Réparer</option>
                            <option value="5">Classer</option>
                        </select>

                        <div class="choix" onclick="changement_detat_signalement();popup('changement_detat_signalement',0)">Valider</div>
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
                <div class="menu_personalisation">
                    <div class="widget" onclick="changement_de_partie('5')"><img class="image_widget" src="../image/plus.png" width="60px" height="60px"></div>
                </div>
                <div class="menu_parametre">
                    <div class="widget" onclick="changement_de_partie('6')"><img class="image_widget" src="../image/icone_engrenage.png" width="60px" height="60px"></div>
                </div>

            </div>

            
    </body>

    <script type="text/javascript" src="../local/arborescence_back+front/script_arborescence_v3_34.js"></script>

    <!-- <script type="text/javascript" src="../local/script_arborescence_v2_56.js"></script> -->
</html>