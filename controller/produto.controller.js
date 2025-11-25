const Produto = require("../models/Produto")

const cadastrar = async (req,res) =>{
    const body = req.body
    try{
        await Produto.create(body)
        res.status(200).json({message: "Produto cadatrado"})
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
    const id = req.params.id

    try{
        const produto = await Produto.findByPk(id)
        if(!produto){
            res.status(404).json({error: "produto não encontrado"})
        }else{
            await Produto.update(body, {where: {codProduto: id}})
            res.status(200).json({message: "Produto atualizado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o produto"})
        console.error("Erro ao atualizar o produto",err)
    }
}

const apagar = async (req,res) =>{
    const id = req.params.id

    try{
        const produto = await Produto.findByPk(id)
        if(!produto){
            res.status(404).json({error: "produto não encontrado"})
        }else{
            await Produto.destroy({where: {codProduto: id}})
            res.status(200).json({message: "Produto apagado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao apagar o produto"})
        console.error("Erro ao apagar o produto",err)
    }
}

module.exports = { cadastrar, listar, atualizar, apagar }