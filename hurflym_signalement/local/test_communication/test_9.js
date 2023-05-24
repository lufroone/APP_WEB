//var requete = new XMLHttpRequest();
let ID_etablissement = 0;
let ID_First_Element = 0;
let Source;
let Ep;
let temp_ID_prec;
let Arborescence;
let Categorie;
let proprete;
let informatique;
let manutention;
let appareil;
let Equipement;
//requete.onload = function() {
 //La variable à passer est alors contenue dans l'objet response et l'attribut responseText.
 /*var variableARecuperee = this.responseText;
 if (requete.status != 200){ 
    //...On affiche le statut et le message correspondant
    alert("Erreur " + requete.status + " : " + requete.statusText);
    //Si le statut HTTP est 200, on affiche le nombre d'octets téléchargés et la réponse
    }else{ 
        alert(requete.response.length + " octets  téléchargés\n" + JSON.stringify(requete.response));
    }
    console.log("variable = " + variableARecuperee);*/
//};

//requete.open("GET", "http://localhost/hurflym_signalement/local/test_communication/test.php", true); //True pour que l'exécution du script continue pendant le chargement, false pour attendre.
//requete.responseType = "";
//requete.send();


/*
function request_connexion(callback) {
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(xhr.responseText);
		}
	};

	var pseudo = encodeURIComponent(document.getElementById("pseudo").value);
	var mot_de_passe = encodeURIComponent(document.getElementById("mot_de_passe").value);
	
	xhr.open("GET", "http://localhost/hurflym_signalement/local/test_communication/page_ajax.php?Pseudo=" + pseudo + "&Mot_de_passe=" + mot_de_passe, true);
	xhr.send(null);
}*/

async function request_connexion(){
	var pseudo = encodeURIComponent(document.getElementById("pseudo").value);
	var mot_de_passe = encodeURIComponent(document.getElementById("mot_de_passe").value);
	ID_etablissement = await fetch("http://localhost/hurflym_signalement/local/test_communication/page_ajax.php?Pseudo=" + pseudo + "&Mot_de_passe=" + mot_de_passe).then(res => res.json()).then(data => {return data;});
	console.log(ID_etablissement);
}
/*
function request_categorie(callback) {
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(xhr.responseText);
		}
	};
	
	xhr.open("GET", "http://localhost/hurflym_signalement/local/test_communication/recup_categorie.php", true);
	xhr.send(null);
}*/

async function request_categorie(){
	Categorie = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_categorie.php").then(res => res.json()).then(data => {return data;});
	console.log(Categorie);
	proprete = Categorie[0];
	informatique = Categorie[1];
	manutention = Categorie[2];
	appareil = Categorie[3];
}

/*
function request_equipement(callback) {
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(xhr.responseText);
		}
	};
	
	xhr.open("GET", "http://localhost/hurflym_signalement/local/test_communication/recup_equipement.php?ID_Etablissement="+ID_etablissement, true);
	xhr.send(null);
}*/

async function request_equipement(){
	Equipement = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_equipement.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
	console.log(Equipement);
}

/*
function request_first_element(callback){
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			alert(xhr.responseText);
			callback(xhr.responseText);
		}
	};
	
	xhr.open("GET", "http://localhost/hurflym_signalement/local/test_communication/recup_first_element.php?ID_Etablissement="+ID_etablissement, true);
	xhr.send(null);
}
*/
/*
function request_noeud_fils(callback){
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			return callback(xhr.responseText);
		}
	};
	console.log(temp_ID_prec);
	xhr.open("GET", "http://localhost/hurflym_signalement/local/test_communication/recup_noeud_fils.php?ID_Noeud="+ temp_ID_prec, true);
	xhr.send(null);
}*/

async function request_source(){
	Source = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_source.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function request_ep(){
	Ep = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_ep.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});
}

