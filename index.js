require('dotenv').config()
const express = require("express")
const app = express()
const conn = require("./db/conn")
const cors = require("cors")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0' // 0.0.0.0 é seguro e aceita conexões em PaaS

const isProduction = process.env.NODE_ENV === 'production'

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

app.post("/endereco", enderecoController.cadastrar)
app.post("/endereco/listar", enderecoController.listar)
app.delete("/endereco/:id", enderecoController.apagar)

app.post("/produto", produtoController.cadastrar)
app.put("/produto", produtoController.atualizar)

app.post("/estoque", estoqueController.cadastrar)
app.put("/estoque", estoqueController.atualizar)

app.post("/itemPedido", itemPedidoController.cadastrar)

app.post("/pedido", pedidoController.cadastrar)
app.get("/pedido", pedidoController.listar)
app.put("/pedido", pedidoController.atualizar)

app.post("/entrega", entregaController.cadastrar)
app.get("/entrega", entregaController.listar)
app.put("/entrega", entregaController.atualizar)

async function startServer() {
  try {
    if (!isProduction) {
      // Em desenvolvimento: sincroniza alterando o esquema para facilitar dev
      await conn.sync({ alter: true })
      console.log('Banco sincronizado (dev) com { alter: true }');
    } else {
      // Em produção: NÃO sincronize automaticamente (evita droppar/alterar sem controle)
      await conn.authenticate()
      console.log('Banco autenticado (produção)')
    }

    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`)
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco ou iniciar o servidor:', err)
    process.exit(1) // sai com erro para o Railway identificar falha no deploy
  }
}

startServer()