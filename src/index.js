import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { cadastroPage, landingPage, loginPage, painelPage } from "./routers/publicas.js";

const PORT = 4444;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", landingPage);
app.get("/login", loginPage);
app.get("/cadastro", cadastroPage);
app.get("/painel", painelPage)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});