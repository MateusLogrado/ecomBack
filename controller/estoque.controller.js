const Estoque = require("../models/Estoque")
const Produto = require("../models/Produto")

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

const atualizar = async (req,res) =>{
    const body = req.body

    console.log(body)

    try{
        const produto = await Produto.findOne({where: {nome: body.nome}})
        if(!produto){
            res.status(404).json({error: "produto não encontrado"})
        }else{
            const estoque = await Estoque.findOne({where: {idProduto: produto.codProduto}})

            if(!estoque){
                res.status(404).json({error: "Estoque não encontrado"})
            }else{
            await estoque.update({
                quantidade_atual: body.quantidade_atual,
                quantidade_minima: body.quantidade_minima
            })
            res.status(200).json({message: "Estoque atualizado com sucesso"})
            }
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o estoque"})
        console.error("Erro ao atualizar o estoque",err)
    }
}

module.exports = { cadastrar, listar, atualizar }