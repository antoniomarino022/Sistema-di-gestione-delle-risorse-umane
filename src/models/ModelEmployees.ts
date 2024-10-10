import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import logger from '../middleware/logger';
import { v4 as uuid } from 'uuid';


async function getDb() {
    return open({
        filename: 'mydb.sqlite',
        driver: sqlite3.Database
    });
}

export interface EmployeesBody {
    name: string;
    position:"recruiter"|"developer"|"tester"|"HR"|"manager";
    salary: number;
    email: string;
    phone: string;
    hire_date: Date;
    employment_status: 'active' | 'inactive';
}


// create employee
export async function createEmployee(employee: EmployeesBody) {
    const db = await getDb();
    
    const id = uuid()
    const verifyEmployee = await db.get('SELECT * FROM employees WHERE id = ?', [id]);
    if (verifyEmployee) {
        logger.warn('Dipendente già esistente con questo ID');
    }else{
        const result = await db.run('INSERT INTO employees (id, name, position, salary, email, phone, hire_date, employment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [id, employee.name, employee.position, employee.salary, employee.email, employee.phone, employee.hire_date, employee.employment_status]);
            if(result.changes && result.changes > 0){
                logger.info('dipendente creato');
                
                
            }else{
            logger.error('dipendente non creato');
            };
    }
    
};


// delete employee
export async function deleteEmployee(id: string) {
    const db = await getDb();

    const verifyEmployee = await db.get('SELECT * FROM employees WHERE id = ?', [id]);
    if (!verifyEmployee) {
        logger.warn('Dipendente non esistente');
    }else{
        const result = await db.run('DELETE FROM employees WHERE id = ?', [id]);
        if(result.changes && result.changes > 0){
            logger.info('dipendente eliminato');
        }else{
            logger.error('dipendente non eliminato');
        }
    }
  
};


// update employee
export async function updateEmployee(id: string, employee: EmployeesBody) {
    const db = await getDb();
    const verifyEmployee = await db.get('SELECT * FROM employees WHERE id = ?', [id]);
    if (!verifyEmployee) {
        logger.warn('Dipendente non esistente');
    }else{
        const result = await db.run('UPDATE employees SET name = ?, position = ?, salary = ?, email = ?, phone = ?, hire_date = ?, employment_status = ? WHERE id = ?', 
            [employee.name, employee.position, employee.salary, employee.email, employee.phone, employee.hire_date, employee.employment_status, id]);
        if(result.changes && result.changes > 0){
            logger.info('dipendente aggiornato');
        }else{
            logger.error('dipendente non aggiornato');
        }
    }
  
}