const Modelo = require('./ModeloTabelaProduto');
const instancia = require('../../../banco-de-dados');
const NaoEncontrado = require('../../../erros/NaoEncontrado');

module.exports = {
    listar(idFornecedor) {
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
        });
    },
    inserir(dados) {
        return Modelo.create(dados);
    },
    remover(idProduto, idFornecedor) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        });
    },
    async pegarPorId(idProduto, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        });

        if(!encontrado){
            throw new NaoEncontrado('Produto');
        }

        return encontrado;
    },
    atualizar(dadosDoProduto, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoProduto
            }
        )
    },
    subtrair(idProduto, idFornecedor, campo, quantidade) {
        // iniciar transacao
        return instancia.transaction(async trasacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            });

            produto[campo] = quantidade;

            // sava os dados alterados na transacao
            await produto.save();

            return produto;
        });

        
    }

}