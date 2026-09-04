import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { cadastro, landingPage, login } from "./routers/publicas.js";

const PORT = 4444;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", landingPage);
app.get("/login", login);
app.get("/cadastro", cadastro);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});