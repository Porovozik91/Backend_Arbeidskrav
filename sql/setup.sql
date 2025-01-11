CREATE DATABASE IF NOT EXISTS arbeidskrav_adam_maltsagov;

USE arbeidskrav_adam_maltsagov;

CREATE TABLE IF NOT EXISTS admin_bruker (
    id INT AUTO_INCREMENT PRIMARY KEY,
    navn VARCHAR(50) NOT NULL,
    epost VARCHAR(50) NOT NULL UNIQUE,
    passord VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS spillere (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    navn VARCHAR(50) NOT NULL,         
    posisjon VARCHAR(50) NOT NULL,      
    alder INT NOT NULL               
);

CREATE TABLE IF NOT EXISTS `lag` (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    navn VARCHAR(50) NOT NULL,         
    trener VARCHAR(50) NOT NULL      
);

CREATE TABLE IF NOT EXISTS kamper (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    lagId INT NOT NULL,                 
    motstander VARCHAR(50) NOT NULL,    
    dato DATE NOT NULL,                   
    sted VARCHAR(50) NOT NULL, 
    FOREIGN KEY (lagId) REFERENCES `lag`(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lag_spillere (
    lagId INT NOT NULL, 
    spillerId INT NOT NULL,
    PRIMARY KEY (lagId, spillerId),
    FOREIGN KEY (lagId) REFERENCES `lag`(id) ON DELETE CASCADE, 
    FOREIGN KEY (spillerId) REFERENCES spillere(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS kamp_spillere (
    kampId INT NOT NULL, 
    spillerId INT NOT NULL,
    PRIMARY KEY (kampId, spillerId),
    FOREIGN KEY (kampId) REFERENCES kamper(id) ON DELETE CASCADE, 
    FOREIGN KEY (spillerId) REFERENCES spillere(id) ON DELETE CASCADE
);

/* 
Get-Content .\sql\setup.sql | mysql -u student -p"Rm61C64(ei(J"
 */