import { Router } from "express";
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee} from "../controllers/employees.controller.js";

const router = Router()

router.get('/recetas', getEmployees)

router.get('/recetas/:id', getEmployee)

router.post('/recetas', createEmployees)

router.put('/recetas/:id', updateEmployees )

router.delete('/recetas/:id', deleteEmployees)

export default router