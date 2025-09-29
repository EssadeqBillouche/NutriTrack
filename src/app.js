import express from 'express';
import reportRoutes from './routes/reportRoutes.js';
import profileRoutes from './routes/profile.routes.js';

const app = express();

app.use('/reports', reportRoutes);
app.use('/profile', profileRoutes);

export default app;
