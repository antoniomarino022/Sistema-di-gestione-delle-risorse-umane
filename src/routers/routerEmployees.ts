import express from 'express';
import { create, deleteEmployeeById, updateEmployeeById } from '../controllers/controllerEmployees';

const routerEmployees = express.Router();


// create employee
routerEmployees.post('/', (req, res) => {
  create(req, res);
});


// delete employee
routerEmployees.delete('/:id', (req, res) => {
  deleteEmployeeById(req, res);
})


// update employee
routerEmployees.put('/:id', (req, res) => {
  updateEmployeeById(req, res);
});




export default routerEmployees;