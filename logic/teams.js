import dbConnection from "../config/db.js";
import { responseLog } from "../utils/utilityHelpers.js";


export const addTeam = async (req, res) => {
    const { navn, trener, spillere } = req.body; 
    console.log("Body:", req.body);

   
    if (!spillere || spillere.length === 0) {
        return responseLog(res.status(400), { message: "Spiller ID-er må fylles ut." });
    }

    try {
        const [result] = await dbConnection.promise().query(
            "INSERT INTO `lag` (navn, trener) VALUES (?, ?)",
            [navn, trener]
        );

        const lagId = result.insertId;

      
        const spillerQueries = spillere.map(spillerId => (
            dbConnection.promise().query(
                "INSERT INTO lag_spillere (lagId, spillerId) VALUES (?, ?)",
                [lagId, spillerId]
            )
        ));
        await Promise.all(spillerQueries);

        return responseLog(res.status(201), { message: "Nytt lag lagt til!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt og laget ble ikke lagt til." });
    }
};


export const getTeams = async (req, res) => {
    try {
        const [rows] = await dbConnection.promise().query("SELECT * FROM `lag`");
        
        const teamWithPlayers = await Promise.all(rows.map(async (lag) => {
            const [spillereResult] = await dbConnection.promise().query(
                `SELECT 
                    s.id,
                    s.navn AS spiller_navn,
                    s.posisjon,
                    s.alder
                FROM 
                    spillere s
                JOIN 
                    lag_spillere ls ON s.id = ls.spillerId
                WHERE 
                    ls.lagId = ?`,  
                [lag.id]
            );

            return {
                ...lag,  
                spillere: spillereResult  
            };
        }));

        return responseLog(res.status(200), { lag: teamWithPlayers });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};


export const getTeamById = async (req, res) => {
    const { id } = req.params; 

    try {
        const [lagResult] = await dbConnection.promise().query(
            "SELECT navn, trener FROM `lag` WHERE id = ?",
            [id]
        );

       
        if (lagResult.length === 0) {
            return responseLog(res.status(404), { message: "Ingen lag med denne ID-en ble funnet." });
        }

    
        const [spillereResult] = await dbConnection.promise().query(
            `SELECT 
                s.id,
                s.navn AS spiller_navn,
                s.posisjon,
                s.alder
            FROM 
                spillere s
            JOIN 
                lag_spillere ls ON s.id = ls.spillerId
            WHERE 
                ls.lagId = ?`,  
            [id]
        );

        return responseLog(res.status(200), { lag: lagResult[0], spillere: spillereResult });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};


export const updateTeam = async (req, res) => {
    const { id } = req.params; 
    const { navn, trener, spillere } = req.body; 
    console.log("Body:", req.body);

    if (!navn && !trener && !spillere) {
        return responseLog(res.status(400), { message: "Minst ett felt må fylles ut for oppdatering." });
    }

    try {
        const [result] = await dbConnection.promise().query(
            "UPDATE `lag` SET navn = COALESCE(?, navn), trener = COALESCE(?, trener) WHERE id = ?",
            [navn, trener, id]
        );

        if (result.affectedRows === 0) {
            return responseLog(res.status(404), { message: "Ingen lag med denne ID-en ble funnet." });
        }

        if (spillere && spillere.length > 0) {
            await dbConnection.promise().query(
                "DELETE FROM lag_spillere WHERE lagId = ?",
                [id]
            );

            const spillerQueries = spillere.map(spillerId => (
                dbConnection.promise().query(
                    "INSERT INTO lag_spillere (lagId, spillerId) VALUES (?, ?)",
                    [id, spillerId]
                )
            ));
            await Promise.all(spillerQueries);
        }

        return responseLog(res.status(200), { message: "Laginformasjon oppdatert!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};


export const deleteTeam = async (req, res) => {
    const { id } = req.params; 

    try {
        const [result] = await dbConnection.promise().query(
            "DELETE FROM `lag` WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return responseLog(res.status(404), { message: "Ingen lag med denne ID-en ble funnet." });
        }

        return responseLog(res.status(200), { message: "Lag er slettet!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};


