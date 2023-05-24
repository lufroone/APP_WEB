<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Inscription</title>
        <link rel="stylesheet" href="../arborescence_back+front/inscription_1.css">
    </head>
    <body>
        <div class="fond"></div>
        <div class="boite_du_milieu">
            <div class="titre_de_presentation">Inscription </div>
            <div class="description">Pour vous inscrire veuillez remplir les informations suivantes et cliquez sur le bouton Valider</div>

            <div class="formulaire">

                
                <input type="text" name="Nom_Utilisateur" id="Nom_Utilisateur" placeholder="Nom"><br>
                
                <input type="text" name="Prenom_Utilisateur" id="Prenom_Utilisateur" placeholder="Prenom"><br>
                
                <input type="text" name="Mail_Utilisateur" id="Mail_Utilisateur" onchange="verifMail()" placeholder="Adresse Mail"></br>
                
                <input type="text" name="Username_Utilisateur" id="Username_Utilisateur" placeholder="Username"><br>
                
                <input type="password" name="Mot_de_Passe_Utilisateur1" id="Mot_de_Passe_Utilisateur1" placeholder="Mot de Passe"><br>
                
                <input type="password" name="Mot_de_Passe_Utilisateur2" id="Mot_de_Passe_Utilisateur2" onchange="verification_motdepasse()" placeholder="Verification Mot de Passe"><br>

                <div id="message">
                    <div id="titre_message" >Le mot de passe doit contenir au moins:</div>
                    <div class="verification_mot_de_passe invalide" id="lettre">Une minuscule</div>
                    <div class="verification_mot_de_passe invalide" id="majuscule">Une Majuscule</div>
                    <div class="verification_mot_de_passe invalide" id="nombre">Un nombre </div>
                    <div class="verification_mot_de_passe invalide" id="longueur">8 charactères</div>
                </div>

            </div>

            <div id="validation" onclick="inscription()">Valider</div>

            <div id="resultat_de_linscription">

            </div>

        </div>

    </body>

    <script type="text/javascript" src="../arborescence_back+front/inscription_2.js"></script>

</html>