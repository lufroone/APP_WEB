async function connexion(){
    const email = document.getElementById("mail_administrateur").value;
    const mot_de_passe = document.getElementById("mot_de_passe_administrateur").value;

    var formData = new FormData();
    formData.append("email", email);
    formData.append("mdp", mot_de_passe);
    let Information_administrateur = await fetch("http://hurflym.fr/arborescence_back+front/recuperation_des_informations_administrateur.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});

    try{
        console.log(Information_administrateur);
        if(Information_administrateur[0]["validation"] == "true"){

            var formData = new FormData();
            formData.append("email", email);
            formData.append("csrf_token", Information_administrateur[1]["token_crypte"]);
            await fetch("http://hurflym.fr/arborescence_back+front/creation_de_session_administrateur.php", {method:"POST", body: formData}).then(res => res.json()).then(data => {return data;});

            window.location.replace("//arborescence_v3.php");

        }
    }
    catch(error){
        console.log(Information_administrateur);
    }
}