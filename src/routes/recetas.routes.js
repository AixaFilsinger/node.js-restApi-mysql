import { Router } from "express";
import { getRecetas, createRecetas, updateRecetas, deleteRecetas, getReceta} from "../controllers/recetas.controller.js";
import { verificarJwt } from "../middlewares.js";

const router = Router()

router.get('/recetas', getRecetas)

router.get('/recetas/:id', getReceta)

router.post('/recetas', verificarJwt ,createRecetas)

router.put('/recetas/:id', updateRecetas )

router.delete('/recetas/:id', deleteRecetas)

export default router