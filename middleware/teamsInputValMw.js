import { responseLog, capEachWord } from "../utils/utilityHelpers.js";

const teamsInputValMw = (req, res, next) => {
    const { navn, trener } = req.body;
    console.log("Body:", req.body);

    const fields = [
        { key: "navn", message: "Navn må oppgis." },
        { key: "trener", message: "Trener må oppgis." }
    ];

    for (const { key, message } of fields) {
        if (!req.body[key] || req.body[key].trim() === "") {
            return responseLog(res.status(400), { message });
        }
    }

  
    req.body.navn = capEachWord(navn);
    req.body.trener = capEachWord(trener);

    next();
};

export default teamsInputValMw;