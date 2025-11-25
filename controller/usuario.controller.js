const Usuario = require('../models/Usuario')
const { validaCPF } = require("../utils/validar_cpf")
const { hashPassword } = require('../service/bcrypt.service')

const cadastrar = async (req,res)=>{
    const valores = req.body

    try{
        const acharUsuario = await Usuario.findOne({where: {email: valores.email}})

        if(acharUsuario){
            return res.status(409).json({message: "Email na qual esta tentando fazer cadastro, ja esta cadastrado no sistema"})
        }


        const senhaHash = await hashPassword(valores.senha)

        if(validaCPF(validaCPF.cpf) === false){
            return res.status(500).json({message: "CPF invalido"})
        }


        const usuario = await Usuario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaHash,
            telefone: valores.telefone,
            cpf: valores.cpf,
            identidade: valores.identidade,
            tipe_usuario: valores.tipe_usuario
        })
        res.status(201).json({message: 'Usuario cadastrado com sucesso!', cadastrou: true})
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

const consultar = async (req,res)=>{
    const body = req.body

    try{
        const usuario = await Usuario.findOne({where: {email: body.body}})
        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            return res.status(200).json({nome: usuario.nome, email: usuario.email, telefone: usuario.telefone, cpf: usuario.cpf, identidade: usuario.identidade})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao consultar o usuario"})
        console.error("Erro ao consultar o usuario",err)
    }
}

module.exports = { cadastrar, atualizar, apagar, consultar }