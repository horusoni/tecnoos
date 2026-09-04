import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function landingPage(req, res) {
    res.sendFile(
        path.join(__dirname, "../../views/landing.html")
)}

export async function login(req, res) {
    res.sendFile(
        path.join(__dirname,"../../views/login.html")
    )
}

export async function cadastro(req, res) {
    res.sendFile(
        path.join(__dirname, "../../views/cadastro.html")
    )
}

//condominio prive mansoes aguas lindas de goias lote 21 new world