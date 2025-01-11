import express from "express"; 
import cookieParser from 'cookie-parser';
import adminAuthRoutes from "./routes/admin_auth.js"; 
import playerRoutes from "./routes/playerRoutes.js"; 
import teamRoutes from "./routes/teamRoutes.js"


const PORT = process.env.PORT;
const app = express(); 


app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", adminAuthRoutes); 
app.use("/api", playerRoutes); 
app.use("/api", teamRoutes);

app.get('/', (req, res) => {
    res.send("API for Molde FK administrasjon av spillere, lag og kamper");
});

app.listen(PORT, () => {
    console.log(`Serveren kjører på port ${PORT}`); 
});
