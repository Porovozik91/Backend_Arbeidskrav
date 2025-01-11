USE arbeidskrav_adam_maltsagov;


INSERT INTO admin_bruker (navn, epost, passord)
VALUES 
    ("Admin1", "test1@test.no", "passord123"),
    ("Admin2", "test2@test.no", "passord456");

INSERT INTO spillere (navn, posisjon, alder)
VALUES 
    ("Ronaldo", "Forsvarer", 25),
    ("Messi", "Angriper", 22),
    ("Abebe Olsen", "Midtbane", 28),
    ("Berg Dawood", "Keeper", 20);


INSERT INTO `lag` (navn, trener)
VALUES 
    ("Ulver", "Trener 1"),
    ("Sauer", "Trener 2");


INSERT INTO kamper (lagId, motstander, dato, sted) VALUES 
(1, "Team Abebe", "2024-10-10", "Stadion A"),
(1, "Team Dawood", "2024-11-15", "Stadion B"),
(2, "Team Sandefjord", "2024-12-05", "Stadion C"),
(2, "Team Tønsberg", "2025-01-20", "Stadion D");

    


INSERT INTO lag_spillere (lagId, spillerId)
VALUES 
    (1, 1), 
    (1, 2), 
    (2, 3), 
    (2, 4);


INSERT INTO kamp_spillere (kampId, spillerId)
VALUES 
    (1, 1), 
    (1, 2), 
    (2, 3), 
    (3, 4), 
    (4, 1);


    /* 
Get-Content .\sql\data.sql | mysql -u student -p"Rm61C64(ei(J"
 */