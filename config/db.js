//Importerer avhengigheter
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//Oppretter db kobling
const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//Kobler til db
dbConnection.connect(err => {
    if (err) {
        console.error("Kunne ikke kobles til databasen");
        throw err;
    }
    console.log("Connected to the database.");
});


//Feilsøking node config/db.js
console.log("Tester om miljøvariablene blir hentet fra .env:");
console.log(
    process.env.DB_HOST, 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_NAME,
    process.env.PORT,
    process.env.JWT_SECRET,
);

export default dbConnection;