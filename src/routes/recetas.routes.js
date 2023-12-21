import { Router } from "express";
import { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee} from "../controllers/employees.controller.js";
import { verificarJwt } from "../middlewares.js";

const router = Router()

router.get('/recetas', getEmployees)

router.get('/recetas/:id', getEmployee)

router.post('/recetas', verificarJwt ,createEmployees)

router.put('/recetas/:id', updateEmployees )

router.delete('/recetas/:id', deleteEmployees)

export default router