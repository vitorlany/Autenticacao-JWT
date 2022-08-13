const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const SECRET = "TESTETESTE" // passar isso para .env

// nodemon index.js

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next();
})

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

app.post("/login", (req, res, next) => {
    // Aqui faz a autenticacao no banco de dados
    const USUARIO = req.body.usuario
    const SENHA = req.body.senha
    console.log(USUARIO, SENHA, req.body)
    if (USUARIO == "Vitor" && SENHA == "123") {
        let resposta = jwt.sign({"userID":1}, SECRET, {expiresIn: 3600}) // Mudar o id pelo banco
        res.status(200).json({"token":resposta})
    } else {
        res.status(203).json({"err":"Usuário inválido"})
    }
})

app.listen(3000)