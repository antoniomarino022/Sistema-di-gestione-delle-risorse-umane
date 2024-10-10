import validator from 'validator';
import { validate as uuidValidate } from 'uuid';

function validateId(id:string){
  return uuidValidate(id)
}

function validateName(name: string) {
  return name && validator.isAlphanumeric(name) && name.length >= 3 && name.length <= 20;
}

function validatePosition(position:string){
  return position 
}

function validateEmail(email: string) {
  return email && validator.isEmail(email);
}

function validatePhone(phone: string) {
  return phone && validator.isNumeric(phone) && phone.length === 9;
}

function validateDate(date: Date): boolean {
  return !isNaN(new Date(date).getTime());
}


function validateSalary(salary: number) {
  return typeof salary === 'number' && salary > 0;
}

function validateStatus(status: "active" | "inactive") {
  return status === "active" || status === "inactive";
}

export {
  validateId,
  validateName,
  validatePosition,
  validateEmail,
  validatePhone,
  validateDate,
  validateSalary,
  validateStatus
};
