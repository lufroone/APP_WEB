<?php
session_start();

// Récupération du jeton de validation envoyé par l'utilisateur
$token = $_GET['token'];

// Vérification que le jeton de validation reçu correspond à celui stocké en session
if ($token == $_SESSION['registration_token']) {
    // Si le jeton est valide, le compte de l'utilisateur est activé
    // et il est redirigé vers la page de bienvenue
    activate_user_account();
    header('Location: welcome.php');
} else {
    // Sinon, l'utilisateur est informé que son compte n'a pas été activé
    echo "Invalid token. Your account could not be activated.";
}


function activate_user_account() {
    // Connexion à la base de données
    require 'connexion_bdd_config.php';
    
    // Récupération des données de l'utilisateur
    $nom = $_SESSION["Nom_Utilisateur"];
    $prenom = $_SESSION["Prenom_Utilisateur"];
    $username = $_SESSION['Username_Utilisateur'];
    $email = $_SESSION['Mail_Utilisateur'];
    $password = $_SESSION['Mot_de_Passe_Utilisateur'];
    
    // Préparation de la requête d'insertion
    $sql = "INSERT INTO Utilisateur__Local(Mail_Utilisateur,Nom_Utilisateur,Prenom_Utilisateur,Username_Utilisateur, Mot_de_Passe_Utilisateur,Compte_Actif)
		    VALUES('".$email."', '".$nom."','".$prenom."', '".$username."', '".$password."','0')
		    ";
    
    // Exécution de la requête
    $conn->query($sql);
    
    // Fermeture de la connexion à la base de données
    $conn->close();
    
}

// Redirection de l'utilisateur vers la page de bienvenue
header('Location: welcome.php');
exit;
?>

