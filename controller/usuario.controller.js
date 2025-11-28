const Usuario = require('../models/Usuario')
const { validaCPF } = require("../utils/validar_cpf")
const { hashPassword } = require('../service/bcrypt.service')
const { comparePassword } = require("../service/bcrypt.service")

const cadastrar = async (req,res)=>{
    const valores = req.body
    console.log(valores)

    try{
        const acharUsuario = await Usuario.findOne({where: {email: valores.email}})

        if(acharUsuario){
            return res.status(409).json({message: "Email na qual esta tentando fazer cadastro, ja esta cadastrado no sistema"})
        }


        const senhaHash = await hashPassword(valores.senha)

        if(validaCPF(valores.cpf) === false){
            return res.status(500).json({message: "CPF invalido"})
        }


        const usuario = await Usuario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaHash,
            telefone: valores.telefone,
            cpf: valores.cpf,
            identidade: valores.identidade,
            tipo_usuario: valores.tipo_usuario
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

    try{
        
        const usuario = await Usuario.findOne({where: {email: body.email}})

        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            await usuario.update(body)
            res.status(200).json({message: "Usuario atualizado"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao atualizar o usuario"})
        console.error("Erro ao atualizar o usuario",err)
    }
}

const apagar = async (req,res)=>{
    const body = req.body

    try{
        
        const usuario = await Usuario.findOne({where: {email: body.email}})
        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            const senhaValida = await comparePassword(body.senha, usuario.senha)

            if(senhaValida){
                await usuario.destroy({where: {email: body.email}})
                res.status(200).json({message: "Usuario apagado com sucesso"})
            }else{
                return res.status(500).json({message: "Senha incorreta"})
            }
        }
    }catch(err){
        res.status(500).json({error: "Erro ao apagar o usuario"})
        console.error("Erro ao apagar o usuario",err)
    }
}

const consultar = async (req,res)=>{
    const body = req.body

    console.log(body)

    try{
        const usuario = await Usuario.findOne({where: {email: body.email}})
        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            return res.status(200).json({nome: usuario.nome, email: usuario.email, telefone: usuario.telefone, cpf: usuario.cpf, identidade: usuario.identidade, tipo_usuario: usuario.tipo_usuario})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao consultar o usuario"})
        console.error("Erro ao consultar o usuario",err)
    }
}

module.exports = { cadastrar, atualizar, apagar, consultar }