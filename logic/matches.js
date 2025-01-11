import dbConnection from "../config/db.js";
import { responseLog } from "../utils/utilityHelpers.js";

export const addMatch = async (req, res) => {
    const { lagId, motstander, dato, sted } = req.body;
    console.log("Body:", req.body);

    try {
        const [rows] = await dbConnection.promise().query(
            "SELECT id FROM `lag` WHERE id = ?",
            [lagId]
        );

        if (rows.length === 0) {
            return responseLog(res.status(400), { message: "Lag ID finnes ikke." });
        }

        await dbConnection.promise().query(
            "INSERT INTO kamper (lagId, motstander, dato, sted) VALUES (?, ?, ?, ?)",
            [lagId, motstander, dato, sted]
        );

        return responseLog(res.status(201), { message: "Kampregistrering bekreftet!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt under registrering av kampen." });
    }
};

export const getMatches = async (req, res) => {
    try {
        const { lagId } = req.query; 

        if (!lagId) {
            return responseLog(res.status(400), { message: "Lag ID må spesifiseres." });
        }

        const [kamper] = await dbConnection.promise().query(
            "SELECT * FROM kamper WHERE lagId = ?",
            [lagId] 
        );

        if (kamper.length === 0) {
            return responseLog(res.status(404), { message: "Ingen kamper funnet for dette laget." });
        }

        return responseLog(res.status(200), { kamper });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Noe gikk galt med forespørselen." });
    }
};









