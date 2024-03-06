-- Active: 1691869713036@@127.0.0.1@3306@jeux
-- Supprimez la base de données 'jeux' si elle existe déjà.
DROP DATABASE IF EXISTS id21515017_mystic;

-- Créez la base de données 'jeux' si elle n'existe pas déjà.
CREATE DATABASE IF NOT EXISTS id21515017_mystic;

-- Utilisez la base de données 'jeux'.
USE id21515017_mystic;

-- Créez la table 'joueur' si elle n'existe pas déjà
CREATE TABLE IF NOT EXISTS joueur (
    id INT AUTO_INCREMENT,
    lastname VARCHAR(100),
    firstname VARCHAR(100),
    birthdate DATE,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(256),
    role ENUM ('admin', 'user') DEFAULT 'user',
    pseudo VARCHAR(100),
    avatar VARCHAR(255),
    score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UK_email UNIQUE (email)
);

INSERT INTO joueur (lastname, firstname, birthdate, email, password, role, pseudo, avatar, score) VALUES ('ibn', 'Sanae', '1991-04-19', 'sanae@gmail.com', SHA2('1234', 256), 'admin', 'MonPseudo', 'avatars/mon_avatar.jpg', 0);
