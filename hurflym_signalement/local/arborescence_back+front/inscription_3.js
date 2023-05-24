let verif_mail=0;
let verif_de_mot_de_passe=0;
var bit_longueur=0;
var bit_minuscule=0;
var bit_majuscule=0;
var bit_nombre=0;
const affichage = document.getElementById("resultat_de_linscription");

async function inscription(){
    const email = document.getElementById("Mail_Utilisateur").value;
    const nom = document.getElementById('Nom_Utilisateur').value;
    const prenom = document.getElementById("Prenom_Utilisateur").value;
    const username = document.getElementById("Username_Utilisateur").value;
    const mot_de_passe = document.getElementById("Mot_de_Passe_Utilisateur1").value;

    if(verif_mail == 1){
        var formData = new FormData();
        formData.append("Mail_Utilisateur", email);
        formData.append("Nom_Utilisateur", nom);
        formData.append("Prenom_Utilisateur", prenom);
        formData.append("Username_Utilisateur", username);
        formData.append("Mot_de_Passe_Utilisateur", mot_de_passe);
        let validation = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/requete_dinscription.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
    
        
        if(validation[0]["validation"] == "true"){
            affichage.textContent = "Votre compte à bien été créé ! Veuillez valider sa création en cliquant sur le lien que nous allons vous envoyer par mail s'il vous plaît";
        }else{
            affichage.textContent = "Une erreur est survenue lors de votre inscription !";
        }
    }
    else{
        affichage.textContent = "Le mail que avez saisie est deja attribué";
    }
}

async function verifMail(){
    const email = document.getElementById("Mail_Utilisateur").value;
    var formVerifMail = new FormData();
    formVerifMail.append("Mail_Utilisateur", email);
    let verification_mail = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/verification_dadresse_mail.php", {method:"POST", body: formVerifMail}).then(res => res.json()).then(data => {return data;});
    if(verification_mail[0]["validation"] == "true"){
        verif_mail = 1;
    }
    else{
        verif_mail = 0;
    }
}

var myInput = document.getElementById("Mot_de_Passe_Utilisateur1");
var lettre = document.getElementById('lettre');
var majuscule = document.getElementById("majuscule");
var nombre = document.getElementById("nombre");
var longueur = document.getElementById("longueur");

// fais apparaitre le message lorsque l'utilisateur clique sur le champs du mot de passe;

myInput.onfocus = function(){
    document.getElementById("message").style.display = "block";
}

// fais disparaitre le message lorsque l'utilisateur clique en dehors du champs du mot de passe

myInput.onblur = function(){
    document.getElementById("message").style.display = "none";
}

// recupère les informations quand l'utilisateur commence a taper

myInput.onkeyup = function(){
    // valider les lettres minuscules
    var minuscules = /[a-z]/g 
    if(myInput.value.match(minuscules)){
        // si le mot contient une minuscule alors on change sa valeur
        lettre.classList.remove("invalide");
        lettre.classList.add("valide");
        bit_minuscule = 1;
    }
    else{
        lettre.classList.remove("valide");
        lettre.classList.add("invalide");
        bit_minuscule = 0;
    }

    //verification des lettres majuscules
    var majuscules = /[A-Z]/g
    if(myInput.value.match(majuscules)){
        // si le mot contient une majuscules alors on change sa valeur
        majuscule.classList.remove("invalide");
        majuscule.classList.add("valide");
        bit_majuscule = 1;
    }
    else{
        majuscule.classList.remove("valide");
        majuscule.classList.add("invalide");
        bit_majuscule = 0;
    }

    //verification des nombres
    var nombres = /[0-9]/g
    if(myInput.value.match(nombres)){
        // si le mot contient un nombre alors on change sa valeur
        nombre.classList.remove("invalide");
        nombre.classList.add("valide");
        bit_nombre = 1;
    }
    else{
        nombre.classList.remove("valide");
        nombre.classList.add("invalide");
        bit_nombre = 0;
    }

    //verification de la longueur
    
    if(myInput.value.length >= 8){
        // si le mot de passe est assez long
        longueur.classList.remove("invalide");
        longueur.classList.add("valide");
        bit_longueur = 1;
    }
    else{
        longueur.classList.remove("valide");
        longueur.classList.add("invalide");
        bit_longueur = 0;
    }
}


function verification_motdepasse(){
    const mdp1 = document.getElementById("Mot_de_Passe_Utilisateur1").value;
    const mdp2 = document.getElementById("Mot_de_Passe_Utilisateur2").value;
    
    if(bit_longueur == 1 && bit_minuscule==1 && bit_majuscule==1 && bit_nombre==1 && mdp1==mdp2 ){
        document.getElementById("Mot_de_Passe_Utilisateur2").classList.add("valide");
    }else{
        document.getElementById("Mot_de_Passe_Utilisateur2").classList.add("invalide");
    }
}