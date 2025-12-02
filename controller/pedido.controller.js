const Pedido = require("../models/Pedido")
const Usuario = require("../models/Usuario")

const cadastrar = async (req,res) =>{
    const body = req.body
    try{
        const usuario = await Usuario.findOne({where: {email: body.email}})
        if(usuario){
            const valores ={
                idEndereco: body.idEndereco,
                metodoPagamento: body.metodoPagamento,
                idUsuario: usuario.codUsuario,
                dataPedido: body.dataPedido,
                valorFrete: body.valorFrete,
                valorSubtotal: body.valorSubtotal,
                valorFrete: body.valorFrete,
                metodoPagamento: body.metodoPagamento,
            }

            const pedido = await Pedido.create(valores)
            res.status(200).json({codPedido: pedido.codPedido})
        }{
            res.status(404).json({message: "Usuario não achado"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar o Pedido"})
        console.error("Erro ao cadastrar o Pedido",err)
    }
}

const listar = async (req,res) =>{
    try{
        const pedidos = await Pedido.findAll()
        res.status(200).json(pedidos)
    }catch(err){
        res.status(500).json({error: "Erro ao listar o pedido"})
        console.error("Erro ao listar o pedido",err)
    }
}

const atualizar = async (req,res) =>{
    const body = req.body
    const id = req.params.id

    try{
        const pedido = await Pedido.findByPk(id)
        if(!pedido){
            res.status(404).json({error: "pedido não encontrado"})
        }else{
            await Pedido.update(body, {where: {codPedido: id}})
            res.status(200).json({message: "Pedido atualizado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o Pedido"})
        console.error("Erro ao atualizar o Pedido",err)
    }
}

module.exports = { cadastrar, listar, atualizar }