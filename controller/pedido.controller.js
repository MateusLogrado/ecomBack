const { Usuario, Pedido, Entrega, ItemPedido, Produto } = require('../models/rel')
const rel = require("../models/rel")

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
                valorTotal: Number(body.valorFrete) + Number(body.valorSubtotal),
                valorSubtotal: body.valorSubtotal,
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

const listar = async (req, res) => {
    const { email } = req.body

    try {
        const usuario = await Usuario.findOne({ where: { email: email } })
        
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" })
        }

        const pedidos = await Pedido.findAll({
            where: { idUsuario: usuario.codUsuario },
            include: [
                { 
                    model: Entrega,
                    as: 'entregaPedido',
                    required: false 
                },
                { 
                    model: ItemPedido,
                    as: 'itensPedido', 
                    required: false,
                    include: [
                        {
                            model: Produto,
                            as: 'produtoItem'
                        }
                    ]
                }
            ]
        })

        res.status(200).json(pedidos)

    } catch (err) {
        console.error("Erro", err)
        res.status(500).json({ message: "Erro ao listar pedidos" })
    }
}

const atualizar = async (req, res) => {
    const body = req.body

    try {
        await Pedido.update({ status: body.status }, { where: { codPedido: body.codPedido } })
        res.status(200).json({ message: "Status atualizado!" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao atualizar pedido" })
    }
}

module.exports = { cadastrar, listar, atualizar }