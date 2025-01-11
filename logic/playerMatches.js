import dbConnection from "../config/db.js"; 
import { responseLog } from "../utils/utilityHelpers.js";

const playerMatches = async (req, res) => {
    try {
        const spillerId = req.params.id;

        const [rows] = await dbConnection.promise().query(
            `SELECT 
                k.id AS kampId,
                k.motstander,
                k.dato,
                k.sted
            FROM 
                kamper k
            JOIN 
                kamp_spillere ks ON k.id = ks.kampId
            WHERE 
                ks.spillerId = ?`,
            [spillerId]
        );

        return responseLog(res.status(200), { kamper: rows });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Ooopsi, noe gikk galt." });
    }
};

export default playerMatches;

