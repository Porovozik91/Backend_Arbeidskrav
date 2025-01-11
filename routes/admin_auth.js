import express from "express"; 
import { registerAdmin, loginAdmin, logoutAdmin } from "../logic/adminAuth.js"; 
import auth_InputValidatorMw from "../middleware/auth_InputValidatorMw.js";


const router = express.Router(); 


router.post("/register", auth_InputValidatorMw, registerAdmin);
router.post("/login", auth_InputValidatorMw, loginAdmin); 
router.post("/logout", logoutAdmin);

export default router; 

