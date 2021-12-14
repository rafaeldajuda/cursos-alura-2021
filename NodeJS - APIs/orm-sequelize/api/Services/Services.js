const database = require('../models');

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id){
        return database[this.nomeDoModelo].findAll({ where: { id:id } })
    }

    async criaResgistro(dados){
        return database[this.nomeDoModelo].create(dados);
    }

    async atualizaRegistro(dadosAtualizados, id, transacao){
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: {id: id} }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao){
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: {...where} } , transacao)
    }

    async apagaRegistro(id){
        database[this.nomeDoModelo].destroy({ where: {id:id} });
    }

    async restauraRegistro(id){
        database[this.nomeDoModelo].restore({ where: {id:id} });
    }

}

module.exports = Services