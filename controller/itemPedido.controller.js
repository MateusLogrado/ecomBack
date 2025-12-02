const ItemPedido = require("../models/ItemPedido")
const Estoque = require("../models/Estoque")

const cadastrar = async (req, res) => {
    const body = req.body
    const id = req.params.id

    try {
        const itensParaSalvar = body.map(item => {
            return {
                idProduto: item.codProd,
                idPedido: id,
                quantidade: item.qtde,
                precoUnitario: item.preco,
                valorTotalItem: parseInt(item.qtde) * parseFloat(item.preco)
            }
        })

        await ItemPedido.bulkCreate(itensParaSalvar)

        for (let i = 0; i < itensParaSalvar.length; i++) {
            
            const item = itensParaSalvar[i]
            
            const estoque = await Estoque.findOne({ 
                where: { idProduto: item.idProduto } 
            })

            if (estoque) {
                const novaQuantidade = estoque.quantidade_atual - item.quantidade
                
                if (novaQuantidade >= 0) {
                    await estoque.update({ quantidade_atual: novaQuantidade })
                }
            }
        }

        res.status(200).json({ message: "Pedido feito com sucesso" })

    } catch (err) {
        console.error("Erro ao cadastrar itens:", err)
        res.status(500).json({ error: "Erro ao cadastrar os itens do pedido" })
    }
}

module.exports = { cadastrar }