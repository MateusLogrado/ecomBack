const ItemPedido = require("../models/ItemPedido")

const cadastrar = async (req,res) =>{
    const body = req.body
    try{
        await ItemPedido.bulkCreate(body)
        res.status(200).json({message: "itemPedido cadatrado"})
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar o itemPedido"})
        console.error("Erro ao cadastrar o itemPedido",err)
    }
}

module.exports = { cadastrar }