const express = require("express")
const app = express()

app.use(express.json())

console.log("Servidor iniciado!")

app.get("/", (req, res, next) => {
    console.log(req.body)
    res.status(404).json({"err":"Usuário não autenticado!"})
})

app.listen(3000)