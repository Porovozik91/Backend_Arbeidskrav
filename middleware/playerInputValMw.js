import {responseLog, capEachWord} from "../utils/utilityHelpers.js";

const playerInputValMw = (req, res, next) => {
    const { navn, posisjon, alder } = req.body;

    const fields = [
        { key: "navn", message: "Navn må oppgis." },
        { key: "posisjon", message: "Posisjon må oppgis." },
        { key: "alder", message: "Alder må oppgis." }
    ];

    for (const { key, message } of fields) {
        if (!req.body[key] || req.body[key].trim() === "") {
            return responseLog(res.status(400), { message });
        }
    }

    const alderNum = Number(alder);

    if (isNaN(alderNum)) {
        return responseLog(res.status(400), { message: "Alder må være et tall." });
    }
    

    req.body.navn = capEachWord(navn);
    req.body.posisjon = capEachWord(posisjon);
    req.body.alder = alderNum; 

    next();
};

export default playerInputValMw;