import { responseLog } from "../utils/utilityHelpers.js";

const auth_InputValidatorMw = (req, res, next) => {
    const { epost, passord } = req.body; 

    if (!epost) {
        return responseLog(res.status(400), { message: "E-postfeltet kan ikke være tomt." });
    } else {
        req.body.epost = epost.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.epost)) {
            return responseLog(res.status(400), { message: "Ugyldig e-postadresse." });
        }
    }

    if (!passord) {
        return responseLog(res.status(400), { message: "Passord er påkrevd." });
    } else {
        if (passord.length < 5) {
            return responseLog(res.status(400), { message: "Passord må være minst 5 tegn." });
        }
        /* 
        if (!/[0-9]/.test(passord)) {
            return responseLog(res.status(400), { 
                message: "Passord må inneholde minst ett tall." 
            });
        }
        if (!/[A-Z]/.test(passord)) {
            return responseLog(res.status(400), { 
                message: "Passord må inneholde minst én stor bokstav." 
            });
        }
        if (!/[a-z]/.test(passord)) {
            return responseLog(res.status(400), { 
                message: "Passord må inneholde minst én liten bokstav." 
            });
        }
        if (!/[\W_]/.test(passord)) {
            return responseLog(res.status(400), { 
                message: "Passord må inneholde minst ett spesialtegn." 
            });
        }   
        */
    }

    return next(); 
};

export default auth_InputValidatorMw;