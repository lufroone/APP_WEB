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

function mise_a_jour_profondeur(prof){
    profondeur = prof +1;
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
    profondeur+=1;
    bandeau = document.createElement("div");
    bandeau.className = "gestion_element";

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_element";
    nom_tmp.textContent = document.getElementById("nom").value;

    id_tmp = document.createElement("div");
    id_tmp.className = "id";
    id_tmp.textContent = "id="+ profondeur;
    id_tmp.id = profondeur;
    

    
    nouveau_element = document.createElement("div");
    nouveau_element.className = "element";

    ancien_element = document.getElementById(document.getElementById("id").value);
    ancien_element = ancien_element.parentElement.parentElement;
    console.log(document.getElementById("id").value);
    console.log(ancien_element);
    ancien_element.append(nouveau_element);
    nouveau_element.appendChild(bandeau);
    bandeau.append(nom_tmp, id_tmp);
    nouveau_element.className = "element";
    nouveau_element.style.marginTop = "20px";
}

function supprimer_element(){
    console.log("element"+profondeur);
    ancien_element = document.getElementById(document.getElementById("id_supp").value);
    ancien_element.parentElement.parentElement.parentElement.removeChild(ancien_element.parentElement.parentElement);
}

function creation_lieu(){

}

function pop_up_de_creation(){
    
}