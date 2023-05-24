CREATE TABLE Etablissement(
   ID_Etablissement INT NOT NULL AUTO_INCREMENT,
   Nom_Etablissement VARCHAR(50),
   username_Etablissement VARCHAR(50),
   mot_de_passe_Etablissement VARCHAR(50),
   Nombre_de_Sanitaire INT,
   PRIMARY KEY(ID_Etablissement)
);

CREATE TABLE Responsable_sanitaire(
   ID_Responsable INT NOT NULL AUTO_INCREMENT,
   Nom_Responsable VARCHAR(50),
   username_Responsable VARCHAR(50),
   mot_de_passe_Responsable VARCHAR(50),
   Prenom_Responsable VARCHAR(50),
   Mail_Responsable VARCHAR(50),
   PRIMARY KEY(ID_Responsable)
);

CREATE TABLE Sanitaire(
   ID_Sanitaire INT NOT NULL AUTO_INCREMENT,
   Nom_Sanitaire VARCHAR(50),
   ID_Responsable INT NOT NULL,
   ID_Etablissement INT NOT NULL,
   PRIMARY KEY(ID_Sanitaire),
   FOREIGN KEY(ID_Responsable) REFERENCES Responsable_sanitaire(ID_Responsable),
   FOREIGN KEY(ID_Etablissement) REFERENCES Etablissement(ID_Etablissement)
);

CREATE TABLE Signalement(
   ID_Signalement INT NOT NULL AUTO_INCREMENT,
   toilette_sale TINYINT,
   papier_toilette TINYINT,
   chasse_deau TINYINT,
   sol_sale TINYINT,
   seche_main TINYINT,
   porte_casse TINYINT,
   lavabo_sale TINYINT,
   plus_de_savon TINYINT,
   robinet_casse TINYINT,
   heure_du_signalement DATETIME,
   effectue TINYINT,
   heure_du_nettoyage DATETIME,
   ID_Sanitaire INT NOT NULL,
   PRIMARY KEY(ID_Signalement),
   FOREIGN KEY(ID_Sanitaire) REFERENCES Sanitaire(ID_Sanitaire)
);
