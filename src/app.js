import express from 'express';
import path from 'path';
import authRouter from './routes/auth.routes.js'
import mealAnalysisRouter from './routes/mealAnalysis.routes.js'
import profileRouter from './routes/profile.routes.js'
import reportsRouter from './routes/profile.routes.js'
import aiRouter from './routes/ai.routes.js'
import expressLayouts from 'express-ejs-layouts';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'auth/main');
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render("home/home", { title : 'Home'});
});

app.use('/auth', authRouter);
app.use('/dashboard/meal', mealAnalysisRouter);
app.use('/dashboard/profile', profileRouter);
app.use('/dashboard/reports', reportsRouter);
app.use('/dashboard/ai', aiRouter);

export default app;
