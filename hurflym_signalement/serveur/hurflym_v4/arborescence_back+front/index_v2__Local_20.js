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
let Info_personalisation;


let Information_equipement_present_dans_le_signalement = [];
let Categorie_mise_en_place = [];


let liste_equipement_defectueux = [];

let info_ep;

//                                                      Lecture de cookie par MDN

// Pour la demo pitch entrepreneur
/*let email = document.cookie.split('; ').find(row => row.startsWith('mail_utilisateur_hurflym=')).split('=')[1];
email = email.replace(/%40/g, "@");*/


//-----------------------------------Creation de parties html type-------------------------------------------




//---------------------------------------------------------------------------------------------------------------

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
    for(let page of pages){
        page.style.display = "none";
    }
    
    //document.querySelector(".page").style.display = "initial";

    ID_Source = $_GET('ID_Source');

    


    // On gère les boutons "suivant"
    let boutons = document.querySelectorAll(".next");

    for(let bouton of boutons){
        bouton.addEventListener("click", page2);
    }

    boutons = document.querySelectorAll(".next_2");

    for(let bouton of boutons){
        bouton.addEventListener("click", page3);
    }
    document.getElementById("page1").style.display = "initial";
    connexion();

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
    console.log(info_Source);
    if(info_Source[0]["ID_Signalement"] != '0'){
        //verif signalement actif ou non
        var activation = await recup_activation_signalement();
        if(activation[0]["activation"] == '1'){
            await recup_liste_equipement_signalement(info_Source);
            await request_categorie();
            await recup_information_personalisation(info_Source[0]["ID_Etablissement"]);
            Separer_les_informations_qui_ne_sont_pas_dans_le_signalement();
            Mise_en_place_des_categories_du_signalement();
            //recuperation_info_utilisateur(email);
        }
    }
    else{
        //verif activation signalement particulier
        var activation = recup_activation_equipement_particulier();
        if(activation[0]["activation"] == "1"){
            await recup_info_ep(info_Source);
            await recup_information_personalisation(info_Source[0]["ID_Etablissement"]);
            //recuperation_info_utilisateur(email);
            Mise_en_place_info_Ep();
        }
        
    }
    
}