async function recursive_read(ID_Noeud_Precedent){

	const element_fils = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_noeud_fils.php?ID_Noeud="+ ID_Noeud_Precedent).then(res => res.json()).then(data => {return data;});
	console.log(element_fils.length > 0);
	if(element_fils.length > 0){
		for (i=0; i<element_fils.length;i++){
			element_fils[i]["Fils"] = await recursive_read(element_fils[i]["ID_Noeud"]);
		}
	}
	console.log(element_fils);
	return element_fils;
}

async function request_arborescence(){
	//premier partit appel du premier element

	ID_First_Element = await fetch("http://localhost/hurflym_signalement/local/test_communication/recup_first_element.php?ID_Etablissement="+ID_etablissement).then(res => res.json()).then(data => {return data;});

	console.log("first_element = ", ID_First_Element);
	//seconde partie appel récursif des elements entre eux
	Arborescence = recursive_read(ID_First_Element);
	console.log(Arborescence);
}





async function Connexion(){
	await request_connexion();
	await request_categorie();
	await request_equipement();
	await request_source();
	await request_ep();
	await request_arborescence();
}

/*
function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}*/

async function ajout_signalement(Type_dincidence_,ID_Noeud_,ID_Etablissement_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/ajout_signalement.php?Type_dincidence="+Type_dincidence_+"&ID_Noeud="+ID_Noeud_+"&ID_Etablissement="+ID_Etablissement_).then(res => res.json()).then(data => {return data;});
}

async function supression_signalement(ID_Source_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/supression_signalement.php?ID_Source="+ID_Source_).then(res => res.json()).then(data => {return data;});
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_equipement(Nom_equipement_,ID_Categorie_Equipement_,Image_Equipement_,Description_Equipement_,ID_Etablissement_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/ajout_equipement.php?Nom_equipement="+Nom_equipement_+"&ID_Categorie_Equipement="+ID_Categorie_Equipement_+"&Image_Equipement="+Image_Equipement_+"&Description_Equipement="+Description_Equipement_+"&ID_Etablissement="+ID_Etablissement_).then(res => res.json()).then(data => {return data;});
}

async function supression_equipement(ID_Equipement_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/supression_equipement.php?ID_Equipement="+ID_Equipement_).then(res => res.json()).then(data => {return data;});
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_equipement_particulier(ID_Source_,Nom_Ep_,Description_Ep_,ID_Noeud_,ID_Etablissement_){
	console.log("coucou");
	const temp = await fetch("http://localhost/hurflym_signalement/local/test_communication/ajout_equipement_particulier.php?ID_Source="+ID_Source_+"&Nom_Ep="+Nom_Ep_+"&Description_Ep="+Description_Ep_+"&ID_Noeud="+ID_Noeud_+"&ID_Etablissement="+ID_Etablissement_).then(res => res.json()).then(data => {return data;});
	console.log(temp);
}

async function supression_equipement_particulier(ID_Ep_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/supression_equipement_particulier.php?ID_Ep="+ID_Ep_).then(res => res.json()).then(data => {return data;});
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

async function ajout_lieu(Precedent_,Nom_Element_,Localisation_,Profondeur_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/ajout_lieu.php?Precedent="+Precedent_+"&Nom_Element"+Nom_Element_+"&Localisation="+Localisation_+"&Profondeur="+Profondeur_).then(res => res.json()).then(data => {return data;});
}

async function supression_lieu(ID_Noeud_){
	await fetch("http://localhost/hurflym_signalement/local/test_communication/supression_lieu.php?ID_Noeud="+ID_Noeud_).then(res => res.json()).then(data => {return data;});
}


/*
function readData(sData) {
	ID_etablissement = sData;
	alert(ID_etablissement);
}

function readCategorie(sData){
	Categorie = JSON.parse(sData);
	proprete = Categorie[0];
	informatique = Categorie[1];
	manutention = Categorie[2];
	appareil = Categorie[3];
}

function readEquipement(sData){
	Equipement = JSON.parse(sData);
}

function readFirstElement(sData){
	ID_First_Element = sData;
	console.log("ID_Forst_Element = ",ID_First_Element);
	return ID_First_Element;
}

function readNoeudFils(sData){
	alert(sData);
	return JSON.parse(sData);
}*/