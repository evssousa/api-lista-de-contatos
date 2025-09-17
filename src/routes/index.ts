import express from "express"
import writeFile = require("fs")
import fs = require("fs")

const dataSource = "./data/lista.txt"

const router = express.Router()

router.post("/contato", (req, res) => {
    const { nome } = req.body

    if (!nome || nome.length < 2) {
        return res.json({ error: "Nome precisa ter pelo menos 2 caracteres." })
    }

    // processamento dos dados
    let lista: string[] = []
    try {
        const data = await fs.readFile(dataSource, { encoding: "utf8" })
        lista = data.split("\n")
    } catch(err) { }

    lista.push(nome)
    await writeFile(dataSource, lista.join("\n"))

    res.status(201).json({ contato: nome })
})

export default router