async function recup_activation_signalement(){
    return await fetch("http://hurflym.fr/arborescence_back+front/recup_activation_signalement.php?ID_Signalement="+info_Source[0]["ID_Signalement"]+"&ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
}

async function recup_activation_equipement_particulier(){
    return await fetch("http://hurflym.fr/arborescence_back+front/recup_activation_ep.php?ID_Ep="+info_Source[0]["ID_Ep"]+"&ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
}

async function recup_info_ep(info_Source){
    info_ep = await fetch("http://hurflym.fr/arborescence_back+front/recup_ep_en_particulier.php?ID_Ep="+info_Source[0]["ID_Ep"]).then(res => res.json()).then(data => {return data;});

}

async function recuperation_info_utilisateur(email){
    info_utilisateur = await fetch("http://hurflym.fr/arborescence_back+front/recup_info_utilisateur.php?email="+email).then(res => res.json()).then(data => {return data;});

}

async function recup_information_signalement(ID_Source){
    info_Source = await fetch("http://hurflym.fr/arborescence_back+front/recup_info_source.php?ID_Source="+ID_Source).then(res => res.json()).then(data => {return data;});
}

async function recup_liste_equipement_signalement(info_Source){
    liste_associe_au_signalement = await fetch("http://hurflym.fr/arborescence_back+front/recup_liste_complete_associe_au_signalement.php?ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
    liste_equipement_signalement = await fetch("http://hurflym.fr/arborescence_back+front/recup_index_signalement.php?ID_Signalement="+info_Source[0]["ID_Signalement"]+"&ID_Etablissement="+info_Source[0]["ID_Etablissement"]).then(res => res.json()).then(data => {return data;});
}

async function request_categorie(){
	Categorie = await fetch("http://hurflym.fr/arborescence_back+front/recup_categorie.php").then(res => res.json()).then(data => {return data;});
	proprete = Categorie[0];
	informatique = Categorie[1];
	manutention = Categorie[2];
	appareil = Categorie[3];
}

async function recup_information_personalisation(ID_Etablissement){

    //
    Info_personalisation = await fetch("http://hurflym.fr/arborescence_back+front/recup_info_personalisation.php?ID_Source="+ID_Source+"&ID_Etablissement="+ID_Etablissement).then(res => res.json()).then(data => {return data;});
    const logo_a_changer = document.getElementById("logo_1");

    var r  = document.querySelector(':root');
    r.style.setProperty('--couleur-de-fond', Info_personalisation[0]["Couleur_de_fond"]);
    r.style.setProperty('--couleur-de-case', Info_personalisation[0]["Couleur_de_case"]);
    r.style.setProperty('--couleur-dombre_de_case', Info_personalisation[0]["Couleur_dombre_de_case"]);
    r.style.setProperty('--couleur-ecriture', Info_personalisation[0]["Couleur_ecriture"]);
    r.style.setProperty('--couleur-bouton', Info_personalisation[0]["Couleur_bouton"]);
    r.style.setProperty('--couleur-bouton-ecriture', Info_personalisation[0]["Couleur_bouton_ecriture"]);
    r.style.setProperty('--couleur-de-lombre-du-bouton', Info_personalisation[0]["Couleur_de_lombre_du_bouton"]);
    //logo_a_changer.src = "data:image/png;base64,"+ Info_personalisation[0];
    //logo_a_changer.src = Info_personalisation[0];
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
        if(Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"] != ''){
            Ajouter_bouton_pour_Equipement(Information_equipement_present_dans_le_signalement[i]["Description_Equipement"],Information_equipement_present_dans_le_signalement[i]["ID_Categorie_Equipement"], Information_equipement_present_dans_le_signalement[i]["ID_Equipement"], Information_equipement_present_dans_le_signalement[i]["Image_Equipement"], Information_equipement_present_dans_le_signalement[i]["Nom_Equipement"]);
        }
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
            if(Categorie_mise_en_place[i]["ID_Categorie_Prec"] != undefined){
                Ajouter_bouton_pour_la_categorie_principale(parseInt(Categorie_mise_en_place[i]["ID_Categorie_Prec"])+1);
            }
            
        }


        verif_deja_presente=0;
        for(var j=0;j<Categorie_secondaire_presente.length;j++){
            if(Categorie_mise_en_place[i]["ID_Categorie_Prec"] == Categorie_secondaire_presente[j]["ID_Categorie"]){
                verif_deja_presente = 0;
            }
        }
        if(verif_deja_presente==0){
            Categorie_secondaire_presente.push({"ID_Categorie" : Categorie_mise_en_place[i]["ID_Categorie_Prec"]});
            if(Categorie_mise_en_place[i]["ID_Categorie_Prec"] != undefined){
                Ajouter_bouton_pour_la_categorie_secondaire(Categorie_mise_en_place[i]["ID_Categorie"],parseInt(Categorie_mise_en_place[i]["ID_Categorie_Prec"])+1);
            }
            
        }
        
    }

    //Ajouter_bouton_pour_revenir_au_menu();
}

function Ajouter_Categorie_Primaire(Nom_Categorie_Primaire){

    const Page_du_formulaire_a_remplir = document.getElementById("page1");
    const Bouton_Categorie_Primaire = document.createElement("button");
    Bouton_Categorie_Primaire.type = "button";
    Bouton_Categorie_Primaire.className = "Categorie_Primaire";

    if(Nom_Categorie_Primaire == "propreté"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/categorie_principale_1.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('2');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Div_Nom_Categorie.className = "description";
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "informatique"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/categorie_principale_2.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_2");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('3');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Div_Nom_Categorie.className = "description";
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "manutention"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/categorie_principale_3.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_3");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('4');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Div_Nom_Categorie.className = "description";
        Bouton_Categorie_Primaire.append(Div_Nom_Categorie);
        Page_du_formulaire_a_remplir.append(Bouton_Categorie_Primaire);
    }
    if(Nom_Categorie_Primaire == "appareil"){
        const Image_a_mettre = document.createElement("img");
        Image_a_mettre.className = "center";
        Image_a_mettre.src = "../image/categorie_principale_4.png";
        Bouton_Categorie_Primaire.append(Image_a_mettre);
        Bouton_Categorie_Primaire.classList.add("next_4");
        Bouton_Categorie_Primaire.addEventListener("click", function() {page('5');});
        const Div_Nom_Categorie = document.createElement("div");
        Div_Nom_Categorie.textContent = Nom_Categorie_Primaire;
        Div_Nom_Categorie.className = "description";
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
    Div_Categorie_Secondaire.className = "Categorie_Secondaire";

    const Image_a_mettre = document.createElement("img");
    Image_a_mettre.className = "center";
    Image_a_mettre.src = "../image/categorie_secondaire_"+ID_Categorie+".png";

    Div_Categorie_Secondaire.append(Image_a_mettre);
    Div_Categorie_Secondaire.addEventListener("click", function() {page(ID_Categorie)});
    const Div_Nom_Categorie = document.createElement("div");
    Div_Nom_Categorie.textContent = Nom_Categorie;
    Div_Nom_Categorie.className = "description";
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
    Image_a_mettre.src = "../image/equipement_"+ID_Categorie_Equipement+"_1.png";
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
    var r  = document.querySelector(':root');
    if(verif_deja_presente==0){
        liste_equipement_defectueux.push({"ID_Equipement" : ID_Equipement});
        document.getElementById("Equipement"+ID_Equipement).style.background = r.style.getPropertyValue('--couleur-bouton');
    }
    if(verif_deja_presente == 1){
        liste_equipement_defectueux.splice(index_a_supprimer,1);
        document.getElementById("Equipement"+ID_Equipement).style.background = r.style.getPropertyValue("--couleur-de-fond");
    }
    // ------------------------ Changer la couleur de la case pour que l'ajout au signalement soit visible ---------------------------------------
    // ------------------------ Ajouter l'ID de l'equipement au signalement pour apres pouvoir l'envoyer -------------------------------------------
}

async function gestion_de_lincidence(){
    // ajouter lincident a la base de donne et envoyer le mail au responsable

    page('27');
    //demo printemps_entrepreneur
    /*
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
    
    // Vérifier que le Recup_Signalement soit cohérent avec l'analyse de Ben Ford
    var validation = await Verification_du_signalement_parloi_de_Ben_Ford(liste_equipement_defectueux.length);
    console.log(validation);
    // Si c'est validé alors créé un pépin par equipement du signalement
    if(validation[0]['validation'] == "true"){

        // créé une ligne Recup_Signalement"etablissement" et lui mettre les parametres du signalement
        //var ID_Recup = await Creation_recup_incident(info_Source[0]["ID_Etablissement"],info_Source[0]["ID_Signalement"], document.getElementById("commentaire").value,info_utilisateur[1]["ID_Utilisateur"],Parametre_,Arguments_);
        
        // Creation d'un pépin pour chaque equipement
        for(var i=0;i<liste_equipement_defectueux.length;i++){
           console.log(await creation_pepin_par_equipement(liste_equipement_defectueux[i]["ID_Equipement"],info_Source[0]["ID_Etablissement"],info_Source[0]["ID_Signalement"], document.getElementById("commentaire").value,info_utilisateur[1]["ID_Utilisateur"]));
        }
        
        // pour chaque pépin faire une vérification de l'utilisateur et des pépin précédent pour annoncer l'incident ou non
        //première verif -> Incident en cours ou non
        // Si non -> On regarde la ficailité de l'utilisateur et on prends une décision
        // Si oui -> On rattacahe le pépin à l'incident
        console.log(info_utilisateur[1]["ID_Utilisateur"]);
        console.log(info_Source[0]["ID_Etablissement"]);
        var incident = [];
        for(var i=0;i<liste_equipement_defectueux.length;i++){
            incident[i] = await lancement_du_script_de_verif_incident_et_utilisateur(info_utilisateur[1]["ID_Utilisateur"], info_Source[0]["ID_Etablissement"],liste_equipement_defectueux[i]["ID_Equipement"]);
        }
        console.log(incident);
        if(incident[0]["validation"] == "true"){
            const ID_Noeud = await recuperation_de_lid_noeud_du_signalement(info_Source[0]["ID_Signalement"], info_Source[0]["ID_Etablissement"]);   // a changer c'est senser etre unID_Noeud et non pas un ID_Incident ici
            const Nom_lieu_ = await recuperation_du_nom_du_lieu(ID_Noeud);
            var titre_du_mail_ = "Incident survenu à "+ Nom_lieu_;

    
            var message_a_envoyer_ = "Hey!\n Un nouveau signalement à été envoyé concernant "+Nom_lieu_+"\n";
            for(var i=0;i<liste_equipement_defectueux.length;i++){
                for(var j=0;j<liste_associe_au_signalement.length;j++){
                    if(liste_equipement_defectueux[i]["ID_Equipement"] == liste_associe_au_signalement[j]["ID_Equipement"]){
                        message_a_envoyer_ = message_a_envoyer_ + "L'équipement " + liste_associe_au_signalement[j]["Nom_Equipement"] + " rencontrent un probleme.\n";
                    }
                }
            }


            domaine_de_moderation.push({"ID_Noeud" : ID_Noeud[0]});
            console.log(ID_Noeud[0]);
            await recursive_domaine_de_moderation(ID_Noeud);


            for(var i=0;i<domaine_de_moderation.length;i++){
                envoi_du_mail_aux_administrateurs_concerne(domaine_de_moderation[i]["ID_Noeud"],info_Source[0]["ID_Etablissement"],titre_du_mail_,message_a_envoyer_);
            }
            console.log("le mail est partit...");
        }
        // Annoncer l'incident.
        
    }
    else{
        // signalement incorrect
    }
    */
    
}

async function ajout_de_lincident_a_la_base_de_donne(ID_Etablissement,ID_Signalement,Commentaire_signalement,ID_Utilisateur,Parametre,Argument){

    await fetch("http://hurflym.fr/arborescence_back+front/ajout_incident.php?ID_Etablissement="+ID_Etablissement+"&Parametre="+Parametre+"&Arguments="+Argument+"&ID_Signalement="+ID_Signalement+"&Commentaire_Signalement="+Commentaire_signalement+"&ID_Utilisateur="+ID_Utilisateur).then(res => res.json()).then(data => {return data;});
}

async function Creation_recup_incident(ID_Etablissement,ID_Signalement,Commentaire_signalement,ID_Utilisateur,Parametre,Argument){
    return await fetch("http://hurflym.fr/arborescence_back+front/ajout_recup_incident.php?ID_Etablissement="+ID_Etablissement+"&Parametre="+Parametre+"&Arguments="+Argument+"&ID_Signalement="+ID_Signalement+"&Commentaire_Signalement="+Commentaire_signalement+"&ID_Utilisateur="+ID_Utilisateur).then(res => res.json()).then(data => {return data;});
}

async function Verification_du_signalement_parloi_de_Ben_Ford(nombre_de_signalements){
    return await fetch("http://hurflym.fr/arborescence_back+front/script_analyse_de_ben_ford.php?nombre_dequipement="+nombre_de_signalements).then(res => res.json()).then(data => {return data;});
}

async function creation_pepin_par_equipement(equipement_defectueux,ID_Etablissement,ID_Signalement,Commentaire_signalement,ID_Utilisateur){
    return await fetch("http://hurflym.fr/arborescence_back+front/ajout_pepin.php?ID_Equipement="+equipement_defectueux+"&ID_Etablissement="+ID_Etablissement+"&ID_Signalement="+ID_Signalement+"&Commentaire_Signalement="+Commentaire_signalement+"&ID_Utilisateur="+ID_Utilisateur).then(res => res.json()).then(data => {return data;});
}

async function recuperation_de_pepins_de_lutilisateur(ID_Utilisateur){
    await fetch("http://hurflym.fr/arborescence_back+front/recherche_pepin.php?ID_Utilisateur="+ID_Utilisateur).then(res => res.json()).then(data => {return data;});
}

async function lancement_du_script_de_verif_incident_et_utilisateur(ID_Utilisateur, ID_Etablissement, ID_Equipement){
    return await fetch("http://hurflym.fr/arborescence_back+front/verif_incident_et_utilisateur.php?ID_Utilisateur="+ID_Utilisateur+"&ID_Etablissement="+ID_Etablissement+"&ID_Equipement="+ID_Equipement).then(res => res.json()).then(data => {return data;});
}



async function recuperation_de_lid_noeud_du_signalement(ID_Signalement,ID_Etablissement){
    return await fetch("http://hurflym.fr/arborescence_back+front/recup_ID_noeud_signalement.php?ID_Signalement="+ID_Signalement+"&ID_Etablissement="+ID_Etablissement).then(res => res.json()).then(data => {return data;});
}

async function recuperation_du_nom_du_lieu(ID_Noeud){
    return await fetch("http://hurflym.fr/arborescence_back+front/recup_nom_element.php?ID_Noeud="+ID_Noeud).then(res => res.json()).then(data => {return data;});
}

let domaine_de_moderation = [];

async function recursive_domaine_de_moderation(ID_Noeud){
    const element_parent = await fetch("http://hurflym.fr/arborescence_back+front/recup_noeud_parent.php?ID_Noeud="+ ID_Noeud).then(res => res.json()).then(data => {return data;});
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
    await fetch("http://hurflym.fr/arborescence_back+front/envoi_du_mail_a_ladministrateur.php?ID_Noeud="+ID_Noeud+"&ID_Etablissement="+ID_Etablissement+"&message="+message_a_envoyer+"&titre_du_mail="+titre_du_mail).then(res => res.json()).then(data => {return data;});
    page(27);
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
    console.log("page"+ID_Categorie);
    const page_du_formulaire = document.getElementById("page"+ID_Categorie);
    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton_categorie_principal";
    const Bouton_precedent = document.createElement("div");
    Bouton_precedent.className = "bouton";
    Bouton_precedent.classList.add("button2");
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
    Bouton_precedent.classList.add("button2");
    Bouton_precedent.addEventListener("click", function(){page(ID_Categorie_Prec)});
    Bouton_precedent.textContent = "Precedent";
    const Bouton_Suivant = document.createElement("div");
    Bouton_Suivant.className = "bouton";
    Bouton_Suivant.classList.add("button4");
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
    Bouton_precedent.classList.add("button2");
    Bouton_precedent.addEventListener("click", function(){page('1')});
    Bouton_precedent.textContent = "Precedent";
    menu_bouton.append(Bouton_precedent);
    page_du_formulaire.append(menu_bouton);
}


function Mise_en_place_info_Ep(){
    const page = document.getElementById("page1");

    const consigne = document.getElementById("consigne");
    consigne.textContent = "Compléter le champs libre ou mettez une image du problème pour le signaler";

    


    const Div_ep = document.createElement("div");
    Div_ep.className = "Ep";
    Div_ep.id = "Ep"+info_Source[0]["ID_Ep"];
    const image = document.createElement("img");
    image.src = "../image/equipement_"+info_ep[0]["ID_Categorie_Equipement"]+"_1.png"//+
    image.className = "center";

    const nom_ep = document.createElement("div");
    nom_ep.textContent = info_ep[0]["Nom_Ep"];
    nom_ep.id = "Nom_Ep"+info_Source[0]["ID_Ep"];
    nom_ep.className = "Nom_Ep";


    

    const input_commentaire = document.createElement("input");
    input_commentaire.type = "text";
    input_commentaire.id= "commentaire_ep";
    input_commentaire.name = "commentaire_ep";
    
    const input_image = document.createElement("input");
    input_image.type = "file";
    input_image.id = "image_ep";
    input_image.name = "image_ep";
    input_image.accept = "image/png, image/jpeg";

    const bouton_envoyer = document.createElement("div");
    bouton_envoyer.textContent = "Envoyer !";
    bouton_envoyer.className = "button";
    bouton_envoyer.classList.add("button2");
    bouton_envoyer.addEventListener("click", function() {verif_puis_envoie_de_mail_ep()});

    Div_ep.append(image,nom_ep);
    page.append(Div_ep, input_commentaire, input_image, bouton_envoyer);

}

async function verif_puis_envoie_de_mail_ep(){
    const commentaire = document.getElementById("commentaire_ep").value;
    const file = document.getElementById("image_ep").value;

    if( commentaire != ""){
        await envoie_du_mail_et_ajout_base_de_donnee_ep(commentaire);
        const page = document.getElementById("page1");
        var first = page.children[1];
        while (first) {
            first.remove();
            first = page.children[1];
        }
        const remerciement = document.createElement("div");
        remerciement.textContent = "Merci de votre signalement !";
        remerciement.id = "remerciement";
        page.append(remerciement);
    }
    else{
        var avertissement = document.getElementById("avertissement");
        if(avertissement == null){
            avertissement = document.createElement("div");
            avertissement.textContent = "Veuillez un commentaire ou mettre une photo.";
            avertissement.id = "avertissement";
        }
    }

}

async function envoie_du_mail_et_ajout_base_de_donnee_ep(Commentaire_ep){
    await fetch("http://hurflym.fr/arborescence_back+front/ajout_incident_ep.php?&ID_Ep="+info_Source[0]["ID_Ep"]+"&Commentaire_Ep="+Commentaire_ep+"&ID_Utilisateur="+info_utilisateur[1]["ID_Utilisateur"]).then(res => res.json()).then(data => {return data;});
    //await fetch("http://hurflym.fr/arborescence_back+front/envoi_du_mail_a_ladministrateur_ep.php?ID_Noeud="+ID_Noeud+"&ID_Etablissement="+ID_Etablissement+"&message="+message_a_envoyer+"&titre_du_mail="+titre_du_mail).then(res => res.json()).then(data => {return data;});
}



  
  
