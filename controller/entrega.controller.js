const Entrega = require("../models/Entrega")

const cadastrar = async (req,res) =>{
    const body = req.body
    try{
        await Entrega.create(body)
        res.status(200).json({message: "Entrega cadatrado"})
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar a entrega"})
        console.error("Erro ao cadastrar a entrega",err)
    }
}

const atualizar = async (req, res) => {
    const body = req.body

    try {
        await Entrega.update({
            statusEntrega: body.statusEntrega,
            codigoRastreio: body.codigoRastreio,
            transportadora: body.transportadora,
            dataEstimada: body.dataEstimada || null, 
            dataEntrega: body.dataEntrega || null
        }, { 
            where: { idPedido: body.idPedido } 
        })

        res.status(200).json({ message: "Entrega atualizada!" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erro ao atualizar entrega" })
    }
}

module.exports = { cadastrar, atualizar}