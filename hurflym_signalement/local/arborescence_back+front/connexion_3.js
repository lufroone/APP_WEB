async function connexion(){
    const email = document.getElementById("mail_utilisateur").value;
    const mot_de_passe = document.getElementById("mot_de_passe_utilisateur").value;

    var formData = new FormData();
    formData.append("email", email);
    formData.append("mdp", mot_de_passe);
    let Information_utilisateur = await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/recuperation_des_informations_utilisateurs.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});

    try{
        console.log(Information_utilisateur);
        if(Information_utilisateur[0]["validation"] == "true"){
            var formData = new FormData();
            formData.append("email", email);
            formData.append("mdp", mot_de_passe);
            formData.append("token", Information_utilisateur[1]["token_crypte"] ); // 
            try{
                await fetch("http://localhost/hurflym_signalement/local/arborescence_back+front/creation_de_cookie_utilisateur.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});
                
            }
            catch(error){
                console.error('Erreur :', error);
                
            }
            console.log("ouverture_de_session_termine");

            window.location.replace("/hurflym_signalement/local/arborescence_back+front/page_utilisateur.php");

        }
    }
    catch(error){
        console.log(Information_utilisateur);
    }
}