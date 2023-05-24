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
let username = "maison";
let mot_de_passe = "maison";
let statistique;
let liste_admins;


let index_derniere_page_incident = 0;
let index_premiere_page_incident = 0;
let index_derniere_page_signalement = 0;
let index_premiere_page_signalement = 0;

let index_premiere_page_gestion_signalement = 0;
let index_derniere_page_gestion_signalement = 0;
let index_premiere_page_mise_en_place_signalement = 0;
let index_derniere_page_mise_en_place_signalement = 0;

let index_premiere_page_gestion_equipement = 0;
let index_derniere_page_gestion_equipement = 0;


let index_premiere_page_gestion_equipement_particulier = 0;
let index_derniere_page_gestion_equipement_particulier = 0;
let index_premiere_page_recherche_equipement_particulier = 0;
let index_derniere_page_recherche_equipement_particulier = 0;

let index_premiere_page_gestion_template = 0;
let index_derniere_page_gestion_template = 0;


let myChart; // Déclarer la variable myChart en dehors de la fonction


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

    boutons = document.querySelectorAll(".next4")

    for(let bouton of boutons){
        bouton.addEventListener("click", page4)
    }

    let couleurs = document.querySelectorAll(".color");

    for(let couleur of couleurs){
        console.log(couleur.id);
        const couleurDeFond = document.getElementById(couleur.id);
        const root = document.documentElement;

        couleurDeFond.addEventListener("change", function() {
            if(couleur.id == "--couleur-de-lombre-du-bouton"){
                root.style.setProperty(couleur.id, hexToRgb(couleurDeFond.value));
            }
            else{
                root.style.setProperty(couleur.id, couleurDeFond.value);
            }
            });

    }


}





document.addEventListener('DOMContentLoaded', function() {
    
const graphique_a_faire = document.getElementById("graphique");

// Créer un objet Chart pour afficher le graphe
myChart = new Chart(graphique_a_faire, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Nombre d'incidents"
            }
          }
        }
      }
      
    /*
    type: "line",
    data: {
        labels: [], // Les labels seront ajoutés plus tard
        datasets: [{
            label: "Nombre d'incidences",
            data: [], // Les données seront ajoutées plus tard
            borderColor: "rgb(54, 162, 235)",
            fill: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Nombre d\'incidents'
                }
            }]
        }
    }
    */
    
});
myChart.update();
console.log(myChart);

// Ajouter un événement de changement sur le selecteur
graphique_a_faire.addEventListener("change", function() {
    // Récupérer la valeur sélectionnée
    var nomElementSelectionne = graphique_a_faire.value;

    // Envoyer une requête fetch pour récupérer les données pour ce nom_element
    fetch("donnees_graphique.php?nom_element=" + encodeURIComponent(nomElementSelectionne))
        .then(response => response.json())
        .then(data => {
            // Mettre à jour les labels et les données du graphe avec les données reçues
            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.data;
                    // Mettre à jour le titre du graphe
        myChart.options.title.text = "Nombre d'incidences pour " + nomElementSelectionne;

        // Actualiser le graphe
        myChart.update();
    })
    .catch(error => console.error(error));
});

});
  


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                                   Test Chat GPT 4 avec méthode et cahier des charges

async function getIDNoeud() {
    const lieu = document.getElementById('nom-element').value;
    const response = await fetch('http://localhost/hurflym_signalement/local/arborescence_back+front/getIDNoeud.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lieu: lieu })
    });
  
    const result = await response.json();
    return result.ID_Noeud;
  }
/*
async function getIDNoeudsSous(idNoeud) {
    console.log("on est bien dedans");
    async function fetchIDNoeudsSous(idNoeud) {
      const response = await fetch('http://localhost/hurflym_signalement/local/arborescence_back+front/getIDNoeudsSous.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID_Noeud: idNoeud })
      });
      const result = await response.json();
      return result.ID_Noeuds;
    }
  
    let idNoeuds = [];
    let currentIDNoeud = idNoeud;
    while (currentIDNoeud) {
      idNoeuds.push(currentIDNoeud);
      currentIDNoeud = await fetchIDNoeudsSous(currentIDNoeud);
    }
  
    return idNoeuds;
  }
  */
let idNoeuds = [];
/*
async function getIDNoeudsSous(ID_Noeud) {
    console.log(ID_Noeud);
    const response = await fetch('http://localhost/hurflym_signalement/local/arborescence_back+front/getIDNoeudsSous.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ID_Noeud })
    });
  
    if (!response.ok) {
      throw new Error('Erreur de récupération des ID_Noeuds');
    }
  
    const data = await response.json();
    console.log(data);
    idNoeuds = [];
    idNoeuds.push(data);
    return data.ID_Noeuds;
  }
*/
async function getIDNoeudsSous(ID_Noeud) {
    console.log(ID_Noeud);
    const response = await fetch('http://localhost/hurflym_signalement/local/arborescence_back+front/getIDNoeudsSous.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ID_Noeud: parseInt(ID_Noeud) })
    });
  
    if (!response.ok) {
      throw new Error('Erreur de récupération des ID_Noeuds');
    }
  
    const data = await response.json();
    console.log(data);
    idNoeuds = [];
    idNoeuds.push(data);
    return data.ID_Noeuds;
  }
  

async function getIDIncidents(idNoeuds) {
    console.log(idNoeuds);
    const response = await fetch('http://localhost/hurflym_signalement/local/arborescence_back+front/getIDIncidents.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ID_Noeuds: idNoeuds })
    });
  
    const result = await response.json();
    console.log(result.ID_Incidences);
    return result.ID_Incidences;
  }
  
function getIncidentCounts(idIncidences) {
    console.log(idIncidences);
    const currentDate = new Date();
    const daysArray = Array.from({ length: 15 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - (14 - i));
      return date.toISOString().split('T')[0];
    });
  
    const countsArray = daysArray.map(day => {
      return idIncidences.filter(incidence => {
        const incidenceDate = incidence.Heure_du_signalement.split(' ')[0];
        return incidenceDate === day;
      }).length;
    });
  
    return { daysArray, countsArray };
  }
  
  

