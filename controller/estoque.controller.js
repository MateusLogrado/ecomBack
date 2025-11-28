const Estoque = require("../models/Estoque")

const cadastrar = async (req,res) =>{
    const body = req.body
    
    console.log(body)

    try{
        await Estoque.create(body)
        res.status(200).json({message: "Estoque e produto cadatrado"})
    }catch(err){
        res.status(500).json({error: "Erro ao Estoque o estoque"})
        console.error("Erro ao Estoque o estoque",err)
    }
}

const listar = async (req,res) =>{
    try{
        const estoques = await Estoque.findAll()
        res.status(200).json(estoques)
    }catch(err){
        res.status(500).json({error: "Erro ao listar o estoque"})
        console.error("Erro ao listar o estoque",err)
    }
}

module.exports = { cadastrar, listar }