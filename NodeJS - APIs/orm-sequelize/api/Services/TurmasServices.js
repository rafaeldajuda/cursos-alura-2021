const Services = require('./Services');
const database = require('../models');

class TurmasServices extends Services {
    constructor(){
        super('Turmas');
    }

    async pegaTodasAsTurmasPorData(where){
        return database[this.nomeDoModelo].findAll({ where: {...where} });
    }
}

module.exports = TurmasServices;