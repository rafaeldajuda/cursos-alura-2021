const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {
    static async pegarTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {};
        
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        try{
            const todasAsTurmas = await database.Turmas.findAll({ where });
            return res.status(200).json(todasAsTurmas);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmaTurma(req, res) {
        const { id } = req.params;
        try{
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json(umaTurma);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTumaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json(novaTumaCriada);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Turmas.update(novasInfos, {
                where: {
                    id: Number(id)
                }
            });
            const turmaAtualizada = await database.Turmas.findOne({ where: {id: Number(id)} });
            return res.status(200).json(turmaAtualizada);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params;
        try{
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            });
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params;
        try{
            await database.Turmas.restore({ where: {id: Number(id)} });
            return res.status(200).json({ mensagem: `id ${id} restaurado` });
        }catch(error){
            return res.status(500).json(error);
        }
    }

}

module.exports = TurmaController