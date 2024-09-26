import express, { Request, Response } from "express";
import { config } from 'dotenv';
import { getDb } from "./db";

const app = express();
const server = express.json();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "http://localhost";

app.use(server);

app.use((req, res, next) => {
  console.log('Corpo Grezzo:', req.body);
  next();
});





async function initializeDatabase() {
  const db = await getDb();
  await db.exec(`
    
  `);
}

initializeDatabase();







app.listen(port, function () {
  console.log(`Server is running on ${baseURL}:${port}`);
});
