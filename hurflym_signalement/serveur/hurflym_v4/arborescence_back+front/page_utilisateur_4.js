const sections = document.querySelectorAll(".section");
const fenetre_de_connexion = document.getElementById("connexion");
var result;
var session_initialise = "false";

//                                                      Lecture de cookie par MDN

let email = document.cookie.split('; ').find(row => row.startsWith('mail_utilisateur_hurflym=')).split('=')[1];
email = email.replace(/%40/g, "@");
console.log(email);

window.addEventListener("load", () => {
    // On affiche la 1ère page du formulaire
    for(let section of sections){
        section.style.display = "none";
    }
    document.getElementById("section1").style.display = "initial";
    fenetre_de_connexion.style.display = "none";
    recuperation_info_utilisateur(email);
});

async function recuperation_info_utilisateur(email){
    info_utilisateur = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recup_info_utilisateur.php?email="+email).then(res => res.json()).then(data => {return data;});
    console.log(info_utilisateur);
}

function section(numero_section){
    for(let section of sections){
        section.style.display = "none";
    }
    document.getElementById("section"+numero_section).style.display = "initial";
}

function visionnage_des_parametres(){
    for(let section of sections){
        section.style.display = "none";
    }
    fenetre_de_connexion.style.display = "initial";
}

async function connexion(){
    var formData = new FormData();
    const email = document.getElementById("adresse_mail_utilisateur").value;
    const password = document.getElementById("mot_de_passe_utilisateur").value;
    formData.append("email", email);
    formData.append("mdp", password);
    result = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/connexion_page_utilisateur.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
    fenetre_de_connexion.style.display = "none";
    document.getElementById("section3").style.display = "initial";
    mise_en_place_des_informations_utilisateurs();
    session_initialise = 'true';
}

function mise_en_place_des_informations_utilisateurs(){
    const valeur_nom = document.getElementById("V_Nom_Utlisateur");
    const valeur_prenom = document.getElementById("V_Prenom_Utlisateur");
    const valeur_username = document.getElementById("V_Username_Utlisateur");
    const valeur_mail = document.getElementById("V_Mail_Utlisateur");
    
    valeur_nom.textContent = result[1]["Nom_Utilisateur"];
    valeur_prenom.textContent = result[1]["Prenom_Utilisateur"];
    valeur_username.textContent = result[1]["Username_Utilisateur"];
    valeur_mail.textContent = result[1]["Mail_Utilisateur"];
}

