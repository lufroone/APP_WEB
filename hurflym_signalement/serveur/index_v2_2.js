// On va chercher les différents éléments de notre page
let pages = document.querySelectorAll(".page");
const parties = document.querySelectorAll(".partie");
const sections = document.querySelectorAll(".section");
const header = document.querySelector("header");
const nbPages = pages.length // Nombre de pages du formulaire
let pageActive = 1;
let id = 0;
let id_signalement = 0;
let profondeur = 0;
let verif = "element";
let affichage_arborescence = 0;


let ID_Source;
let info_Source;
let liste_equipement_signalement;
let Categorie;


let Information_equipement_present_dans_le_signalement = [];
let Categorie_mise_en_place = [];


let liste_equipement_defectueux = [];
//-----------------------------------Creation de parties html type-------------------------------------------




//---------------------------------------------------------------------------------------------------------------

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
    for(let page of pages){
        page.style.display = "none";
    }
    
    document.querySelector(".page").style.display = "initial";

    ID_Source = $_GET('ID_Source');
    console.log("ID_Source = "+ ID_Source);
    connexion();


    // On gère les boutons "suivant"
    let boutons = document.querySelectorAll(".next");

    for(let bouton of boutons){
        bouton.addEventListener("click", page2);
    }

    boutons = document.querySelectorAll(".next_2");

    for(let bouton of boutons){
        bouton.addEventListener("click", page3);
    }


}



// --------------------------------------------------- Fonction lors du demmarage de la page de mise en place du questionnaire -------------------------

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

async function connexion(){
    await recup_information_signalement(ID_Source);
    await recup_liste_equipement_signalement(info_Source);
    await request_categorie();
    Separer_les_informations_qui_ne_sont_pas_dans_le_signalement();
    Mise_en_place_des_categories_du_signalement();
}

async function recup_information_signalement(ID_Source){
    info_Source = await fetch("http://hurflym.fr/recup_info_source.php?ID_Source="+ID_Source).then(res => res.json()).then(data => {return data;});
    console.log(info_Source);
    console.log(info_Source[0]["ID_Etablissement"]);
    console.log(info_Source[0]["ID_Signalement"]);
}

async function recup_liste_equipement_signalement(info_Source){
    liste_associe_au_signalement = await fetch("http://hurflym.fr/recup_liste_complete_associe_au_signalement.php?ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
    liste_equipement_signalement = await fetch("http://hurflym.fr/recup_index_signalement.php?ID_Signalement="+info_Source[0]["ID_Signalement"]+"&ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
    console.log(liste_associe_au_signalement);
    console.log(liste_equipement_signalement);
}

async function request_categorie(){
	Categorie = await fetch("http://hurflym.fr/recup_categorie.php").then(res => res.json()).then(data => {return data;});
	console.log(Categorie);
	proprete = Categorie[0];
	informatique = Categorie[1];
	manutention = Categorie[2];
	appareil = Categorie[3];
}

function trouver_la_categorie_principal(ID_Categorie_Secondaire){
    for(var i=0;i<Categorie.length;i++){
        for(var j=0;j<Categorie[i]["Fils"].length;j++){
            if(Categorie[i]["Fils"][j]["ID_Categorie"] == ID_Categorie_Secondaire){
                return Categorie[i]["Fils"][j]["ID_Categorie_Prec"];
            }
        }
    }
}

function Separer_les_informations_qui_ne_sont_pas_dans_le_signalement(){
    for(var i=0;i<liste_equipement_signalement[0]["Equipement"].length;i++){
        if(liste_equipement_signalement[0]["Equipement"][i] == 1){
            Information_equipement_present_dans_le_signalement.push(liste_associe_au_signalement[i]);
        }
    }
    console.log(Information_equipement_present_dans_le_signalement[0]['ID_Equipement']);

    var categorie_presente;
    for(var i=0;i<Information_equipement_present_dans_le_signalement.length;i++){


        categorie_presente = 0;
        for(var j=0; j<Categorie_mise_en_place.length;j++){
            if(Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"] == Categorie_mise_en_place[j]["ID_Categorie"]){
                categorie_presente = 1;
            }
        }

        if(categorie_presente == 0){
            Categorie_mise_en_place.push({"ID_Categorie": Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"], "ID_Categorie_Prec": trouver_la_categorie_principal(Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"])})
        }
    }

    console.log(Categorie_mise_en_place);


}

