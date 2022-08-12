const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const SECRET = "TESTETESTE" // passar isso para .env

app.use(express.json())

console.log("Servidor iniciado!")

app.get("/err", (req, res, next) => {
    console.log(req.body)
    res.status(404).json({"err":"Usuário não autenticado!"})
})
app.get("/", (req, res, next) => {
    console.log(req.body)
    let resposta = jwt.sign({"userID":1}, SECRET)
    res.status(200).json({"token":resposta})
})

app.listen(3000)