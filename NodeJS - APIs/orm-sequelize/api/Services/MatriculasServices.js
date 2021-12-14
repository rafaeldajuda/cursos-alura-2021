const Services = require('./Services');
const database = require('../models');
const { sequelize } = require('../models');

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
}

module.exports = MatriculasServices;