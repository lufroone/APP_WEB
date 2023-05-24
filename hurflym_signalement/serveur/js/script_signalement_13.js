// On va chercher les différents éléments de notre page
const pages = document.querySelectorAll(".page")
const nbPages = pages.length // Nombre de pages du formulaire
//let pageActive = 1
let toilette_sale = 0
let papier_toilette = 0
let chasse_deau = 0
let lampe_toilette = 0

let sol_sale = 0
let porte_casse = 0
let lampe_espace_deau = 0

let seche_main = 0
let lavabo_sale = 0
let plus_de_savon = 0
let robinet_casse = 0
let sopalin = 0
let miroir_sale = 0


let Projecteur_en_panne = 0;
let Micro_casse = 0;
let Manque_cable_HDMI = 0;
let Pc_casse = 0;

let Liquide_renverse = 0;
let Tache = 0;

let Manque_de_feutre = 0;
let Objet_oublie = 0;
let Chaise_casse = 0;

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
    document.querySelector(".page").style.display = "initial"
    

    // On gère les boutons "suivant"
    let boutons = document.querySelectorAll(".next")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageSuivante)
    }

    boutons = document.querySelectorAll(".next_2")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageSuivante)
    }

    // je gère le bouton pour la page 5;
    boutons = document.querySelectorAll(".next_4")

    for(let bouton of boutons){
        bouton.addEventListener("click", page4)
    }

    boutons = document.querySelectorAll(".next_4_2")

    for(let bouton of boutons){
        bouton.addEventListener("click", page4)
    }

    boutons = document.querySelectorAll(".next_3_2")

    for(let bouton of boutons){
        bouton.addEventListener("click", page4)
    }

    boutons = document.querySelectorAll(".next_3")

    for(let bouton of boutons){
        bouton.addEventListener("click", page3)
    }


    // On gère les boutons "suivant"
    boutons = document.querySelectorAll(".prev")

    for(let bouton of boutons){
        bouton.addEventListener("click", pagePrecedente)
    }

    boutons = document.querySelectorAll(".prev_4")

    for(let bouton of boutons){
        bouton.addEventListener("click", pagePrecedente_4)
    }

    boutons = document.querySelectorAll(".prev_3")

    for(let bouton of boutons){
        bouton.addEventListener("click", pagePrecedente_3)
    }

    boutons = document.querySelectorAll(".envoi_2")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageRemerciement_2)
    }

    boutons = document.querySelectorAll(".envoi_3")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageRemerciement_3)
    }

    boutons = document.querySelectorAll(".envoi_4")

    for(let bouton of boutons){
        bouton.addEventListener("click", pageRemerciement_4)
    }
}

/**
 * Cette fonction fait avancer le formulaire d'une page
 */
function pageSuivante(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.style.display = "initial"


}

function pageRemerciement_4(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.style.display = "initial"
}

function pageRemerciement_3(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = "initial"
}

function pageRemerciement_2(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.style.display = "initial"

}

function page4(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "initial"
    

}

function page3(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = "initial"



}


function pagePrecedente(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.previousElementSibling.style.display = "initial"
}

function pagePrecedente_4(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "initial"
}

function pagePrecedente_3(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.previousElementSibling.previousElementSibling.style.display = "initial"
}

function ouvre_longlet_connexion_responsable(){
    let bloc = document.createElement("form")
    bloc.action = ""
    bloc.method="POST"
    let br = document.createElement("br");
    let label_username = document.createElement("label")
    let input_username = document.createElement("input")
    let label_mot_de_passe = document.createElement("label")
    let input_mot_de_passe = document.createElement("input")
    input_mot_de_passe.type = "password"
    input_username.type = "text"
    input_mot_de_passe.name = "mot_de_passe_responsable"
    input_mot_de_passe.id = "mot_de_passe_responsable"
    input_username.name = "username_responsable"
    input_username.id = "username_responsable"
    label_username.textContent = "Veuillez rentrer votre username :"
    label_mot_de_passe.textContent ="Veuillez rentrer votre mot de passe :"
    let button = document.createElement("button")
    button.textContent = "Déclaré comme fait"
    

    bloc.append(label_username,input_username,br,label_mot_de_passe,input_mot_de_passe,br,button)

    let element_a_supp = document.querySelector(".a_supp");
    
    let introduction = document.querySelector('.introduction');
    introduction.removeChild(element_a_supp);
    let bloc_a_supp = document.querySelector("main");
    let body = document.querySelector("body");
    body.removeChild(bloc_a_supp);

    introduction.appendChild(bloc);
}