let Categorie_primaire_presente = [];
let Categorie_secondaire_presente = [];
let Equipement_present = [];
var verif_deja_presente;
var Nom_Categorie_primaire;

function Mise_en_place_des_categories_du_signalement(){
    for(var i=0;i<Categorie_mise_en_place.length;i++){
        // ---------------- Verif et mise en place de la categorie principale    -------------------------------------------
        verif_deja_presente = 0;
        for(var j=0;j<Categorie_primaire_presente.length;j++){
            if(Categorie_primaire_presente[j]["ID_Categorie"] == Categorie_mise_en_place[i]["ID_Categorie_Prec"]){
                verif_deja_presente = 1;
            }
        }
        if(verif_deja_presente == 0){
            Categorie_primaire_presente.push({"ID_Categorie" : Categorie_mise_en_place[i]["ID_Categorie_Prec"]});

            for(var j=0;j<Categorie.length;j++){
                if(Categorie[j]["Fils"][0]["ID_Categorie_Prec"] == Categorie_mise_en_place[i]["ID_Categorie_Prec"]){
                    Ajouter_Categorie_Primaire(Categorie[j]["Nom_Categorie"]);
                }
            }
        }

        // ------------------- Mise en place de la categorie secondaire --------------------------------------------------

        verif_deja_presente=0;
        for(var j=0;j<Categorie_secondaire_presente.length;j++){
            if(Categorie_secondaire_presente[j]["ID_Categorie"] == Categorie_mise_en_place[i]["ID_Categorie"]){
                verif_deja_presente = 1;
            }
        }
        if(verif_deja_presente == 0){
            Categorie_secondaire_presente.push({"ID_Categorie" : Categorie_mise_en_place[i]["ID_Categorie"]});

            for(var j=0;j<Categorie.length;j++){
                for(var k=0;k<Categorie[j]["Fils"].length;k++){
                    if(Categorie[j]["Fils"][k]["ID_Categorie"] == Categorie_mise_en_place[i]["ID_Categorie"]){
                        Ajouter_Categorie_Secondaire(Categorie[j]["Fils"][k]["ID_Categorie"],Categorie[j]["Fils"][k]["ID_Categorie_Prec"],Categorie[j]["Fils"][k]["ID_Image_Max"], Categorie[j]["Fils"][k]["Nom_Categorie"]);
                    }
                }
            }
        }


        



    }

    // -------------------Mise en place des equipements dans les pages des categories secondaires ------------------------


    for(var i=0;i<Information_equipement_present_dans_le_signalement.length;i++){
        Ajouter_bouton_pour_Equipement(Information_equipement_present_dans_le_signalement[i]["Description_Equipement"],Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"], Information_equipement_present_dans_le_signalement[i]["ID_Equipement"], Information_equipement_present_dans_le_signalement[i]["Image_Equipement"], Information_equipement_present_dans_le_signalement[i]["Nom_Equipement"]);
    }

    // ------------------- Mise en place de la navigation entre les pages --------------------------------------------

    Categorie_primaire_presente = [];
    Categorie_secondaire_presente = [];

    for(var i=0;i<Categorie_mise_en_place.length;i++){
        verif_deja_presente=0;
        for(var j=0;j<Categorie_primaire_presente.length;j++){
            if(Categorie_mise_en_place[i]["ID_Categorie_Prec"] == Categorie_primaire_presente[j]["ID_Categorie"]){
                verif_deja_presente = 1;
            }
        }

        if(verif_deja_presente==0){
            Categorie_primaire_presente.push({"ID_Categorie" : Categorie_mise_en_place[i]["ID_Categorie_Prec"]});
            Ajouter_bouton_pour_la_categorie_principale(parseInt(Categorie_mise_en_place[i]["ID_Categorie_Prec"])+1);
        }


        verif_deja_presente=0;
        for(var j=0;j<Categorie_secondaire_presente.length;j++){
            if(Categorie_mise_en_place[i]["ID_Categorie_Prec"] == Categorie_secondaire_presente[j]["ID_Categorie"]){
                verif_deja_presente = 1;
            }
        }

        if(verif_deja_presente==0){
            Categorie_secondaire_presente.push({"ID_Categorie" : Categorie_mise_en_place[i]["ID_Categorie_Prec"]});
            Ajouter_bouton_pour_la_categorie_secondaire(Categorie_mise_en_place[i]["ID_Categorie"],parseInt(Categorie_mise_en_place[i]["ID_Categorie_Prec"])+1);
        }
        
    }

    Ajouter_bouton_pour_revenir_au_menu();


}

function Ajouter_Categorie_Primaire(Nom_Categorie_Primaire){

    const Page_du_formulaire_a_remplir = document.getElementById("page1");
    const Bouton_Categorie_Primaire = document.createElement("button");
    Bouton_Categorie_Primaire.type = "button";
    Bouton_Categorie_Primaire.className = "Categorie_Primaire";

    if(Nom_Categorie_Primaire == "propreté"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/toilette.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('2');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "informatique"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/sol.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_2");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('3');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "manutention"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/sol.png";  //                    A changer pour la bonne image
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_3");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('4');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "appareil"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/sol.png"; //                    A changer pour la bonne image
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_4");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('5');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
}

function Ajouter_Categorie_Secondaire(ID_Categorie,ID_Categorie_Prec,ID_Image_Max,Nom_Categorie){
    var numero_de_page_;
    if(ID_Categorie_Prec == "1"){
        numero_de_page_ = 2;
    }
    if(ID_Categorie_Prec == "2"){
        numero_de_page_ = 3;
    }
    if(ID_Categorie_Prec == "3"){
        numero_de_page_ = 4;
    }
    if(ID_Categorie_Prec == "4"){
        numero_de_page_ = 5;
    }

    const Page_du_formulaire_a_remplir = document.getElementById("page"+numero_de_page_);
    const page_de_la_categorie_secondaire_a_inserer = document.createElement("div");
    page_de_la_categorie_secondaire_a_inserer.className = "page";
    page_de_la_categorie_secondaire_a_inserer.id = "page"+ID_Categorie;
    page_de_la_categorie_secondaire_a_inserer.style.display = "none";
    const Div_Categorie_Secondaire = document.createElement("div");
    Div_Categorie_Secondaire.id = "Categorie"+ID_Categorie;

    const Image_a_mettre = document.createElement("img");
    Image_a_mettre.className = "center";
    Image_a_mettre.src = "../image/sol.png";
    /*
    if(ID_Categorie == "5"){
        Image_a_mettre.src = "../image/sol.png"; //                    A changer pour la bonne image
    }
    if(ID_Categorie == "6"){
        Image_a_mettre.src = "../image/sol.png"; //                    A changer pour la bonne image
    }
    if(ID_Categorie == "7"){
        Image_a_mettre.src = "../image/sol.png"; //                    A changer pour la bonne image
    }
    if(ID_Categorie == "8"){
        Image_a_mettre.src = "../image/sol.png"; //                    A changer pour la bonne image
    }*/

    Div_Categorie_Secondaire.append(Image_a_mettre);
    Div_Categorie_Secondaire.addEventListener("click", function() {page(ID_Categorie)});
    const Div_Nom_Categorie = document.createElement("div");
    Div_Nom_Categorie.textContent = Nom_Categorie;
    Div_Categorie_Secondaire.append(Div_Nom_Categorie);
    Page_du_formulaire_a_remplir.append(Div_Categorie_Secondaire);
    const formulaire = document.getElementById("formulaire");
    formulaire.append(page_de_la_categorie_secondaire_a_inserer);

}

function Creation_de_page_des_categories_secondaires_du_questionnaire(){
    // -----------------  Creer la div contenant les differentes bulles -----------------------------
    const formulaire = document.getElementById("formulaire");
    for(var i=0;i<Categorie.length;i++){
        for(var j=0;j<Categorie[i]["Fils"].length;j++){
            const div_categorie_secondaire = document.createElement("div");
            div_categorie_secondaire.id = "page"+Categorie[i]["Fils"][j]["ID_Categorie"];
            div_categorie_secondaire.className = "page";
            formulaire.append(div_categorie_secondaire);
        }
    }
    // -----------------  Creer les différentes boutons pour les pages suivantes et precedentes -----
    // le numéro de page est le numéro de la categorie pour faciliter les connexions avec les boutons
}

function Ajouter_bouton_pour_Equipement(Description_Equipement,ID_Categorie_Equipement,ID_Equipement,Image_Equipement,Nom_Equipement){
    const page_du_formulaire_a_remplir = document.getElementById("page"+ID_Categorie_Equipement);
    const Div_equipement = document.createElement("div");
    Div_equipement.className = "Equipement";
    Div_equipement.id = "Equipement"+ID_Equipement;
    const Image_a_mettre = document.createElement("img");
    Image_a_mettre.className = "center";

    // A remplacer pour les futur noms d'image
    //Image_a_mettre.src = "image-"+ID_Categorie_Equipement+"-"+Image_Equipement;
    //en attendant
    Image_a_mettre.src = "../image/sol.png";
    const Nom_Equipement_ = document.createElement("div");
    Nom_Equipement_.className = "Nom_Equipement";
    Nom_Equipement_.id = "Nom_Equipement"+ID_Equipement;
    Nom_Equipement_.textContent = Nom_Equipement;

    Div_equipement.addEventListener("click", function(){ajouter_equipement_au_signalement(ID_Equipement);});

    Div_equipement.append(Image_a_mettre,Nom_Equipement_);
    page_du_formulaire_a_remplir.append(Div_equipement);

}

function ajouter_equipement_au_signalement(ID_Equipement){
    verif_deja_presente=0;
    var index_a_supprimer=0;
    for(var i=0;i<liste_equipement_defectueux.length;i++){
        if(liste_equipement_defectueux[i]["ID_Equipement"] == ID_Equipement){
            verif_deja_presente = 1;
            index_a_supprimer = i;
        }
    }

    if(verif_deja_presente==0){
        liste_equipement_defectueux.push({"ID_Equipement" : ID_Equipement});
        console.log(liste_equipement_defectueux);
    }
    if(verif_deja_presente == 1){
        liste_equipement_defectueux.splice(index_a_supprimer,1);
        console.log(liste_equipement_defectueux);
    }
    // ------------------------ Changer la couleur de la case pour que l'ajout au signalement soit visible ---------------------------------------
    // ------------------------ Ajouter l'ID de l'equipement au signalement pour apres pouvoir l'envoyer -------------------------------------------
}

async function gestion_de_lincidence(){
    // ajouter lincident a la base de donne et envoyer le mail au responsable
    var Parametre_ = "";
    var Arguments_ = "";
    for(var i=0;i<liste_equipement_defectueux.length;i++){
        if(i==0){
            Parametre_ = Parametre_ +"`"+ liste_equipement_defectueux[i]["ID_Equipement"]+"`";
            Arguments_ = Arguments_+"'1'";
        }
        else{
            Parametre_ = Parametre_ +",`"+ liste_equipement_defectueux[i]["ID_Equipement"]+"`";
            Arguments_ = Arguments_+", '1'";
        }
        
    }
    console.log(Parametre_);
    console.log(Arguments_);
    ajout_de_lincident_a_la_base_de_donne(info_Source[0]["ID_Etablissement"],info_Source[0]["ID_Signalement"], document.getElementById("commentaire").value,'0',Parametre_,Arguments_);
    const ID_Noeud = await recuperation_de_lid_noeud_du_signalement(info_Source[0]["ID_Signalement"],info_Source[0]["ID_Etablissement"]);
    const Nom_lieu_ = await recuperation_du_nom_du_lieu(ID_Noeud);
    var titre_du_mail_ = "Incident survenu à "+Nom_lieu_;

    
    var message_a_envoyer_ = "Hey!\n Un nouveau signalement à été envoyé concernant "+Nom_lieu_+"\n";
    for(var i=0;i<liste_equipement_defectueux.length;i++){
        for(var j=0;j<liste_associe_au_signalement.length;j++){
            if(liste_equipement_defectueux[i]["ID_Equipement"] == liste_associe_au_signalement[j]["ID_Equipement"]){
                message_a_envoyer_ = message_a_envoyer_ + "L'équipement " + liste_associe_au_signalement[j]["Nom_Equipement"] + " rencontrent un probleme.\n";
            }
        }
    }
    console.log("titre_du_mail = "+ titre_du_mail_);
    console.log("message = "+message_a_envoyer_);

    domaine_de_moderation.push({"ID_Noeud" : ID_Noeud[0]});
    await recursive_domaine_de_moderation(ID_Noeud);
    console.log(domaine_de_moderation);

    for(var i=0;i<domaine_de_moderation.length;i++){
        envoi_du_mail_aux_administrateurs_concerne(domaine_de_moderation[i]["ID_Noeud"],info_Source[0]["ID_Etablissement"],titre_du_mail_,message_a_envoyer_);
    }
    
}

async function ajout_de_lincident_a_la_base_de_donne(ID_Etablissement,ID_Signalement,Commentaire_signalement,ID_Utilisateur,Parametre,Argument){
    await fetch("http://hurflym.fr/ajout_incident.php?ID_Etablissement="+ID_Etablissement+"&Parametre="+Parametre+"&Arguments="+Argument+"&ID_Signalement="+ID_Signalement+"&Commentaire_Signalement="+Commentaire_signalement+"&ID_Utilisateur="+ID_Utilisateur).then(res => res.json()).then(data => {return data;});
}

async function recuperation_de_lid_noeud_du_signalement(ID_Signalement,ID_Etablissement){
    return await fetch("http://hurflym.fr/recup_ID_noeud_signalement.php?ID_Signalement="+ID_Signalement+"&ID_Etablissement="+ID_Etablissement).then(res => res.json()).then(data => {return data;});
}

async function recuperation_du_nom_du_lieu(ID_Noeud){
    return await fetch("http://hurflym.fr/recup_nom_element.php?ID_Noeud="+ID_Noeud).then(res => res.json()).then(data => {return data;});
}

let domaine_de_moderation = [];

async function recursive_domaine_de_moderation(ID_Noeud){
    const element_parent = await fetch("http://hurflym.fr/recup_noeud_parent.php?ID_Noeud="+ ID_Noeud).then(res => res.json()).then(data => {return data;});
	if(element_parent.length > 0){
        verif_deja_presente=0;
        for(var i=0;i<domaine_de_moderation.length;i++){
            if(domaine_de_moderation[i]["ID_Noeud"] == element_parent[0]){
                verif_deja_presente=1;
            }
        }
        if(verif_deja_presente==0){
            domaine_de_moderation.push({"ID_Noeud" : element_parent[0]});
		    await recursive_domaine_de_moderation(element_parent[0]);
        }
        
	}
}

async function envoi_du_mail_aux_administrateurs_concerne(ID_Noeud,ID_Etablissement,titre_du_mail,message_a_envoyer){
    alert(await fetch("http://hurflym.fr/envoi_du_mail_a_ladministrateur.php?ID_Noeud="+ID_Noeud+"&ID_Etablissement="+ID_Etablissement+"&message="+message_a_envoyer+"&titre_du_mail="+titre_du_mail).then(res => res.json()).then(data => {return data;}));
}



// --------------------------------------------------------- Fonctions de navigation dans le formulaire --------------------------------------------

/**
 * Cette fonction fait avancer le formulaire d'une page
 */
 function page(numero_de_page){
    // On masque toutes les pages
    pages = document.querySelectorAll(".page");
    for(let page of pages){
        page.style.display = "none"
    }
    document.getElementById("page"+numero_de_page).style.display = "initial";
}

function Ajouter_bouton_pour_la_categorie_principale(ID_Categorie){
    const page_du_formulaire = document.getElementById("page"+ID_Categorie);
    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton_categorie_principal";
    const Bouton_precedent = document.createElement("div");
    Bouton_precedent.className = "bouton";
    Bouton_precedent.addEventListener("click", function(){page('1')});
    Bouton_precedent.textContent = "Precedent";
    menu_bouton.append(Bouton_precedent);
    page_du_formulaire.append(menu_bouton);
}

function Ajouter_bouton_pour_la_categorie_secondaire(ID_Categorie, ID_Categorie_Prec){
    const page_du_formulaire = document.getElementById("page"+ID_Categorie);
    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton_categorie_secondaire";
    const Bouton_precedent = document.createElement("div");
    Bouton_precedent.className = "bouton";
    Bouton_precedent.addEventListener("click", function(){page(ID_Categorie_Prec)});
    Bouton_precedent.textContent = "Precedent";
    const Bouton_Suivant = document.createElement("div");
    Bouton_Suivant.className = "bouton";
    Bouton_Suivant.addEventListener("click", function(){ page('26')});
    Bouton_Suivant.textContent = "Suivant";
    menu_bouton.append(Bouton_precedent,Bouton_Suivant);
    page_du_formulaire.append(menu_bouton);
}

function Ajouter_bouton_pour_revenir_au_menu(){
    const page_du_formulaire = document.getElementById("page26");
    const menu_bouton = document.createElement("div");
    const Bouton_precedent = document.createElement("div");
    Bouton_precedent.className = "bouton";
    Bouton_precedent.addEventListener("click", function(){page('1')});
    Bouton_precedent.textContent = "Precedent";
    menu_bouton.append(Bouton_precedent);
    page_du_formulaire.append(menu_bouton);
}