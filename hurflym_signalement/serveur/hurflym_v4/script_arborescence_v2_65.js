// On va chercher les différents éléments de notre page
const pages = document.querySelectorAll(".page");
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
//-----------------------------------Creation de parties html type-------------------------------------------




//---------------------------------------------------------------------------------------------------------------

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
    for(let partie of parties){
        partie.style.display = "none";
    }
    for(let section of sections){
        section.style.display = "none";
    }
    //document.getElementsByClassName("partie").style.display = "none";
    /*for(partie of parties){
        partie.style.top = "3000px";
    }*/
    document.getElementById("partie2").style.display = "initial";
    document.getElementById("section1").style.display = "initial";
    
    document.querySelector(".page").style.display = "initial"


    // On gère les boutons "suivant"
    let boutons = document.querySelectorAll(".next2")

    for(let bouton of boutons){
        bouton.addEventListener("click", page2)
    }

    boutons = document.querySelectorAll(".next3")

    for(let bouton of boutons){
        bouton.addEventListener("click", page3)
    }


}

/**
 * Cette fonction fait avancer le formulaire d'une page
 */
function page2(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.style.display = "initial"
}

function page3(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display = "initial"
}

function previous_page(){
    for(let page of pages){
        page.style.display = "none"
    }
    document.getElementById("page1").style.display = "initial";
}

function mise_a_jour_profondeur(prof){
    profondeur = prof;
}

// let bandeau = document.createElement("div");
let nom_tmp = document.createElement("div");
let ajouter = document.createElement("a");
let image_ajouter = document.createElement("img");
let supprimer = document.createElement("a");
let image_supprimer = document.createElement("img");
let nouveau_element = document.createElement("div");
let ancien_element = document.getElementById("element"+profondeur);

function creation_element(){
    id+=1;
    const var_ = id;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element", "first-child");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_element";
    nom_tmp.textContent = document.getElementById("nom").value;


    ajouter = document.createElement("div");
    ajouter.className = "bouton_ajouter";
    ajouter.addEventListener("click", function() { mise_a_jour_profondeur(var_);});
    ajouter.addEventListener("click", function() { popup('ajouter',1);});
    image_ajouter = document.createElement("img");
    image_ajouter.src = "../image/plus.png";
    image_ajouter.style.width = "40px";
    image_ajouter.style.height = "40px";
    

    supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    supprimer.addEventListener("click", function(){ popup('supprimer',1);});
    image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "40px";
    image_supprimer.style.height = "40px";

    modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    modifier.addEventListener("click", function(){ popup('modifier_element',1);});
    image_modifier = document.createElement("img");
    image_modifier.src = "../image/crayon.png";
    image_modifier.style.width = "40px";
    image_modifier.style.height = "40px";

    deplacer = document.createElement("div");
    deplacer.className = "bouton_deplacer_element";
    deplacer.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    deplacer.addEventListener("click", function(){ popup('deplacer_element',1);});
    image_deplacer = document.createElement("img");
    image_deplacer.src = "../image/faire_defiler.png";
    image_deplacer.style.width = "40px";
    image_deplacer.style.height = "40px";
    

    
    nouveau_element = document.createElement("div");
    nouveau_element.className = "element" + id;
    ancien_element = document.getElementById("element"+(profondeur));
    ancien_element.append(nouveau_element);
    nouveau_element.appendChild(bandeau);
    bandeau.append(nom_tmp, modifier,deplacer, ajouter, supprimer);

    modifier.appendChild(image_modifier);
    deplacer.appendChild(image_deplacer);
    ajouter.appendChild(image_ajouter);
    supprimer.appendChild(image_supprimer);

    nouveau_element.id = "element"+(id);
    nouveau_element.className = "element";
    nouveau_element.style.marginTop = "20px";


    const liste_des_elements = document.getElementById("liste_des_elements");
    const bouton = document.createElement("a");
    bouton.href = "#";
    bouton.className="choix";
    bouton.textContent = document.getElementById("nom").value;
    bouton.addEventListener("click", function(){deplacer_signalement(var_);});
    liste_des_elements.appendChild(bouton);

    const liste_des_elements_pour_element = document.getElementById("liste_des_elements_pour_element");
    const bouton_element = document.createElement("a");
    bouton_element.href = "#";
    bouton_element.className="choix";
    bouton_element.textContent = document.getElementById("nom").value;
    bouton_element.addEventListener("click", function(){deplacer_element(var_);});
    liste_des_elements_pour_element.appendChild(bouton_element);
    previous_page();
}

function supprimer_element(){
    console.log("element"+profondeur);
    ancien_element = document.getElementById("element"+profondeur);
    ancien_element.parentElement.removeChild(ancien_element);
}

function modifier_element(){
    ancien_element = document.getElementById("element"+profondeur);
    ancien_element.firstChild.firstChild.textContent = document.getElementById("nouveau_nom_element").value;
}

function deplacer_signalement(prof){
    ancien_element = document.getElementById("element"+prof);
    signalement = document.getElementById("signalement"+profondeur);
    ancien_element.appendChild(signalement);
    console.log("element = " + element + "signalement = " + signalement);
}

function deplacer_element(prof){
    ancien_element = document.getElementById("element"+prof);
    element = document.getElementById("element"+profondeur);
    ancien_element.appendChild(element);
}

function modifier_signalement(texte){
    console.log("profondeur = " + profondeur);
    const signalement = document.getElementById("signalement"+profondeur);
    signalement.firstChild.firstChild.textContent = texte;
    console.log("signalement = " + signalement+ 'texte =' + texte);
}

class Signalement{
    constructor(nom, toilette,lavabo,salle){
        this.nom = nom;
        this.toilette = toilette;
        this.lavabo = lavabo;
        this.salle = salle;
    }
}

