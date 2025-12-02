const Usuario = require("../models/Usuario")
const Endereco = require("../models/Endereco")

const cadastrar = async (req, res) => {
    const body = req.body
    try {
        const usuario = await Usuario.findOne({ where: { email: body.email } })

        if (!usuario) {
            return res.status(404).json({ message: "Usuario não encontrado" })
        } else {

            let principal

            if (body.is_principal === "sim") {
                principal = true

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
                    is_principal: principal
                }

                await Endereco.create(valores)
                res.status(201).json({ message: "Endereço adiciona com sucesso!" })

            } else {
                principal = false

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
                    is_principal: principal
                }

                await Endereco.create(valores)
                res.status(201).json({ message: "Endereço adiciona com sucesso!" })

            }


        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao cadastrar o endereço" })
        console.error("Erro ao cadastrar o endereço", err)
    }
}

const listar = async (req, res) => {
    const body = req.body

    try {
        const usuario = await Usuario.findOne({ where: { email: body.email } })
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" })
        }
        const enderecos = await Endereco.findAll({where: { idUsuario: usuario.codUsuario}})

        res.status(200).json(enderecos)

    } catch (err) {
        console.error("Erro ao listar o endereço", err)
        res.status(500).json({ message: "Erro ao listar o endereço" })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const endereco = await Endereco.findByPk(id)

        if (!endereco) {
            return res.status(404).json({ message: "Endereço não encontrado" })
        } else {
            await Endereco.destroy({ where: { codEndereco: id } })
            res.status(200).json({ message: "Ednereço apagado com sucesso" })
        }
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar o endereço" })
        console.error("Erro ao atualizar o endereço", err)
    }
}

module.exports = { cadastrar, listar, apagar }