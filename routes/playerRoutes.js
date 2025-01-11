import express from "express";
import { addPlayer, getPlayers, getPlayerById, updatePlayer, deletePlayer } from "../logic/players.js";
import authMiddleware from "../middleware/authMiddleware.js";
import playerInputValMw from "../middleware/playerInputValMw.js";
import palyerMatches  from "../logic/playerMatches.js";

const router = express.Router();

router.post("/spiller", authMiddleware, playerInputValMw, addPlayer); 
router.get("/spillere", getPlayers); 
router.get("/spiller/:id", getPlayerById); 
router.put("/spiller/:id", authMiddleware, playerInputValMw, updatePlayer); 
router.delete("/spiller/:id", authMiddleware, deletePlayer); 

router.get("/spiller/:id/kamper", palyerMatches);


export default router;
