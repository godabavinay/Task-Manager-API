import express from 'express';
import tasksRoutes from './routes/tasks';

const app = express();

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use('/', (_, res) => { res.status(200).json({ message: 'API is up and running' }) });

export default app;