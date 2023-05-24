// On va chercher les différents éléments de notre page
const pages = document.querySelectorAll(".page")
const header = document.querySelector("header")
const nbPages = pages.length // Nombre de pages du formulaire
let pageActive = 1

let profondeur = 0;

//-----------------------------------Creation de parties html type-------------------------------------------




//---------------------------------------------------------------------------------------------------------------

// On attend le chargement de la page
window.onload = () => {
    // On affiche la 1ère page du formulaire
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

function mise_a_jour_profondeur(){
    enfant = this.parentElement.childNodes;
    profondeur = enfant[0].getAttribute("id");
    profondeur = profondeur - "element";
    console.log("element"+profondeur);
    return profondeur;
}

let bandeau = document.createElement("div");
let nom_tmp = document.createElement("div");
let ajouter = document.createElement("a");
let image_ajouter = document.createElement("img");
let supprimer = document.createElement("a");
let image_supprimer = document.createElement("img");
let nouveau_element = document.createElement("div");
let ancien_element = document.getElementById("element"+profondeur);

function creation_element(){
  
    bandeau = document.createElement("div");
    bandeau.className = "gestion_element";

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_element";
    nom_tmp.textContent = document.getElementById("nom").value;


    ajouter = document.createElement("a");
    ajouter.href = "#ajouter";
    ajouter.className = "bouton_ajouter";
    ajouter.onclick = mise_a_jour_profondeur;
    //ajouter.addEventListener("click", mise_a_jour_profondeur(profondeur+1));
    //profondeur = profondeur-1;
    image_ajouter = document.createElement("img");
    image_ajouter.src = "../image/plus.png";
    image_ajouter.style.width = "20px";
    image_ajouter.style.height = "20px";
    

    supprimer = document.createElement("a");
    supprimer.href = "#supprimer";
    supprimer.className = "bouton_supprimer";
    //supprimer.onclick = mise_a_jour_profondeur(profondeur+1);
    supprimer.addEventListener("click", mise_a_jour_profondeur);
    //profondeur = profondeur-1;
    image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "20px";
    image_supprimer.style.height = "20px";
    

    
    nouveau_element = document.createElement("div");
    nouveau_element.className = "element" + profondeur;
    console.log("element"+profondeur);
    ancien_element = document.getElementById("element"+(profondeur));
    console.log("element"+profondeur);
    console.log(nouveau_element);
    ancien_element.append(nouveau_element);
    nouveau_element.appendChild(bandeau);
    bandeau.append(nom_tmp, ajouter, supprimer);
    ajouter.appendChild(image_ajouter);
    supprimer.appendChild(image_supprimer);
    nouveau_element.id = "element"+(profondeur+1);
    nouveau_element.className = "element";
    nouveau_element.style.marginTop = "20px";
    profondeur = profondeur + 1;
}

function supprimer_element(){
    console.log("element"+profondeur);
    ancien_element = document.getElementById("element"+profondeur);
    ancien_element.parentElement.removeChild(ancien_element);
}

function creation_lieu(){

}

function pop_up_de_creation(){
    
}