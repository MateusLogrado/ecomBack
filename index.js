require('dotenv').config()
const cors = require("cors")
const express = require("express")
const app = express()

const conn = require("./db/conn")

const PORT = process.env.PORT
const hostname = process.env.DB_HOST  

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const usuarioController = require("./controller/usuario.controller")
const authController = require("./controller/auth.controller")

app.get("/", (req,res)=>{
    res.status(201).json({message: "Aplicação rodando!"})
})

app.use("/usuario", usuarioController.cadastrar)
app.use("/login", authController.login)

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`aplicação rodando em http://${hostname}:${PORT}`)
    })
})
.catch(err =>{
    console.error("Erro ao iniciar a aplicação: ", err)
})