import express from 'express'
import indexRoutes from './routes/index.routes.js'
import recetasRoutes from './routes/recetas.routes.js';
import userRoutes from './routes/users.routes.js'


const app = express();
app.use(express.json())
app.use(indexRoutes);
app.use('/api', recetasRoutes);
app.use('/', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;