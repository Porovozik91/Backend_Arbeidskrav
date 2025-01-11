import { responseLog, capEachWord } from "../utils/utilityHelpers.js";

const matchInputValMw = (req, res, next) => {
    const { motstander, dato, sted } = req.body;
    console.log("Body:", req.body);

    const fields = [
        { key: "motstander", message: "Motstander må oppgis." },
        { key: "dato", message: "Dato må oppgis." },
        { key: "sted", message: "Sted må oppgis." }
    ];

    for (const { key, message } of fields) {
        if (!req.body[key] || String(req.body[key]).trim() === "") {
            return responseLog(res.status(400), { message });
        }
    }

    
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/; 
    if (!datePattern.test(dato)) {
        return responseLog(res.status(400), { message: "Dato må være i formatet dd.mm.åååå." });
    }

    const [day, month, year] = dato.split('.').map(Number);
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const validDate = new Date(year, month - 1, day); 
    if (isNaN(validDate.getTime())) {
        return responseLog(res.status(400), { message: "Ugyldig dato." });
    }


    req.body.motstander = capEachWord(motstander);
    req.body.sted = capEachWord(sted);
    req.body.dato = formattedDate; 

    next();
};

export default matchInputValMw;