let liste_signalement = [];

function creation_signalement(){
    var b = document.getElementById("equipement_sanitaire").checked ? "on" : "off";
    var c = document.getElementById("equipement_lavabo").checked ? "on" : "off";
    var d = document.getElementById("equipement_salle").checked ? "on" : "off";
    const signalement = new Signalement(document.getElementById("nom_creation").value,b, c, d);
    liste_signalement.push(signalement);
    const liste = document.getElementById("liste_signalement");
    const liste_des_signalements = document.getElementById("liste_des_signalements");
    const bouton = document.createElement("div");
    bouton.className="choix";
    bouton.addEventListener("click", function(){ popup('creation',0)});
    const texte = document.getElementById("nom_creation").value;
    bouton.textContent = texte;
    const bouton_modif = document.createElement("div");
    bouton_modif.className="choix";
    bouton_modif.textContent = texte;
    bouton_modif.addEventListener("click", function(){ popup('modifier_signalement',0)});
    bouton_modif.addEventListener("click", function(){modifier_signalement(texte);});
    liste_des_signalements.appendChild(bouton_modif);
    bouton.addEventListener("click", function(){ajouter_signalement(texte);});
    liste.appendChild(bouton);
    
}

function ajouter_signalement(nom_signalement){
    id +=1;
    const var_ = id;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_signalement";
    nom_tmp.textContent = nom_signalement;


    deplacer = document.createElement("div");
    deplacer.className = "bouton_deplacer";
    deplacer.addEventListener("click", function() { mise_a_jour_profondeur(var_);});
    deplacer.addEventListener("click", function() { popup('deplacer_signalement',1);});
    image_deplacer = document.createElement("img");
    image_deplacer.src = "../image/faire_defiler.png";
    image_deplacer.style.width = "20px";
    image_deplacer.style.height = "20px";

    modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function() { mise_a_jour_profondeur(var_);});
    modifier.addEventListener("click", function() { popup('modifier_signalement',1);});
    image_modifier = document.createElement("img");
    image_modifier.src = "../image/icone_engrenage.png";
    image_modifier.style.width = "20px";
    image_modifier.style.height = "20px";
    

    supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    supprimer.addEventListener("click", function(){ popup('supprimer',1);});
    image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "20px";
    image_supprimer.style.height = "20px";

    qrcode = document.createElement("div");
    qrcode.className = "bouton_demande_qrcode";
    qrcode.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    qrcode.addEventListener("click", function(){ popup('demande_qrcode',1);});
    image_qrcode = document.createElement("img");
    image_qrcode.src = "../image/qr-code.png";
    image_qrcode.style.width = "20px";
    image_qrcode.style.height = "20px";

    
    nouveau_element = document.createElement("div");
    nouveau_element.className = "signalement" + id;
    ancien_element = document.getElementById("element"+(profondeur));


    ancien_element.append(nouveau_element);
    nouveau_element.appendChild(bandeau);
    bandeau.append(nom_tmp,deplacer,modifier,qrcode, supprimer);
    deplacer.appendChild(image_deplacer);
    modifier.appendChild(image_modifier);
    qrcode.appendChild(image_qrcode);
    supprimer.appendChild(image_supprimer);
    nouveau_element.id = "signalement"+(id);
    nouveau_element.className = "signalement";
    nouveau_element.style.marginTop = "20px";
    previous_page();
}


function verification(){
    
}

function popup(nom,opacity_){
    console.log(nom);
    console.log(""+nom);
    ancien_element = document.getElementById(""+nom);
    console.log(ancien_element);
    if(opacity_ == 1){
        ancien_element.style.visibility = "visible";
    }
    else{
        ancien_element.style.visibility = "hidden";
    }
    ancien_element.style.opacity = opacity_;
    console.log("eheh");
}

function changement_de_partie(partie_){
    for(let partie of parties){
        partie.style.display = "none";
    }
    const txt = "partie"+partie_;
    console.log("txt = "+txt);
    document.getElementById(txt).style.display = "initial";
}

let liste_equipement = [];
let liste_equipement_particulier = [];

function creer_equipement_particulier(){
    const nom = document.getElementById("nom_creation_equipement_particulier").value;
    const image = document.getElementById("nom_creation_equipement_particulier").value;
    const equipement_particulier = document.getElementById("gestion_creation_equipement_particulier");
    const new_element = document.createAttribute("div");
    new_element.appendChild(nom, image);
    equipement_particulier.appendChild(nom, image);
    
}

function section(section_){
    for(let section of sections){
        section.style.display = "none";
    }
    const txt = "section"+section_;
    console.log("txt = "+txt);
    document.getElementById(txt).style.display = "initial";
}

function creer_equipement(){
    const rar_1 = document.createElement("div");
    rar_1.className = "gestion_equipement";

    const nom_equipement_ = document.createElement("div");
    nom_equipement_.className = "nom_equipement";
    nom_equipement_.textContent = document.getElementById("nom_equipement").value;

    const categorie_equipement_ = document.createElement("div");
    categorie_equipement_.className = "categorie_equipement";
    categorie_equipement_.textContent = document.getElementById("categorie_equipement_creation").value;

    const description_ = document.createElement("div");
    description_.className = "description_equipement";
    description_.textContent = document.getElementById("description_equipement").value;

    const image_ = document.createElement("div");
    image_.className = "image_equipement";
    image_.textContent = document.getElementById("image_equipement_creation").value;

    rar_1.append(nom_equipement_, categorie_equipement_, description_, image_);

    const aremplir = document.getElementById("gestion_creation_equipement");
    aremplir.append(rar_1);
    console.log("result : " + rar_1);




}