function updateChart(datesArray, incidentsCountArray) {
    const graphique_a_faire = document.getElementById("graphique");
  
    const data = {
      labels: datesArray,
      datasets: [
        {
          label: 'Nombre d\'incidents',
          data: incidentsCountArray,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  
    if (myChart) {
      myChart.destroy();
    }
  
    myChart = new Chart(graphique_a_faire, config);
  }
  
  
  
async function changement_de_graphique_chatGPT4() {
    const idNoeud = await getIDNoeud();
    const idNoeuds = await getIDNoeudsSous(idNoeud);
    console.log("idNoeuds :");
    console.log(idNoeuds);
    const idIncidences = await getIDIncidents(idNoeuds);
    console.log("idIncidences :");
    console.log(idIncidences);
    const { daysArray, countsArray } = getIncidentCounts(idIncidences);
    updateChart(daysArray, countsArray);
  }
  
  
  


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





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

function page4(){
    // On masque toutes les pages
    for(let page of pages){
        page.style.display = "none"
    }

    // On affiche la page suivante
    this.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "initial"
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
let signalement;
function mise_a_jour_signalement(ID_Signalement){
    signalement = ID_Signalement;
}
let template;
function mise_a_jour_template(ID_template){
    template = ID_template;
}

// let bandeau = document.createElement("div");
let nom_tmp = document.createElement("div");
let ajouter = document.createElement("a");
let image_ajouter = document.createElement("img");
let supprimer = document.createElement("a");
let image_supprimer = document.createElement("img");
let nouveau_element = document.createElement("div");
let ancien_element = document.getElementById("element"+profondeur);
let localisation_tmp;
let profondeur_tmp;


function Lecture_element(){
    const element_fils = Arborescence;
    const first_child = creation_element(Arborescence[0]["ID_Noeud"],Arborescence[0]["Nom_Element"],Arborescence[0]["Localisation"],Arborescence[0]["Profondeur"]);
    //console.log("element_fils[0]['Fils'].length = ", element_fils[0]["Fils"].length);
	if(element_fils[0]["Fils"].length > 0){
		for(var i=0; i<element_fils[0]["Fils"].length;i++){
			first_child.append(recursive_lecture(element_fils[0]["Fils"][i]));
		}
	}

    ancien_element = document.getElementById("arborescence");
    ancien_element.append(first_child);
}

function recursive_lecture(semi_arbo_){
    const first_child = creation_element(semi_arbo_["ID_Noeud"],semi_arbo_["Nom_Element"],semi_arbo_["Localisation"],semi_arbo_["Profondeur"]);
    if(semi_arbo_["Fils"].length > 0){
		for(var i=0; i<semi_arbo_["Fils"].length;i++){
			first_child.append(recursive_lecture(semi_arbo_["Fils"][i]));
		}
	}
    return first_child;
}

async function ajout_element(){
    console.log("profondeur = " + profondeur);
    const nom_ = document.getElementById("nom_element").value;
    const localisation_ = document.getElementById("localisation_element").value;
    console.log("nom =" + nom_);
    console.log("localisation = "+ localisation_);
    //const profondeur_ = Number(document.getElementById("profondeur"+profondeur).value) + 1;
    await ajout_lieu(profondeur,nom_,localisation_,'2');
    const n_element = creation_element(ID_ajout_lieu,nom_,localisation_,'2');
    
    ancien_element = document.getElementById("element"+profondeur);
    ancien_element.append(n_element);

    document.getElementById("nom_element").value = "";
    document.getElementById("localisation_element").value = "";
}

function creation_element(ID_Noeud_, Nom_Element_, Localisation_, Profondeur_){
    if(Profondeur_ == 0){
        const var_ = ID_Noeud_;
        const bandeau = document.createElement("div");
        bandeau.classList.add("gestion_element", "first-child");
    
        nom_tmp = document.createElement("div");
        nom_tmp.className = "nom_element";
        nom_tmp.textContent = Nom_Element_;
    
        localisation_tmp = document.createElement("div");
        localisation_tmp.value = Localisation_;
        localisation_tmp.width = "0px";
        localisation_tmp.height = "0px";
        localisation_tmp.id = "localisation"+var_;
        nom_tmp.append(localisation_tmp);

        profondeur_tmp = document.createElement("div");
        profondeur_tmp.value = Profondeur_;
        profondeur_tmp.width = "0px";
        profondeur_tmp.height = "0px";
        profondeur_tmp.id = "profondeur"+var_;
        nom_tmp.append(profondeur_tmp);

    
    
        ajouter = document.createElement("div");
        ajouter.className = "bouton_ajouter";
        ajouter.addEventListener("click", function() { mise_a_jour_profondeur(var_);});
        ajouter.addEventListener("click", function() { popup('ajouter',1);});
        image_ajouter = document.createElement("img");
        image_ajouter.src = "../image/plus.png";
        image_ajouter.style.width = "40px";
        image_ajouter.style.height = "40px";
    
        modifier = document.createElement("div");
        modifier.className = "bouton_modifier";
        modifier.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
        modifier.addEventListener("click", function(){ popup('modifier_element',1);});
        image_modifier = document.createElement("img");
        image_modifier.src = "../image/crayon.png";
        image_modifier.style.width = "40px";
        image_modifier.style.height = "40px";
        
        nouveau_element = document.createElement("div");
        nouveau_element.className = "element" + var_;
        
        nouveau_element.appendChild(bandeau);
        bandeau.append(nom_tmp, modifier, ajouter);
    
        modifier.appendChild(image_modifier);
        ajouter.appendChild(image_ajouter);
    
        nouveau_element.id = "element"+(var_);
        nouveau_element.className = "element";
        nouveau_element.style.marginTop = "20px";
    }
    else{
        const var_ = ID_Noeud_;
        const bandeau = document.createElement("div");
        bandeau.classList.add("gestion_element", "first-child");
    
        nom_tmp = document.createElement("div");
        nom_tmp.className = "nom_element";
        nom_tmp.textContent = Nom_Element_;
    
        localisation_tmp = document.createElement("div");
        localisation_tmp.value = Localisation_;
        localisation_tmp.width = "0px";
        localisation_tmp.height = "0px";
        localisation_tmp.id = "localisation"+var_;
        nom_tmp.append(localisation_tmp);

        profondeur_tmp = document.createElement("div");
        profondeur_tmp.value = Profondeur_;
        profondeur_tmp.width = "0px";
        profondeur_tmp.height = "0px";
        profondeur_tmp.id = "profondeur"+var_;
        nom_tmp.append(profondeur_tmp);
    
    
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
        nouveau_element.className = "element" + var_;
        nouveau_element.appendChild(bandeau);
        bandeau.append(nom_tmp, modifier,deplacer, ajouter, supprimer);
    
        modifier.appendChild(image_modifier);
        deplacer.appendChild(image_deplacer);
        ajouter.appendChild(image_ajouter);
        supprimer.appendChild(image_supprimer);
    
        nouveau_element.id = "element"+(var_);
        nouveau_element.className = "element";
        nouveau_element.style.marginTop = "20px";
    }

    const liste_des_elements = document.getElementById("liste_des_elements");
    const bouton = document.createElement("a");
    bouton.href = "#";
    bouton.className="choix";
    bouton.textContent = document.getElementById("nom_element").value;
    bouton.addEventListener("click", function(){deplacer_signalement(var_);});
    liste_des_elements.appendChild(bouton);


    previous_page();
    return nouveau_element;
}

async function rechercher_element(){
    const nom_recherche = document.getElementById("nom_de_lelement_recherche").value;
    const liste_resultat = await recherche_lieu(nom_recherche);
    const div_liste = document.getElementById("resultat_recherche_element");
    for(var i=0;i<liste_resultat.length; i++){
        const n = document.createElement("div");
        const Nom_Element_ = document.createElement("div");
        const Localisation_ = document.createElement("div");
        const ID_Noeud_ = liste_resultat[i]["ID_Noeud"];
        Nom_Element_.textContent = liste_resultat[i]["Nom_Element_"];
        Localisation_.textContent = liste_resultat[i]["Localisation"];
        n.append(ID_Noeud_,Nom_Element_,Localisation_);
        n.className = "choix";
        n.classList.add("resultat_fonction_recherche_element");
        n.addEventListener("click", function(){deplacer_element(ID_Noeud_);popup('deplacer_element',0);});

        div_liste.append(n);
    }

    document.getElementById("nom_de_lelement_recherche").value = "";
}

function supprimer_element(){

    supression_lieu(profondeur);
    ancien_element = document.getElementById("element"+profondeur);
    ancien_element.parentElement.removeChild(ancien_element);
}

async function modifier_element(){
    ancien_element = document.getElementById("element"+profondeur);
    const nouv_nom = document.getElementById("nouveau_nom_element").value;
    const nouv_loca = document.getElementById("nouvelle_localisation_element").value;
    await modification_lieu(profondeur,nouv_nom,nouv_loca);
    ancien_element.firstChild.firstChild.textContent = document.getElementById("nouveau_nom_element").value;
    const localisation = document.createElement("div");
    localisation.id= "localisation"+profondeur;
    const profondeur_ = document.createElement("div");
    profondeur_.id = "profondeur"+profondeur;
    ancien_element.firstChild.firstChild.append(localisation, profondeur_);
    document.getElementById("nouveau_nom_element").value = "";
    document.getElementById("nouvelle_localisation_element").value = "";
}

function deplacer_signalement(prof){
    ancien_element = document.getElementById("element"+prof);
    signalement = document.getElementById("signalement"+profondeur);
    ancien_element.appendChild(signalement);
}

function deplacer_element(prof){
    ancien_element = document.getElementById("element"+prof);
    element = document.getElementById("element"+profondeur);
    deplacer_lieu(profondeur,prof);
    ancien_element.appendChild(element);
    const div_liste = document.getElementById("resultat_recherche_element");
    var first = div_liste.firstElementChild;
    while (first) {
        first.remove();
        first = div_liste.firstElementChild;
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

/*
function mise_en_place_signalement(){
    for(var i=0;i<Signalement_.length;i++){
        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
    }
}
*/


function mise_en_place_gestion_signalement(){

    remise_a_zero("gestion_creation_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement").value;
    

    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_signalement = 0;
        for(var i=0;i<Signalement_.length;i++){
            creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
            //console.log(Signalement_[i]["Equipement"]);
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_signalement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_signalement = 0;
        for(var i=0;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function mise_en_place_recherche_signalement(){
    remise_a_zero("recherche_mise_en_place_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement_recherche").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement_recherche").value;
    

    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_mise_en_place_signalement = 0;
        for(var i=0;i<Signalement_.length;i++){
            if(Signalement_[i]["ID_Noeud"] == 0){
                creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
            }
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_mise_en_place_signalement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_mise_en_place_signalement = 0;
        for(var i=0;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    if(Signalement_[i]["ID_Noeud"] == 0){
                        creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_mise_en_place_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function avancer_dans_la_liste_gestion_signalement(){
    remise_a_zero("gestion_creation_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement").value;

    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_signalement = index_derniere_page_gestion_signalement;
        for(var i=index_derniere_page_gestion_signalement;i<Signalement_.length;i++){
            creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_signalement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_signalement = index_derniere_page_gestion_signalement;
        for(var i=index_derniere_page_gestion_signalement;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function avancer_dans_la_liste_mise_en_place_signalement(){
    remise_a_zero("recherche_mise_en_place_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement_recherche").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement_recherche").value;


    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_mise_en_place_signalement = index_derniere_page_mise_en_place_signalement;
        for(var i=index_derniere_page_mise_en_place_signalement;i<Signalement_.length;i++){
            if(Signalement_[i]["ID_Noeud"] == 0){
                creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
            }
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_mise_en_place_signalement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_mise_en_place_signalement = index_derniere_page_mise_en_place_signalement;
        for(var i=index_derniere_page_mise_en_place_signalement;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    if(Signalement_[i]["ID_Noeud"] == 0){
                        creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_mise_en_place_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function reculer_dans_la_liste_gestion_signalement(){
    remise_a_zero("gestion_creation_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement").value;
    var compteur = 0;
    for(var i=index_premiere_page_gestion_signalement;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_gestion_signalement = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        for(var i=index_premiere_page_gestion_signalement;i<Signalement_.length;i++){
            creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_signalement = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_gestion_signalement;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_signalement(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"gestion_creation_signalement");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function reculer_dans_la_liste_mise_en_place_signalement(){
    remise_a_zero("recherche_mise_en_place_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_signalement_par_page").value;
    const nom_signalement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_signalement_recherche").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_signalement_nom_equipement_recherche").value;

    var compteur = 0;
    for(var i=index_premiere_page_mise_en_place_signalement;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_mise_en_place_signalement = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_signalement_recherche == "" && nom_equipement_recherche == ""){
        for(var i=index_premiere_page_mise_en_place_signalement;i<Signalement_.length;i++){
            if(Signalement_[i]["ID_Noeud"] == 0){
                creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
            }
            
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_mise_en_place_signalement = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_mise_en_place_signalement;i<Signalement_.length;i++){
            if(nom_signalement_recherche == ""){
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche){
                    if(Signalement_[i]["ID_Noeud"] == 0){
                        creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_mise_en_place_signalement = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<Signalement_[i]["Equipement"].length;j++){
                    if(Signalement_[i]["Nom_signalement"] == nom_signalement_recherche && Signalement_[i]["Equipement"][j] == 1 && liste_associe_au_signalement[j]["Nom_Equipement"] == nom_equipement_recherche){
                        if(Signalement_[i]["ID_Noeud"] == 0){
                            creer_signalement_a_ajouter(Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"],Signalement_[i]["ID_Noeud"],Signalement_[i]["Equipement"],"recherche_mise_en_place_signalement");
                        }
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_mise_en_place_signalement = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}


async function creation_signalement(){
    const nom_ = document.getElementById("nom_signalement").value;
    const ancien_resultat_recherche_template = document.getElementById("resultat_rechercher_template_pour_creation_signalement");
    if(ancien_resultat_recherche_template != null){
        var first = ancien_resultat_recherche_template.firstElementChild;
        while (first) {
            first.remove();
            first = ancien_resultat_recherche_template.firstElementChild;
        }
    }
    

    const liste_equipement = document.getElementById("liste_equipement_pour_creation_signalement");
    var parametre = "(`ID_Signalement`,`Nom_signalement`,`ID_Noeud`";
    var values = "('0','"+nom_+"','0'";
    for(var i=0;i<liste_equipement.children.length;i++){
        //console.log(liste_equipement.children[i].id.substring(22));
        parametre = parametre + ",`"+liste_equipement.children[i].id.substring(22)+"`";
        values = values + ",'1'";
    }
    parametre = parametre+")";
    values = values+")";

    const ID_Signalement = await ajout_signalement(parametre,values);

    //console.log("ID_Signalement = "+ID_Signalement);

    await request_signalement();

    for(var i=0;i<Signalement_.length;i++){
        if(Signalement_[i]["ID_Signalement"] == ID_Signalement){
            creer_signalement(ID_Signalement,nom_,0,Signalement_[i]["Equipement"],"gestion_creation_signalement");
        }
    }


    document.getElementById("nom_signalement").value = "";
    var first = liste_equipement.firstElementChild;
    while (first) {
        first.remove();
        first = liste_equipement.firstElementChild;
    }
    
}

function creer_signalement(ID_Signalement, Nom_Signalement, ID_Noeud, La_liste_des_equipements, a_remplir){
    const var_ = ID_Signalement;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_signalement";
    nom_tmp.textContent = Nom_Signalement;

    modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function() { mise_a_jour_signalement(var_);});
    modifier.addEventListener("click", function() { popup('modifier_signalement',1);});
    modifier.addEventListener("click", function() { recuperer_les_equipements_du_signalement(var_);});
    image_modifier = document.createElement("img");
    image_modifier.src = "../image/icone_engrenage.png";
    image_modifier.style.width = "40px";
    image_modifier.style.height = "40px";
    

    supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    supprimer.addEventListener("click", function(){ popup('supprimer_signalement',1);});
    image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "40px";
    image_supprimer.style.height = "40px";

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    const liste_des_equipements_ = document.createElement("div");
    liste_des_equipements_.className = "Liste_des_equipements";
    //console.log(La_liste_des_equipements);
    if(La_liste_des_equipements!= null){
        for(var i=0;i<La_liste_des_equipements.length;i++){
            if(La_liste_des_equipements[i] == 1){
                //console.log("coucou");
                //console.log(La_liste_des_equipements);
                //console.log(liste_associe_au_signalement[i]);
                const equip_ = document.createElement("p");
                equip_.className = "equipement_des_signalements";
                equip_.id = "equipement_"+liste_associe_au_signalement[i]["ID_Signalement"]+"_du_signalement_"+var_;
                equip_.textContent = liste_associe_au_signalement[i]["Nom_Equipement"];
                liste_des_equipements_.append(equip_);
            }
        }
    }
    

    const trait = document.createElement("div");
    trait.className = "trait_signalement";

    nouveau_element = document.createElement("div");
    nouveau_element.className = "signalement" + var_;
    ancien_element = document.getElementById(a_remplir);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    nouveau_element.append(liste_des_equipements_);
    nouveau_element.append(trait);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(modifier, supprimer);
    modifier.appendChild(image_modifier);
    supprimer.appendChild(image_supprimer);
    nouveau_element.id = "signalement"+(var_);
    nouveau_element.className = "signalement";
    nouveau_element.style.marginTop = "20px";
    previous_page();
}

function creer_signalement_a_ajouter(ID_Signalement, Nom_Signalement, ID_Noeud, La_liste_des_equipements, a_remplir){
    const var_ = ID_Signalement;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_signalement_de_mise_en_place";
    nom_tmp.textContent = Nom_Signalement;

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    ajouter = document.createElement("div");
    ajouter.className = "bouton_ajouter";
    ajouter.addEventListener("click", function(){ mise_en_place_signalement(var_, Nom_Signalement);});
    ajouter.addEventListener("click", function(){ popup('ajouter',0);});
    ajouter.addEventListener("click", function(){ previous_page();});
    image_ajouter = document.createElement("img");
    image_ajouter.src = "../image/plus.png";
    image_ajouter.style.width = "40px";
    image_ajouter.style.height = "40px";

    const trait = document.createElement("div");
    trait.className = "trait_signalement";

    nouveau_element = document.createElement("div");
    nouveau_element.className = "signalement_de_mise_en_place" + var_;
    //console.log(a_remplir);
    ancien_element = document.getElementById(a_remplir);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    nouveau_element.append(trait);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(ajouter);
    ajouter.append(image_ajouter);
    nouveau_element.id = "signalement_a_mettre_en_place"+(var_);
    nouveau_element.className = "signalement_de_mise_en_place";
    nouveau_element.style.marginTop = "20px";
}

async function mise_en_place_signalement(ID_Signalement, Nom_Signalement){
    remise_a_zero("recherche_mise_en_place_signalement");
    await association_dun_signalement_a_un_lieu(profondeur, ID_Signalement);
    for(var i=0;i<Signalement_.length;i++){
        if(Signalement_[i]["ID_Signalement"] == ID_Signalement){
            Signalement_[i]["ID_Noeud"] = profondeur;
        }
    }
    await ajout_signalement_a_element(profondeur, ID_Signalement, Nom_Signalement);
}

async function mise_en_place_des_signalements_dans_larborescence(){
    for(var i=0;i<Signalement_.length;i++){
        if(Signalement_[i]["ID_Noeud"] != 0){
            await ajout_signalement_a_element(Signalement_[i]["ID_Noeud"],Signalement_[i]["ID_Signalement"],Signalement_[i]["Nom_signalement"])
        }
    }
}

async function ajout_signalement_a_element(profondeur, ID_Signalement, Nom_Signalement){
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_signalement_mis_en_place";
    nom_tmp.textContent = Nom_Signalement;

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    demande_qrcode = document.createElement("div");
    demande_qrcode.className = "bouton_demande_qrcode";
    demande_qrcode.addEventListener("click", function(){ demande_de_qrcode_pour_signalement(ID_Signalement);});
    demande_qrcode.addEventListener("click", function(){ popup('demande_qrcode',1);});
    image_demande_qrcode = document.createElement("img");
    image_demande_qrcode.src = "../image/plus.png";
    image_demande_qrcode.style.width = "40px";
    image_demande_qrcode.style.height = "40px";

    //faire une requete sql pour demander si le signalement est actif ou non pour pouvoir cahnger le style
    var actif = await recherche_activite_signalement(ID_Signalement, ID_etablissement);
    //console.log(actif);
    actif_inactif = document.createElement("div");
    actif_inactif.className = "bouton_actif_inactif";
    actif_inactif.addEventListener("click", function(){ changement_dactif_signalement(ID_Signalement);});
    image_actif_inactif = document.createElement("img");
    image_actif_inactif.src = "../image/objet.png";
    image_actif_inactif.style.width = "40px";
    image_actif_inactif.style.height = "40px";
    if(actif[0]["activation"] == '1'){
        image_actif_inactif.style.background = "green";
    }
    else{
        image_actif_inactif.style.background = "red";
    }


    suppression = document.createElement("div");
    suppression.className = "bouton_suppression";
    suppression.addEventListener("click", function(){ suppression_dun_signalement_pour_un_lieu(ID_Signalement);});
    image_suppression = document.createElement("img");
    image_suppression.src = "../image/croix-sombre-brute.png";
    image_suppression.style.width = "40px";
    image_suppression.style.height = "40px";


    nouveau_element = document.createElement("div");
    nouveau_element.className = "signalement_de_mise_en_place" + profondeur;
    ancien_element = document.getElementById("element"+profondeur);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(demande_qrcode,actif_inactif,suppression);
    demande_qrcode.append(image_demande_qrcode);
    actif_inactif.append(image_actif_inactif);
    suppression.append(image_suppression);
    nouveau_element.id = "signalement_a_mettre_en_place"+(ID_Signalement);
    nouveau_element.className = "signalement_de_mise_en_place";
    nouveau_element.style.marginTop = "20px";
}

async function recherche_activite_signalement(ID_Signalement, ID_Etablissement){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_signalement_actif.php?ID_Signalement="+ID_Signalement+"&ID_Etablissement="+ID_Etablissement).then(res => res.json()).then(data => {return data;});
}




async function supprimer_signalement(){
    await supression_signalement(profondeur);
    const ancien_signalement = document.getElementById("signalement_a_mettre_en_place"+profondeur);
    ancien_signalement.parentElement.remove(ancien_signalement);
}

function ajout_equipement_au_signalement(Nom_Equipement_,Description_Equipement_,ID_Equipement_,origine){
    var present = false;
    if(origine == "nom_equipement_pour_recherche_signalement"){
        var liste_equipement = document.getElementById("liste_des_equipements_du_signalement_en_cours_de_modification");
    }
    if(origine == "equipement_pour_creation_signalement"){
        var liste_equipement = document.getElementById("liste_equipement_pour_creation_signalement");
    }
    if(origine == "liste_equipement_pour_creation_signalement"){
        //console.log("on a bien verfier la destination");
        var liste_equipement = document.getElementById("liste_equipement_pour_creation_signalement");
    }
    for(var i=0;i<liste_equipement.children.length;i++){
        if(liste_equipement.children[i].id == "equipement_signalement"+ID_Equipement_){
            present = true;
        }
    }
    if(present==false){
        const equip = document.createElement("div");
        equip.className= "equipement_pour_modification_de_signalement";
        equip.id= "equipement_signalement"+ID_Equipement_;
        const nom_equipement = document.createElement("div");
        const description_equipement =  document.createElement("div");
        const ID_Equipement =  document.createElement("div");
        nom_equipement.textContent = Nom_Equipement_;
        description_equipement.textContent = Description_Equipement_;
        ID_Equipement.value = ID_Equipement_;

        const information = document.createElement("div");
        information.className = "information_equipement_modification_signalement";
        information.append(nom_equipement, description_equipement, ID_Equipement);

        const supprimer = document.createElement("div");
        supprimer.className = "bouton_supprimer";
        supprimer.addEventListener("click", function(){ supprimer_equipement_du_signalement(ID_Equipement_)});
        const image_supprimer = document.createElement("img");
        image_supprimer.src = "../image/croix-sombre-brute.png";
        image_supprimer.style.width = "20px";
        image_supprimer.style.height = "20px";
        supprimer.append(image_supprimer);


        const bouton = document.createElement("div");
        bouton.className = "Menu_des_boutons_equipement_modification_signalement";
        bouton.append(supprimer);

        equip.append(information, bouton);
        liste_equipement.append(equip);
    }
}

async function recuperer_les_equipements_du_signalement(ID_Signalement){
    await request_signalement();
    for(var i=0;i<Signalement_[ID_Signalement-1]["Equipement"].length;i++){
        if(Signalement_[ID_Signalement-1]["Equipement"][i] == 1){
            ajout_equipement_au_signalement(liste_associe_au_signalement[i]["Nom_Equipement"],liste_associe_au_signalement[i]["Description_Equipement"],liste_associe_au_signalement[i]["ID_Equipement"]);
        }
    }
}

function supprimer_equipement_du_signalement(ID_Equipement){
    const liste_equipement = document.getElementById("liste_des_equipements_du_signalement_en_cours_de_modification");
    for(var i=0;i<liste_equipement.children.length;i++){
        if(liste_equipement.children[i].id == "equipement_signalement"+ID_Equipement){
            const element_a_supprimer = document.getElementById("equipement_signalement"+ID_Equipement);
            element_a_supprimer.parentElement.removeChild(element_a_supprimer);
        }
    }
}

function ajouter_equipement_au_signalement(ID_Equipement,origine){
    for(var i=0;i<liste_associe_au_signalement.length;i++){
        if(liste_associe_au_signalement[i]["ID_Equipement"] == ID_Equipement){
            ajout_equipement_au_signalement(liste_associe_au_signalement[i]["Nom_Equipement"],liste_associe_au_signalement[i]["Description_Equipement"],liste_associe_au_signalement[i]["ID_Equipement"],origine);
        }
    }
    if(origine == "nom_equipement_pour_recherche_signalement"){
        const element_a_supprimer = document.getElementById("equipement_pour_signalement"+ID_Equipement);
        element_a_supprimer.parentElement.removeChild(element_a_supprimer);
    }
    if(origine == "equipement_pour_creation_signalement"){
        const element_a_supprimer = document.getElementById("equipement_pour_creation_signalement"+ID_Equipement);
        element_a_supprimer.parentElement.removeChild(element_a_supprimer);
    }
    if(origine == "liste_equipement_pour_creation_signalement"){
        const element_a_supprimer = document.getElementsByClassName("template_trouve");
        var first = element_a_supprimer.firstElementChild;
        while (first) {
            first.remove();
            first = element_a_supprimer.firstElementChild;
        }
    }
    
}

function rechercher_equipement_pour_ajout_signalement(origine){
    const Nom_equipement_ = document.getElementById(origine).value;
    for(var i=0;i<liste_associe_au_signalement.length;i++){
        if(liste_associe_au_signalement[i]["Nom_Equipement"] == Nom_equipement_){
            const var_ = liste_associe_au_signalement[i]["ID_Equipement"];
            const bandeau = document.createElement("div");
            bandeau.classList.add("gestion_element");

            nom_tmp = document.createElement("div");
            nom_tmp.className = "nom_signalement";
            nom_tmp.textContent = Nom_equipement_;

            ajouter = document.createElement("div");
            ajouter.className = "bouton_modifier";
            ajouter.addEventListener("click", function() { ajouter_equipement_au_signalement(var_,origine);});
            image_ajouter = document.createElement("img");
            image_ajouter.src = "../image/icone_engrenage.png";
            image_ajouter.style.width = "20px";
            image_ajouter.style.height = "20px";


            nouveau_element = document.createElement("div");
            ancien_element = document.getElementById("resultat_recherche_"+origine);


            ancien_element.append(nouveau_element);
            nouveau_element.append(bandeau);
            bandeau.append(nom_tmp,ajouter);
            ajouter.appendChild(image_ajouter);
            if(origine == "nom_equipement_pour_recherche_signalement"){
                nouveau_element.id = "equipement_pour_signalement"+(var_);
            }
            if(origine == "equipement_pour_creation_signalement"){
                nouveau_element.id = "equipement_pour_creation_signalement"+(var_);
            }
            nouveau_element.className = "equipement_pour_signalement";
            nouveau_element.style.marginTop = "20px";
        }
    }
}

async function modification_signalement(){
    const liste_equipement = document.getElementById("liste_des_equipements_du_signalement_en_cours_de_modification");
    await remise_a_zero_signalement(signalement);

    const la_liste_des_equipements_du_signalement = document.getElementById("signalement"+signalement).children[1];
    var first = la_liste_des_equipements_du_signalement.firstElementChild;
    while (first) {
        first.remove();
        first = la_liste_des_equipements_du_signalement.firstElementChild;
    }
    for(var i=0;i<liste_equipement.children.length;i++){
        //console.log(liste_equipement.children[i].id.substring(22));
        await modifier_signalement_sql(signalement,liste_equipement.children[i].id.substring(22));

        const equip_ = document.createElement("p");
        equip_.className = "equipement_des_signalements";
        equip_.id = "equipement_"+liste_equipement.children[i].id.substring(22)+"_du_signalement_"+signalement;
        for(var j=0;j<liste_associe_au_signalement.length;j++){
            if(liste_associe_au_signalement[j]["ID_Equipement"] == liste_equipement.children[i].id.substring(22)){
                equip_.textContent = liste_associe_au_signalement[j]["Nom_Equipement"];
            }
        }
        la_liste_des_equipements_du_signalement.append(equip_);

        
    }
    var first = liste_equipement.firstElementChild;
    while (first) {
        first.remove();
        first = liste_equipement.firstElementChild;
    }
}

async function recherche_signalement(){
    const liste_recherche = document.getElementById("resultat_recherche_signalement");
    var first = liste_recherche.firstElementChild.firstElementChild;
    while (first) {
        first.remove();
        first = liste_recherche.firstElementChild;
    }

    const recherche_nom = document.getElementById("recherche_nom_signalement").value;

    const liste_des_resultats = await recherche_sql_signalement(recherche_nom);

    for(var i=0;i<liste_des_resultats.length;i++){
        //console.log(liste_des_resultats[i]["ID_Signalement"]);
        for(var j=0;j<Signalement_.length;j++){
            if(liste_des_resultats[i]["ID_Signalement"] == Signalement_[j]["ID_Signalement"]){
                creer_signalement(Signalement_[j]["ID_Signalement"],Signalement_[j]["Nom_signalement"],Signalement_[j]["ID_noeud"],Signalement_[j]["Equipement"],"resultat_recherche_signalement");
            }
        }
        
    }
    
    document.getElementById("recherche_nom_signalement").value = "";
}


async function appliquer_le_template(){
    const nom_template = document.getElementById("nom_template_pour_signalement").value;
    const ancien_element = document.getElementById("resultat_recherche_template_pour_creation_signalement");
    await request_template();
    for(var i=0; i<template_.length;i++){
        if(template_[i]["Nom_Template"] == nom_template){
            const template_trouve = document.createElement('div');
            template_trouve.className = "template_trouve";
            template_trouve.textContent = template_[i]["Nom_Template"];
            const bouton_application = document.createElement("div");
            bouton_application.className = "bouton_application";
            image_application = document.createElement("img");
            image_application.src = "../image/croix-sombre-brute.png";
            image_application.style.width = "40px";
            image_application.style.height = "40px";
            bouton_application.append(image_application);
            template_trouve.append(bouton_application);
            const identifiant = i;
            bouton_application.addEventListener("click", function() {
                ajouter_liste_dequipements_au_signalement(template_[identifiant]["Equipement"]);
                });
            ancien_element.append(template_trouve);
        }
    }
}

function ajouter_liste_dequipements_au_signalement(Liste_dequipement){
    for(var j=0;j<Liste_dequipement.length;j++){
        //console.log("on a ajoute");
        if(Liste_dequipement[j]== 1){
            ajouter_equipement_au_signalement(liste_associe_au_template[j]["ID_Equipement"],"liste_equipement_pour_creation_signalement");
        }
        
    }
}   

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//                                                     TEMPLATE

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

/*
async function mise_en_place_template(){
    for(var i=0;i<template_.length;i++){
        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
    }
}
*/

function mise_en_place_gestion_template(){
    remise_a_zero("gestion_creation_template");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_template_par_page").value;
    const nom_template_recherche = document.getElementById("parametre_de_recherche_template_nom_template").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_template_nom_equipement").value;

    if(nom_template_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_template = 0;
        for(var i=0;i<template_.length;i++){
            creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_template = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_template = 0;
        for(var i=0;i<template_.length;i++){
            if(nom_template_recherche == ""){
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(template_[i]["Nom_Template"] == nom_template_recherche){
                    creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_template = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Nom_Template"] == nom_template_recherche && template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function avancer_dans_la_liste_gestion_template(){
    remise_a_zero("gestion_creation_template");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_template_par_page").value;
    const nom_template_recherche = document.getElementById("parametre_de_recherche_template_nom_template").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_template_nom_equipement").value;

    if(nom_template_recherche == "" && nom_equipement_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_template = index_derniere_page_gestion_template;
        for(var i=index_derniere_page_gestion_template;i<template_.length;i++){
            creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_template = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_template = index_derniere_page_gestion_template;
        for(var i=index_derniere_page_gestion_template;i<template_.length;i++){
            if(nom_template_recherche == ""){
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(template_[i]["Nom_Template"] == nom_template_recherche){
                    creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_template = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Nom_Template"] == nom_template_recherche && template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function reculer_dans_la_liste_gestion_template(){
    remise_a_zero("gestion_creation_template");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_template_par_page").value;
    const nom_template_recherche = document.getElementById("parametre_de_recherche_template_nom_template").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_template_nom_equipement").value;
    var compteur = 0;
    for(var i=index_premiere_page_gestion_template;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_gestion_template = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_template_recherche == "" && nom_equipement_recherche == ""){
        for(var i=index_premiere_page_gestion_template;i<template_.length;i++){
            creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_template = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_gestion_template;i<template_.length;i++){
            if(nom_template_recherche == ""){
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(template_[i]["Nom_Template"] == nom_template_recherche){
                    creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_template = i;
                        return;
                    }
                }
            }
            else{
                for(var j=0;j<template_[i]["Equipement"].length;j++){
                    if(template_[i]["Nom_Template"] == nom_template_recherche && template_[i]["Equipement"][j] == 1 && liste_associe_au_template[j]["Nom_Equipement"] == nom_equipement_recherche){
                        creer_template(template_[i]["ID_Template"],template_[i]["Nom_Template"],template_[i]["Equipement"],"gestion_creation_template");
                        compteur++;
                        if(compteur == nombre_signalement_a_mettre){
                            index_derniere_page_gestion_template = i;
                            return;
                        }
                    }
                }
            }
        }
    }
}

async function creation_template(){
    const nom_ = document.getElementById("nom_template").value;

    const liste_equipement = document.getElementById("liste_equipement_pour_creation_template");
    var parametre = "(`ID_Template`,`Nom_Template`";
    var values = "('0','"+nom_+"'";
    //console.log(liste_equipement);
    //console.log(liste_equipement.children);
    //console.log(liste_equipement.children.length);
    for(var i=0;i<liste_equipement.children.length;i++){
        //console.log(liste_equipement.children[i].id.substring(19));
        parametre = parametre + ",`"+liste_equipement.children[i].id.substring(19)+"`";
        values = values + ",'1'";
    }
    parametre = parametre+")";
    values = values+")";

    const ID_template = await ajout_template(parametre,values);

    //console.log("ID_template = "+ID_template);

    await request_template();

    for(var i=0;i<template_.length;i++){
        if(template_[i]["ID_Template"] == ID_template){
            creer_template(ID_template,nom_,template_[i]["Equipement"],"gestion_creation_template");
        }
    }


    document.getElementById("nom_template").value = "";
    var first = liste_equipement.firstElementChild;
    while (first) {
        first.remove();
        first = liste_equipement.firstElementChild;
    }
    
}

function creer_template(ID_template, Nom_template, La_liste_des_equipements, a_remplir){
    const var_ = ID_template;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_template";
    nom_tmp.textContent = Nom_template;

    modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function() { mise_a_jour_template(var_);});
    modifier.addEventListener("click", function() { popup('modifier_template',1);});
    modifier.addEventListener("click", function() { recuperer_les_equipements_du_template(var_,"nom_equipement_pour_modification_template");});
    image_modifier = document.createElement("img");
    image_modifier.src = "../image/icone_engrenage.png";
    image_modifier.style.width = "40px";
    image_modifier.style.height = "40px";
    

    supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(var_);});
    supprimer.addEventListener("click", function(){ popup('supprimer_template',1);});
    image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "40px";
    image_supprimer.style.height = "40px";

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    const liste_des_equipements_ = document.createElement("div");
    liste_des_equipements_.className = "Liste_des_equipements";
    //console.log(La_liste_des_equipements);
    for(var i=0;i<La_liste_des_equipements.length;i++){
        if(La_liste_des_equipements[i] == 1){
            //console.log("coucou");
            const equip_ = document.createElement("p");
            equip_.className = "equipement_des_templates";
            equip_.id = "equipement_"+liste_associe_au_template[i]["ID_Template"]+"_du_template_"+var_;
            equip_.textContent = liste_associe_au_template[i]["Nom_Equipement"];
            liste_des_equipements_.append(equip_);
        }
    }

    const trait = document.createElement("div");
    trait.className = "trait_template";

    nouveau_element = document.createElement("div");
    nouveau_element.className = "template" + var_;
    ancien_element = document.getElementById(a_remplir);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    nouveau_element.append(liste_des_equipements_);
    nouveau_element.append(trait);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(modifier,supprimer);
    modifier.appendChild(image_modifier);
    supprimer.appendChild(image_supprimer);
    nouveau_element.id = "template"+(var_);
    nouveau_element.className = "template";
    nouveau_element.style.marginTop = "20px";
    previous_page();
}


async function supprimer_template(){
    await supression_template(profondeur);
    const ancien_template = document.getElementById("template"+profondeur);
    ancien_template.parentElement.removeChild(ancien_template);
}

function ajout_equipement_au_template(Nom_Equipement_,Description_Equipement_,ID_Equipement_,origine){
    var present = false;
    
    if(origine == "nom_equipement_pour_modification_template"){
        var liste_equipement = document.getElementById("liste_des_equipements_du_template_en_cours_de_modification");
    }
    if(origine == "equipement_pour_creation_template"){
        var liste_equipement = document.getElementById("liste_equipement_pour_creation_template");
    }
    //console.log(origine == "equipement_pour_creation_template");
    //console.log("origine = "+origine);
    //console.log(liste_equipement);
    //console.log(liste_equipement.children);
    //console.log(liste_equipement.children.length);
    for(var i=0;i<liste_equipement.children.length;i++){
        if(liste_equipement.children[i].id == "equipement_template"+ID_Equipement_){
            present = true;
        }
    }
    if(present==false){
        const equip = document.createElement("div");
        equip.className= "equipement_pour_modification_de_template";
        equip.id= "equipement_template"+ID_Equipement_;
        const nom_equipement = document.createElement("div");
        const description_equipement =  document.createElement("div");
        const ID_Equipement =  document.createElement("div");
        nom_equipement.textContent = Nom_Equipement_;
        description_equipement.textContent = Description_Equipement_;
        ID_Equipement.value = ID_Equipement_;

        const information = document.createElement("div");
        information.className = "information_equipement_modification_template";
        information.append(nom_equipement, description_equipement, ID_Equipement);

        const supprimer = document.createElement("div");
        supprimer.className = "bouton_supprimer";
        supprimer.addEventListener("click", function(){ supprimer_equipement_du_template(ID_Equipement_)});
        const image_supprimer = document.createElement("img");
        image_supprimer.src = "../image/croix-sombre-brute.png";
        image_supprimer.style.width = "20px";
        image_supprimer.style.height = "20px";
        supprimer.append(image_supprimer);


        const bouton = document.createElement("div");
        bouton.className = "Menu_des_boutons_equipement_modification_template";
        bouton.append(supprimer);

        equip.append(information, bouton);
        liste_equipement.append(equip);
    }
}

async function recuperer_les_equipements_du_template(ID_template,origine){
    await request_template();
    for(var j=0;j<template_.length;j++){
        if(template_[j]["ID_Template"] == ID_template){
            for(var i=0;i<template_[j]["Equipement"].length;i++){
                if(template_[j]["Equipement"][i] == 1){
                    ajout_equipement_au_template(liste_associe_au_template[i]["Nom_Equipement"],liste_associe_au_template[i]["Description_Equipement"],liste_associe_au_template[i]["ID_Equipement"],origine);
                }
            }
        }
    }
    
}

function supprimer_equipement_du_template(ID_Equipement){
    const liste_equipement = document.getElementById("liste_des_equipements_du_template_en_cours_de_modification");
    for(var i=0;i<liste_equipement.children.length;i++){
        if(liste_equipement.children[i].id == "equipement_template"+ID_Equipement){
            const element_a_supprimer = document.getElementById("equipement_template"+ID_Equipement);
            element_a_supprimer.parentElement.removeChild(element_a_supprimer);
        }
    }
}

function ajouter_equipement_au_template(ID_Equipement,origine){
    for(var i=0;i<liste_associe_au_template.length;i++){
        if(liste_associe_au_template[i]["ID_Equipement"] == ID_Equipement){
            ajout_equipement_au_template(liste_associe_au_template[i]["Nom_Equipement"],liste_associe_au_template[i]["Description_Equipement"],liste_associe_au_template[i]["ID_Equipement"],origine);
        }
    }
    if(origine == "nom_equipement_pour_recherche_template"){
        const element_a_supprimer = document.getElementById("equipement_pour_template"+ID_Equipement);
        element_a_supprimer.parentElement.removeChild(element_a_supprimer);
    }
    if(origine == "equipement_pour_creation_template"){
        const element_a_supprimer = document.getElementById("equipement_pour_creation_template"+ID_Equipement);
        element_a_supprimer.parentElement.removeChild(element_a_supprimer);
    }
    
}

function rechercher_equipement_pour_ajout_template(origine){
    const Nom_equipement_ = document.getElementById(origine).value;
    const Liste_equipement_recherche = document.getElementById("resultat_recherche_nom_equipement_pour_modification_template");
    var first = Liste_equipement_recherche.firstElementChild;
    while (first) {
        first.remove();
        first = Liste_equipement_recherche.firstElementChild;
    }
    for(var i=0;i<liste_associe_au_template.length;i++){
        if(liste_associe_au_template[i]["Nom_Equipement"] == Nom_equipement_){
            const var_ = liste_associe_au_template[i]["ID_Equipement"];
            const bandeau = document.createElement("div");
            bandeau.classList.add("gestion_element");

            nom_tmp = document.createElement("div");
            nom_tmp.className = "nom_template";
            nom_tmp.textContent = Nom_equipement_;

            ajouter = document.createElement("div");
            ajouter.className = "bouton_modifier";
            ajouter.addEventListener("click", function() { ajouter_equipement_au_template(var_,origine);});
            image_ajouter = document.createElement("img");
            image_ajouter.src = "../image/icone_engrenage.png";
            image_ajouter.style.width = "20px";
            image_ajouter.style.height = "20px";


            nouveau_element = document.createElement("div");
            ancien_element = document.getElementById("resultat_recherche_"+origine);


            ancien_element.append(nouveau_element);
            nouveau_element.append(bandeau);
            bandeau.append(nom_tmp,ajouter);
            ajouter.appendChild(image_ajouter);
            if(origine == "nom_equipement_pour_recherche_template"){
                nouveau_element.id = "equipement_pour_template"+(var_);
            }
            if(origine == "equipement_pour_creation_template"){
                nouveau_element.id = "equipement_pour_creation_template"+(var_);
            }
            nouveau_element.className = "equipement_pour_template";
            nouveau_element.style.marginTop = "20px";
        }
    }
}

async function modification_template(){
    const liste_equipement = document.getElementById("liste_des_equipements_du_template_en_cours_de_modification");
    await remise_a_zero_template(template);

    const la_liste_des_equipements_du_template = document.getElementById("template"+template).children[1];
    var first = la_liste_des_equipements_du_template.firstElementChild;
    while (first) {
        first.remove();
        first = la_liste_des_equipements_du_template.firstElementChild;
    }
    for(var i=0;i<liste_equipement.children.length;i++){
        //console.log(liste_equipement.children[i].id.substring(22));
        await modifier_template_sql(template,liste_equipement.children[i].id.substring(19));

        const equip_ = document.createElement("p");
        equip_.className = "equipement_des_templates";
        equip_.id = "equipement_"+liste_equipement.children[i].id.substring(19)+"_du_template_"+template;
        for(var j=0;j<liste_associe_au_template.length;j++){
            if(liste_associe_au_template[j]["ID_Equipement"] == liste_equipement.children[i].id.substring(19)){
                equip_.textContent = liste_associe_au_template[j]["Nom_Equipement"];
            }
        }
        la_liste_des_equipements_du_template.append(equip_);

        
    }
    var first = liste_equipement.firstElementChild;
    while (first) {
        first.remove();
        first = liste_equipement.firstElementChild;
    }
}

async function recherche_template(){
    const liste_recherche = document.getElementById("resultat_recherche_template");
    var first = liste_recherche.firstElementChild.firstElementChild;
    while (first) {
        first.remove();
        first = liste_recherche.firstElementChild;
    }

    const recherche_nom = document.getElementById("recherche_nom_template").value;

    const liste_des_resultats = await recherche_sql_template(recherche_nom);

    for(var i=0;i<liste_des_resultats.length;i++){
        //console.log(liste_des_resultats[i]["ID_Template"]);
        for(var j=0;j<template_.length;j++){
            if(liste_des_resultats[i]["ID_Template"] == template_[j]["ID_Template"]){
                creer_template(template_[j]["ID_Template"],template_[j]["Nom_Template"],template_[j]["Equipement"],"resultat_recherche_template");
            }
        }
        
    }
    
    document.getElementById("recherche_nom_template").value = "";
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

function popup(nom,opacity_){
    ancien_element = document.getElementById(""+nom);
    if(opacity_ == 1){
        ancien_element.style.visibility = "visible";
    }
    else{
        ancien_element.style.visibility = "hidden";
    }
    ancien_element.style.opacity = opacity_;
}

function changement_de_partie(partie_){
    for(let partie of parties){
        partie.style.display = "none";
    }
    const txt = "partie"+partie_;
    //console.log("txt = "+txt);
    document.getElementById(txt).style.display = "initial";
}

let liste_equipement = [];
let liste_equipement_particulier = [];

async function creation_equipement_particulier(){
    const nom_ = document.getElementById("nom_creation_equipement_particulier").value;
    const description_ = document.getElementById("description_creation_equipement_particulier").value;
    const categorie_ = document.getElementById("particulier_categorie_equipement_secondaire_creation").value;
    const image_ = document.getElementById("particulier_image_equipement_creation").value;

    const ID_Ep = await ajout_equipement_particulier(nom_,description_,categorie_,image_,ID_etablissement);

    creer_equipement_particulier(ID_Ep,nom_,description_,categorie_,image_,"gestion_creation_equipement_particulier");

    document.getElementById("nom_creation_equipement_particulier").value = "";
    document.getElementById("description_creation_equipement_particulier").value = "";
    document.getElementById("particulier_categorie_equipement_secondaire_creation").value = "";
    document.getElementById("particulier_image_equipement_creation").value="";
}

function creer_equipement_particulier(ID_Ep,Nom_Ep,Description_Ep,ID_Categorie_Equipement,Image_Ep,a_remplir){
    const rar_1 = document.createElement("div");
    rar_1.className = "gestion_equipement_particulier";

    const nom_equipement_ = document.createElement("div");
    nom_equipement_.className = "nom_equipement_particulier";
    nom_equipement_.textContent = Nom_Ep;

    const rar_description = document.createElement("div");
    rar_description.className = "information_equipement_particulier";

    const description_ = document.createElement("div");
    description_.className = "description_equipement_particulier";
    description_.textContent = Description_Ep;



    const categorie_equipement_ = document.createElement("div");
    categorie_equipement_.className = "categorie_equipement_particulier";
    categorie_equipement_.textContent = ID_Categorie_Equipement;

    const image_ = document.createElement("div");
    image_.className = "image_equipement_particulier";
    image_.textContent = Image_Ep;

    const ID_Equipement_ = document.createElement("div");
    ID_Equipement_.heigth = "0px";
    ID_Equipement_.width = "0px";
    ID_Equipement_.id = "ID_Equipement_particulier"+ID_Ep;

    rar_description.append(categorie_equipement_, description_, image_,ID_Equipement_)

    rar_1.append(nom_equipement_);

    const rar_2 = document.createElement("div");
    rar_2.className = "menu_bouton";

    const modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function() { mise_a_jour_profondeur(ID_Ep);});
    modifier.addEventListener("click", function() { popup('modifier_equipement_particulier',1);});
    const image_modifier = document.createElement("img");
    image_modifier.src = "../image/icone_engrenage.png";
    image_modifier.style.width = "40px";
    image_modifier.style.height = "40px";
    

    const supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(ID_Ep);});
    supprimer.addEventListener("click", function(){ popup('supprimer_equipement_particulier',1);});
    const image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "40px";
    image_supprimer.style.height = "40px";

    modifier.append(image_modifier);
    supprimer.append(image_supprimer);
    rar_2.append(modifier,supprimer);

    const trait = document.createElement("div");
    trait.className = "trait_equipement_particulier";

    const aremplir = document.getElementById(a_remplir);
    const rar_ = document.createElement("div");
    rar_.className = "equipement_particulier";
    rar_.id = "equipement_particulier"+ID_Ep;
    rar_1.append(rar_2)
    rar_.append(rar_1, rar_description,trait);
    aremplir.append(rar_);
}

function creer_equipement_particulier_a_ajouter(ID_Ep,Nom_Ep,Description_Ep,ID_Categorie_Equipement,Image_Ep,a_remplir){
    const var_ = ID_Ep;
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_ep_de_mise_en_place";
    nom_tmp.textContent = Nom_Ep;

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    ajouter = document.createElement("div");
    ajouter.className = "bouton_ajouter";
    ajouter.addEventListener("click", function(){ mise_en_place_ep(var_, Nom_Ep);});
    ajouter.addEventListener("click", function(){ popup('ajouter',0);});
    ajouter.addEventListener("click", function(){ previous_page();});
    image_ajouter = document.createElement("img");
    image_ajouter.src = "../image/plus.png";
    image_ajouter.style.width = "40px";
    image_ajouter.style.height = "40px";

    const trait = document.createElement("div");
    trait.className = "trait_signalement";

    nouveau_element = document.createElement("div");
    nouveau_element.className = "ep_de_mise_en_place" + var_;
    //console.log(a_remplir);
    ancien_element = document.getElementById(a_remplir);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    nouveau_element.append(trait);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(ajouter);
    ajouter.append(image_ajouter);
    nouveau_element.id = "ep_a_mettre_en_place"+(var_);
    nouveau_element.className = "ep_de_mise_en_place";
    nouveau_element.style.marginTop = "20px";
}

async function mise_en_place_ep(ID_Ep, Nom_Ep){
    remise_a_zero("recherche_mise_en_place_ep");
    await association_dun_ep_a_un_lieu(profondeur, ID_Ep);
    for(var i=0;i<Ep.length;i++){
        if(Ep[i]["ID_Ep"] == ID_Ep){
            Ep[i]["ID_Noeud"] = profondeur;
        }
    }
    ajout_ep_a_element(profondeur, ID_Ep, Nom_Ep);
}

function mise_en_place_des_ep_dans_larborescence(){
    for(var i=0;i<Ep.length;i++){
        if(Ep[i]["ID_Noeud"] != 0){
            ajout_ep_a_element(Ep[i]["ID_Noeud"],Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"]);
        }
    }
}

function ajout_ep_a_element(profondeur, ID_Ep, Nom_Ep){
    const bandeau = document.createElement("div");
    bandeau.classList.add("gestion_element");

    nom_tmp = document.createElement("div");
    nom_tmp.className = "nom_ep_mis_en_place";
    nom_tmp.textContent = Nom_Ep;

    const menu_bouton = document.createElement("div");
    menu_bouton.className = "menu_bouton";

    demande_qrcode = document.createElement("div");
    demande_qrcode.className = "bouton_demande_qrcode";
    demande_qrcode.addEventListener("click", function(){ demande_de_qrcode_pour_ep(ID_Ep);});
    demande_qrcode.addEventListener("click", function(){ popup('demande_qrcode',1);});
    image_demande_qrcode = document.createElement("img");
    image_demande_qrcode.src = "../image/plus.png";
    image_demande_qrcode.style.width = "40px";
    image_demande_qrcode.style.height = "40px";

    actif_inactif = document.createElement("div");
    actif_inactif.className = "bouton_actif_inactif";
    actif_inactif.addEventListener("click", function(){ changement_dactif_ep(ID_Ep);});
    image_actif_inactif = document.createElement("img");
    image_actif_inactif.src = "../image/objet.png";
    image_actif_inactif.style.width = "40px";
    image_actif_inactif.style.height = "40px";

    suppression = document.createElement("div");
    suppression.className = "bouton_suppression";
    suppression.addEventListener("click", function(){ suppression_dun_ep_pour_un_lieu(ID_Ep);});
    image_suppression = document.createElement("img");
    image_suppression.src = "../image/croix-sombre-brute.png";
    image_suppression.style.width = "40px";
    image_suppression.style.height = "40px";


    nouveau_element = document.createElement("div");
    nouveau_element.className = "ep_de_mise_en_place" + profondeur;
    ancien_element = document.getElementById("element"+profondeur);


    ancien_element.append(nouveau_element);
    nouveau_element.append(bandeau);
    bandeau.append(nom_tmp,menu_bouton);
    menu_bouton.append(demande_qrcode,actif_inactif,suppression);
    demande_qrcode.append(image_demande_qrcode);
    actif_inactif.append(image_actif_inactif);
    suppression.append(image_suppression);
    nouveau_element.id = "ep_a_mettre_en_place"+(ID_Ep);
    nouveau_element.className = "ep_de_mise_en_place";
    nouveau_element.style.marginTop = "20px";
}




async function supprimer_ep(){
    await supression_ep(profondeur);
    const ancien_signalement = document.getElementById("ep_a_mettre_en_place"+profondeur);
    ancien_signalement.parentElement.removeChild(ancien_signalement);
}

async function modification_equipement_particulier(){
    const nouveau_nom = document.getElementById("nouveau_nom_equipement_particulier").value;
    const nouvelle_description = document.getElementById("nouvelle_description_equipement_particulier").value;
    const nouvelle_categorie_secondaire = document.getElementById("nouvelle_particulier_categorie_equipement_secondaire_creation").value;
    const nouvelle_image = document.getElementById("nouvelle_particulier_image_equipement_creation").value;
    //console.log(profondeur);
    await modifier_equipement_particulier(profondeur,nouveau_nom,nouvelle_description,nouvelle_categorie_secondaire,nouvelle_image);
    
    const equipement_a_modifier = document.getElementById("equipement_particulier"+profondeur);
    if(nouveau_nom != ""){
        equipement_a_modifier.firstChild.firstChild.textContent = nouveau_nom;
    }
    if(nouvelle_categorie_secondaire != ""){
        equipement_a_modifier.children[1].children[0].textContent = nouvelle_categorie_secondaire;
    }
    if(nouvelle_description != ""){
        equipement_a_modifier.children[1].children[1].textContent = nouvelle_description;
    }
    if(nouvelle_image != ""){
        equipement_a_modifier.children[1].children[2].textContent = "image-"+nouvelle_image;
    }
    remise_a_null_de_modification_equipement_particulier();
}


async function supprimer_equipement_particulier(){
    await supression_equipement_particulier(profondeur);
    const ancien_equipement = document.getElementById("equipement_particulier"+profondeur);
    ancien_equipement.parentElement.removeChild(ancien_equipement);
}

async function recherche_equipement_particulier(){
    const liste_recherche = document.getElementById("resultat_de_recherche_equipement_particulier");
    var first = liste_recherche.firstElementChild.firstElementChild;
    while (first) {
        first.remove();
        first = liste_recherche.firstElementChild;
    }

    const recherche_nom = document.getElementById("recherche_nom_equipement_particulier").value;
    const recherche_description = document.getElementById("recherche_description_equipement_particulier").value;
    const recherche_categorie = document.getElementById("recherche_particulier_categorie_equipement_secondaire_creation").value;
    const recherche_image = document.getElementById("recherche_particulier_image_equipement_creation").value;

    const liste_des_resultats = await recherche_sql_equipement_particulier(recherche_nom,recherche_description,recherche_categorie,recherche_image,ID_etablissement);

    for(var i=0;i<liste_des_resultats.length;i++){
        //console.log(liste_des_resultats[i]["ID_Categorie_Equipement"]);
        creer_equipement_particulier(liste_des_resultats[i]["ID_Ep"],liste_des_resultats[i]["Nom_Ep"],liste_des_resultats[i]["Description_Ep"],liste_des_resultats[i]["ID_Categorie_Equipement"],liste_des_resultats[i]["Image_Equipement"],"resultat_de_recherche_equipement_particulier");
    }
    
    document.getElementById("recherche_nom_equipement_particulier").value = "";
    document.getElementById("recherche_description_equipement_particulier").value = "";
    document.getElementById("recherche_particulier_categorie_equipement_primaire_creation").value = "";
    document.getElementById("recherche_particulier_categorie_equipement_secondaire_creation").value = "";
    document.getElementById("recherche_particulier_image_equipement_creation").value = "";
}

/*
async function mise_en_place_equipement_particulier(){
    for(var i=0;i<Ep.length;i++){
        const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
        creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
    }
}
*/

async function mise_en_place_gestion_equipement_particulier(){
    remise_a_zero("gestion_creation_equipement_particulier");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_particulier_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_equipement_particulier").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_categorie").value;

    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_equipement_particulier = 0;
        for(var i=0;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_equipement_particulier = 0;
        for(var i=0;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

async function mise_en_place_recherche_ep(){
    remise_a_zero("recherche_mise_en_place_ep");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_ep_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_ep_nom_ep_recherche").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_ep_nom_categorie_recherche").value;

    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_recherche_equipement_particulier = 0;
        for(var i=0;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            if(Ep[i]["ID_Noeud"] == 0){
                creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
            }
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_recherche_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_recherche_equipement_particulier = 0;
        for(var i=0;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

async function avancer_dans_la_liste_gestion_equipement_particulier(){
    remise_a_zero("gestion_creation_equipement_particulier");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_particulier_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_equipement_particulier").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_categorie").value;

    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_equipement_particulier = index_derniere_page_gestion_equipement_particulier;
        for(var i=index_derniere_page_gestion_equipement_particulier;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_equipement_particulier = index_derniere_page_gestion_equipement_particulier;
        for(var i=index_derniere_page_gestion_equipement_particulier;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

async function avancer_dans_la_liste_mise_en_place_ep(){
    remise_a_zero("recherche_mise_en_place_ep");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_ep_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_ep_nom_ep_recherche").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_ep_nom_categorie_recherche").value;

    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_recherche_equipement_particulier = index_derniere_page_recherche_equipement_particulier;
        for(var i=index_derniere_page_recherche_equipement_particulier;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            if(Ep[i]["ID_Noeud"] == 0){
                creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
            }
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_recherche_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_recherche_equipement_particulier = index_derniere_page_recherche_equipement_particulier;
        for(var i=index_derniere_page_recherche_equipement_particulier;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

async function reculer_dans_la_liste_gestion_equipement_particulier(){
    remise_a_zero("gestion_creation_equipement_particulier");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_particulier_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_equipement_particulier").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_particulier_nom_categorie").value;
    var compteur = 0;
    for(var i=index_premiere_page_gestion_equipement_particulier;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_gestion_equipement_particulier = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        for(var i=index_premiere_page_gestion_equipement_particulier;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_gestion_equipement_particulier;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    creer_equipement_particulier(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"gestion_creation_equipement_particulier");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

async function reculer_dans_la_liste_mise_en_place_ep(){
    remise_a_zero("recherche_mise_en_place_ep");
    const nombre_signalement_a_mettre = document.getElementById("nombre_recherche_ep_par_page").value;
    const nom_equipement_particulier_recherche = document.getElementById("parametre_de_recherche_ep_nom_ep_recherche").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_ep_nom_categorie_recherche").value;
    var compteur = 0;
    for(var i=index_premiere_page_recherche_equipement_particulier;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_recherche_equipement_particulier = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_equipement_particulier_recherche == "" && nom_categorie_recherche == ""){
        for(var i=index_premiere_page_recherche_equipement_particulier;i<Ep.length;i++){
            const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
            if(Ep[i]["ID_Noeud"] == 0){
                creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
            }
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_recherche_equipement_particulier = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_recherche_equipement_particulier;i<Ep.length;i++){
            if(nom_equipement_particulier_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]) && Ep[i]["Nom_Ep"] == nom_equipement_particulier_recherche){
                    const categorie_ = await recherche_categorie(Ep[i]["ID_Categorie_Equipement"]);
                    if(Ep[i]["ID_Noeud"] == 0){
                        creer_equipement_particulier_a_ajouter(Ep[i]["ID_Ep"],Ep[i]["Nom_Ep"],Ep[i]["Description_Ep"],categorie_,Ep[i]["Image_Equipement"],"recherche_mise_en_place_ep");
                    }
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_recherche_equipement_particulier = i;
                        return;
                    }
                }
            }
        }
    }
}

function section(section_){
    for(let section of sections){
        section.style.display = "none";
    }
    const txt = "section"+section_;
    //console.log("txt = "+txt);
    document.getElementById(txt).style.display = "initial";
}

async function creation_equipement(){
    const Nom_equipement_ = document.getElementById("nom_equipement").value;
    const Categorie_equipement_ = document.getElementById("categorie_equipement_secondaire_creation").value;
    const Description_equipement_ = document.getElementById("description_equipement").value;
    const Image_equipement_ = document.getElementById("image_equipement_creation").value;

    const ID_Equipement = await ajout_equipement(Nom_equipement_,Categorie_equipement_,Image_equipement_,Description_equipement_,ID_etablissement);

    creer_equipement(Nom_equipement_,Categorie_equipement_,Description_equipement_,Image_equipement_,ID_Equipement, "gestion_creation_equipement");

    await request_signalement();

    document.getElementById("nom_equipement").value = "";
    document.getElementById("description_equipement").value = "";
}

/*
async function mise_en_place_equipement(){
    for(var i=0;i<Equipement.length;i++){
        const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
        creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
    }
}
*/

async function mise_en_place_gestion_equipement(){
    remise_a_zero("gestion_creation_equipement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_par_page").value;
    var compteur = 0;
    index_premiere_page_gestion_equipement = 0;
    for(var i=0;i<Equipement.length;i++){
        const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
        creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_derniere_page_gestion_equipement = i;
            return;
        }
    }
}

async function mise_en_place_gestion_equipement(){
    remise_a_zero("gestion_creation_equipement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_par_page").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_equipement_nom_equipement").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_nom_categorie").value;

    if(nom_equipement_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_equipement = 0;
        for(var i=0;i<Equipement.length;i++){
            const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
            creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_equipement = 0;
        for(var i=0;i<Equipement.length;i++){
            if(nom_categorie_recherche == ""){
                if(Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            if(nom_equipement_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]) && Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
        }
    }
}

async function avancer_dans_la_liste_gestion_equipement(){
    remise_a_zero("gestion_creation_equipement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_par_page").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_equipement_nom_equipement").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_nom_categorie").value;

    if(nom_equipement_recherche == "" && nom_categorie_recherche == ""){
        var compteur = 0;
        index_premiere_page_gestion_equipement = index_derniere_page_gestion_equipement;
        for(var i=index_derniere_page_gestion_equipement;i<Equipement.length;i++){
            const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
            creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement = i;
                return;
            }
        }
    }
    else{
        var compteur = 0;
        index_premiere_page_gestion_equipement = index_derniere_page_gestion_equipement;
        for(var i=index_derniere_page_gestion_equipement;i<Equipement.length;i++){
            if(nom_equipement_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]) && Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
        }
    }
}

async function reculer_dans_la_liste_gestion_equipement(){
    remise_a_zero("gestion_creation_equipement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_gestion_equipement_par_page").value;
    const nom_equipement_recherche = document.getElementById("parametre_de_recherche_equipement_nom_equipement").value;
    const nom_categorie_recherche = document.getElementById("parametre_de_recherche_equipement_nom_categorie").value;
    var compteur = 0;
    for(var i=index_premiere_page_gestion_equipement;i>=0;i--){
        compteur++;
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_gestion_equipement = i;
            i=-1;
        }
    }
    compteur = 0;


    if(nom_equipement_recherche == "" && nom_categorie_recherche == ""){
        for(var i=index_premiere_page_gestion_equipement;i<Equipement.length;i++){
            const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
            creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
            compteur++;
            if(compteur == nombre_signalement_a_mettre){
                index_derniere_page_gestion_equipement = i;
                return;
            }
        }
    }
    else{
        for(var i=index_premiere_page_gestion_equipement;i<Equipement.length;i++){
            if(nom_equipement_recherche == ""){
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"])){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            if(nom_categorie_recherche == ""){
                if(Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
            else{
                if(nom_categorie_recherche == await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]) && Equipement[i]["Nom_Equipement"] == nom_equipement_recherche){
                    const categorie_ = await recherche_categorie(Equipement[i]["ID_Categorie_Equipement"]);
                    creer_equipement(Equipement[i]["Nom_Equipement"],categorie_,Equipement[i]["Image_Equipement"],Equipement[i]["Description_Equipement"],Equipement[i]["ID_Equipement"],"gestion_creation_equipement");
                    compteur++;
                    if(compteur == nombre_signalement_a_mettre){
                        index_derniere_page_gestion_equipement = i;
                        return;
                    }
                }
            }
        }
    }
}


async function creer_equipement(Nom_equipement_,Categorie_equipement_,Description_equipement_, Image_equipement_, ID_Equipement, a_remplir){
    const rar_1 = document.createElement("div");
    rar_1.className = "gestion_equipement";

    const nom_equipement_ = document.createElement("div");
    nom_equipement_.className = "nom_equipement";
    nom_equipement_.textContent = Nom_equipement_;

    const rar_description = document.createElement("div");
    rar_description.className = "information_equipement";

    const description_ = document.createElement("div");
    description_.className = "description_equipement";
    description_.textContent = Description_equipement_;



    const categorie_equipement_ = document.createElement("div");
    categorie_equipement_.className = "categorie_equipement";
    categorie_equipement_.textContent = Categorie_equipement_;

    const image_ = document.createElement("div");
    image_.className = "image_equipement";
    image_.textContent = Image_equipement_;

    const ID_Equipement_ = document.createElement("div");
    ID_Equipement_.heigth = "0px";
    ID_Equipement_.width = "0px";
    ID_Equipement_.id = "ID_Equipement"+ID_Equipement;

    rar_description.append(categorie_equipement_, description_, image_,ID_Equipement_)

    rar_1.append(nom_equipement_);

    const rar_2 = document.createElement("div");
    rar_2.className = "menu_bouton";

    const modifier = document.createElement("div");
    modifier.className = "bouton_modifier";
    modifier.addEventListener("click", function() { mise_a_jour_profondeur(ID_Equipement);});
    modifier.addEventListener("click", function() { popup('modifier_equipement',1);});
    const image_modifier = document.createElement("img");
    image_modifier.src = "../image/icone_engrenage.png";
    image_modifier.style.width = "40px";
    image_modifier.style.height = "40px";
    

    const supprimer = document.createElement("div");
    supprimer.className = "bouton_supprimer";
    supprimer.addEventListener("click", function(){ mise_a_jour_profondeur(ID_Equipement);});
    supprimer.addEventListener("click", function(){ popup('supprimer_equipement',1);});
    const image_supprimer = document.createElement("img");
    image_supprimer.src = "../image/croix-sombre-brute.png";
    image_supprimer.style.width = "40px";
    image_supprimer.style.height = "40px";

    modifier.append(image_modifier);
    supprimer.append(image_supprimer);
    rar_2.append(modifier,supprimer);

    const trait = document.createElement("div");
    trait.className = "trait_equipement";

    const aremplir = document.getElementById(a_remplir);
    const rar_ = document.createElement("div");
    rar_.className = "equipement";
    rar_.id = "equipement"+ID_Equipement;
    rar_1.append(rar_2)
    rar_.append(rar_1, rar_description,trait);
    aremplir.append(rar_);
}

async function modification_equipement(){
    const nouveau_nom = document.getElementById("nouveau_nom_equipement").value;
    const nouvelle_description = document.getElementById("nouvelle_description_equipement").value;
    const nouvelle_categorie_secondaire = document.getElementById("nouvelle_categorie_equipement_secondaire_creation").value;
    const nouvelle_image = document.getElementById("nouvelle_image_equipement_creation").value;
    //console.log(profondeur);
    await modifier_equipement(profondeur,nouveau_nom,nouvelle_description,nouvelle_categorie_secondaire,nouvelle_image);
    
    const equipement_a_modifier = document.getElementById("equipement"+profondeur);
    if(nouveau_nom != ""){
        equipement_a_modifier.firstChild.firstChild.textContent = nouveau_nom;
    }
    if(nouvelle_categorie_secondaire != ""){
        equipement_a_modifier.children[1].children[0].textContent = nouvelle_categorie_secondaire;
    }
    if(nouvelle_description != ""){
        equipement_a_modifier.children[1].children[1].textContent = nouvelle_description;
    }
    if(nouvelle_image != ""){
        equipement_a_modifier.children[1].children[2].textContent = "image-"+nouvelle_image;
    }
    remise_a_null_de_modification_equipement();
}

async function supprimer_equipement(){
    await supression_equipement(profondeur);
    const ancien_equipement = document.getElementById("equipement"+profondeur);
    ancien_equipement.parentElement.removeChild(ancien_equipement);
}

async function recherche_equipement(){
    const liste_recherche = docuement.getElementById("resultat_de_recherche_equipement");
    var first = liste_recherche.firstElementChild;
    while (first) {
        first.remove();
        first = liste_recherche.firstElementChild;
    }

    const recherche_nom = document.getElementById("recherche_nom_equipement").value;
    const recherche_description = document.getElementById("recherche_description_equipement").value;
    const recherche_categorie = document.getElementById("recherche_categorie_equipement_secondaire_creation").value;
    const recherche_image = document.getElementById("recherche_image_equipement_creation").value;

    const liste_des_resultats = await recherche_sql_equipement(recherche_nom,recherche_description,recherche_categorie,recherche_image,ID_etablissement);

    for(var i=0;i<liste_des_resultats.length;i++){
        creer_equipement(liste_des_resultats[i]["Nom_Equipement"],liste_des_resultats[i]["ID_Categorie_equipement"],liste_des_resultats[i]["Description_Equipement"],liste_des_resultats[i]["Image_Equipement"],liste_des_resultats[i]["ID_Equipement"],"resultat_de_recherche_equipement");
    }
    
    document.getElementById("recherche_nom_equipement").value = "";
    document.getElementById("recherche_description_equipement").value = "";
    document.getElementById("recherche_categorie_equipement_primaire_creation").value = "";
    document.getElementById("recherche_categorie_equipement_secondaire_creation").value = "";
    document.getElementById("recherche_image_equipement_creation").value = "";
}

function mise_en_place_categorie(){
    const liste_categorie = document.getElementsByClassName("categorie_primaire");
    const premier_choix = document.createElement("option");
    premier_choix.valeur = "";
    premier_choix.textContent = "Choisissez une categorie";
    for(var i=0; i<liste_categorie.length;i++){
        liste_categorie[i].append(premier_choix);
        for(var j=0;j<Categorie.length;j++){
            const option = document.createElement("option");
            option.value = Categorie[j]["Nom_Categorie"];
            option.textContent = Categorie[j]["Nom_Categorie"];
            liste_categorie[i].append(option);
        }
    }
}

function charger_categorie_secondaire(nouvelle_ou_pas){
    const categorie_principale = document.getElementById(nouvelle_ou_pas+"categorie_equipement_primaire_creation").value;
    const div_liste = document.getElementById(nouvelle_ou_pas+"categorie_equipement_secondaire_creation");
    var first = div_liste.firstElementChild;
    while (first) {
        first.remove();
        first = div_liste.firstElementChild;
    }
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Choisissez une categorie";
    div_liste.append(option);
    for(var i=0; i<Categorie.length ;i++){
        if(Categorie[i]["Nom_Categorie"] == categorie_principale){
            for(var j=0; j<Categorie[i]["Fils"].length;j++){
                const option = document.createElement("option");
                option.value = Categorie[i]["Fils"][j]["Nom_Categorie"];
                option.textContent = Categorie[i]["Fils"][j]["Nom_Categorie"];
                div_liste.append(option);
            }
        }
    }
}


function charger_image(nouvelle_ou_pas){
    const categorie_secondaire = document.getElementById(nouvelle_ou_pas+"categorie_equipement_secondaire_creation").value;
    const div_liste = document.getElementById(nouvelle_ou_pas+"image_equipement_creation");
    var first = div_liste.firstElementChild;
    while (first) {
        first.remove();
        first = div_liste.firstElementChild;
    }
    
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Choisissez une image";
    div_liste.append(option);
    for(var i=0;i<Categorie.length;i++){
        for(var j=0;j<Categorie[i]["Fils"].length;j++){
            if(Categorie[i]["Fils"][j]["Nom_Categorie"] == categorie_secondaire){
                for(var k=0; k<Categorie[i]["Fils"][j]["ID_Image_Max"];k++){
                    const option = document.createElement("option");
                    option.value = k;
                    option.textContent = "image-"+k;
                    div_liste.append(option);
                }
            }
        }
    }
}

function remise_a_null_de_modification_equipement(){
    document.getElementById("nouveau_nom_equipement").value = "";
    document.getElementById("nouvelle_description_equipement").value = "";
    document.getElementById("nouvelle_categorie_equipement_primaire_creation").value = "";
    document.getElementById("nouvelle_categorie_equipement_secondaire_creation").value = "";
    document.getElementById("nouvelle_image_equipement_creation").value = "";
}

function remise_a_null_de_modification_equipement_particulier(){
    document.getElementById("nouveau_nom_equipement_particulier").value = "";
    document.getElementById("nouvelle_description_equipement_particulier").value = "";
    document.getElementById("nouvelle_particulier_categorie_equipement_primaire_creation").value = "";
    document.getElementById("nouvelle_particulier_categorie_equipement_secondaire_creation").value = "";
    document.getElementById("nouvelle_particulier_image_equipement_creation").value = "";
}



// -------------------------------------------------------------------------------------------------------------------------------------------------------

//                                           Signalement

function remise_a_zero(id){
    const liste_incident = document.getElementById(id);
    var first = liste_incident.children[1];
    while (first) {
        first.remove();
        first = liste_incident.children[1];
    }
}


function mise_en_place_nouveau_signalement(){
    remise_a_zero("gestion_nouveau_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_signalement_par_page").value;
    var compteur = 0;
    index_premiere_page_signalement = 0;
    for(var i=0;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] == "0"){
            ajout_nouveau_signalement(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_signalement_a_mettre){
            index_derniere_page_signalement = i;
            return;
        }
    }
}

function avancer_dans_la_liste_signalement(){
    remise_a_zero("gestion_nouveau_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_signalement_par_page").value;
    var compteur = 0;
    index_premiere_page_signalement = index_derniere_page_signalement;
    for(var i=index_derniere_page_signalement;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            ajout_nouveau_signalement(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_signalement_a_mettre){
            index_derniere_page_signalement = i;
            return;
        }
    }
}

function reculer_dans_la_liste_signalement(){
    remise_a_zero("gestion_nouveau_signalement");
    const nombre_signalement_a_mettre = document.getElementById("nombre_signalement_par_page").value;
    var compteur = 0;
    for(var i=index_premiere_page_signalement;i>=0;i--){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            compteur++;
        }
        if(compteur == nombre_signalement_a_mettre){
            index_premiere_page_signalement = i;
            i=-1;
        }
    }
    compteur = 0;
    for(var i=index_premiere_page_signalement;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            ajout_nouveau_signalement(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_signalement_a_mettre){
            index_derniere_page_signalement = i;
            return;
        }
    }
}

function ajout_nouveau_signalement(ID_Incidence,ID_Signalement,Commentaire_Signalement, ID_Utilisateur,Heure_du_signalement){
    const nouveau_signalement_a_ajouter = document.createElement("div");
    const liste_des_nouveaux_signalement = document.getElementById("gestion_nouveau_signalement");

    nouveau_signalement_a_ajouter.className = "nouveau_signalement";
    nouveau_signalement_a_ajouter.id = "nouveau_signalement"+ID_Signalement;


    const Commentaire_Signalement_ = document.createElement("div");
    Commentaire_Signalement_.textContent = Commentaire_Signalement;
    Commentaire_Signalement_.className = "commentaire_signalement";

    const ID_Utilisateur_ = document.createElement("div");
    ID_Utilisateur_.className = "ID_Utilisateur";
    ID_Utilisateur_.textContent = ID_Utilisateur;

    const Heure_du_signalement_ = document.createElement("div");
    Heure_du_signalement_.className = "heure_du_signalement";
    Heure_du_signalement_.textContent = Heure_du_signalement;

    const Nom_Signalement_ = document.createElement("div");
    Nom_Signalement_.className = "nom_signalement";
    for(var i=0;i<Signalement_.length;i++){
        //console.log("Signalement_[i][Nom_Signalement] = " + Signalement_[i]["Nom_signalement"]);
        if(Signalement_[i]["ID_Signalement"] == ""+ID_Signalement){
            
            Nom_Signalement_.textContent = Signalement_[i]["Nom_signalement"];
            
            var temp_ = Signalement_[i]["ID_Noeud"];
        }
    }

    const Probleme_rencontre  = document.createElement("div");
    Probleme_rencontre.className = "probleme_signalement_ticketing";
    for(var i=0;i<Signalement_.length;i++){
        if(Signalement_[i]["ID_Signalement"] == ""+ID_Signalement){
            for(var j=0;j<liste_associe_au_signalement.length;j++){
                if(Signalement_[i]["Equipement"][j] == 1){
                    //console.log("liste_associe_au_signalement[i][Nom_Equipement] = " + liste_associe_au_signalement[j]["Nom_Equipement"]);
                    const probleme = document.createElement("div");
                    probleme.textContent = liste_associe_au_signalement[j]["Nom_Equipement"];
                    Probleme_rencontre.append(probleme);
                }
            }
        }
    }
    
    const Lieu_Signalement_ = document.createElement("div");
    Lieu_Signalement_.className = "lieu_signalement";
    if(temp_ != 0){
        const Lieu = recherche_noeud(temp_,Arborescence);
        if(Lieu != 0){
            Lieu_Signalement_.textContent = Lieu[0]["Localisation"];
        }
    }

    const Bouton_choix_des_actions = document.createElement("div");
    Bouton_choix_des_actions.className = "bouton_changement_detat_signalement";
    Bouton_choix_des_actions.classList.add("choix");
    Bouton_choix_des_actions.textContent = "Changer d'état";
    Bouton_choix_des_actions.addEventListener("click", function(){ popup('changement_detat_signalement', 1); mise_a_jour_profondeur(ID_Incidence)});

    nouveau_signalement_a_ajouter.append(Nom_Signalement_,Commentaire_Signalement_,Lieu_Signalement_,Heure_du_signalement_,ID_Utilisateur_,Probleme_rencontre,Bouton_choix_des_actions);
    liste_des_nouveaux_signalement.append(nouveau_signalement_a_ajouter);
    
}

async function changement_detat_signalement(){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_etat_signalement.php?ID_Incidence="+profondeur+"&Nouvel_Etat="+document.getElementById("etat_signalement").value+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    await request_incidents_globaux();
    const liste_signalement = document.getElementById("gestion_nouveau_signalement");
    //console.log(liste_signalement);
    var first = liste_signalement.children[1];
    while (first) {
        first.remove();
        first = liste_signalement.children[1];
    }
    mise_en_place_nouveau_signalement();
    await request_incidents_globaux();
    remise_a_zero("gestion_incident");
    mise_en_place_incident();
}






let noeud;
function recherche_noeud(ID_Noeud,semi_arbo_){
    if(semi_arbo_.length>0){
        if(semi_arbo_[0]["ID_Noeud"] == ID_Noeud){
            let a_envoyer = [];
            a_envoyer.push(semi_arbo_[0]);
            return a_envoyer;
        }
        else{
            var temp = [];
            var index;
            for(var i=0;i<semi_arbo_[0]["Fils"].length;i++){
                temp.push(recherche_noeud(ID_Noeud,[semi_arbo_[0]["Fils"][i]]));
                if(temp[i] != undefined){
                    index = i;
                }
            }
            return temp[index];
        }
    }
    return 0;
}


//                                           Incident

function mise_en_place_incident(){
    remise_a_zero("gestion_incident");
    const nombre_dincident_a_mettre = document.getElementById("nombre_dincident_par_page").value;
    var compteur = 0;
    index_premiere_page_incident = 0;
    //console.log(Incident_globaux);
    for(var i=0;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] != "0" && Incident_globaux[i]["Etat_Incident"] != "6"){
            ajout_incident(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_dincident_a_mettre){
            index_derniere_page_incident = i;
            return;
        }
    }
}

function avancer_dans_la_liste_incident(){
    remise_a_zero("gestion_incident");
    const nombre_dincident_a_mettre = document.getElementById("nombre_dincident_par_page").value;
    var compteur = 0;
    index_premiere_page_incident = index_derniere_page_incident;
    for(var i=index_derniere_page_incident;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            ajout_incident(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_dincident_a_mettre){
            index_derniere_page_incident = i;
            return;
        }
    }
}

function reculer_dans_la_liste_incident(){
    remise_a_zero("gestion_incident");
    const nombre_dincident_a_mettre = document.getElementById("nombre_dincident_par_page").value;
    var compteur = 0;
    for(var i=index_premiere_page_incident;i>=0;i--){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            compteur++;
        }
        if(compteur == nombre_dincident_a_mettre){
            index_premiere_page_incident = i;
            i=-1;
        }
    }
    compteur = 0;
    for(var i=index_premiere_page_incident;i<Incident_globaux.length;i++){
        if(Incident_globaux[i]["Etat_Incident"] != "1"){
            ajout_incident(Incident_globaux[i]["ID_Incidence"],Incident_globaux[i]["ID_Signalement"],Incident_globaux[i]["Commentaire_Signalement"],Incident_globaux[i]["Etat_Incident"],Incident_globaux[i]["Heure_du_signalement"],Incident_globaux[i]["Heure_de_la_Livraison"],Incident_globaux[i]["Heure_de_la_Reparation"],Incident_globaux[i]["Heure_de_la_Classification"],Incident_globaux[i]["Heure_de_la_Commande"],Incident_globaux[i]["ID_Utilisateur"]);
            compteur++;
        }
        if(compteur == nombre_dincident_a_mettre){
            index_derniere_page_incident = i;
            return;
        }
    }
}

function ajout_incident(ID_Incidence,ID_Signalement,Commentaire_incident,Etat_Incident,Heure_du_incident,Heure_de_la_commande,Heure_de_la_livraison,Heure_de_la_Reparation,Heure_de_la_Classification,ID_Utilisateur){
    const nouveau_incident_a_ajouter = document.createElement("div");
    const liste_des_nouveaux_incident = document.getElementById("gestion_incident");

    nouveau_incident_a_ajouter.className = "nouveau_incident";
    nouveau_incident_a_ajouter.id = "nouveau_incident"+ID_Incidence;


    const Commentaire_incident_ = document.createElement("div");
    Commentaire_incident_.textContent = Commentaire_incident;
    Commentaire_incident_.className = "commentaire_incident";

    const Etat_Incident_ = document.createElement("div");
    Etat_Incident_.textContent = Etat_Incident;
    Etat_Incident_.className = "etat_incident";

    const Heure_de_la_commande_ = document.createElement("div");
    Heure_de_la_commande_.textContent = Heure_de_la_commande;
    Heure_de_la_commande_.className = "Heure_de_la_commande";

    const Heure_de_la_livraison_ = document.createElement("div");
    Heure_de_la_livraison_.textContent = Heure_de_la_livraison;
    Heure_de_la_livraison_.className = "Heure_de_la_livraison";

    const Heure_de_la_Reparation_ = document.createElement("div");
    Heure_de_la_Reparation_.textContent = Heure_de_la_Reparation;
    Heure_de_la_Reparation_.className = "Heure_de_la_Reparation";

    const Heure_de_la_Classification_ = document.createElement("div");
    Heure_de_la_Classification_.textContent = Heure_de_la_Classification;
    Heure_de_la_Classification_.className = "Heure_de_la_Classification";



    const ID_Utilisateur_ = document.createElement("div");
    ID_Utilisateur_.className = "ID_Utilisateur";
    ID_Utilisateur_.textContent = ID_Utilisateur;

    const Heure_du_incident_ = document.createElement("div");
    Heure_du_incident_.className = "heure_du_incident";
    Heure_du_incident_.textContent = Heure_du_incident;

    const Nom_incident_ = document.createElement("div");
    Nom_incident_.className = "nom_incident";
    var temp;
    //console.log(Signalement_);
    for(var i=0;i<Signalement_.length;i++){
        if(Signalement_[i]["ID_Signalement"] == ID_Signalement){
            Nom_incident_.textContent = Signalement_[i]["Nom_signalement"];
            temp = Signalement_[i]["ID_Noeud"];
        }
    }
    
    const Lieu_incident_ = document.createElement("div");
    Lieu_incident_.className = "lieu_incident";

    const Lieu = recherche_noeud(temp,Arborescence);
    //console.log(Lieu);

    if(Lieu != undefined){
        Lieu_incident_.textContent = Lieu[0]["Localisation"];
    }

    const bouton_changement_detat = document.createElement("div");
    bouton_changement_detat.className = "bouton_changement_detat_incident";
    bouton_changement_detat.classList.add("choix");
    bouton_changement_detat.textContent = "Changer d'état l'incident";
    bouton_changement_detat.addEventListener("click", function() {popup('changement_detat_incident', 1), mise_a_jour_profondeur(ID_Incidence)});

    nouveau_incident_a_ajouter.append(Nom_incident_,Commentaire_incident_,Etat_Incident_,Lieu_incident_,Heure_du_incident_,Heure_de_la_commande_,Heure_de_la_livraison_,Heure_de_la_Reparation_,Heure_de_la_Classification_,ID_Utilisateur_,bouton_changement_detat);
    liste_des_nouveaux_incident.append(nouveau_incident_a_ajouter);
}

async function changement_detat_incident(){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_etat_incident.php?ID_Incidence="+profondeur+"&Nouvel_Etat="+document.getElementById("etat_incident").value+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    await request_incidents_globaux();
    remise_a_zero("gestion_incident");
    mise_en_place_incident();
}

//------------------------------------------------------------------------------------------------------------------------------

//                                      Personalisation


function modifier_couleur_de_fond(){
    const couleur_de_fond = document.getElementById("couleur_de_fond").value;
    document.getElementById("faux_body").style.backgroundColor = couleur_de_fond;
}

function modifier_couleur_de_cadre(){
    const couleur_de_cadre = document.getElementById("couleur_de_cadre").value;
    document.getElementById("faux_cadre").style.backgroundColor = couleur_de_cadre;
}

function modifier_couleur_exceptionnel(){
    const couleur_exceptionnel = document.getElementById("couleur_exceptionnel").value;
    document.getElementById('faux_bandeau').style.backgroundColor = couleur_exceptionnel;
    document.getElementById("faux_trait").style.backgroundColor = couleur_exceptionnel;
}

let image_personalisation;

var modifier_faux_logo = function (e){
    const [picture] = e.files;
    if (picture) {
        document.getElementById("faux_logo").src = URL.createObjectURL(picture);
        image_personalisation = URL.createObjectURL(picture);
    }
}

async function valider_le_choix_des_propriétés(){
    const image = document.getElementById("logo");
    const couleur_de_fond = document.getElementById("--couleur-de-fond").value;
    const couleur_de_cadre = document.getElementById("--couleur-de-cadre").value;
    const couleur_exceptionnel = document.getElementById("--couleur-exceptionnel").value;
    const couleur_ecriture = document.getElementById("--couleur-ecriture").value;
    console.log(couleur_ecriture);
    const couleur_bouton = document.getElementById("--couleur-bouton").value;
    const couleur_bouton_ecriture = document.getElementById("--couleur-bouton-ecriture").value;
    const couleur_de_lombre_du_bouton = document.getElementById("--couleur-de-lombre-du-bouton").value;
    var file = image.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", async () => {
        // on convertit l'image en une chaîne de caractères base64
        var test = reader.result;
        var formData = new FormData();
        formData.append("couleur_de_fond", couleur_de_fond);
        formData.append("couleur_de_cadre", couleur_de_cadre);
        formData.append("couleur_exceptionnel", couleur_exceptionnel);
        formData.append("couleur_ecriture", couleur_ecriture);
        formData.append("couleur_bouton", couleur_bouton);
        formData.append("couleur_bouton_ecriture", couleur_bouton_ecriture);
        formData.append("couleur_de_lombre_du_bouton", couleur_de_lombre_du_bouton);
        formData.append("ID_Etablissement", ID_etablissement);
        formData.append("image", test);
        await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_de_la_personalisation.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
      }, false);
    if (file) {
        reader.readAsDataURL(file);
    } 
    else{
        var formData = new FormData();
        formData.append("couleur_de_fond", couleur_de_fond);
        formData.append("couleur_de_cadre", couleur_de_cadre);
        formData.append("couleur_exceptionnel", couleur_exceptionnel);
        formData.append("couleur_ecriture", couleur_ecriture);
        formData.append("couleur_bouton", couleur_bouton);
        formData.append("couleur_bouton_ecriture", couleur_bouton_ecriture);
        formData.append("couleur_de_lombre_du_bouton", couleur_de_lombre_du_bouton);
        formData.append("ID_Etablissement", ID_etablissement);
        formData.append("image", "");
        await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_de_la_personalisation.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
    }
    console.log("data mise a jour");
    
}

function hexToRgb(hex) {
    // Retire le "#" de la valeur hexadécimale
    hex = hex.replace("#", "");
  
    // Convertit la valeur hexadécimale en valeurs R, G, B décimales
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);
  
    // Retourne une chaîne de caractères représentant les valeurs R, G, B
    return "rgb(" + r + ", " + g + ", " + b + ", 0.2)";
}

function rgbaToHex(rgba) {
    const rgbaArray = rgba.replace(/[^\d,.]/g, '').split(',');
    const r = parseInt(rgbaArray[0]);
    const g = parseInt(rgbaArray[1]);
    const b = parseInt(rgbaArray[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
  }
  
  

async function recuperation_information_personnalisation_etablissement(){
    let Personnalisation = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recuperation_de_la_personalisation.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    console.log(Personnalisation);
    document.getElementById("--couleur-de-fond").value = Personnalisation[0]["Couleur_de_fond"];
    document.getElementById("--couleur-de-cadre").value = Personnalisation[0]["Couleur_de_case"];
    document.getElementById("--couleur-exceptionnel").value = Personnalisation[0]["Couleur_dombre_de_case"];
    document.getElementById("--couleur-ecriture").value = Personnalisation[0]["Couleur_ecriture"];
    document.getElementById("--couleur-bouton").value = Personnalisation[0]["Couleur_bouton"];
    document.getElementById("--couleur-bouton-ecriture").value = Personnalisation[0]["Couleur_bouton_ecriture"];
    document.getElementById("--couleur-de-lombre-du-bouton").value = rgbaToHex(Personnalisation[0]["Couleur_de_lombre_du_bouton"]);
    document.getElementById("police_de_caractere").value = Personnalisation[0]["Police_de_caractere"];

    var r  = document.querySelector(':root');
    r.style.setProperty('--couleur-de-fond', Personnalisation[0]["Couleur_de_fond"]);
    r.style.setProperty('--couleur-de-case', Personnalisation[0]["Couleur_de_case"]);
    r.style.setProperty('--couleur-dombre_de_case', Personnalisation[0]["Couleur_dombre_de_case"]);
    r.style.setProperty('--couleur-ecriture', Personnalisation[0]["Couleur_ecriture"]);
    r.style.setProperty('--couleur-bouton', Personnalisation[0]["Couleur_bouton"]);
    r.style.setProperty('--couleur-bouton-ecriture', Personnalisation[0]["Couleur_bouton_ecriture"]);
    r.style.setProperty('--couleur-de-lombre-du-bouton', Personnalisation[0]["Couleur_de_lombre_du_bouton"]);

    //document.getElementById("faux_body").style.backgroundColor = Personnalisation[0]["Couleur_de_fond"];
    //document.getElementById("faux_cadre").style.backgroundColor = Personnalisation[0]["Couleur_de_case"];
    //document.getElementById('faux_bandeau').style.backgroundColor = Personnalisation[0]["Couleur_dombre_de_case"];
    //document.getElementById("faux_trait").style.backgroundColor = Personnalisation[0]["Couleur_bouton"];

    //console.log(document.getElementById("logo").value);
    //document.getElementById("faux_logo").src = Personnalisation[0]["Logo"];
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//                               Statistiques

async function mise_en_place_des_statistiques(){
    const liste_info_signalement = document.getElementById("statistique_signalement");
    const liste_info_ep = document.getElementById("statistique_ep");

    const jour = new Date().getDate();
    const mois = new Date().getMonth();
    const annee = new Date().getFullYear();
    const heure = new Date().getHours();
    //console.log(jour);

    var nombre_de_signalement_de_la_journée = 0;
    var somme_des_heures_des_signalements = 0;
    var heure_moyenne_des_signalements = 0;
    var tab_heure = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    // Signalement 

        // Nombre de signalement totale
        if(statistique[0] != null){

        
        const div_nombre_totale_signalements = document.createElement('div');
        div_nombre_totale_signalements.textContent = "Le nombre totale de signalements est : " + statistique[0]["Signalement"].length;
        liste_info_signalement.append(div_nombre_totale_signalements);


        // Le nombre de signalement de la journée

        for(var i=0;i<statistique[0]["Signalement"].length;i++){
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(8,10) == jour){
                //console.log(statistique[0]["Signalement"][i]["Heure_du_signalement"]);
                nombre_de_signalement_de_la_journée++;
            }
        }

        const div_nombre_de_signalement_de_la_journée = document.createElement("div");
        div_nombre_de_signalement_de_la_journée.textContent = "Le nombre de signalement de la journée est : " + nombre_de_signalement_de_la_journée;
        liste_info_signalement.append(div_nombre_de_signalement_de_la_journée);

        // L'heure moyenne des signalements

        for(var i=0;i<statistique[0]["Signalement"].length;i++){
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '01'){
                somme_des_heures_des_signalements += 1;
                tab_heure[1]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '02'){
                somme_des_heures_des_signalements += 2;
                tab_heure[2]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '03'){
                somme_des_heures_des_signalements += 3;
                tab_heure[3]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '04'){
                somme_des_heures_des_signalements += 4;
                tab_heure[4]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '05'){
                somme_des_heures_des_signalements += 5;
                tab_heure[5]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '06'){
                somme_des_heures_des_signalements += 6;
                tab_heure[6]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '07'){
                somme_des_heures_des_signalements += 7;
                tab_heure[7]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '08'){
                somme_des_heures_des_signalements += 8;
                tab_heure[8]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '09'){
                somme_des_heures_des_signalements += 9;
                tab_heure[9]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '10'){
                somme_des_heures_des_signalements += 10;
                tab_heure[10]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '11'){
                somme_des_heures_des_signalements += 11;
                tab_heure[11]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '12'){
                somme_des_heures_des_signalements += 12;
                tab_heure[12]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '13'){
                somme_des_heures_des_signalements += 13;
                tab_heure[13]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '14'){
                somme_des_heures_des_signalements += 14;
                tab_heure[14]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '15'){
                somme_des_heures_des_signalements += 15;
                tab_heure[15]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '16'){
                somme_des_heures_des_signalements += 16;
                tab_heure[16]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '17'){
                somme_des_heures_des_signalements += 17;
                tab_heure[17]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '18'){
                somme_des_heures_des_signalements += 18;
                tab_heure[18]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '19'){
                somme_des_heures_des_signalements += 19;
                tab_heure[19]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '20'){
                somme_des_heures_des_signalements += 20;
                tab_heure[20]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '21'){
                somme_des_heures_des_signalements += 21;
                tab_heure[21]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '22'){
                somme_des_heures_des_signalements += 22;
                tab_heure[22]++;
            }
            if(statistique[0]["Signalement"][i]["Heure_du_signalement"].substring(11,13) == '23'){
                somme_des_heures_des_signalements += 23;
                tab_heure[23]++;
            }
        }

        heure_moyenne_des_signalements = somme_des_heures_des_signalements/(statistique[0]["Signalement"].length);

        const div_heure_moyenne_des_signalements = document.createElement("div");
        div_heure_moyenne_des_signalements.textContent = "l'heure moyenne des signalements est : " + heure_moyenne_des_signalements;
        liste_info_signalement.append(div_heure_moyenne_des_signalements);

        // L'heure pour laquelle il y le plus de signalements

        var heure_la_plus_fréquenté=0;
        var max=0;

        for(var i=0;i<24;i++){
            if(tab_heure[i] > max){
                max = tab_heure[i];
                heure_la_plus_fréquenté = i;
            }
        }

        const div_heure_avec_le_plus_de_signalement = document.createElement("div");
        div_heure_avec_le_plus_de_signalement.textContent = "L'heure avec le plus de signalements est : " + heure_la_plus_fréquenté;
        liste_info_signalement.append(div_heure_avec_le_plus_de_signalement);

        // Le classement des Equipements les plus utilisés

        await request_signalement();
        var tableau_equipement = new Array();

        for(var i=0;i<statistique[0]["Signalement"][0]["Equipement"].length;i++){
            tableau_equipement.push(0);
        }

        for(var i=0;i<statistique[0]["Signalement"].length;i++){
            for(var j=0;j<statistique[0]["Signalement"][i]["Equipement"].length;j++){
                if(statistique[0]["Signalement"][i]["Equipement"][j] == "1"){
                    tableau_equipement[j]++;
                }
            }
        }
        //console.log(liste_associe_au_signalement);

        const tableau_des_equipements_et_de_leur_classement = document.createElement("table");
        const ligne_de_presentation = document.createElement("tr");
        tableau_des_equipements_et_de_leur_classement.append(ligne_de_presentation);
        const tableau_classement = document.createElement("td");
        tableau_classement.textContent = "Classement";
        const tableau_nom = document.createElement("td");
        tableau_nom.textContent = "Nom";
        const tableau_nombre = document.createElement("td");
        tableau_nombre.textContent = "Nombre";
        ligne_de_presentation.append(tableau_classement,tableau_nom,tableau_nombre);

        var maximum=0;
        var indice_maximum=0;

        var tab_nombre = new Array();
        var tab_indice = new Array();
        var deja_present =0;
        //console.log(tab_indice);
        while(tab_indice.length!= tableau_equipement.length){
            maximum=0;
            indice_maximum=0;
            for(var i=0;i<tableau_equipement.length;i++){
                deja_present=0;
                for(var j=0;j<tab_indice.length;j++){
                    if(i == tab_indice[j]){
                        deja_present=1;
                    }
                }
                if(tableau_equipement[i]> maximum && deja_present==0){
                    maximum = tableau_equipement[i];
                    indice_maximum = i;
                }
            }
            tab_indice.push(indice_maximum);
            tab_nombre.push(maximum);
        }
        for(var i=0;i<tab_indice.length;i++){
            const container = document.createElement("tr");
            const div_equipement_classement = document.createElement("td");
            div_equipement_classement.textContent = ""+tab_indice[i];
            const div_equipement_nom = document.createElement("td");
            if(liste_associe_au_signalement[tab_indice[i]] != null){
                div_equipement_nom.textContent = ""+liste_associe_au_signalement[tab_indice[i]]["Nom_Equipement"];
            }
            
            const div_equipement_nombre = document.createElement("td");
            div_equipement_nombre.textContent = ""+tab_nombre[i];

            container.append(div_equipement_classement,div_equipement_nom,div_equipement_nombre);
            tableau_des_equipements_et_de_leur_classement.append(container);
        }

        liste_info_signalement.append(tableau_des_equipements_et_de_leur_classement);
    }


    // Equipement Particulier

        // Nombre de signalements totales

        const div_nombre_total_equipement = document.createElement("div");
        if(statistique[1] != null){
            div_nombre_total_equipement.textContent = "Le nombre total de signalement pour les équipement particulier est : " + statistique[1]["Equipement"].length;
        
        liste_info_ep.append(div_nombre_total_equipement);
        

        // nombre de Ep dans la journée

        var nombre_de_ep_de_la_journée = 0;
        var somme_des_heures_des_ep = 0;
        var heure_moyenne_des_ep = 0;
        var tab_heure_ep = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];



        for(var i=0;i<statistique[1]["Equipement"].length;i++){
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(8,10) == jour){
                nombre_de_ep_de_la_journée++;
            }
        }

        const div_nombre_de_ep_de_la_journée = document.createElement("div");
        div_nombre_de_ep_de_la_journée.textContent = "Le nombre de signalement de la journée est : " + nombre_de_ep_de_la_journée;
        liste_info_signalement.append(div_nombre_de_ep_de_la_journée);

        // L'heure moyenne des signalements

        for(var i=0;i<statistique[1]["Equipement"].length;i++){
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '01'){
                somme_des_heures_des_ep += 1;
                tab_heure_ep[1]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '02'){
                somme_des_heures_des_ep += 2;
                tab_heure_ep[2]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '03'){
                somme_des_heures_des_ep += 3;
                tab_heure_ep[3]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '04'){
                somme_des_heures_des_ep += 4;
                tab_heure_ep[4]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '05'){
                somme_des_heures_des_ep += 5;
                tab_heure_ep[5]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '06'){
                somme_des_heures_des_ep += 6;
                tab_heure_ep[6]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '07'){
                somme_des_heures_des_ep += 7;
                tab_heure_ep[7]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '08'){
                somme_des_heures_des_ep += 8;
                tab_heure_ep[8]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '09'){
                somme_des_heures_des_ep += 9;
                tab_heure_ep[9]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '10'){
                somme_des_heures_des_ep += 10;
                tab_heure_ep[10]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '11'){
                somme_des_heures_des_ep += 11;
                tab_heure_ep[11]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '12'){
                somme_des_heures_des_ep += 12;
                tab_heure_ep[12]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '13'){
                somme_des_heures_des_ep += 13;
                tab_heure_ep[13]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '14'){
                somme_des_heures_des_ep += 14;
                tab_heure_ep[14]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '15'){
                somme_des_heures_des_ep += 15;
                tab_heure_ep[15]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '16'){
                somme_des_heures_des_ep += 16;
                tab_heure_ep[16]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '17'){
                somme_des_heures_des_ep += 17;
                tab_heure_ep[17]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '18'){
                somme_des_heures_des_ep += 18;
                tab_heure_ep[18]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '19'){
                somme_des_heures_des_ep += 19;
                tab_heure_ep[19]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '20'){
                somme_des_heures_des_ep += 20;
                tab_heure_ep[20]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '21'){
                somme_des_heures_des_ep += 21;
                tab_heure_ep[21]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '22'){
                somme_des_heures_des_ep += 22;
                tab_heure_ep[22]++;
            }
            if(statistique[1]["Equipement"][i]["Heure_du_signalement"].substring(11,13) == '23'){
                somme_des_heures_des_ep += 23;
                tab_heure_ep[23]++;
            }
        }

        heure_moyenne_des_ep = somme_des_heures_des_ep/(statistique[1]["Equipement"].length);

        const div_heure_moyenne_des_ep = document.createElement("div");
        div_heure_moyenne_des_ep.textContent = "l'heure moyenne des signalements est : " + heure_moyenne_des_ep;
        liste_info_signalement.append(div_heure_moyenne_des_ep);

        }

        // Heure la plus fréquenté 

        heure_la_plus_fréquenté=0;
        max=0;

        if(tab_heure_ep != null){
            for(var i=0;i<24;i++){
                if(tab_heure_ep[i] > max){
                    max = tab_heure_ep[i];
                    heure_la_plus_fréquenté = i;
                }
            }
        }

        const div_heure_avec_le_plus_de_ep = document.createElement("div");
        div_heure_avec_le_plus_de_ep.textContent = "L'heure avec le plus de signalements est : " + heure_la_plus_fréquenté;
        liste_info_signalement.append(div_heure_avec_le_plus_de_ep);

        // L'état moyen des signalements
}


function afficher_graphe() {
    const nomElement = document.getElementById("nom_element").value;
  
    fetch("recuperer_donnees_graphe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nomElement })
    })
      .then(response => response.json())
      .then(data => {
        const labels = data.labels;
        const dataset = data.dataset;
  
        const ctx = document.getElementById("graphique").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Nombre d'incidents",
                data: dataset,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Nombre d\'incidents'
                    }
                }]
            }
        }
        
        });
      })
      .catch(error => console.error(error));
  }

  function afficherGraphique() {
    const nomElementSelectionne = document.getElementById("nom-element").value;
    // Envoyer une requête fetch pour récupérer les données pour ce nom_element
    fetch("donnees_graphique.php?nom_element=" + encodeURIComponent(nomElementSelectionne))
      .then(response => response.json())
      .then(data => {
        // Mettre à jour les labels et les données du graphe avec les données reçues
        graphique.data.labels = data.labels;
        graphique.data.datasets[0].data = data.values;
        graphique.update();
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données : ", error);
      });
  }
  




//----------------------------------------------------------------------------------------------------------------------------------------------------------

//                      Administrateurs

function mise_en_place_de_la_liste_des_admins(){
    const div_liste = document.getElementById("liste_des_admins");
    for(var i=0;i<liste_admins.length;i++){
        const div_admin = document.createElement("div");
        const username_admin = document.createElement("div");
        const bouton_suppression = document.createElement("div");

        username_admin.textContent = liste_admins[i]["Username_Utilisateur"];

        const var_ = liste_admins[i]["ID_Professionnel"];
        bouton_suppression.classname= "choix";
        bouton_suppression.addEventListener("click", function () {suppression_de_ladmin(var_);});

        const image_bouton_suppression = document.createElement("img");
        image_bouton_suppression.src = "../image/croix-sombre-brute.png";
        image_bouton_suppression.style.width = "40px";
        image_bouton_suppression.style.height = "40px";

        bouton_suppression.append(image_bouton_suppression);

        div_admin.append(username_admin, bouton_suppression);
        div_liste.append(div_admin);
    }
}

async function suppression_de_ladmin(ID_Admin){

    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_admin.php?ID_Professionnel="+ID_Admin).then(res => res.json()).then(data => {return data;});
    remise_a_zero("liste_des_admins");

    await recuperation_des_admins();
    mise_en_place_de_la_liste_des_admins();
}

async function ajout_dun_administrateur(){
    const nom_admin = document.getElementById("nom_administrateur").value;
    const prenom_admin = document.getElementById("prenom_administrateur").value;
    const mail_admin = document.getElementById("mail_administrateur").value;
    const username_admin = document.getElementById("username_administrateur").value;
    const mdp_admin = document.getElementById("mot_de_passe_administrateur").value;
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_admin.php?Nom_Administrateur="+nom_admin+"&Prenom_Administrateur="+prenom_admin+"&Mail_Administrateur="+mail_admin+"&Username_Administrateur="+username_admin+"&Mot_de_passe_Administrateur="+mdp_admin+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    remise_a_zero("liste_des_admins");

    await recuperation_des_admins();
    mise_en_place_de_la_liste_des_admins();
}

async function modification_de_mot_de_passe(){
    const nouveau_mdp = document.getElementById("nouveau_mot_de_passe");
    const nouveau_mdp_deuxieme = document.getElementById("nouveau_mot_de_passe_deuxieme");

    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_admin.php?Nouveau_mot_de_passe="+nouveau_mdp+"&Nouveau_mot_de_passe_deuxieme="+nouveau_mdp_deuxieme).then(res => res.json()).then(data => {return data;});
}


// ---------------------------------------------------------------------------------------------------------------------------------------------


let ID_etablissement = 0;
let ID_First_Element = 0;
let Signalement_;
let template_;
let Incident_globaux;
let Ep;
let temp_ID_prec;
let Arborescence;
let Categorie;
let proprete;
let informatique;
let manutention;
let appareil;
let Equipement;
let ID_ajout_lieu;

async function request_connexion(){
	//var pseudo = encodeURIComponent(document.getElementById("pseudo").value);
	//var mot_de_passe = encodeURIComponent(document.getElementById("mot_de_passe").value);
	ID_etablissement = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/page_ajax.php?Pseudo=efrei&Mot_de_passe=efrei").then(res => res.json()).then(data => {return data;});
	ID_etablissement = ID_etablissement[0];
    //console.log(ID_etablissement);
}

async function request_categorie(){
	Categorie = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_categorie.php").then(res => res.json()).then(data => {return data;});
	//console.log(Categorie);
	proprete = Categorie[0];
	informatique = Categorie[1];
	manutention = Categorie[2];
	appareil = Categorie[3];
}

async function request_equipement(){
	Equipement = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_equipement.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
	//console.log(Equipement);
}

async function request_signalement(){
    //console.log('1.1');
	Signalement_ = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_signalement.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    //console.log('1.2');
    liste_associe_au_signalement = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_liste_associe_au_signalement.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    //console.log('1.3');
    //console.log(Signalement_);
    //console.log(liste_associe_au_signalement);
}

async function request_template(){
	template_ = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_template.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    liste_associe_au_template = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_liste_associe_au_template.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    //console.log(template_);
    //console.log(liste_associe_au_template);
}

async function request_ep(){
	Ep = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_ep.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function request_incidents_globaux(){
    Incident_globaux = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_incidents_globaux.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function demande_noeud_0(){
    Noeud_0 = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/demande_0.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function recursive_read(ID_Noeud_Precedent){

	const element_fils = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_noeud_fils.php?ID_Noeud="+ ID_Noeud_Precedent).then(res => res.json()).then(data => {return data;});
	if(element_fils.length > 0){
		for (var i=0; i<element_fils.length;i++){
			element_fils[i]["Fils"] = await recursive_read(element_fils[i]["ID_Noeud"]);
		}
	}
	return element_fils;
}

async function request_arborescence(){
	//premier partit appel du premier element
    //console.log(ID_etablissement);
	ID_First_Element = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_first_element.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
    //console.log(ID_First_Element);
	//seconde partie appel récursif des elements entre eux
	const val_temp = await recursive_read(ID_First_Element[0]["ID_Noeud"]);
    Arborescence = ID_First_Element;
    Arborescence[0]["Fils"] = val_temp;
}

async function Connexion(){
	await request_connexion();
	await request_categorie();
	await request_equipement();
    await request_template();
	await request_signalement();
    await request_incidents_globaux();
	await request_ep();
	await request_arborescence();

    Lecture_element();
    await mise_en_place_des_signalements_dans_larborescence();
    mise_en_place_des_ep_dans_larborescence();

    mise_en_place_categorie();

    mise_en_place_gestion_equipement();
    mise_en_place_gestion_equipement_particulier();
    mise_en_place_gestion_signalement();
    mise_en_place_gestion_template();

    mise_en_place_incident();
    mise_en_place_nouveau_signalement();

    recuperation_information_personnalisation_etablissement();
    await recuperation_des_statistiques();
    mise_en_place_des_statistiques();

    await recuperation_des_admins();
    mise_en_place_de_la_liste_des_admins();
}

async function ajout_signalement(Parametre,Values){
	return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_signalement.php?Parametre="+Parametre+"&Values="+Values+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function supression_signalement(ID_Signalement){
	await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_signalement.php?ID_Etablissement="+ID_etablissement+"&ID_Signalement="+ID_Signalement).then(res => res.json()).then(data => {return data;});
}

async function remise_a_zero_signalement(ID_Signalement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/remise_a_zero_signalement.php?ID_Etablissement="+ID_etablissement+"&ID_Signalement="+ID_Signalement).then(res => res.json()).then(data => {return data;});
}

async function modifier_signalement_sql(ID_Signalement,ID_Equipement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/mise_a_jour_signalement.php?ID_Etablissement="+ID_etablissement+"&ID_Signalement="+ID_Signalement+"&ID_Equipement="+ID_Equipement).then(res => res.json()).then(data => {return data;});
}

async function recherche_sql_signalement(Nom_Recherche){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_signalement.php?ID_Etablissement="+ID_etablissement+"&Nom_Recherche="+Nom_Recherche).then(res => res.json()).then(data => {return data;});
}

async function association_dun_signalement_a_un_lieu(ID_Lieu, ID_Signalement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/association_signalement_a_un_lieu.php?ID_Signalement="+ID_Signalement+"&ID_Lieu="+ID_Lieu+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_template(Parametre,Values){
	return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_template.php?Parametre="+Parametre+"&Values="+Values+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function supression_template(ID_Template){
	await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_template.php?ID_Etablissement="+ID_etablissement+"&ID_Template="+ID_Template).then(res => res.json()).then(data => {return data;});
}

async function remise_a_zero_template(ID_Template){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/remise_a_zero_template.php?ID_Etablissement="+ID_etablissement+"&ID_Template="+ID_Template).then(res => res.json()).then(data => {return data;});
}

async function modifier_template_sql(ID_Template,ID_Equipement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/mise_a_jour_template.php?ID_Etablissement="+ID_etablissement+"&ID_Template="+ID_Template+"&ID_Equipement="+ID_Equipement).then(res => res.json()).then(data => {return data;});
}

async function recherche_sql_template(Nom_Recherche){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_template.php?ID_Etablissement="+ID_etablissement+"&Nom_Recherche="+Nom_Recherche).then(res => res.json()).then(data => {return data;});
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_equipement(Nom_equipement_,ID_Categorie_Equipement_,Image_Equipement_,Description_Equipement_,ID_Etablissement_){
	await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_equipement.php?Nom_Equipement="+Nom_equipement_+"&ID_Categorie_Equipement="+ID_Categorie_Equipement_+"&Image_Equipement="+Image_Equipement_+"&Description_Equipement="+Description_Equipement_+"&ID_Etablissement="+ID_Etablissement_).then(res => res.json()).then(data => {return data;});
}

async function supression_equipement(ID_Equipement_){
	await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_equipement.php?ID_Equipement="+ID_Equipement_).then(res => res.json()).then(data => {return data;});
}

async function modifier_equipement(ID_Equipement,nouveau_nom_,nouvelle_description_,nouvelle_categorie_secondaire_,nouvelle_image){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_equipement.php?ID_Equipement="+ID_Equipement+"&Nouveau_Nom="+nouveau_nom_+"&Nouvelle_Description="+nouvelle_description_+"&Nouvelle_Categorie_Secondaire="+nouvelle_categorie_secondaire_+"&Nouvelle_Image="+nouvelle_image).then(res => res.json()).then(data => {return data;});
}

async function recherche_sql_equipement(Recherche_Nom_,Recherche_Description_,Recherche_Categorie_,Recherche_Image_,ID_etablissement_){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_equipement.php?Nom_Equipement="+Recherche_Nom_+"&Description_Equipement="+Recherche_Description_+"&ID_Categorie_Equipement="+Recherche_Categorie_+"&Image_Equipement="+Recherche_Image_+"&ID_Etablissement="+ID_etablissement_).then(res => res.json()).then(data => {return data;});
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_equipement_particulier(Nom_Ep_,Description_Ep_,ID_Categorie_Equipement_,Image_Equipement_,ID_Etablissement_){
	return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_equipement_particulier.php?Nom_Ep="+Nom_Ep_+"&Description_Ep="+Description_Ep_+"&ID_Categorie_Equipement="+ID_Categorie_Equipement_+"&Image_Equipement="+Image_Equipement_+"&ID_Etablissement="+ID_Etablissement_).then(res => res.json()).then(data => {return data;});
}

async function supression_equipement_particulier(ID_Ep_){
	await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_equipement_particulier.php?ID_Ep="+ID_Ep_).then(res => res.json()).then(data => {return data;});
}

async function modifier_equipement_particulier(ID_Equipement,nouveau_nom_,nouvelle_description_,nouvelle_categorie_secondaire_,nouvelle_image){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_equipement_particulier.php?ID_Equipement="+ID_Equipement+"&Nouveau_Nom="+nouveau_nom_+"&Nouvelle_Description="+nouvelle_description_+"&Nouvelle_Categorie_Secondaire="+nouvelle_categorie_secondaire_+"&Nouvelle_Image="+nouvelle_image).then(res => res.json()).then(data => {return data;});
}

async function recherche_sql_equipement_particulier(Recherche_Nom_,Recherche_Description_,Recherche_Categorie_,Recherche_Image_,ID_etablissement_){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_equipement_particulier.php?Nom_Equipement="+Recherche_Nom_+"&Description_Equipement="+Recherche_Description_+"&ID_Categorie_Equipement="+Recherche_Categorie_+"&Image_Equipement="+Recherche_Image_+"&ID_Etablissement="+ID_etablissement_).then(res => res.json()).then(data => {return data;});
}

async function association_dun_ep_a_un_lieu(ID_Lieu, ID_Ep){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/association_ep_a_un_lieu.php?ID_Ep="+ID_Ep+"&ID_Lieu="+ID_Lieu).then(res => res.json()).then(data => {return data;});
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_lieu(Precedent_,Nom_Element_,Localisation_,Profondeur_){
	ID_ajout_lieu = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/ajout_lieu.php?Precedent="+Precedent_+"&Nom_Element="+Nom_Element_+"&Localisation="+Localisation_+"&Profondeur="+Profondeur_+"&ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function supression_lieu(ID_Noeud_){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/supression_lieu.php?ID_Noeud="+ID_Noeud_).then(res => res.json()).then(data => {return data;});
}

async function modification_lieu(ID_Noeud_,Nom_,Localisation_){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/modification_noeud.php?ID_Noeud="+ID_Noeud_+"&Nom="+Nom_+"&Localisation="+Localisation_).then(res => res.json()).then(data => {return data;});
}

async function recherche_lieu(Nom_Element_){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_noeud.php?Nom_Element="+Nom_Element_).then(res =>res.json()).then(data => {return data;});
}

async function deplacer_lieu(ID_Noeud_, Precedent_){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/deplacer_noeud.php?ID_Noeud="+ID_Noeud_+"&Precedent="+Precedent_).then(res =>res.json()).then(data => {return data;});
}

//---------------------------------------------------------------------------------------------------------------------

async function recherche_categorie(ID_categorie_){
    return await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recherche_categorie.php?ID_Categorie="+ID_categorie_).then(res =>res.json()).then(data => {return data;});
}

//-----------------------------------------------------------------------------------------------------------------------------------


async function demande_de_qrcode_pour_signalement(ID_Signalement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/demande_de_qrcode.php?ID_Signalement="+ID_Signalement).then(res =>res.json()).then(data => {return data;});
}

async function changement_dactif_signalement(ID_Signalement){
    var nouvel_etat = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_detat_actif_signalement.php?ID_Signalement="+ID_Signalement+"&ID_Etablissement="+ID_etablissement).then(res =>res.json()).then(data => {return data;});
    if(nouvel_etat == 1){
        const signalement_dans_arborescence = document.getElementById("signalement_a_mettre_en_place"+ID_Signalement);
        signalement_dans_arborescence.children[0].children[1].children[1].style.background = "green";

    }
    else{
        const signalement_dans_arborescence = document.getElementById("signalement_a_mettre_en_place"+ID_Signalement);
        signalement_dans_arborescence.children[0].children[1].children[1].style.background = "red";

    }
}

async function suppression_dun_signalement_pour_un_lieu(ID_Signalement){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/suppression_dun_signalement_pour_un_lieu.php?ID_Signalement="+ID_Signalement+"&ID_Etablissement="+ID_etablissement).then(res =>res.json()).then(data => {return data;});
    const signalement_dans_arborescence = document.getElementById("signalement_a_mettre_en_place"+ID_Signalement);
    signalement_dans_arborescence.parentElement.removeChild(signalement_dans_arborescence);
    request_ep();
}






async function demande_de_qrcode_pour_ep(ID_Ep){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/demande_de_qrcode_ep.php?ID_Ep="+ID_Ep).then(res =>res.json()).then(data => {return data;});
}

async function changement_dactif_ep(ID_Ep){
    var nouvel_etat = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_detat_actif_ep.php?ID_Ep="+ID_Ep).then(res =>res.json()).then(data => {return data;});
    if(nouvel_etat == 1){
        const signalement_dans_arborescence = document.getElementById("ep_a_mettre_en_place"+ID_Ep);
        signalement_dans_arborescence.children[0].children[1].children[1].style.background = "green";

    }
    else{
        const signalement_dans_arborescence = document.getElementById("ep_a_mettre_en_place"+ID_Ep);
        signalement_dans_arborescence.children[0].children[1].children[1].style.background = "red";

    }
}

async function suppression_dun_ep_pour_un_lieu(ID_Ep){
    await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/suppression_dun_ep_pour_un_lieu.php?ID_Ep="+ID_Ep).then(res =>res.json()).then(data => {return data;});
    const signalement_dans_arborescence = document.getElementById("ep_a_mettre_en_place"+ID_Ep);
    signalement_dans_arborescence.parentElement.removeChild(signalement_dans_arborescence);
    request_ep();
}


async function recuperation_des_statistiques(){
    statistique = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recuperation_des_statistiques.php?ID_Etablissement="+ID_etablissement).then(res =>res.json()).then(data => {return data;});
}

async function recuperation_des_admins(){
    liste_admins = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recuperation_des_admins.php?ID_Etablissement="+ID_etablissement).then(res =>res.json()).then(data => {return data;});
    
}

async function modification_du_mot_de_passe_de_lutilisateur(){
    
}