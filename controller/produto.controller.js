const Produto = require("../models/Produto")

const cadastrar = async (req,res) =>{
    const body = req.body

    console.log("produto: ", body)

    try{
        const produto = await Produto.create(body)
        res.status(200).json(produto)
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar o produto"})
        console.error("Erro ao cadastrar o produto",err)
    }
}

const listar = async (req,res) =>{
    try{
        const produtos = await Produto.findAll()
        res.status(200).json(produtos)
    }catch(err){
        res.status(500).json({error: "Erro ao listar o produto"})
        console.error("Erro ao listar o produto",err)
    }
}

const atualizar = async (req,res) =>{
    const body = req.body

    console.log(body)

    try{
        const produto = await Produto.findOne({where: {nome: body.nome}})
        if(!produto){
            res.status(404).json({error: "produto não encontrado"})
        }else{
            console.log(produto)
            await produto.update(body)
            res.status(200).json({message: "Produto atualizado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o produto"})
        console.error("Erro ao atualizar o produto",err)
    }
}

module.exports = { cadastrar, listar, atualizar, apagar }