const Usuario = require("../models/Usuario")
const Endereco = require("../models/Endereco")

const cadastrar = async (req,res)=>{
    const body = req.body
    try{
        const usuario = await Usuario.findOne({where: {email: body.email}})

        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }else{
            const valores = {
                idUsuario: usuario.codUsuario,
                cep: body.cep,
                logradouro: body.logradouro,
                complemento: body.complemento,
                bairro: body.bairro,
                localidade: body.localidade,
                uf: body.uf,
                numero: body.numero,
                apelido: body.apelido,
                is_principal: is_principal
            }

            await Endereco.create(valores)
            res.status(201).json({message: "Endereço adiciona com sucesso!"})
        }
    }catch(err){
        res.status(500).json({error: "Erro ao cadastrar o endereço"})
        console.error("Erro ao cadastrar o endereço",err)
    }
}