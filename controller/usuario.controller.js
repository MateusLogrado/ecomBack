const Usuario = require('../models/Usuario')
const { hashPassword } = require('../service/bcrypt.service')

const cadastrar = async (req,res)=>{
    const valores = req.body

    try{
        const senhaHash = await hashPassword(valores.senha)

        const usuario = await Usuario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaHash,
            telefone: valores.telefone,
            cpf: valores.cpf,
            identidade: valores.identidade,
            tipe_usuario: valores.tipe_usuario
        })
        res.status(201).json({message: 'Usuario cadastrado com sucesso!'})
        console.log(usuario)
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar o usuario"})
        console.error("Erro ao cadastrar o usuario",err)
    }
}

const atualizar = async (req,res)=>{
    const body = req.body
    const id = req.params.body

    try{
        
        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            await usuario.update(body)
            const usuarioAtualizado = await Usuario.findByPk(id)
            res.status(200).json(usuarioAtualizado)
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o usuario"})
        console.error("Erro ao atualizar o usuario",err)
    }
}

const apagar = async (req,res)=>{
    const id = req.params.body

    try{
        
        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            await usuario.destroy(id)
            res.status(200).json({message: "Usuario apagado com sucesso"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao apagar o usuario"})
        console.error("Erro ao apagar o usuario",err)
    }
}

module.exports = { cadastrar, atualizar, apagar }