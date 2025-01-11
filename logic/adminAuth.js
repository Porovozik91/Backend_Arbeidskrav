import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import dbConnection from "../config/db.js"; 
import { responseLog, capEachWord } from "../utils/utilityHelpers.js";

export const registerAdmin = async (req, res) => {
    const { navn, epost, passord } = req.body; 
    console.log("Body:", req.body); 

    try {
        if (!navn) {
            return responseLog(res.status(400), { message: "Navn er påkrevd" });
        }

      
        req.body.navn = capEachWord(navn);

        
        const [[existingUser]] = await dbConnection.promise().query(
            "SELECT * FROM admin_bruker WHERE navn = ? OR epost = ?",
            [req.body.navn, epost] 
        );

        if (existingUser) {
            return responseLog(res.status(409), { message: "Administrator med samme brukernavnet eller e-posten eksisterer allerede." });
        }

       
        const hashedPassword = await bcrypt.hash(passord, 10);
        await dbConnection.promise().query(
            "INSERT INTO admin_bruker (navn, epost, passord) VALUES (?, ?, ?)",
            [req.body.navn, epost, hashedPassword]
        );

        return responseLog(res.status(201), { message: "Registrering vellykket!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Oops! Noe gikk galt ved registrering." });
    }
};

export const loginAdmin = async (req, res) => {
    const { epost, passord } = req.body;

    try {
        const [[admin]] = await dbConnection.promise().query(
            "SELECT * FROM admin_bruker WHERE epost = ?",
            [epost]
        );

        if (!admin || !(await bcrypt.compare(passord, admin.passord))) {
            return responseLog(res.status(401), { message: "Ugyldig e-post eller passord." });
        }

        const token = jwt.sign({ id: admin.id, navn: admin.navn }, process.env.JWT_SECRET, {
            expiresIn: "1h", 
        });

        res.cookie("token", token, { 
            httpOnly: true, 
            expires: new Date(Date.now() + 3600000) 
        });
        return responseLog(res.status(200), { token, message: "Pålogging vellykket!" });
    } catch (err) {
        console.error(err);
        return responseLog(res.status(500), { message: "Feil ved pålogging." });
    }
};

export const logoutAdmin = async (req, res) => {
    console.log("Body:", req.body);
    res.clearCookie("token"); 
    return responseLog(res.status(200), { message: "Brukeren er logget ut." }); // Log and send response
};




