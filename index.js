const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const SECRET = "TESTETESTE" // passar isso para .env

// nodemon index.js

app.use(express.json())

console.log("Servidor iniciado!")

app.get("/", (req, res, next) => {
    let callback = req.body.token
    if (callback) {
        try {
            jwt.verify(callback, SECRET)
        }catch (err) {
            res.status(203).json({"err":"Usuário não autenticado!"})
        }
        res.status(200).json({"resposta":"Aprovado!"})
    } else {
        res.status(203).json({"err":"Primeiro entre em sua conta!"})
    }
})

app.get("/login", (req, res, next) => {
    /*// Aqui faz a autenticacao no banco de dados
    const USUARIO = req.body.usuario
    const SENHA = req.body.senha*/
    let resposta = jwt.sign({"userID":1}, SECRET)
    res.status(200).json({"token":resposta})
})

app.listen(3000)