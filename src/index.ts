import express, { Request, Response } from "express";
import { config } from 'dotenv';
import { getDb } from "./db";

const app = express();
const server = express.json();
const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL || "http://localhost";

config()
app.use(server);

app.use((req, res, next) => {
  console.log('Corpo Grezzo:', req.body);
  next();
});


async function initializeDatabase() {
  const db = await getDb();
  await db.exec(`
CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    salary REAL NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    hire_date DATE NOT NULL,
    employment_status TEXT DEFAULT 'active' CHECK(employment_status IN ('active', 'inactive'))
);

CREATE TABLE IF NOT EXISTS presences (
    id TEXT PRIMARY KEY NOT NULL,
    employee_id TEXT NOT NULL,
    date DATE NOT NULL,
    employment_status TEXT NOT NULL CHECK(employment_status IN ('present', 'absent', 'leave')), 
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS payrolls (
    id TEXT PRIMARY KEY NOT NULL,
    employee_id TEXT NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    salary REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS performance_reviews (
    id TEXT PRIMARY KEY NOT NULL, 
    employee_id TEXT NOT NULL, 
    review_date DATE NOT NULL,
    score INTEGER CHECK(score BETWEEN 1 AND 5),
    comments TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS contracts (
    id TEXT PRIMARY KEY NOT NULL,  
    employee_id TEXT NOT NULL,  
    contract_type TEXT NOT NULL CHECK(contract_type IN ('full-time', 'part-time', 'contractor')),
    start_date DATE NOT NULL,
    end_date DATE,
    employment_status TEXT NOT NULL CHECK(employment_status IN ('active', 'expired', 'terminated')),  
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY NOT NULL,  
    employee_id TEXT NOT NULL,  
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS personal_data (
    id TEXT PRIMARY KEY NOT NULL,  
    employee_id TEXT NOT NULL,      
    address TEXT,                  
    birth_date DATE,                
    gender TEXT CHECK(gender IN ('male', 'female', 'other')),  
    FOREIGN KEY (employee_id) REFERENCES employees(id)  
);

  `);
}

initializeDatabase();







app.listen(port, function () {
  console.log(`Server is running on ${baseURL}:${port}`);
});
