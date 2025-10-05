import express from 'express';
import path from 'path';
import authRouter from './routes/auth.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import mealAnalysisRoutes from './routes/mealAnalysis.routes.js'
import profileRouter from './routes/profile.routes.js'
import reportsRouter from './routes/reports.routes.js'
import aiRouter from './routes/ai.routes.js'
import expressLayouts from 'express-ejs-layouts';
import sessionConfig from './config/session.js';
import dotenv from "dotenv"
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(sessionConfig);
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'auth/main');
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render("home/home", { title : 'Home', scripts :[], layout : false});
});



app.use('/auth', authRouter);
app.use('/dashboard', dashboardRoutes);
app.use('/meal', mealAnalysisRoutes);
app.use('/profile', profileRouter);
app.use('/reports', reportsRouter);
app.use('/ai', aiRouter);


app.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'Page Not Found - NutriScan.AI',
        scripts : false,
        layout : false
    });
});
export default app;
