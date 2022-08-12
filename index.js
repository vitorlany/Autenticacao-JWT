const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const SECRET = "TESTETESTE" // passar isso para .env

// nodemon index.js

app.use(express.json())

console.log("Servidor iniciado!")

app.get("/", (req, res, next) => {
    const CALLBACK = req.headers["authorization"]
    if (CALLBACK) {
        try {
            jwt.verify(CALLBACK, SECRET)
        }catch (err) {
            res.status(203).json({"err":"Usuário não autenticado!"})
        }
        res.status(200).json({"status":1,"mensagem":"Autenticado!"})
    } else {
        res.status(203).json({"err":"Primeiro entre em sua conta!"})
    }
})

app.get("/login", (req, res, next) => {
    /*// Aqui faz a autenticacao no banco de dados
    const USUARIO = req.body.usuario
    const SENHA = req.body.senha*/
    let resposta = jwt.sign({"userID":1}, SECRET, {expiresIn: 3600}) // Mudar o id pelo banco
    res.status(200).json({"token":resposta})
})

app.listen(3000)