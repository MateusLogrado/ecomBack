require('dotenv').config()
const cors = require("cors")
const express = require("express")
const app = express()

const conn = require("./db/conn_local")

const PORT = process.env.PORT
const hostname = process.env.DB_HOST  

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const authMiddleware = require("./middleware/auth.middleware")
const authController = require("./controller/auth.controller")
const usuarioController = require("./controller/usuario.controller")
const enderecoController = require("./controller/endereco.controller")
const produtoController = require("./controller/produto.controller")
const estoqueController = require("./controller/estoque.controller")
const itemPedidoController = require("./controller/itemPedido.controller")
const pedidoController = require("./controller/pedido.controller")
const entregaController = require("./controller/entrega.controller")

app.get("/", (req,res)=>{
    res.status(201).json({message: "Aplicação rodando!"})
})

app.post("/usuario", usuarioController.cadastrar)
app.post("/login", authController.login)
app.get("/produto", produtoController.listar)
app.get("/estoque", estoqueController.listar)


app.use(authMiddleware)

app.put("/usuario", usuarioController.atualizar)
app.delete("/usuario", usuarioController.apagar)
app.post("/usuario/consultar", usuarioController.consultar)
app.get("/usuario", usuarioController.listar)

app.post("/endereco", enderecoController.cadastrar)
app.post("/endereco/listar", enderecoController.listar)
app.delete("/endereco/:id", enderecoController.apagar)

app.post("/produto", produtoController.cadastrar)
app.put("/produto", produtoController.atualizar)

app.post("/estoque", estoqueController.cadastrar)
app.put("/estoque", estoqueController.atualizar)

app.post("/itemPedido/:id", itemPedidoController.cadastrar)

app.post("/pedido", pedidoController.cadastrar)
app.post("/pedido/listar", pedidoController.listar)
app.put("/pedido", pedidoController.atualizar)

app.post("/entrega", entregaController.cadastrar)
app.put("/entrega", entregaController.atualizar)

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`aplicação rodando em http://${hostname}:${PORT}`)
    })
})
.catch(err =>{
    console.error("Erro ao iniciar a aplicação: ", err)
})