<?php 
require 'vendor/autoload.php';
require 'config.php';

use GuzzleHttp\Client;

$client = new Client([
    'timeout' => 6.0,
    'verify' => __DIR__ . '/cacert.pem'
]);
try{
    $response = $client->request('POST', 'https://oauth2.googleapis.com/token', [
        'form_params' => [
            'code' => $_GET['code'],
            'client_id' => GOOGLE_ID,
            'client_secret' => GOOGLE_SECRET,
            'redirect_uri' => 'http://localhost/connect.php',
            'grant_type' => 'authorization_code'
        ]
    ]);
    $accessToken = json_decode($response->getBody())->access_token;

    
    $response = $client->request('GET', 'https://www.googleapis.com/userinfo/v2/me', [
        'headers' => [
            'Authorization' => 'Bearer '.$accessToken,
        ]
    ]);

    $user_data = json_decode($response->getBody(), true);

    // Afficher les données de l'utilisateur
    echo "Adresse électronique de l'utilisateur : ".$user_data["email"]."\n";

    $response = json_decode($response->getBody());

    if($response->email != ''){

        require 'hurflym_signalement/local/arborescence_back+front/connexion_bdd_config.php';


        try {
            $info_utilisateur = $conn->prepare("SELECT * FROM Utilisateur__Local WHERE Mail_Utilisateur='".$response->email."'");
            $info_utilisateur->execute();
            $result = $info_utilisateur->get_result();
            $row2 = $result->fetch_assoc();
            session_start();
            $_SESSION['email'] = $response->email;
            setcookie("mail_utilisateur_hurflym", $response->email, time() + (3* 60 * 60), "/");
            if ($row2) {
                setcookie("csrf_token_hurflym", $row2["token_crypte"], time() + (3* 60 * 60), "/");
            } else {
                $conn->query("INSERT INTO `Utilisateur__Local`(`ID_Utilisateur`, `Mail_Utilisateur`, `Nom_Utilisateur`, `Prenom_Utilisateur`, `Username_Utilisateur`, `Mot_de_Passe_Utilisateur`, `Compte_Actif`, `token_crypte`) VALUES('0', '".$response->email."', '', '', '', '', '1', 'null')");
                setcookie("csrf_token_hurflym", 'null', time() + (3* 60 * 60), "/");
            }
            header('Location: /hurflym_signalement/local/arborescence_back+front/page_utilisateur.php');
            exit();
        }
        catch(Exception $e) {
            // Une erreur s'est produite, vous pouvez la gérer ici
        }
        
    }
    
    

} catch(\GuzzleHttp\Eception\ClientException $exception) {
    echo($exception->getMessage());
}



?>