function toilette_sale_f(){
    let el = document.getElementById("toilette_sale");
    if(toilette_sale == 1){
        toilette_sale = 0;
        el.className = "blob_1_invalide";
        return toilette_sale;
    }
    if(toilette_sale == 0){
        toilette_sale = 1;
        el.className = "blob_1_valide";
        return toilette_sale;
    }
}

function papier_toilette_f(){
    let el = document.getElementById("papier_toilette");
    if(papier_toilette == 1){
        papier_toilette = 0;
        el.className = "blob_2_invalide";
        return papier_toilette;
    }
    if(papier_toilette == 0){
        papier_toilette = 1;
        el.className = "blob_2_valide";
        return papier_toilette;
    }
}

function chasse_deau_f(){
    let el = document.getElementById("chasse_deau");
    if(chasse_deau == 1){
        chasse_deau = 0;
        el.className = "blob_4_invalide";
        //el.style.backgroundColor = '#222568';
        return chasse_deau;
    }
    if(chasse_deau == 0){
        chasse_deau = 1;
        el.className = "blob_4_valide";
        //el.style.backgroundColor = '#E030BB';
        return chasse_deau;
    }
}

function lampe_toilette_f(){
    let el = document.getElementById("lampe_toilette");
    if(lampe_toilette == 1){
        lampe_toilette = 0;
        el.className = "blob_3_invalide";
        return lampe_toilette;
    }
    if(lampe_toilette == 0){
        lampe_toilette = 1;
        el.className = "blob_3_valide";
        return lampe_toilette;
    }
}

function sol_sale_f(){
    let el = document.getElementById("sol_sale");
    if(sol_sale == 1){
        sol_sale = 0;
        el.className = "blob_5_invalide";
        return sol_sale;
    }
    if(sol_sale == 0){
        sol_sale = 1;
        el.className = "blob_5_valide";
        return sol_sale;
    }
}



function porte_casse_f(){
    let el = document.getElementById("porte_casse");
    if(porte_casse == 1){
        porte_casse = 0;
        el.className = "blob_6_invalide";
        return porte_casse;
    }
    if(porte_casse == 0){
        porte_casse = 1;
        el.className = "blob_6_valide";
        return porte_casse;
    }
}

function lampe_espace_deau_f(){
    let el = document.getElementById("lampe_espace_deau");
    if(lampe_espace_deau == 1){
        lampe_espace_deau = 0;
        el.className = "blob_7_invalide";
        return lampe_espace_deau;
    }
    if(lampe_espace_deau == 0){
        lampe_espace_deau = 1;
        el.className = "blob_7_valide";
        return lampe_espace_deau;
    }
}

function lavabo_sale_f(){
    let el = document.getElementById("lavabo_sale");
    if(lavabo_sale == 1){
        lavabo_sale = 0;
        el.className = "blob_8_invalide";
        return lavabo_sale;
    }
    if(lavabo_sale == 0){
        lavabo_sale = 1;
        el.className = "blob_8_valide";
        return lavabo_sale;
    }
}

function plus_de_savon_f(){
    let el = document.getElementById("plus_de_savon");
    if(plus_de_savon == 1){
        plus_de_savon = 0;
        el.className = "blob_9_invalide";
        return plus_de_savon;
    }
    if(plus_de_savon == 0){
        plus_de_savon = 1;
        el.className = "blob_9_valide";
        return plus_de_savon;
    }
}

function seche_main_f(){
    let el = document.getElementById("seche_main");
    if(seche_main == 1){
        seche_main = 0;
        el.className = "blob_10_invalide";
        return seche_main;
    }
    if(seche_main == 0){
        seche_main = 1;
        el.className = "blob_10_valide";
        return seche_main;
    }
}

function robinet_casse_f(){
    let el = document.getElementById("robinet_casse");
    if(robinet_casse == 1){
        robinet_casse = 0;
        el.className = "blob_11_invalide";
        return robinet_casse;
    }
    if(robinet_casse == 0){
        robinet_casse = 1;
        el.className = "blob_11_valide";
        return robinet_casse;
    }
}

function miroir_sale_f(){
    let el = document.getElementById("miroir_sale");
    if(miroir_sale == 1){
        miroir_sale = 0;
        el.className = "blob_12_invalide";
        return miroir_sale;
    }
    if(miroir_sale == 0){
        miroir_sale = 1;
        el.className = "blob_12_valide";
        return miroir_sale;
    }
}

function sopalin_f(){
    let el = document.getElementById("sopalin");
    if(sopalin == 1){
        sopalin = 0;
        el.className = "blob_13_invalide";
        return sopalin;
    }
    if(sopalin == 0){
        sopalin = 1;
        el.className = "blob_13_valide";
        return sopalin;
    }
}


