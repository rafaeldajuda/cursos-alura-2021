const Sequelize = require('sequelize')
const instancia = require('../../bando-de-dados')

//PADRAO SEQUELIZE PARA CRIAR COLUNAS
const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}

//OPCOES PARA CRIACAO DE TABELA
const opcoes = {
    freeTableName: true,            // IMPEDE A ALTERACAO DO NOME DA TABELA
    tableName: 'fornecedores',
    timestamps: true,               // HABILITA AS COLUNAS PADROES DE DATAS -> createdAt, updatedAt
    createdAt: 'dataCriacao',       // ALTERANDO O NOME PADRAO DA COLUNA
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

//instancia.define('nome-tabela-codigo', colunas, opcoes)
module.exports = instancia.define('fornecedor', colunas, opcoes)