function modification_informations(section){
    if(section == '0'){
        const container_a_modifier = document.getElementById("C_Nom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const input_a_remplir = document.createElement("input");
        console.log(result[1]["Nom_Utilisateur"]);
        input_a_remplir.defaultValue = result[1]["Nom_Utilisateur"];
        input_a_remplir.id = "nouveau_nom_utilisateur";
        input_a_remplir.name = "nouveau_nom_utilisateur";
        const bouton_validation = document.createElement("div");
        const bouton_annulation = document.createElement("div");

        bouton_validation.textContent = "Valider";
        bouton_validation.addEventListener("click", function () {validation_information('0')});
        bouton_validation.className = "bouton";

        bouton_annulation.textContent = "Annuler";
        bouton_annulation.addEventListener("click", function () {annulation_modification('0')});
        bouton_annulation.className = "bouton";

        container_a_modifier.append(input_a_remplir, bouton_validation, bouton_annulation);

    }
    if(section == '1'){
        const container_a_modifier = document.getElementById("C_Prenom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const input_a_remplir = document.createElement("input");
        console.log(result[1]["Prenom_Utilisateur"]);
        input_a_remplir.defaultValue = result[1]["Prenom_Utilisateur"];
        input_a_remplir.id = "nouveau_prenom_utilisateur";
        input_a_remplir.name = "nouveau_prenom_utilisateur";
        const bouton_validation = document.createElement("div");
        const bouton_annulation = document.createElement("div");

        bouton_validation.textContent = "Valider";
        bouton_validation.addEventListener("click", function () { validation_information('1')});
        bouton_validation.className = "bouton";

        bouton_annulation.textContent = "Annuler";
        bouton_annulation.addEventListener("click", function () {annulation_modification('1')});
        bouton_annulation.className = "bouton";

        container_a_modifier.append(input_a_remplir, bouton_validation, bouton_annulation);

    }
    if(section == '2'){
        const container_a_modifier = document.getElementById("C_Username_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const input_a_remplir = document.createElement("input");
        console.log(result[1]["Username_Utilisateur"]);
        input_a_remplir.defaultValue = result[1]["Username_Utilisateur"];
        input_a_remplir.id = "nouveau_username_utilisateur";
        input_a_remplir.name = "nouveau_username_utilisateur";
        const bouton_validation = document.createElement("div");
        const bouton_annulation = document.createElement("div");

        bouton_validation.textContent = "Valider";
        bouton_validation.addEventListener("click", function () { validation_information('2')});
        bouton_validation.className = "bouton";

        bouton_annulation.textContent = "Annuler";
        bouton_annulation.addEventListener("click", function () {annulation_modification('2')});
        bouton_annulation.className = "bouton";

        container_a_modifier.append(input_a_remplir, bouton_validation, bouton_annulation);

    }
}

async function validation_information(section){
    if(section == '0'){
        const nouvelle_valeur = document.getElementById("nouveau_nom_utilisateur").value;
        result[1]["Nom_Utilisateur"] = nouvelle_valeur;
        var formData = new FormData();
        formData.append("nouveau_nom", nouvelle_valeur);
        formData.append("section", '0');
        formData.append("ID_Utilisateur", result[1]["ID_Utilisateur"]);
        await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_de_valeur_de_compte.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
        const container_a_modifier = document.getElementById("C_Nom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Nom_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  nouvelle_valeur;

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Nom_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('0')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
    if(section == '1'){
        const nouvelle_valeur = document.getElementById("nouveau_prenom_utilisateur").value;
        result[1]["Prenom_Utilisateur"] = nouvelle_valeur;
        var formData = new FormData();
        formData.append("nouveau_prenom", nouvelle_valeur);
        formData.append("section", '1');
        formData.append("ID_Utilisateur", result[1]["ID_Utilisateur"]);
        await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_de_valeur_de_compte.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
        const container_a_modifier = document.getElementById("C_Prenom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Prenom_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  nouvelle_valeur;

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Prenom_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('1')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
    if(section == '2'){
        const nouvelle_valeur = document.getElementById("nouveau_username_utilisateur").value;
        result[1]["Username_Utilisateur"] = nouvelle_valeur;
        var formData = new FormData();
        formData.append("nouveau_username", nouvelle_valeur);
        formData.append("section", '2');
        formData.append("ID_Utilisateur", result[1]["ID_Utilisateur"]);
        await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_de_valeur_de_compte.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
        const container_a_modifier = document.getElementById("C_Username_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Username_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  nouvelle_valeur;

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Username_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('2')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
}

function annulation_modification(section){
    if(section == '0'){
        const container_a_modifier = document.getElementById("C_Nom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Nom_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  result[1]["Nom_Utilisateur"];

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Nom_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('0')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
    if(section == '1'){
        const container_a_modifier = document.getElementById("C_Prenom_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Prenom_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  result[1]["Prenom_Utilisateur"];

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Prenom_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('1')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
    if(section == '2'){
        const container_a_modifier = document.getElementById("C_Username_Utilisateur");
        var first = container_a_modifier.children[0];
        while (first) {
            first.remove();
            first = container_a_modifier.children[0];
        }
        const texte_de_presentation = document.createElement("div");
        texte_de_presentation.id = "V_Username_Utilisateur";
        texte_de_presentation.class = "valeur";
        texte_de_presentation.textContent =  result[1]["Username_Utilisateur"];

        const bouton_de_modification = document.createElement("div");
        bouton_de_modification.id = "B_Username_Utilisateur";
        bouton_de_modification.className = "bouton_modification";
        const image_modification = document.createElement("img");
        image_modification.src = "../image/crayon.png";
        image_modification.style.width = "40px";
        image_modification.style.heigth = "40px";
        bouton_de_modification.append(image_modification);
        bouton_de_modification.addEventListener("click", function () {modification_informations('2')});
        container_a_modifier.append(texte_de_presentation, bouton_de_modification);
    }
}

async function deconnexion(){
    var formData = new FormData();
    formData.append("session_initialise", session_initialise);
    //await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/destruction_de_session_et_de_tout_les_cookies.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
    window.location.replace("http://localhost/hurflym_signalement/local/arborescence_back+front/index.php");
}

async function Changer_le_mot_de_passe_utilisateur(){
    console.log("on a bien appeler la fonction");
    const password_1 = document.getElementById("V_Mot_de_Passe_Utlisateur").value;
    const password_2 = document.getElementById("V2_Mot_de_Passe_Utlisateur").value;
    const result_modification = document.createElement("div");
    if(password_2 == password_1){
        var formData = new FormData();
        formData.append("mdp", password_1);
        formData.append("id", result[1]["ID_Utilisateur"]);
        const res = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/changement_mot_de_passe_utilisateur.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
        if(res[0]["Validation"] == 'valide'){
            result_modification.textContent = "Le mot de passe à bien été modifié";
            document.getElementById("modification_de_mot_de_passe").append(result_modification);
        }
        else{
            result_modification.textContent = "Le mot de passe n'a pas pu être modifié";
            document.getElementById("modification_de_mot_de_passe").append(result_modification);
        }
    }
    else{
        result_modification.textContent = "Les deux mot de passe rentré sont différents, impossible de faire la modification.";
        document.getElementById("modification_de_mot_de_passe").append(result_modification);
    }

    document.getElementById("V_Mot_de_Passe_Utlisateur").value = '';
    document.getElementById("V2_Mot_de_Passe_Utlisateur").value = '';
} 