const Usuario = require('../models/Usuario')
const { comparePassword } = require('../service/bcrypt.service')
const { generateToken } = require('../service/jwt.service')

const login = async (req,res)=>{
    try{
        const valores = req.body
        const usuario = await Usuario.findOne({ where: {email: valores.email}})

        if(!usuario){
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        const senhaValida = await comparePassword(valores.senha, usuario.senha)
        if(!senhaValida){
            return res.status(401).json({error: "Senha inválida!"})
        }

        const token = generateToken({ id: usuario.codUsuario, email: usuario.email})
        res.status(200).json({message: 'Login realizado com sucesso!', token: token, email: usuario.email, nome: usuario.nome})

    }catch(err){
        res.status(500).json({error: "Erro ao realizar o login!"})
        console.error("Erro ao realizar o login!",err)
    }
}

module.exports = { login }