import jwt from "jsonwebtoken"; 
import dotenv from "dotenv"; 
import { responseLog } from "../utils/utilityHelpers.js";

dotenv.config(); 


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return responseLog(res.status(401), { message: "Tilgang nektet: Token mangler" }); 
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        return next(); 
    } catch (err) {

        if (err.name === "TokenExpiredError") {
            res.clearCookie("token"); 
            return responseLog(res.status(401), { message: "Tokenet har utløpt, vennligst logg inn på nytt" }); 
        }

        console.error(err);
        return responseLog(res.status(403), { message: "Ugyldig token" }); 
    }
};

export default authMiddleware;


