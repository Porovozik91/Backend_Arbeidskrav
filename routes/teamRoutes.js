import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addTeam, getTeams, getTeamById, updateTeam, deleteTeam } from "../logic/teams.js";
import { addMatch, getMatches } from "../logic/matches.js";
import teamsInputValMw from "../middleware/teamsInputValMw.js";
import matchInputValMw from "../middleware/matchInputValMw.js";

const router = express.Router();


router.post("/lag", authMiddleware, teamsInputValMw, addTeam); 
router.get("/lag", getTeams); 
router.post("/lag/kamp",matchInputValMw, addMatch);
router.get("/lag/kamper", getMatches);

router.get("/lag/:id", getTeamById); 
router.put("/lag/:id", authMiddleware, teamsInputValMw, updateTeam); 
router.delete("/lag/:id", authMiddleware, deleteTeam); 



export default router;
