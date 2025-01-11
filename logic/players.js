import dbConnection from "../config/db.js"; 
import { responseLog } from "../utils/utilityHelpers.js"; 

// Legger til en ny spiller
export const addPlayer = async (req, res) => {
    const { navn, posisjon, alder} = req.body; 
    console.log("Body:", req.body);

    try {
        await dbConnection.promise().query(
            "INSERT INTO spillere (navn, posisjon, alder) VALUES (?, ?, ?)",
            [navn, posisjon, alder]
        ); 
        return responseLog(res.status(201), { message: "Ny spiller lagt til!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt og spilleren ble ikke lagt til" });
    }
};


export const getPlayers = async (req, res) => {
    try {
        const [rows] = await dbConnection.promise().query("SELECT * FROM spillere");
        return responseLog(res.status(200), { spillere: rows }); 
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};


export const getPlayerById = async (req, res) => {
    const { id } = req.params; 
    console.log("Henter spiller med ID:", id);

    try {
        const [rows] = await dbConnection.promise().query("SELECT * FROM spillere WHERE id = ?", [id]);

        if (rows.length === 0) {
            return responseLog(res.status(404), { message: "Ingen spiller med denne ID-en ble funnet." });
        }

        return responseLog(res.status(200), { spiller: rows[0] }); 
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};

export const updatePlayer = async (req, res) => {
    const { id } = req.params; 
    const { navn, posisjon, alder } = req.body; 
    console.log("Body:", req.body);

    if (!navn && !posisjon && !alder) {
        return responseLog(res.status(400), { message: "Minst ett felt må fylles ut for oppdatering." });
    } 

    try {
        const [result] = await dbConnection.promise().query(
            "UPDATE spillere SET navn = COALESCE(?, navn), posisjon = COALESCE(?, posisjon), alder = COALESCE(?, alder) WHERE id = ?",
            [navn, posisjon, alder, id]
        );

        if (result.affectedRows === 0) {
            return responseLog(res.status(404), { message: "Ingen spiller med denne ID-en ble funnet." });
        }

        return responseLog(res.status(200), { message: "Spillerinformasjon oppdatert!" }); 
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};

export const deletePlayer = async (req, res) => {
    const { id } = req.params; 
    console.log("Body:", req.body);

    try {
        const [result] = await dbConnection.promise().query(
            "DELETE FROM spillere WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return responseLog(res.status(404), { message: "Ingen spiller med denne ID-en ble funnet." });
        }

        return responseLog(res.status(200), { message: "Spiller er slettet!" }); 
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};



