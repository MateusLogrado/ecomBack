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

const listar = async (req,res) =>{
    try{
        const entregas = await Entrega.findAll()
        res.status(200).json(entregas)
    }catch(err){
        res.status(500).json({error: "Erro ao listar a entrega"})
        console.error("Erro ao listar a entrega",err)
    }
}

const atualizar = async (req,res) =>{
    const body = req.body
    const id = req.params.id

    try{
        const entrega = await Entrega.findByPk(id)
        if(!entrega){
            res.status(404).json({error: "entrega não encontrado"})
        }else{
            await Entrega.update(body, {where: {codEntrega: id}})
            res.status(200).json({message: "Entrega atualizado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar a entrega"})
        console.error("Erro ao atualizar a entrega",err)
    }
}

module.exports = { cadastrar, listar, atualizar }