function mise_en_URL(){
    let element = document.getElementById("commentaire");
    commentaire = element.value;
    window.location.href = window.location.search + "&toilette_sale=" + toilette_sale + "&papier_toilette=" + papier_toilette + "&chasse_deau=" + chasse_deau + "&lampe_toilette=" + lampe_toilette + "&sol_sale=" + sol_sale  + "&porte_casse=" + porte_casse + "&lampe_espace_deau=" + lampe_espace_deau + "&lavabo_sale=" + lavabo_sale + "&plus_de_savon=" + plus_de_savon + "&miroir_sale=" + miroir_sale + "&robinet_casse=" + robinet_casse + "&seche_main=" + seche_main + "&sopalin=" + sopalin + "&commentaire=" + commentaire;
}

function Projecteur_en_panne_f(){
    let el = document.getElementById("Projecteur_en_panne");
    if(Projecteur_en_panne == 1){
        Projecteur_en_panne = 0;
        el.className = "blob_8_invalide";
        return Projecteur_en_panne;
    }
    if(Projecteur_en_panne == 0){
        Projecteur_en_panne = 1;
        el.className = "blob_8_valide";
        return Projecteur_en_panne;
    }
}

function Micro_casse_f(){
    let el = document.getElementById("Micro_casse");
    if(Micro_casse == 1){
        Micro_casse = 0;
        el.className = "blob_2_invalide";
        return Micro_casse;
    }
    if(Micro_casse == 0){
        Micro_casse = 1;
        el.className = "blob_2_valide";
        return Micro_casse;
    }
}

function Manque_cable_HDMI_f(){
    let el = document.getElementById("Manque_cable_HDMI");
    if(Manque_cable_HDMI == 1){
        Manque_cable_HDMI = 0;
        el.className = "blob_3_invalide";
        return Manque_cable_HDMI;
    }
    if(Manque_cable_HDMI == 0){
        Manque_cable_HDMI = 1;
        el.className = "blob_3_valide";
        return Manque_cable_HDMI;
    }
}

function Pc_casse_f(){
    let el = document.getElementById("Pc_casse");
    if(Pc_casse == 1){
        Pc_casse = 0;
        el.className = "blob_4_invalide";
        return Pc_casse;
    }
    if(Pc_casse == 0){
        Pc_casse = 1;
        el.className = "blob_4_valide";
        return Pc_casse;
    }
}

function Liquide_renverse_f(){
    let el = document.getElementById("Liquide_renverse");
    if(Liquide_renverse == 1){
        Liquide_renverse = 0;
        el.className = "blob_5_invalide";
        return Liquide_renverse;
    }
    if(Liquide_renverse == 0){
        Liquide_renverse = 1;
        el.className = "blob_5_valide";
        return Liquide_renverse;
    }
}

function Tache_f(){
    let el = document.getElementById("Tache");
    if(Tache == 1){
        Tache = 0;
        el.className = "blob_6_invalide";
        return Tache;
    }
    if(Tache == 0){
        Tache = 1;
        el.className = "blob_6_valide";
        return Tache;
    }
}

function Manque_de_feutre_f(){
    let el = document.getElementById("Manque_de_feutre");
    if(Manque_de_feutre == 1){
        Manque_de_feutre = 0;
        el.className = "blob_7_invalide";
        return Manque_de_feutre;
    }
    if(Manque_de_feutre == 0){
        Manque_de_feutre = 1;
        el.className = "blob_7_valide";
        return Manque_de_feutre;
    }
}

function Objet_oublie_f(){
    let el = document.getElementById("Objet_oublie");
    if(Objet_oublie == 1){
        Objet_oublie = 0;
        el.className = "blob_8_invalide";
        return Objet_oublie;
    }
    if(Objet_oublie == 0){
        Objet_oublie = 1;
        el.className = "blob_8_valide";
        return Objet_oublie;
    }
}

function Chaise_casse_f(){
    let el = document.getElementById("Chaise_casse");
    if(Chaise_casse == 1){
        Chaise_casse = 0;
        el.className = "blob_9_invalide";
        return Chaise_casse;
    }
    if(Chaise_casse == 0){
        Chaise_casse = 1;
        el.className = "blob_9_valide";
        return Chaise_casse;
    }
}

function mise_en_URL_salle(){
    let element = document.getElementById("commentaire");
    commentaire = element.value;
    window.location.href = window.location.search + "&Projecteur_en_panne=" + Projecteur_en_panne + "&Micro_casse=" + Micro_casse + "&Manque_cable_HDMI=" + Manque_cable_HDMI + "&Pc_casse=" + Pc_casse + "&Liquide_renverse=" + Liquide_renverse  + "&Tache=" + Tache + "&Manque_de_feutre=" + Manque_de_feutre + "&Objet_oublie=" + Objet_oublie + "&Chaise_casse=" + Chaise_casse + "&commentaire=" + commentaire;
    this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "initial"
}