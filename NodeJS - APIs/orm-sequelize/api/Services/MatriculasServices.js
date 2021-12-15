const Services = require('./Services');
const database = require('../models');
const Sequelize = require('sequelize');

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas');
        this.pessoas = new Services('Pessoas');
    }

    async pegaMatricula(estudanteId, matriculaId) {
        return database[this.nomeDoModelo].findAll({ where: { id: matriculaId, estudante_id: estudanteId } });
    }

    async atualizaMatricula(dados, estudanteId, matriculaId) {
        return database.sequelize.transaction(async transacao => {
            await this.atualizaRegistros(dados,
                { id: matriculaId, estudante_id: estudanteId },
                { transaction: transacao });
        });
    }

    async apagaMatricula(estudanteId, matriculaId) {
        if (await this.pessoas.pegaUmRegistro(estudanteId)) {
            await this.apagaRegistro(matriculaId);
        }
    }

    async restauraMatricula(estudanteId, matriculaId) {
        if (await this.pessoas.pegaUmRegistro(estudanteId)) {
            await this.restauraRegistro(matriculaId);
        }
    }

    async pegaMatriculasPorTurma(turmaId) {
        return database[this.nomeDoModelo].findAndCountAll({
            where: {
                turma_id: Number(turmaId),
                status: 'confirmado'
            },
            limit: 10,
            offset: 0,                           //PAGINACAO
            order: [['estudante_id', 'ASC']]
        })
    }

    async pegaTurmasLotadas(lotacaoTurma) {
        return database[this.nomeDoModelo].findAndCountAll({
            where: {
                status: 'confirmado'
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        })
    }
}

module.exports = MatriculasServices;