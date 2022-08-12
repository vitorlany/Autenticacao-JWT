const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const SECRET = "TESTETESTE" // passar isso para .env

app.use(express.json())

console.log("Servidor iniciado!")

app.get("/", (req, res, next) => {
    let callback = req.body.token
    if (callback) {
        try {
            jwt.verify(callback, SECRET)
        }catch (err) {
            res.status(404).json({"err":"Usuário não autenticado!"})
        }
        res.status(200).json({"resposta":"Aprovado!"})
        if (resposta) {
        }
    } else {
        let resposta = jwt.sign({"userID":1}, SECRET)
        res.status(200).json({"token":resposta})
    }
})

app.listen(3000)