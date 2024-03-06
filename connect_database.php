<?php

# Informations de connexion à la base de données

// DSN = Data Source Name
$server = "mysql";
$host = "localhost";
$dbname = "jeux";
$charset = "utf8";

$dsn = "$server:host=$host;dbname=$dbname;charset=$charset";
$username = "root";
$pdw = ""; # "root" / ""

try {
    // Connexion à la base de données
    $database = new PDO($dsn, $username, $pdw);
} catch (PDOException $e) {
    // Erreur de connexion
    echo $e->getMessage();
}

