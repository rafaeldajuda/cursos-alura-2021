// const database = require('../models');
const Services = require('../Services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
    static async pegarTodosOsNiveis(req, res) {
        try{
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
            return res.status(200).json(todosOsNiveis);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmNivel(req, res) {
        const { id } = req.params;
        try{
            const umNivel = await niveisServices.pegaUmRegistro(Number(id));
            return res.status(200).json(umNivel);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaNivel(req, res) {
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await niveisServices.criaResgistro(novoNivel);
            return res.status(200).json(novoNivelCriado);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await niveisServices.atualizaRegistro(novasInfos, Number(id));
            const NivelAtualizado = await niveisServices.pegaUmRegistro(Number(id));
            return res.status(200).json(NivelAtualizado);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaNivel(req, res) {
        const { id } = req.params;
        try{
            await niveisServices.apagaRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraNivel(req, res) {
        const { id } = req.params;
        try{
            await niveisServices.restauraRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} restaurado` });
        }catch(error){
            return res.status(500).json(error.menssage);
        }
    }


}

module.exports = NivelController