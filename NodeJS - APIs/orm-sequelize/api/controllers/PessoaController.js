const database = require('../models');

class PessoaController {
    static async pegarTodasAsPessoas(req, res) {
        try {
            const todasAsPessaos = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessaos);
        }catch(error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;