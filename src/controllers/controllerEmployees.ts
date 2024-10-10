import { Request, Response } from 'express';
import logger from "../middleware/logger";
import { EmployeesBody, createEmployee, deleteEmployee,updateEmployee } from "../models/ModelEmployees";
import { validateName, validateEmail, validatePhone, validateDate, validateSalary, validateStatus, validatePosition } from "../middleware/validator";

//  create employee
export async function create(req: Request, res: Response) {
  const employee: EmployeesBody = req.body;

  try {
    if (!validateName(employee.name)) {
      logger.warn('Nome non valido');
      return res.status(400).json({ message: 'Nome non valido' });
    }

    if (!validatePosition(employee.position)) {
      logger.warn('Posizione non valida');
      return res.status(400).json({ message: 'Posizione non valida' });
    }

    if (!validateSalary(employee.salary)) {
      logger.warn('Stipendio non valido');
      return res.status(400).json({ message: 'Stipendio non valido' });
    }

    if (!validateEmail(employee.email)) {
      logger.warn('Email non valida');
      return res.status(400).json({ message: 'Email non valida' });
    }

    if (!validatePhone(employee.phone)) {
      logger.warn('Telefono non valido');
      return res.status(400).json({ message: 'Telefono non valido' });
    }

    if (!validateDate(employee.hire_date)) {
      logger.warn('Data di assunzione non valida');
      return res.status(400).json({ message: 'Data di assunzione non valida' });
    }

    if (!validateStatus(employee.employment_status)) {
      logger.warn('Stato non valido');
      return res.status(400).json({ message: 'Stato non valido' });
    }

    logger.info('Tentativo di creare un dipendente ricevuto');
    await createEmployee(employee);

    logger.info('Dipendente creato');

    res.status(201).json({ message: 'Dipendente creato' });

  } catch (err) {
    if (err instanceof Error) {
      logger.error('Errore standard di js');
      res.status(500).json({ message: 'Errore standard di js', 'errore': err.message });
    } else {
      logger.error('Errore sconosciuto');
      res.status(500).json({ message: 'Errore sconosciuto' });     
    };
  };
};


// delete empoyee
export async function deleteEmployeeById(req: Request, res: Response) {

  try {
    const id = req.params.id;
    logger.info('Tentativo di eliminare un dipendente ricevuto');
    await deleteEmployee(id);
    logger.info('Dipendente eliminato');

    res.status(200).json({ message: 'Dipendente eliminato' });
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Errore standard di js');
      res.status(500).json({ message: 'Errore standard di js', 'errore': err.message });
    } else {
      logger.error('Errore sconosciuto');
      res.status(500).json({ message: 'Errore sconosciuto' });     
    };
  }
};



// update employee
export async function updateEmployeeById(req: Request, res: Response) {

  try {
    const id = req.params.id;
    const employee: EmployeesBody = req.body;
    logger.info('Tentativo di aggiornare un dipendente ricevuto');
    await updateEmployee(id, employee);
    logger.info('Dipendente aggiornato');
    res.status(200).json({ message: 'Dipendente aggiornato' });
    
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Errore standard di js');
      res.status(500).json({ message: 'Errore standard di js', 'errore': err.message });
    } else {
      logger.error('Errore sconosciuto');
      res.status(500).json({ message: 'Errore sconosciuto' });     
    };
  }
};