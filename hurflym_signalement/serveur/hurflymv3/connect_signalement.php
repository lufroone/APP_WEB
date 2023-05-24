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
            'redirect_uri' => 'http://hurflym.fr/connect_signalement.php',
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
        setcookie("mail_utilisateur_hurflym", $response->email, time() + (3* 60 * 60), "/");
        setcookie("csrf_token_hurflym", $row2["token_crypte"], time() + (3* 60 * 60), "/");
        header('Location: http://hurflym.fr/arborescence_back+front/index_v2__local.php?ID_Source='.$_COOKIE["id_signalement_hurflym"]);
        exit();
    }
    


} catch(\GuzzleHttp\Eception\ClientException $exception) {
    echo($exception->getMessage());
}