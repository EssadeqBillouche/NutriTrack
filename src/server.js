import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import profileRoutes from './routes/profile.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    res.render("home/home");
});

app.use('/profile',profileRoutes);

app.listen(3000, () => {
    console.log("server running on port 3000");
});